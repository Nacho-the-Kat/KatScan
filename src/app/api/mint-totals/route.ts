import { NextResponse } from "next/server";

export const runtime = 'edge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://katapi.nachowyborski.xyz/api";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Construct the full URL with query parameters
    const apiUrl = `${API_BASE_URL}/transactions/mint-totals${startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : ''}`;
    
    console.log('Requesting API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'accept': '*/*'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check if data is in the expected format
    if (!Array.isArray(data)) {
      console.error('Unexpected API response format:', data);
      return NextResponse.json({ error: "Invalid data format from API" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error fetching mint totals:', error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
