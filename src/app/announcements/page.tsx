"use client";

import Layout from "@/app/components/Layout";
import TrendingTokens from "@/app/components/TrendingTokens";
import { TokenList, Widget } from "../components/index";
import {
  CircleStackIcon,
  ArrowsRightLeftIcon,
  DocumentCurrencyDollarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  WalletIcon,
  ArrowPathRoundedSquareIcon,
  UsersIcon,
  FireIcon,
  CalculatorIcon
} from "@heroicons/react/24/outline";
import MintTokens from "../components/MintTokens";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Primera fila: 4 columnas */}
        

        <div className="block bg-gray-50 min-h-40 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-white mt-2 ml-2">No Announcements yet.</p>
          
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="py-4 ">
            <TrendingTokens />
          </div>
          <div className="py-4">
            <MintTokens />
          </div>
          <div className="py-4 text-center">
            <TokenList title="Trading markets" tokens={[]} 
              icon={<ArrowTrendingUpIcon className="size-5 text-teal-500" />}
            />
          </div>
          <div className="py-4 text-right">
            <div className="w-full h-auto mb-12 flex items-center justify-center">
              <Image src="/nft.png" alt="Nacho KatScan" width={250} height={50} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
