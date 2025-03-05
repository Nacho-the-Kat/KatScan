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
          <div className="py-4 text-center">
            <TokenList title="Trading markets" tokens={[]} 
              icon={<ArrowTrendingUpIcon className="size-5 text-teal-500" />}
            />
          </div>
          <div className="py-4 text-right">
            <img src="/nft.png" alt="Nacho KatScan" width={250} height={50} />
          </div>
        </div>

        <h1 className="text-2xl text-teal-500">Kasplex Statistics</h1>
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

        <h1 className="text-2xl text-teal-500">Features</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="py-4 text-center">
            <Widget value="All Tokens"
              icon={<GlobeAltIcon className="size-8" />}
              />
          </div>
          <div className="py-4 text-center">
            <Widget value="Address Lookup"
              icon={<WalletIcon className="size-8" />}
            />
          </div>
          <div className="py-4 text-center">
            <Widget value="Token Comparison" 
              icon={<ArrowPathRoundedSquareIcon className="size-8" />}
            />
          </div>
          <div className="py-4 text-center">
            <Widget value="Top Holders"
              icon={<UsersIcon className="size-8" />}
             />
          </div>
          <div className="py-4 text-center">
            <Widget value="Mint Heatmap"
              icon={<FireIcon className="size-8" />}
             />
          </div>
          <div className="py-4 text-center">
            <Widget value="MarketCap Calculator"
              icon={<CalculatorIcon className="size-8" />}
             />
          </div>
        </div>
      </div>
    </Layout>
  );
}
