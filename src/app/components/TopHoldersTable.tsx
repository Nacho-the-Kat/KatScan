"use client";

import { useEffect, useState } from "react";
import { Table } from "../../../packages/kat-library/dist/index";
import { ColumnDef } from "@tanstack/table-core";

interface Holder {
  id: number;
  address: string;
}

export default function TopHoldersTable() {
  const [data, setData] = useState<Holder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const response = await fetch("/api/holders/topHolders");
        if (!response.ok) throw new Error("Failed to fetch top holders");
        const jsonData = await response.json();
        setData(jsonData.result);
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

    fetchHolders();
  }, []);

  const columns: ColumnDef<Holder, unknown>[] = [
    {
      accessorKey: "id",
      header: "Rank",
      cell: ({ row }) => <span className="text-gray-500">#{row.original.id}</span>,
    },
    {
      accessorKey: "address",
      header: "Wallet Address",
      cell: ({ row }) => (
        <span className="text-blue-500 break-all">{row.original.address}</span>
      ),
    },
  ];

  return (
    <div className="block">      
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <Table
          summaryText="Top Kaspa Holders"
          subText="List of the top KRC20 token holders"
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
}
