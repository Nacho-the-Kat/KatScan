import { NextResponse } from "next/server";

export const runtime = 'edge';

const API_KASPLEX_URL = process.env.API_KASPLEX_URL || "https://api.kasplex.org/v1";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tick = searchParams.get('tick');
    console.log('Received request for tick:', tick);

    if (!tick) {
      return NextResponse.json({ error: "Ticker parameter is required" }, { status: 400 });
    }

    const apiUrl = `${API_KASPLEX_URL}/krc20/tokeninfo?tick=${tick}`;
    console.log('Fetching from:', apiUrl);

    const response = await fetch(apiUrl);
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    console.log('API response data:', data);

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error fetching token info:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
