"use client";

export const runtime = 'edge';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout";

export default function TransactionSearchPage() {
  const { id } = useParams(); // Get transaction ID(s) from route
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const transactionIds = Array.isArray(id) ? id : id.split(",").map((txId: string) => txId.trim());
        const response = await fetch("/api/kaspa-transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionIds }),
        });

        if (!response.ok) throw new Error("Failed to fetch transactions");

        const data = await response.json();
        setTransactions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  return (
    <Layout>
      <div className="w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
        <h1 className="text-3xl font-extrabold text-teal-500">Transaction Details</h1>

        {/* Loading & Error Handling */}
        {loading && <p className="text-gray-500 dark:text-gray-400 mt-4">Loading transactions...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* No Transaction Found */}
        {!loading && transactions.length === 0 && (
          <p className="text-red-600 text-lg font-bold mt-6">Transaction not found</p>
        )}

        {/* Display Transactions */}
        {transactions.length > 0 && (
          <div className="mt-6 space-y-6">
            {transactions.map((tx) => (
              <div key={tx.transaction_id} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
                
                {/* 2 Column Layout - Transaction Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transaction ID:</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{tx.transaction_id}</p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Subnetwork ID:</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{tx.subnetwork_id}</p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Hash:</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{tx.hash}</p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Compute Mass:</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200">{tx.mass}</p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Block Time:</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200">{new Date(tx.block_time).toLocaleString()}</p>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Accepting Block Hash:</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{tx.accepting_block_hash}</p>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Transaction Fee:</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200">0.001 KAS</p>

                    {/* Block Hashes */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Block Hashes:</h2>
                    <div className="space-y-2">
                      {tx.block_hash.map((block: string, i: number) => (
                        <p key={i} className="text-lg text-gray-800 dark:text-gray-200 break-all">{block}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inputs & Outputs Section */}
        {transactions.length > 0 && (
          <div className="mt-8">
            <h1 className="text-3xl font-extrabold text-teal-500">Transaction Inputs & Outputs</h1>
            
            {transactions.map((tx) => (
              <div key={tx.transaction_id} className="mt-6 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Inputs Section */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inputs</h2>
                    {tx.inputs.length === 0 && (
                      <p className="text-lg text-gray-500 dark:text-gray-400">No inputs</p>
                    )}
                    {tx.inputs.map((input: any, i: number) => (
                      <div key={i} className="relative border-l border-teal-400 dark:border-gray-500 pl-4 ml-3 mt-3">
                        {/* Dot */}
                        <div className="absolute -left-2.5 w-4 h-4 bg-teal-500 rounded-full border-2 border-white dark:border-gray-800"></div>

                        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Previous Transaction:</h3>
                          <p className="text-gray-900 dark:text-white break-all">{input.previous_outpoint_hash}</p>

                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">Index:</h3>
                          <p className="text-gray-900 dark:text-white">{input.previous_outpoint_index}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Outputs Section */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Outputs</h2>
                    {tx.outputs.length === 0 && (
                      <p className="text-lg text-gray-500 dark:text-gray-400">No outputs</p>
                    )}
                    {tx.outputs.map((output: any, i: number) => (
                      <div key={i} className="relative border-l border-teal-500 dark:border-teal-400 pl-4 ml-3 mt-3">
                        {/* Dot */}
                        <div className="absolute -left-2.5 w-4 h-4 bg-teal-500 rounded-full border-2 border-white dark:border-teal-800"></div>

                        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-300 dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Address:</h3>
                          <p className="text-gray-900 dark:text-white break-all">{output.script_public_key_address}</p>

                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">Amount:</h3>
                          <p className="text-gray-900 dark:text-white">{output.amount} KAS</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}
