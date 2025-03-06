import { NextResponse } from "next/server";

export const runtime = 'edge';

const KRC_API_URL = "https://mainnet.krc721.stream/api/v1/krc721/mainnet/status";

export async function GET(req: Request) {
  try {
    const response = await fetch(KRC_API_URL);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching KRC721 status data:", error);
    return NextResponse.json({ error: "Failed to fetch KRC721 status data" }, { status: 500 });
  }
}