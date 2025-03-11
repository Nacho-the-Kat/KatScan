"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Token } from "@/app/types/token";

// Define a type that matches the TokenList component's expected Token type
type TokenListToken = {
  tick: string;
  image?: string;
  price?: string;
  change?: number;
  id?: string;
};

const MintTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`/api/mint-totals`);
        const data = await response.json();
        
        console.log('Trending Tokens', data);
        if (response.ok) {
          const sortedTokens = data.sort((a: Token, b: Token) => b.mintTotal - a.mintTotal);
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

  if (loading) return <p>Loading Trending Tokens...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Safely convert tokens for the TokenList component
  const tokenList = tokens.map((token, index) => {
    // Simple existence check before using toString()
    const id = token.id !== undefined ? String(token.id) : `mint-token-${index}`;
    
    return {
      tick: token.tick,
      id,
      image: `https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.tick}.jpg`,
      change: token.mintTotal,
    };
  });

  
  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Trending Tokens"
      legend="Minted"
      tokens={tokenList}
      icon={<ChartPieIcon className="size-5 text-teal-500" />}
    />
  );
};

export default MintTokens;
