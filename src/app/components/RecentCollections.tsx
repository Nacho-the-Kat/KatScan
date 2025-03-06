"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Token } from "@/app/types/token";

const API_URL = "/api/nft/list"; // Adjust if necessary

const TrendingTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (response.ok && data.result) {
          const formattedTokens = data.result.map((item: any) => ({
            id: item.id,
            name: item.tick, // Assuming 'tick' is the NFT collection name
            owner: item.deployer,
            uri: `https://ipfs.io/ipfs/${item.buri}`, // Assuming 'buri' is an IPFS CID
            maxSupply: item.max,
            minted: item.minted,
            royalty: (item.royaltyFee / 1e18).toFixed(6), // Convert royalty fee to readable format
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

  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Recent Collections"
      tokens={tokens.map(token => ({
        ...token,
        id: token.id.toString()
      }))}
      icon={<RocketLaunchIcon className="size-5 text-teal-500" />}
    />
  );
};

export default TrendingTokens;
