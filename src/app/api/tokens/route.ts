import { NextResponse } from "next/server";

export const runtime = 'edge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://katapi.nachowyborski.xyz/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "5";
  const sortBy = searchParams.get("sortBy") || "holderTotal";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  console.log('API_BASE_URL', API_BASE_URL);

  try {
    const url = `${API_BASE_URL}/token/tokenlist?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}`;
    console.log('url', url);
    const response = await fetch(
      url
    );
    const data = await response.json();


    // const tokens = Array.isArray(data.result) ? data.result.slice(0, Number(limit)) : [];
    return NextResponse.json(data.result);

  } catch (error: unknown) {
    console.log('error', error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
