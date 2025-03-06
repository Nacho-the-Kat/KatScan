"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";
import { Table, Avatar, Pill, ProgressBar } from "../../../packages/kat-library/dist/index";
import { ColumnDef } from "@tanstack/table-core";
import { formatNumberWithWords, formatPercentage, calculateValue } from "../utils/utils";
import Link from "next/link";

// Function to format timestamp to "DD/MM/YYYY"
const formatDate = (timestamp: number): string => {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/nft/list");
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();
        setData(jsonData.result || []);
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

    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const columns: ColumnDef<any, unknown>[] = [
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <Avatar
          imageUrl={`https://ipfs.io/ipfs/${row.original.buri}`} // Assuming 'buri' is IPFS CID
        />
      ),
    },
    {
      accessorKey: "tick",
      header: "Collection",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/nft/${row.original.id}`} className="text-blue-500 hover:underline">
            {row.original.tick}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "state",
      header: "Status",
      cell: ({ row }) => (
        <Pill
          label={row.original.state === "deployed" ? "Deployed" : "Pending"}
          color={row.original.state === "deployed" ? "primary" : "accent"}
        />
      ),
    },
    {
      accessorKey: "max", 
      header: "Max Supply",
      cell: ({ row }) => formatNumberWithWords(row.original.max, 2),
    },
    {
      accessorKey: "minted",
      header: "Total Minted",
      cell: ({ row }) => formatNumberWithWords(row.original.minted, 2),
    },
    {
      accessorKey: "mintingProgress", 
      header: "Minting Progress",
      cell: ({ row }) => {
        const percentage =
          (Number(row.original.minted) / Number(row.original.max)) * 100;
        const formattedPercentage = percentage < 1 && percentage > 0 ? "<1" : Math.round(percentage);

        return (
          <div className="flex items-center gap-2">
            <ProgressBar value={Number(formattedPercentage)} />
          </div>
        );
      },
    },
    {
      accessorKey: "mtsAdd",
      header: "Deployed On",
      cell: ({ row }) => <>{formatDate(row.original.mtsAdd)}</>,
    },
    {
      accessorKey: "completed",
      header: "Action",
      cell: ({ row }) => (
        <Pill
          label={row.original.completed ? "Trade" : "Mint"}
          color={row.original.completed ? "primary" : "accent"}
        />
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            <div className="block mt-4 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/20 transition-colors duration-300 ease-in-out">
              <Table
                summaryText="NFT Collection Dashboard"
                subText="Full list of all NFT collections deployed on Kaspa"
                columns={columns}
                data={currentData}
              />
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Previous
              </button>
              <p className="text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
