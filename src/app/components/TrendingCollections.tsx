"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { formatInteger } from "../utils/utils";

// Define a type that matches the TokenList component's expected Token type
type TokenListToken = {
  tick: string;
  image?: string;
  price?: string;
  change?: number;
  id?: string;
};

type HotMintToken = {
  ticker: string;
  changeTotalMints: number;
  totalMintPercentage: number;
  totalHolders: number;
};

const TrendingTokens = () => {
  const [tokens, setTokens] = useState<HotMintToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("/api/kaspa-hotmints");
        const data = await response.json();
        console.log('trending collections', data);
        if (response.ok) {
          // Sort tokens by totalHolders (descending order)
          const sortedTokens = data.sort((a: HotMintToken, b: HotMintToken) => b.totalMintPercentage - a.totalMintPercentage);
          setTokens(sortedTokens);
        } else {
          setError("Failed to load tokens.");
        }
      } catch (err: unknown) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) return <p>Loading Trending Collections...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Safely convert tokens for the TokenList component
  const tokenList = tokens.map((token, index) => {
    // Simple existence check before using toString()
    const id = `collection-${index}`;
    
    return {
      tick: token.ticker,
      id,
      image: `https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.ticker}.jpg`,
      pillLabel: `${String(token.totalMintPercentage)}%`,
    };
  });

  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      legend="Mint Percentage"
      title="Trending Collections"
      tokens={tokenList}
      icon={<RocketLaunchIcon className="size-5 text-teal-500" />}
    />
  );
};

export default TrendingTokens;
