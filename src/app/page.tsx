"use client";

import Layout from "@/app/components/Layout";
import TrendingTokens from "@/app/components/TrendingTokens";
import MintTokens from "./components/MintTokens";
import RecentCollections from "./components/RecentCollections";
import TrendingCollections from "./components/TrendingCollections";
import TokenStatistics from "./components/Krc20Widgets";
import NFTStatistics from "./components/Krc721Widgets";
export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Responsive grid for token and collection widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="py-4">
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

        <TokenStatistics />

        <NFTStatistics />
      </div>
    </Layout>
  );
}
