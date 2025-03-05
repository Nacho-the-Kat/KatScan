"use client";

import { useEffect, useState } from "react";
import { Table } from "../../../packages/kat-library/dist/index";
import { ColumnDef } from "@tanstack/table-core";

interface Transaction {
  op: string;
  tick: string;
  amt: string;
  from: string;
  to: string;
  opScore: string;
  hashRev: string;
}

export default function KRC20Table() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const limit = 50; // Max limit per page

  const fetchTransactions = async (newCursor: string | null = null) => {
    try {
      setLoading(true);
      const url = `/api/krc20/oplist?tick=NACHO&limit=${limit}${newCursor ? `&cursor=${newCursor}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch KRC-20 transactions");
      const jsonData = await response.json();

      setData(jsonData.result || []);
      setPrevCursor(jsonData.prev || null);
      setNextCursor(jsonData.next || null);
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleNextPage = () => {
    if (nextCursor) {
      fetchTransactions(nextCursor);
    }
  };

  const handlePrevPage = () => {
    if (prevCursor) {
      fetchTransactions(prevCursor);
    }
  };

  const columns: ColumnDef<Transaction, unknown>[] = [
    {
      accessorKey: "op",
      header: "Operation",
    },
    {
      accessorKey: "amt",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-teal-500">{(Number(row.original.amt) / 1e8).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "from",
      header: "Sender",
      cell: ({ row }) => (
        <span className="text-blue-500 break-all">{row.original.from}</span>
      ),
    },
    {
      accessorKey: "to",
      header: "Receiver",
      cell: ({ row }) => (
        <span className="text-blue-500 break-all">{row.original.to}</span>
      ),
    },
    {
      accessorKey: "hashRev",
      header: "Transaction Hash",
      cell: ({ row }) => (
        <span className="break-all">{row.original.hashRev}</span>
      ),
    },
  ];

  return (
    <div className="block">
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!loading && !error && (
        <>
          <Table
            summaryText="KRC-20 Transfer History"
            subText="Latest transfers on the Kaspa network"
            columns={columns}
            data={data}
          />

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={!prevCursor}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                !prevCursor ? "bg-gray-300 cursor-not-allowed" : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
            >
              Previous
            </button>
            <p className="text-gray-500">Limit: {limit} records per page</p>
            <button
              onClick={handleNextPage}
              disabled={!nextCursor}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                !nextCursor ? "bg-gray-300 cursor-not-allowed" : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
