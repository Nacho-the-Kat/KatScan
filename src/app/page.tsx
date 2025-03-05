"use client";

import Layout from "@/app/components/Layout";
import TrendingTokens from "@/app/components/TrendingTokens";
import { TokenList, Widget } from "../../packages/kat-library/dist/index";
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
import MintTokens from "./components/MintTokens";
import { useEffect, useState } from "react";
import { Fav } from "../../packages/kat-library/dist/index";
import Image from "next/image";
import RecentCollections from "./components/RecentCollections";
import TrendingCollections from "./components/TrendingCollections";
export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Primera fila: 4 columnas */}
        <div className="grid grid-cols-4 gap-4">
          <div className="py-4 ">
            <TrendingTokens />
          </div>
          <div className="py-4">
            <MintTokens />
          </div>
          <div className="py-4">
            <RecentCollections />
          </div>
          <div className="py-4">        
              <TrendingCollections />
          </div>
        </div>

        <h1 className="text-2xl text-teal-500">Token Statistics</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="py-4 text-center">
            <Widget
              value="Total KRC20 Transactions"
              icon={<CircleStackIcon className="size-12" />}
            />
          </div>
          <div className="py-4 text-center">
            <Widget
              value="Total KRC20 Tokens Deployed"
              icon={<ArrowsRightLeftIcon className="size-12" />}
            />
          </div>
          <div className="py-4 text-center">
            <Widget
              value="Total Fees Paid (KAS)"
              icon={<DocumentCurrencyDollarIcon className="size-12" />}
            />
          </div>
        </div>

        <h1 className="text-2xl text-teal-500">NFTs Statistics</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="py-4 text-center">
            <Widget
              value="Total NFTs Transactions"
              icon={<CircleStackIcon className="size-12" />}
            />
          </div>
          <div className="py-4 text-center">
            <Widget
              value="TotalNFTs Deployed"
              icon={<ArrowsRightLeftIcon className="size-12" />}
            />
          </div>
          <div className="py-4 text-center">
            <Widget
              value="Total Fees Paid"
              icon={<DocumentCurrencyDollarIcon className="size-12" />}
            />
          </div>
        </div>

       
      </div>
    </Layout>
  );
}
