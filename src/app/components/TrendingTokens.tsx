"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Token } from "@/app/types/token";

// Define a type that matches the TokenList component's expected Token type
type TokenListToken = {
  tick: string;
  image?: string;
  price?: string;
  change?: number;
  id?: string;
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
          setTokens(data.result); // Ensure we extract `result` array
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

  // Convert API tokens to the format expected by TokenList
  const adaptedTokens: TokenListToken[] = tokens.map(token => ({
    tick: token.tick,
    id: token.id.toString(), // Convert number id to string
    // Add other properties as needed
  }));

  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Recent Tokens"
      tokens={adaptedTokens}
      icon={<RocketLaunchIcon className="size-5 text-teal-500" />}
    />
  );
};

export default TrendingTokens;
