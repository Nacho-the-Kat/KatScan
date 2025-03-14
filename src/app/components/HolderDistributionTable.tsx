"use client";

import { useEffect, useState } from "react";
import { Table } from "../../../packages/kat-library/dist/index";
import { ColumnDef } from "@tanstack/table-core";
import { formatDecimalNumber } from "../utils/utils";

interface HolderGroup {
  group: string;
  balance: string;
  percentage: number;
}

interface TokenInfo {
  tick: string;
  dec: string;
  max: string;
  holder: Array<{
    address: string;
    amount: string;
  }>;
}

interface HolderDistributionTableProps {
  ticker: string;
}

export default function HolderDistributionTable({ ticker }: HolderDistributionTableProps) {
  const [data, setData] = useState<HolderGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

  useEffect(() => {
    const fetchHolderDistribution = async () => {
      try {
        console.log('Fetching holders for tick:', ticker);
        const API_KASPLEX_URL = "https://api.kasplex.org/v1";
        const response = await fetch(`${API_KASPLEX_URL}/krc20/token/${ticker}`);
        
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
          throw new Error(`Failed to fetch token info: ${jsonData.error || response.statusText}`);
        }

        if (!jsonData.result?.[0]) {
          throw new Error("No token data available");
        }

        const tokenData = jsonData.result[0];
        setTokenInfo(tokenData);

        if (!Array.isArray(tokenData.holder) || tokenData.holder.length === 0) {
          throw new Error("No holder data available for this token");
        }

        // Sort holders by amount in descending order
        const sortedHolders = [...tokenData.holder].sort((a, b) => 
          Number(b.amount) - Number(a.amount)
        );

        const maxSupply = Number(tokenData.max);
        const distributions: HolderGroup[] = [];
        const ranges = [
          { start: 0, end: 10, label: "Top 10" },
          { start: 10, end: 20, label: "11-20" },
          { start: 20, end: 30, label: "21-30" },
          { start: 30, end: 40, label: "31-40" },
          { start: 40, end: 50, label: "41-50" }
        ];

        let totalCalculatedBalance = 0;

        // Calculate for each range
        ranges.forEach(({ start, end, label }) => {
          const holders = sortedHolders.slice(start, end);
          const balance = holders.reduce((sum, holder) => sum + Number(holder.amount), 0);
          totalCalculatedBalance += balance;
          
          distributions.push({
            group: label,
            balance: balance.toString(),
            percentage: (balance / maxSupply) * 100
          });
        });

        // Calculate remaining
        const remainingBalance = maxSupply - totalCalculatedBalance;
        distributions.push({
          group: "Remaining",
          balance: remainingBalance.toString(),
          percentage: (remainingBalance / maxSupply) * 100
        });

        setData(distributions);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (ticker) {
      fetchHolderDistribution();
    }
  }, [ticker]);

  // Mobile card view component
  const MobileCard = ({ item }: { item: HolderGroup }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{item.group}</span>
        <span className="text-teal-500 font-bold">{item.percentage.toFixed(2)}%</span>
      </div>
      <div className="text-gray-600 dark:text-gray-400">
        {tokenInfo && formatDecimalNumber(Number(item.balance), Number(tokenInfo.dec))} {tokenInfo?.tick}
      </div>
    </div>
  );

  const columns: ColumnDef<HolderGroup, unknown>[] = [
    {
      accessorKey: "group",
      header: "Holder Group",
      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">{row.original.group}</span>
      ),
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {tokenInfo && formatDecimalNumber(Number(row.original.balance), Number(tokenInfo.dec))} {tokenInfo?.tick}
        </span>
      ),
    },
    {
      accessorKey: "percentage",
      header: "Percentage",
      cell: ({ row }) => (
        <span className="text-teal-500 font-bold">{row.original.percentage.toFixed(2)}%</span>
      ),
    },
  ];

  return (
    <div className="w-full">
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
          {/* Desktop view */}
          <div className="hidden md:block">
            <Table
              summaryText={`${tokenInfo?.tick} Holder Distribution`}
              subText="Breakdown of token ownership by holder groups"
              columns={columns}
              data={data}
            />
          </div>
          
          {/* Mobile view */}
          <div className="md:hidden">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {tokenInfo?.tick} Holder Distribution
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Breakdown of token ownership by holder groups
              </p>
            </div>
            <div className="space-y-2">
              {data.map((item, index) => (
                <MobileCard key={index} item={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
