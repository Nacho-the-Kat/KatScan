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
  
  // Use refs for stable references
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const currentFiltersRef = useRef(filters);
  const initialLoadCompletedRef = useRef(false);
  const fetchingRef = useRef(false);
  const tickerRef = useRef(ticker);
  
  // Store fetchNFTs in a ref to keep it stable across renders
  const fetchNFTsRef = useRef(async (page = 1, append = false) => {
    if (!tickerRef.current || fetchingRef.current) return;
    
    console.log(`Starting fetch for page ${page}, append: ${append}`);
    fetchingRef.current = true;
    
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      // Construct URL with filter parameters
      let url = `/api/nft/tick/${tickerRef.current}?page=${page}`;
      
      // Use currentFiltersRef.current to access the latest filters
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
      
      if (!append) {
        initialLoadCompletedRef.current = true;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      fetchingRef.current = false;
    }
  });
  
  // Update refs when dependencies change
  useEffect(() => {
    currentFiltersRef.current = filters;
  }, [filters]);
  
  useEffect(() => {
    tickerRef.current = ticker;
  }, [ticker]);
  
  // Initial load
  useEffect(() => {
    if (ticker && !initialLoadCompletedRef.current && !fetchingRef.current) {
      console.log("Executing initial load");
      fetchNFTsRef.current(1, false);
    }
  }, [ticker]);
  
  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !pagination?.hasMorePages || fetchingRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && pagination?.hasMorePages && !loadingMore && !loading && !fetchingRef.current) {
        console.log(`Intersection observed, loading page ${pagination.currentPage + 1}`);
        fetchNFTsRef.current(pagination.currentPage + 1, true);
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(loadMoreRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [pagination?.hasMorePages, pagination?.currentPage, loading, loadingMore]);
  
  const formatImageUrl = (imagePath: string): string => {
    // Extract just the filename from the path
    const filename = imagePath.split("/").pop();
    if (!filename) return '';
    
    // Try with sized directory for thumbnails
    return `https://katapi.nachowyborski.xyz/static/krc721/sized/${ticker}/${filename}`;
  };
  
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    // If the sized image fails, try the thumbnail version
    if (img.src.includes('/sized/')) {
      const filename = img.src.split('/').pop();
      if (filename && ticker) {
        img.src = `https://katapi.nachowyborski.xyz/static/krc721/thumbnails/${ticker}/${filename}`;
      }
    }
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
    if (fetchingRef.current) return;
    
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      
      if (value) {
        newFilters[trait] = value;
      } else {
        delete newFilters[trait];
      }
      
      // Update ref immediately
      currentFiltersRef.current = newFilters;
      
      // Reset the initial load flag
      initialLoadCompletedRef.current = false;
      
      // Schedule fetch after state update
      requestAnimationFrame(() => {
        fetchNFTsRef.current(1, false);
      });
      
      return newFilters;
    });
  };
  
  const handleLoadMoreClick = () => {
    if (pagination && !fetchingRef.current && !loadingMore) {
      fetchNFTsRef.current(pagination.currentPage + 1, true);
    }
  };
  
  const filteredNFTs = nfts;
  
  return (
    <Layout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2 mt-8">
          <NFTFilter traits={uniqueTraits} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="col-span-12 md:col-span-10">
          {loading && !loadingMore && <p className="text-gray-500">Loading NFTs...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {!loading && !error && filteredNFTs.length > 0 && (
            <>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8 flex flex-wrap justify-between items-start">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {ticker} NFT Collection
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {nfts[0]?.description || "No description available"}
                  </p>
                </div>
                
                {tickInfo && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-md text-sm w-full md:w-auto">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Collection Details
                    </h2>
                    
                    <div className="mb-2">
                      <span className="font-semibold block">Deployer:</span>
                      <span className="text-gray-700 dark:text-gray-300 text-xs break-all">{tickInfo.deployer}</span>
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
              
              <div className="grid grid-flow-row auto-rows-auto gap-6 mt-6"
                   style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                   }}>
                {filteredNFTs.map((nft) => (
                  <div
                    key={nft.id}
                    className="nft-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer transition-transform hover:shadow-lg hover:-translate-y-1"
                    onClick={() => {
                      setSelectedNFT(nft);
                      router.push(`/nft/detail/${ticker}/${nft.id}`);
                    }}
                  >
                    <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <div className="w-full pt-[100%] relative">
                        <Image
                          src={formatImageUrl(nft.image)}
                          alt={nft.name}
                          fill
                          className="absolute inset-0 w-full h-full object-contain"
                          onError={handleImageError}
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <h2 className="text-center text-base font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {nft.name}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
              
              <div ref={loadMoreRef} className="mt-8 mb-8 flex justify-center">
                {loadingMore && (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-gray-500 mt-2">Loading more NFTs...</p>
                  </div>
                )}
                {!loadingMore && pagination && pagination.hasMorePages && (
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    onClick={handleLoadMoreClick}
                    disabled={fetchingRef.current}
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
                    currentFiltersRef.current = {};
                    initialLoadCompletedRef.current = false;
                    requestAnimationFrame(() => {
                      fetchNFTsRef.current(1, false);
                    });
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
