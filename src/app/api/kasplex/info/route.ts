import { NextResponse } from "next/server";

export const runtime = 'edge';

const KASPLEX_API_URL = "https://api.kasplex.org/v1/info";

export async function GET(req: Request) {
  try {
    const response = await fetch(KASPLEX_API_URL);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error fetching Kasplex info data:", error);
    return NextResponse.json({ error: "Failed to fetch Kasplex info data" }, { status: 500 });
  }
}
