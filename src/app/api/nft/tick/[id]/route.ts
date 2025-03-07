import { NextResponse } from "next/server";

export const runtime = 'edge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://katapi.nachowyborski.xyz/api";

export async function GET(req: Request) {
  try {
    // Extract ID from the request URL
    const url = new URL(req.url);
    const pathname = url.pathname;
    const id = pathname.split("/").pop(); // Get last part of URL

    if (!id) {
      return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
    }

    const response = await fetch(`${API_BASE_URL}/nfts/id/${encodeURIComponent(id)}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching NFT id data:", error);
    return NextResponse.json({ error: "Failed to fetch NFT id data" }, { status: 500 });
  }
}
