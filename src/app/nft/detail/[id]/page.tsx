"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";
import NFTFilter from "@/app/components/NFTFilter";
import Image from "next/image";
import { useNFTContext } from "@/app/context/NFTContext"; // ✅ Added NFT context import
import "./flip.css";

interface NFT {
  id: number;
  fkCollection: number;
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

interface TickInfo {
  id: number;
  tick: string;
  deployer: string;
  buri: string;
  txIdRev: string;
  state: string;
  max: number;
  minted: number;
  premint: number;
  daaMintStart: number;
  mtsAdd: number;
  opScoreAdd: number;
  opScoreMod: number;
  royaltyFee: number;
  completed: boolean;
}

export default function NFTCollectionPage() {
  const { id: ticker } = useParams();
  const { setSelectedNFT, setCollectionInfo } = useNFTContext(); // ✅ Now using NFT context
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [tickInfo, setTickInfo] = useState<TickInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!ticker) return;

    const fetchNFTs = async () => {
      try {
        const response = await fetch(`/api/nft/tick/${ticker}`);
        if (!response.ok) throw new Error("Failed to fetch NFT data");

        const jsonData = await response.json();
        setNfts(jsonData.entries);
        setTickInfo(jsonData.tickInfo);
        setCollectionInfo(jsonData.tickInfo); // ✅ Store tickInfo in context
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [ticker]);

  const formatImageUrl = (imagePath: string): string => {
    const parts = imagePath.split("/");
    const filename = parts.pop();
    return filename ? `https://katapi.nachowyborski.xyz/static/krc721/thumbnails/${ticker}/${filename}` : "";
  };

  const formatNumber = (value: number): string => {
    return value.toLocaleString("en-US") + " KASP";
  };

  const getUniqueTraits = () => {
    const traitsMap: { [key: string]: Set<string> } = {};

    nfts.forEach((nft) => {
      nft.attributes.forEach(({ trait_type, value }) => {
        if (!traitsMap[trait_type]) {
          traitsMap[trait_type] = new Set();
        }
        traitsMap[trait_type].add(value);
      });
    });

    return Object.fromEntries(Object.entries(traitsMap).map(([key, values]) => [key, Array.from(values)]));
  };

  const uniqueTraits = getUniqueTraits();

  const handleFilterChange = (trait: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [trait]: value,
    }));
  };

  const filteredNFTs = nfts.filter((nft) =>
    nft.attributes.every(
      ({ trait_type, value }) =>
        !filters[trait_type] || filters[trait_type] === value
    )
  );

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2 mt-8">
          <NFTFilter traits={uniqueTraits} onFilterChange={handleFilterChange} />
        </div>

        <div className="col-span-12 md:col-span-10">
          {loading && <p className="text-gray-500">Loading NFTs...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && filteredNFTs.length > 0 && (
            <>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8 flex flex-wrap justify-between items-start">
                <div className="w-1/2">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {ticker} NFT Collection
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {nfts[0]?.description || "No description available"}
                  </p>
                </div>

                {tickInfo && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-md text-sm w-full md:w-auto mt-4 md:mt-0 w-1/2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Collection Details
                    </h2>

                    <div className="mb-2">
                      <span className="font-semibold block">Deployer:</span>
                      <span className="text-gray-700 dark:text-gray-300">{tickInfo.deployer}</span>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">State:</span>
                      <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs uppercase">
                        {tickInfo.state.charAt(0).toUpperCase() + tickInfo.state.slice(1)}
                      </span>
                    </div>

                    <ul className="text-gray-700 dark:text-gray-300">
                      <li className="flex justify-between">
                        <span className="font-semibold">Max Supply:</span> {tickInfo.max.toLocaleString("en-US")}
                      </li>
                      <li className="flex justify-between">
                        <span className="font-semibold">Minted:</span> {tickInfo.minted.toLocaleString("en-US")}
                      </li>
                      <li className="flex justify-between">
                        <span className="font-semibold">Royalty Fee:</span> {formatNumber(tickInfo.royaltyFee)}
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                {filteredNFTs.map((nft) => (
                  <div
                    key={nft.id}
                    className="nft-card bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedNFT(nft);
                      router.push(`/nft/detail/${ticker}/${nft.id}`);
                    }}
                  >
                    <Image
                      src={formatImageUrl(nft.image)}
                      alt={nft.name}
                      width={250}
                      height={250}
                      className="rounded-md w-full h-auto object-cover"
                    />
                    <h2 className="text-center mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {nft.name}
                    </h2>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
