import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    // Extract token symbol from the request URL
    const pathname = req.nextUrl.pathname;
    const tokenSymbol = pathname.split("/").pop(); // Get last part of URL

    if (!tokenSymbol) {
      return NextResponse.json({ status: 400, message: "Invalid token symbol" }, { status: 400 });
    }

    // Fetch token details from the external API
    const apiUrl = `https://katapi.nachowyborski.xyz/api/token/detail/${tokenSymbol}`;
    const response = await fetch(apiUrl, {
      headers: {
        'accept': '*/*'
      }
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ status: response.status, message: "Error fetching token details" }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json({ status: 500, message: "Internal server error" }, { status: 500 });
  }
}