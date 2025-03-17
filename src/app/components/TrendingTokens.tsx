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
  tokenLink?: string; // Add link capability
};

const TrendingTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/kasplex/tokens");
        const data = await response.json();
        
        if (response.ok && data.result) {
          setTokens(data.result);
        } else {
          setError("Failed to load token data");
        }
      } catch (err) {
        setError("An error occurred while fetching tokens");
        console.error("Error fetching trending tokens:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Format Unix timestamp to readable date
  function formatDate(unixTimestamp: number) {
    if (!unixTimestamp || isNaN(unixTimestamp)) {
      return "Unknown date";
    }

    const date = new Date(Number(unixTimestamp));
    if (isNaN(date.getTime())) {
      return "Unknown date";
    }

    return format(date, "MMM d, yyyy");
  }

  // Handle loading and error states
  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="rounded-full bg-neutral-200 dark:bg-neutral-700 h-5 w-5 mr-2"></div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 w-40 rounded"></div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center py-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-24 rounded mb-2"></div>
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 w-16 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 border-red-200 dark:border-red-900">
        <div className="flex items-center mb-4 text-error-500">
          <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Recent Tokens</h3>
        </div>
        <p className="text-sm text-error-500">{error}</p>
      </div>
    );
  }

  // Sort tokens by mtsAdd (newest first) before mapping
  const sortedTokens = [...tokens].sort((a, b) => b.mtsAdd - a.mtsAdd);

  // Convert tokens for the TokenList component with proper links
  const tokenList = sortedTokens.map((token, index) => {
    const id = token.id !== undefined ? String(token.id) : `token-${index}`;
    
    return {
      tick: token.tick,
      id,
      image: `https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.tick}.jpg`,
      pillLabel: formatDate(token.mtsAdd), 
      pillStyle: 'accent',
      tokenLink: `/token/${token.tick}` // Add navigation link
    };
  });

  return (
    <div className="card">
      <TokenList
        showPrice={false}
        maxItems={5}
        title="Recent Tokens"
        tokens={tokenList as unknown as Token[]} // Type assertion to fix type error
        icon={<ArrowTrendingUpIcon className="h-5 w-5 text-primary-500" />}
      />
    </div>
  );
};

export default TrendingTokens;