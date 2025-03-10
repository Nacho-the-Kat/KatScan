"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { Token } from "@/app/types/token";

const API_URL = "/api/nft/list"; // Adjust if necessary

// Define a more specific type for our formatted tokens
interface FormattedToken {
  id?: number;
  tick: string;
  name?: string;
  owner?: string;
  uri?: string;
  maxSupply?: number;
  minted?: number;
  royalty?: string;
  max?: number;
}

const TrendingTokens = () => {
  const [tokens, setTokens] = useState<FormattedToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (response.ok && data.result) {
          console.log("data recent collectiions", data);
          const formattedTokens = data.result.map((item: any) => ({
            id: item.id,
            tick: item.tick,
            name: item.tick, // Store original tick as name too
            owner: item.deployer,
            uri: `https://ipfs.io/ipfs/${item.buri}`, // Assuming 'buri' is an IPFS CID
            maxSupply: item.max,
            minted: item.minted,
            royalty: (item.royaltyFee / 1e18).toFixed(6), // Convert royalty fee to readable format
            max: item.max,
          }));

          setTokens(formattedTokens);
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

  if (loading) return <p>Loading Recent Collections...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Safely map tokens to the format expected by TokenList
  const tokenList = tokens.map((token, index) => {
    // Simple existence check before using toString()
    const id = token.id !== undefined ? String(token.id) : `recent-${index}`;
    
    return {
      tick: token.tick,
      id,
      image: `https://katapi.nachowyborski.xyz/static/krc721/thumbnails/${token.tick}/1.png`,
      change: Number(token.maxSupply),
    };
  });


  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Recent Collections"
      legend="Total Supply"
      tokens={tokenList}
      icon={<ArrowTrendingUpIcon className="size-5 text-teal-500" />}
    />
  );
};

export default TrendingTokens;
