import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get query params (tick & limit) from request URL
    const { searchParams } = new URL(req.url);
    const tick = searchParams.get("tick") || "nacho"; // Default to "nacho"
    const limit = searchParams.get("limit") || "50"; // Default to 50

    // Construct the external API URL
    const apiUrl = `https://api.kasplex.org/v1/krc20/oplist?tick=${tick}&limit=${limit}`;

    // Fetch data from the external API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      return NextResponse.json(
        { status: response.status, message: "Error fetching KRC-20 operations" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
