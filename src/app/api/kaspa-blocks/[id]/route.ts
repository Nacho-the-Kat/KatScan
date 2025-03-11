import { NextResponse } from "next/server";

export const runtime = 'edge';

const KASPA_API_BASE_URL = "https://api.kaspa.org/blocks";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing block ID" }, { status: 400 });
    }

    const apiUrl = `${KASPA_API_BASE_URL}/${id}?includeTransactions=false&includeColor=true`;
    
    console.log(`Fetching from: ${apiUrl}`); // Debugging log

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Kaspa API Error: ${errorText}`);
      return NextResponse.json({ error: `Kaspa API request failed`, details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Kaspa block data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
