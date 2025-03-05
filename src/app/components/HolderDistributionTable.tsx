"use client";

import { useEffect, useState } from "react";
import { Table } from "../../../packages/kat-library/dist/index";
import { ColumnDef } from "@tanstack/table-core";

interface HolderGroup {
  group: string; // Example: "Top 10 Holders", "Others"
  percentage: number; // Percentage of total holdings
}

export default function HolderDistributionTable() {
  const [data, setData] = useState<HolderGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const limit = 50; // Max limit per page

  const fetchHolderDistribution = async (newCursor: string | null = null) => {
    try {
      

      // Mocking distribution data from transactions (replace with real API logic if available)
      const groupedData: HolderGroup[] = [
        { group: "Top 10 Holders", percentage: 40 },
        { group: "Next 50 Holders", percentage: 30 },
        { group: "Remaining Holders", percentage: 25 },
        { group: "Others", percentage: 5 },
      ];

      setData(groupedData);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolderDistribution();
  }, []);

  const handleNextPage = () => {
    if (nextCursor) {
      fetchHolderDistribution(nextCursor);
    }
  };

  const handlePrevPage = () => {
    if (prevCursor) {
      fetchHolderDistribution(prevCursor);
    }
  };

  const columns: ColumnDef<HolderGroup, unknown>[] = [
    {
      accessorKey: "group",
      header: "Holder Group",
      cell: ({ row }) => (
        <span className="">{row.original.group}</span>
      ),
    },
    {
      accessorKey: "percentage",
      header: "Percentage",
      cell: ({ row }) => (
        <span className="text-teal-500 font-bold">{row.original.percentage}%</span>
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
            summaryText="Token Holder Distribution"
            subText="Breakdown of token ownership groups"
            columns={columns}
            data={data}
          />          
        </>
      )}
    </div>
  );
}
