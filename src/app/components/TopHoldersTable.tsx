"use client";

import { useEffect, useState } from "react";
import { Table } from "../../../packages/kat-library/dist/index";
import { ColumnDef } from "@tanstack/table-core";
import { formatDecimalNumber } from "../utils/utils";

interface Holder {
  address: string;
  amount: string;
}

interface TokenInfo {
  tick: string;
  dec: string;
  holder: Holder[];
}

interface TopHoldersTableProps {
  ticker: string;
}

export default function TopHoldersTable({ ticker }: TopHoldersTableProps) {
  const [data, setData] = useState<Holder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        console.log('Fetching holders for tick:', ticker);
        const API_KASPLEX_URL = "https://api.kasplex.org/v1";
        const response = await fetch(`${API_KASPLEX_URL}/krc20/token/${ticker}`);
        console.log('Response status:', response.status);
        
        // Get the raw response text first
        const responseText = await response.text();
        console.log('Raw response:', responseText);
        
        let jsonData;
        try {
          jsonData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          throw new Error('Failed to parse API response as JSON');
        }
        
        if (!response.ok) {
          console.error('Error response:', jsonData);
          throw new Error(`Failed to fetch token info: ${jsonData.error || response.statusText}`);
        }
        
        console.log('API Response:', jsonData);
        
        if (!jsonData.result?.[0]) {
          throw new Error("No token data available");
        }

        const tokenData = jsonData.result[0];
        
        // Check if the token is unused or has no holder data
        if (tokenData.state === "unused") {
          throw new Error("This token is unused");
        }

        if (!Array.isArray(tokenData.holder) || tokenData.holder.length === 0) {
          throw new Error("No holder data available for this token");
        }

        setTokenInfo({
          tick: tokenData.tick,
          dec: tokenData.dec,
          holder: tokenData.holder
        });

        // Sort holders by amount in descending order
        const sortedHolders = [...tokenData.holder].sort((a, b) => 
          Number(b.amount) - Number(a.amount)
        );

        setData(sortedHolders);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      fetchHolders();
    }
  }, [ticker]);

  const columns: ColumnDef<Holder, unknown>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => (
        <span className="text-gray-500">#{row.index + 1}</span>
      ),
    },
    {
      accessorKey: "address",
      header: "Wallet Address",
      cell: ({ row }) => (
        <span className="text-blue-500 break-all">{row.original.address}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {tokenInfo && formatDecimalNumber(Number(row.original.amount), Number(tokenInfo.dec))} {tokenInfo?.tick}
        </span>
      ),
    },
    {
      accessorKey: "percentage",
      header: "% of Supply",
      cell: ({ row }) => {
        if (!tokenInfo) return null;
        const totalSupply = data.reduce((sum, holder) => sum + Number(holder.amount), 0);
        const percentage = (Number(row.original.amount) / totalSupply) * 100;
        return (
          <span className="text-gray-700 dark:text-gray-300">
            {percentage.toFixed(2)}%
          </span>
        );
      },
    },
  ];

  return (
    <div className="block">      
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <Table
          summaryText={`Top ${tokenInfo?.tick} Holders`}
          subText="List of the top token holders by balance"
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
}
