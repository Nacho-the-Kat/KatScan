import { NextResponse } from "next/server";

export const runtime = 'edge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function GET(req: Request) {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

//   console.log("Fetching mint totals for:", startOfDay, "to", endOfDay);

  try {
    const response = await fetch(
      `${API_BASE_URL}/transactions/mint-totals`
    );
    const data = await response.json();

    console.log('data', data)

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
