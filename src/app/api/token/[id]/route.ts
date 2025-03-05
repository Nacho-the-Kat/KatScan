import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract ID from the request URL
    const pathname = req.nextUrl.pathname;
    const id = pathname.split("/").pop(); // Get last part of URL

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ status: 400, message: "Invalid token ID" }, { status: 400 });
    }

    // Fetch token data from the external API
    const apiUrl = `https://katapi.nachowyborski.xyz/api/token/${id}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ status: response.status, message: "Error fetching token data" }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json({ status: 500, message: "Internal server error" }, { status: 500 });
  }
}
