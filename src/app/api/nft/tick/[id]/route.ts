import { NextResponse } from "next/server";

export const runtime = "edge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://katapi.nachowyborski.xyz/api";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop(); // Get last part of URL

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ status: 400, message: "Invalid token ID" }, { status: 400 });
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

    return NextResponse.json({
      entries: entriesData.result,
      tickInfo: tickData.result,
    });
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    return NextResponse.json({ error: "Failed to fetch NFT data" }, { status: 500 });
  }
}
