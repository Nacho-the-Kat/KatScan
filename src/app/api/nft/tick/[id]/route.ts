import { NextResponse } from "next/server";

export const runtime = "edge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://katapi.nachowyborski.xyz/api";

export async function GET(req: Request, context: { params: { id?: string } }) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: "Missing 'id' parameter in URL" }, { status: 400 });
    }

    const entriesApiUrl = `${API_BASE_URL}/nfts/entries?tick=${encodeURIComponent(id)}`;
    const tickApiUrl = `${API_BASE_URL}/nfts/tick?tick=${encodeURIComponent(id)}`;

    console.log(`Fetching data from: ${entriesApiUrl} and ${tickApiUrl}`);

    const [entriesResponse, tickResponse] = await Promise.all([
      fetch(entriesApiUrl, { method: "GET", headers: { "Content-Type": "application/json" } }),
      fetch(tickApiUrl, { method: "GET", headers: { "Content-Type": "application/json" } })
    ]);

    if (!entriesResponse.ok) {
      return NextResponse.json(
        { error: `Entries API request failed with status ${entriesResponse.status}` },
        { status: entriesResponse.status }
      );
    }

    if (!tickResponse.ok) {
      return NextResponse.json(
        { error: `Tick API request failed with status ${tickResponse.status}` },
        { status: tickResponse.status }
      );
    }

    const entriesData = await entriesResponse.json();
    const tickData = await tickResponse.json();

    const combinedData = {
      entries: entriesData.result,
      tickInfo: tickData.result
    };

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    return NextResponse.json({ error: "Failed to fetch NFT data" }, { status: 500 });
  }
}
