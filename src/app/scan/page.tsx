"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";
import { Token } from "../types/token";
import {
  Table,
  Avatar,
  Pill,
  ProgressBar,
  Search,
  TokenList,
} from "../../../packages/kat-library/dist/index";
import { ColumnDef } from "@tanstack/table-core";
import {
  formatNumberWithWords,
  formatPreMinted,
  formatPercentage,
  calculateValue,
} from "../utils/utils";
import TrendingTokens from "../components/TrendingTokens";
import MintTokens from "../components/MintTokens";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Function to convert timestamp to "DD/MM/YYYY :SS" format
const formatDate = (timestamp: number): string => {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

export default function Home() {
  const [data, setData] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tokens");
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();
        setData(jsonData);
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

  const columns: ColumnDef<Token, unknown>[] = [
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <Avatar
          imageUrl={`https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${row.original.logo}`}
        />
      ),
    },
    {
      accessorKey: "ticker",
      header: "Ticker",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* <Fav /> */}
          <Link className="font-bold underline" href={`/token/${row.original.id}`}>{row.original.tick}</Link>
        </div>
      ),
    },
    {
      accessorKey: "launchType",
      header: "Launch Type",
      cell: ({ row }) => {
        console.log('row.original.state', row.original)
        return (
        <Pill
          label={row.original.pre === 0 ? "Fair Mint" : "Pre-Mint"}
          color={row.original.pre === 0 ? "accent" : "dark"}
        />
      )},
    },
    {
      accessorKey: "state",
      header: "Status",
    },
    {
      accessorKey: "max",
      header: "Max Supply",
      cell: ({ row }) =>
        formatNumberWithWords(Number(row.original.max), row.original.dec),
    },
    {
      accessorKey: "pre",
      header: "Pre-Minted",
      cell: ({ row }) =>
        formatPreMinted(row.original.pre, Number(row.original.max), row.original.dec),
    },
    {
      accessorKey: "minted",
      header: "Total Minted",
      cell: ({ row }) =>
        formatNumberWithWords(Number(row.original.max), row.original.dec),
    },
    {
      accessorKey: "mintingProgress",
      header: "Minting Progress",
      cell: ({ row }) => {
        
        const percentage = ( calculateValue(row.original.minted, row.original.dec) / calculateValue(Number(row.original.max), row.original.dec)) * 100;
        const formattedPercentage = percentage < 1 && percentage > 0 ? '<1' : Math.round(percentage);

        return (
        <div className="flex items-center gap-2">
          <ProgressBar
            value={Number(formattedPercentage)}
          />
        </div>
      )},
    },
    {
      accessorKey: "mtsAdd",
      header: "Deployed On",
      cell: ({ row }) => <>{formatDate(row.original.mtsAdd)}</>,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">      
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="py-4 ">
                <TrendingTokens />
              </div>
              <div className="py-4">
                <MintTokens />
              </div>
              <div className="py-4">
                <TokenList
                  title="Trading markets"
                  tokens={[]}
                  icon={
                    <ArrowTrendingUpIcon className="size-5 text-teal-500" />
                  }
                />
              </div>
            </div>
            <div className="block shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/20 transition-colors duration-300 ease-in-out">
              <Table
                summaryText="KRC20 Token Dashboard"
                subText="Full list of all KRC20 tokens deployed on Kaspa"
                columns={columns}
                data={currentData}
              />
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <p className="text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
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
