"use client";
import { useEffect, useState } from "react";
import { TokenList } from "../../../packages/kat-library/dist/index";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Token } from "@/app/types/token";

const MintTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`/api/mint-totals`);
        const data = await response.json();
        console.log('response1', data);
        console.log('response type:', typeof data, Array.isArray(data)); 
        if (response.ok) {
          setTokens(data);
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

  if (loading) return <p>Loading Mint Totals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <TokenList
      showPrice={false}
      maxItems={5}
      title="Mint Totals"
      tokens={tokens}  
      icon={<ChartPieIcon className="size-5 text-teal-500" />}
    />
  );
};

export default MintTokens;
