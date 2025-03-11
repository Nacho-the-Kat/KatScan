"use client";

export const runtime = 'edge';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout";

export default function TransactionSearchPage() {
  const { id } = useParams(); // Get transaction ID(s) from route
  const [blockData, setBlockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlockData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/kaspa-blocks/${id}`);

        if (!response.ok) throw new Error("Failed to fetch block data");

        const data = await response.json();
        setBlockData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockData();
  }, [id]);

  return (
    <Layout>
      <div className="w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
        <h1 className="text-3xl font-extrabold text-teal-500">Block Details</h1>

        {/* Loading & Error Handling */}
        {loading && <p className="text-gray-500 dark:text-gray-400 mt-4">Loading block data...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* No Block Found */}
        {!loading && !blockData && (
          <p className="text-red-600 text-lg font-bold mt-6">Block not found</p>
        )}

        {/* Display Block Data */}
        {blockData && (
          <div className="mt-6 space-y-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              {/* 2 Column Layout - Block Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Block Hash:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{blockData.verboseData.hash}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Merkle Root:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{blockData.header.hashMerkleRoot}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">UTXO Commitment:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{blockData.header.utxoCommitment}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Timestamp:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{new Date(Number(blockData.header.timestamp)).toLocaleString()}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Difficulty:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{blockData.verboseData.difficulty}</p>
                </div>

                {/* Right Column */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Selected Parent Hash:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{blockData.verboseData.selectedParentHash}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Blue Score:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{blockData.verboseData.blueScore}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Pruning Point:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{blockData.header.pruningPoint}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Nonce:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{blockData.header.nonce}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Miner Address:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{blockData.extra.minerAddress}</p>
                </div>
              </div>

              {/* Parents Section (Only First Set) */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Parent Hashes (First Set):</h2>
                <div className="space-y-2">
                  {blockData.header.parents?.[0]?.parentHashes?.map((parentHash: string, index: number) => (
                    <p key={index} className="text-lg text-gray-800 dark:text-gray-200 break-all">{parentHash}</p>
                  )) || <p className="text-lg text-gray-500 dark:text-gray-400">No parent hashes available</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Section */}
        {blockData?.verboseData?.transactionIds?.length > 0 && (
          <div className="mt-8">
            <h1 className="text-3xl font-extrabold text-teal-500">Transaction IDs</h1>
            <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              {blockData.verboseData.transactionIds.map((txId: string, index: number) => (
                <p key={index} className="text-lg text-gray-800 dark:text-gray-200 break-all">{txId}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
