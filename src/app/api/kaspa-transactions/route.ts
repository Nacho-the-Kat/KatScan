import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parseamos el body de la solicitud
    const body = await req.json();
    const { transactionIds } = body;

    // Validamos que el payload contenga transactionIds
    if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
      return NextResponse.json(
        { error: "transactionIds is required" },
        { status: 400 }
      );
    }

    const kaspaResponse = await fetch("https://api.kaspa.org/transactions/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactionIds }),
    });

    if (!kaspaResponse.ok) {
      throw new Error(`API Error: ${kaspaResponse.statusText}`);
    }

    const data = await kaspaResponse.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
