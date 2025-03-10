"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { Token } from "@/app/types/token";

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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("/api/kasplex/tokens");
        const data = await response.json();
        console.log('data trending tokens', data)
        if (response.ok && data.result) {
          setTokens(data.result);
        } else {
          setError(data.message || "Failed to load tokens.");
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) return <p>Loading Trending Tokens...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const stateToPillStyle: Record<string, "primary" | "dark" | "gray" | "accent"> = {
    deployed: "primary",
    pending: "gray",
    failed: "dark",
    active: "accent",
  };

  // Safely convert tokens for the TokenList component
  const tokenList = tokens.map((token, index) => {
    // Simple existence check before using toString()
    const id = token.id !== undefined ? String(token.id) : `token-${index}`;
    
    return {
      tick: token.tick,
      id,
      image: `https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.tick}.jpg`,
      pillLabel: token.state
      ? String(token.state).charAt(0).toUpperCase() + String(token.state).slice(1)
      : "", 
      pillStyle: stateToPillStyle[String(token.state)] || 'gray',
    };
  });

  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Recent Tokens"
      tokens={tokenList}
      icon={<ArrowTrendingUpIcon className="size-5 text-teal-500" />}
    />
  );
};

export default TrendingTokens;
