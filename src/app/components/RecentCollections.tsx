"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { Token } from "../types/token";

const API_URL = "/api/kaspa-tradestats";

// Define a type that matches the TokenList component's expected Token type
type TokenListToken = {
  ticker: any;
  totalVolumeKAS?: number; // Added missing property
  tick: string;
  image?: string;
  price?: string;
  change?: number;
  id?: string;
  pillLabel?: string;
  pillStyle?: string;
};

const TrendingTokens = () => {
  const [tokens, setTokens] = useState<TokenListToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('data trending tokens', data);
        if (response.ok && data.result) {
          // Sort tokens by totalVolumeKAS (highest to lowest)
          const sortedTokens = data.result.sort((a: any, b: any) => b.totalVolumeKAS - a.totalVolumeKAS);
          console.log('sorted tokens', sortedTokens);
          setTokens(sortedTokens);
        } else {
          console.log('error trending tokens', data);
        }
      } catch (err) {
        console.log('error trending tokens', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) return <p>Loading Trending Tokens...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  function convertUnixToDate(unixTimestamp: number) {
    if (!unixTimestamp || isNaN(unixTimestamp)) {
        return "Invalid Date";
    }

    const date = new Date(Number(unixTimestamp));

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
    
    return `${day}/${month}/${year}`;
  }

  // Safely convert tokens for the TokenList component
  const tokenList = tokens.map((token, index) => {
    const id = token.id !== undefined ? String(token.id) : `token-${index}`;
    
    return {
      tick: token.ticker,
      id,
      image: `https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.ticker}.jpg`,
      pillLabel: token.totalVolumeKAS ? `${ String(token.totalVolumeKAS)} KAS` : 'N/A',
      pillStyle: 'accent',
    };
  });

  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Recent Tokens" 
      tokens={tokenList as unknown as Token[]}
      icon={<ArrowTrendingUpIcon className="size-5 text-teal-500" />}
      legend="Volume"
    />
  );
};

export default TrendingTokens;
