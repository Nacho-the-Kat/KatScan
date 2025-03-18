"use client";

import React from "react";
import Layout from "@/app/components/Layout";
import TrendingTokens from "@/app/components/TrendingTokens";
import {
  TokenList,
  Widget,
  Table,
  Avatar,
  Pill,
  ProgressBar,
} from "@/app/components/index";
import {
  CircleStackIcon,
  ArrowsRightLeftIcon,
  DocumentCurrencyDollarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  WalletIcon,
  ArrowPathRoundedSquareIcon,
  UserIcon,
  UsersIcon,
  FireIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/table-core";

export default function Home() {
  const columns: ColumnDef<any>[] = [
    {
        accessorKey: "rank",
        header: "Rank",
      },
    {
      accessorKey: "balance",
      header: "Balance",
    },
    {
      accessorKey: "count",
      header: "Count",
    },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "token", header: "Unique Tokens" },
    { accessorKey: "supply", header: "% of Supply" },
    
  ];

  const data = [
    {
      rank: "-",
      balance: 0.00,
      count: "-",
      address: "-",
      token: '-',
      supply: '-',
    },
    {
        rank: "-",
        balance: 0.00,
        count: "-",
        address: "-",
        token: '-',
        supply: '-',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-2xl text-teal-500">Top Holders</h1>
        <div className="flex grid grid-cols-3 gap-4">
          <div
            className={`flex items-center py-2 px-2 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out`}
          >
            <div className="px-1 pt-1 pb-1">
              <div className=" justify-center ">
                <div className="block text-md center text-gray-700 dark:text-gray-100 font-bold">
                  Total Holders:
                </div>
                <div className="block w-full mt-2">
                <ProgressBar value={100} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center py-2 px-2 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out`}
          >
            <div className="px-1 pt-1 pb-1">
              <div className=" justify-center ">
                <div className="text-md center text-gray-700 dark:text-gray-100 font-bold">
                  Top 10 Holders Owned:
                </div>
                <div className="block w-full mt-2">
                <ProgressBar value={10} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center py-2 px-2 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out`}
          >
            <div className="px-1 pt-1 pb-1">
              <div className=" justify-center ">
                <div className="text-md center text-gray-700 dark:text-gray-100 font-bold">
                Top 100 Holders Owned:
                </div>
                <div className="block w-full mt-2">
                <ProgressBar value={75} />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div
          className={`block shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out`}
        >
          <Table columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
}
