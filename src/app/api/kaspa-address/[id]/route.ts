import { NextResponse } from "next/server";

export const runtime = "edge";

const KASPA_API_BASE_URL = "https://api.kaspa.org/addresses";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    console.log("Fetching id data for:", params.id);
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    // Construct API URLs
    const urls = {
      balance: `${KASPA_API_BASE_URL}/${encodeURIComponent(id)}/balance`,
      name: `${KASPA_API_BASE_URL}/${encodeURIComponent(id)}/name`,
      transactions: `${KASPA_API_BASE_URL}/${encodeURIComponent(id)}/full-transactions?limit=20&offset=0`,
      transactionCount: `${KASPA_API_BASE_URL}/${encodeURIComponent(id)}/transactions-count`,
    };

    // Fetch data from all APIs in parallel
    const [balanceRes, nameRes, transactionsRes, countRes] = await Promise.all([
      fetch(urls.balance, { headers: { Accept: "application/json" } }),
      fetch(urls.name, { headers: { Accept: "application/json" } }),
      fetch(urls.transactions, { headers: { Accept: "application/json" } }),
      fetch(urls.transactionCount, { headers: { Accept: "application/json" } }),
    ]);

    // Check if any request failed
    if (!balanceRes.ok || !nameRes.ok || !transactionsRes.ok || !countRes.ok) {
      return NextResponse.json(
        {
          error: "Kaspa API request failed",
          details: {
            balance: balanceRes.status,
            name: nameRes.status,
            transactions: transactionsRes.status,
            transactionCount: countRes.status,
          },
        },
        { status: 502 }
      );
    }

    // Parse JSON responses
    const [balanceData, nameData, transactionsData, countData] = await Promise.all([
      balanceRes.json(),
      nameRes.json(),
      transactionsRes.json(),
      countRes.json(),
    ]);

    // Construct final response
    const responseData = {
      address: balanceData.address,
      name: nameData.name || null,
      balance: balanceData.balance,
      totalTransactions: countData.total,
      transactions: transactionsData,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching Kaspa address data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
