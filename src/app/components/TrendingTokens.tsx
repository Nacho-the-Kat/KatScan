"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { Token } from "@/app/types/token";
import { format } from "date-fns";

// Define a type that matches the TokenList component's expected Token type
type TokenListToken = {
  tick: string;
  image?: string;
  price?: string;
  change?: number;
  id?: string;
  pillLabel?: string;
  pillStyle?: string;
};

const TrendingTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = "";

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("/api/kasplex/tokens");
        const data = await response.json();
        console.log('data trending tokens', data)
        if (response.ok && data.result) {
          setTokens(data.result);
        } else {
          console.log('error trending tokens', data)
        }
      } catch (err) {
        console.log('error trending tokens', err)
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) return <p>Loading Trending Tokens...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const stateToPillStyle: Record<string, "primary" | "dark" | "gray" | "accent"> = {
    deployed: "accent",
    pending: "accent",
    failed: "accent",
    active: "accent",
  };

  function convertUnixToDate(unixTimestamp: number) {
    if (!unixTimestamp || isNaN(unixTimestamp)) {
        return "Invalid Date";
    }

    const date = new Date(Number(unixTimestamp));

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    return format(date, "MMM d, yyyy"); 

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
    
    return `${day}/${month}/${year}`;
  }

  // Sort tokens by mtsAdd (newest first) before mapping
  const sortedTokens = [...tokens].sort((a, b) => b.mtsAdd - a.mtsAdd);

  // Safely convert tokens for the TokenList component
  const tokenList = sortedTokens.map((token, index) => {
    // Simple existence check before using toString()
    const id = token.id !== undefined ? String(token.id) : `token-${index}`;
    
    return {
      tick: token.tick,
      id,
      image: `https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.tick}.jpg`,
      pillLabel: convertUnixToDate(token.mtsAdd), 
      pillStyle: 'accent',
    };
  });

  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Recent Tokens"
      tokens={tokenList as unknown as Token[]} // Type assertion to fix type error
      icon={<ArrowTrendingUpIcon className="size-5 text-teal-500" />}
    />
  );
};

export default TrendingTokens;