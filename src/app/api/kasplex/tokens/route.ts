import { NextResponse } from "next/server";

const API_KASPLEX_URL = process.env.API_KASPLEX_URL || "https://api.kasplex.org/v1";

export async function GET() {
  try {
    const response = await fetch(`${API_KASPLEX_URL}/krc20/tokenlist`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch token list." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data.", error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
