import { NextResponse } from "next/server";

export const runtime = 'edge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://katapi.nachowyborski.xyz/api";

export async function GET(req: Request) {
  try {
        const response = await fetch(`${API_BASE_URL}/nfts/list`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching NFT data:", error);
    return NextResponse.json({ error: "Failed to fetch NFT data" }, { status: 500 });
  }
}