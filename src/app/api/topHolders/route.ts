import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Define the external API endpoint
    const apiUrl = "https://katapi.nachowyborski.xyz/api/holders/topHolders";

    // Fetch data from the external API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      return NextResponse.json(
        { status: response.status, message: "Error fetching top holders" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
