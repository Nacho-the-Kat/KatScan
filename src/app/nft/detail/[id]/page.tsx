"use client";

export const runtime = 'edge';

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";
import NFTFilter from "@/app/components/NFTFilter";
import Image from "next/image";
import { useNFTContext } from "@/app/context/NFTContext"; // ✅ Added NFT context import
import "./flip.css";
import { formatNumberWithWords, formatInteger } from "../../../utils/utils";

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

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasMorePages: boolean;
}

export default function NFTCollectionPage() {
  const { id: ticker } = useParams();
  const { setSelectedNFT, setCollectionInfo } = useNFTContext();
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [tickInfo, setTickInfo] = useState<TickInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const currentFiltersRef = useRef(filters);

  const fetchNFTs = useCallback(async (page = 1, append = false) => {
    if (!ticker) return;
    
    try {
      setLoadingMore(append);
      if (!append) setLoading(true);
      
      // Construct URL with filter parameters
      let url = `/api/nft/tick/${ticker}?page=${page}`;
      
      // Use currentFiltersRef.current instead of filters from closure
      Object.entries(currentFiltersRef.current).forEach(([trait, value]) => {
        if (value) {
          url += `&${encodeURIComponent(trait)}=${encodeURIComponent(value)}`;
        }
      });
      
      console.log(`Fetching NFTs: ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) throw new Error("Failed to fetch NFT data");
      
      const jsonData = await response.json();
      
      if (append) {
        setNfts(prev => [...prev, ...jsonData.entries]);
      } else {
        setNfts(jsonData.entries);
      }
      
      setTickInfo(jsonData.tickInfo);
      setPagination(jsonData.pagination);
      setCollectionInfo(jsonData.tickInfo);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [ticker, setCollectionInfo]);

  // Update currentFiltersRef when filters change
  useEffect(() => {
    currentFiltersRef.current = filters;
  }, [filters]);

  // Initial load
  useEffect(() => {
    if (ticker) {
      fetchNFTs(1, false);
    }
  }, [ticker, fetchNFTs]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };
    
    const currentObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && pagination?.hasMorePages && !loadingMore && !loading) {
        fetchNFTs(pagination.currentPage + 1, true);
      }
    }, options);
    
    currentObserver.observe(loadMoreRef.current);
    
    return () => {
      if (loadMoreRef.current) {
        currentObserver.unobserve(loadMoreRef.current);
      }
      currentObserver.disconnect();
    };
  }, [pagination?.currentPage, pagination?.hasMorePages, loadingMore, loading, fetchNFTs]);

  const formatImageUrl = (imagePath: string): string => {
    const parts = imagePath.split("/");
    const filename = parts.pop();
    return filename ? `https://katapi.nachowyborski.xyz/static/krc721/thumbnails/${ticker}/${filename}` : "";
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
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [trait]: value,
      };
      
      // If value is empty, remove the filter
      if (!value) {
        delete newFilters[trait];
      }
      
      // Update currentFiltersRef immediately
      currentFiltersRef.current = newFilters;
      
      // Reset and fetch with new filters
      setTimeout(() => fetchNFTs(1, false), 0);
      return newFilters;
    });
  };

  const filteredNFTs = nfts;

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2 mt-8">
          <NFTFilter traits={uniqueTraits} onFilterChange={handleFilterChange} />
        </div>

        <div className="col-span-12 md:col-span-10">
          {loading && !loadingMore && <p className="text-gray-500">Loading NFTs...</p>}
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
                        <span className="font-semibold">Royalty Fee:</span> {formatNumberWithWords(tickInfo.royaltyFee, 8)}
                      </li>
                      {pagination && (
                        <li className="flex justify-between mt-2">
                          <span className="font-semibold">Showing:</span> {nfts.length} of {pagination.totalItems} NFTs
                        </li>
                      )}
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

              {/* Load more indicator */}
              <div ref={loadMoreRef} className="mt-8 mb-8 flex justify-center">
                {loadingMore && (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-gray-500 mt-2">Loading more NFTs...</p>
                  </div>
                )}
                {!loadingMore && pagination && pagination.hasMorePages && (
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => fetchNFTs(pagination.currentPage + 1, true)}
                  >
                    Load More
                  </button>
                )}
                {!loadingMore && pagination && !pagination.hasMorePages && nfts.length > 0 && (
                  <p className="text-gray-500">End of collection - Showing {nfts.length} of {pagination.totalItems} NFTs</p>
                )}
              </div>
            </>
          )}

          {!loading && !error && filteredNFTs.length === 0 && (
            <div className="mt-8 text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">No NFTs Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your filters to see more results.</p>
              {Object.keys(filters).length > 0 && (
                <button
                  onClick={() => {
                    setFilters({});
                    fetchNFTs(1, false);
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
