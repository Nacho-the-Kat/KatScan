"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout";
import { IdentificationIcon } from "@heroicons/react/16/solid";

export default function AddressDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!IdentificationIcon) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/kaspa-address/${id}`);
        if (!response.ok) throw new Error("Failed to fetch address details");

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
        <h1 className="text-3xl font-extrabold text-teal-500">Kaspa Address Details</h1>

        {/* Loading & Error Handling */}
        {loading && <p className="text-gray-500 dark:text-gray-400 mt-4">Loading data...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* No Data */}
        {!loading && !data && (
          <p className="text-red-600 text-lg font-bold mt-6">No data found for this address</p>
        )}

        {/* Display Address Info */}
        {data && (
          <div className="mt-6 space-y-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              {/* Address Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Address:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-all">{data.address}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Name:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{data.name || "N/A"}</p>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Total Transactions:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{data.totalTransactions}</p>
                </div>

                {/* Right Column */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Balance:</h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{(data.balance / 1e12).toFixed(6)} KAS</p>
                </div>
              </div>
            </div>

            {/* Transactions Section */}
            {data.transactions.length > 0 && (
              <div className="mt-8">
                <h1 className="text-3xl font-extrabold text-teal-500">Recent Transactions</h1>
                <div className="mt-6 space-y-4">
                  {data.transactions.map((tx: any, index: number) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Transaction ID:</h2>
                      <p className="text-gray-800 dark:text-gray-200 break-all">{tx.transaction_id}</p>

                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-2">Hash:</h2>
                      <p className="text-gray-800 dark:text-gray-200 break-all">{tx.hash}</p>

                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-2">Block Time:</h2>
                      <p className="text-gray-800 dark:text-gray-200">
                        {new Date(tx.block_time).toLocaleString()}
                      </p>

                      {/* Outputs */}
                      {tx.outputs.length > 0 && (
                        <div className="mt-4">
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Outputs:</h2>
                          {tx.outputs.map((output: any, i: number) => (
                            <div key={i} className="bg-gray-200 dark:bg-gray-800 p-3 rounded-md mt-2">
                              <p className="text-gray-900 dark:text-white">
                                <span className="font-semibold">Amount:</span> {(output.amount / 1e12).toFixed(6)} KAS
                              </p>
                              <p className="text-gray-900 dark:text-white break-all">
                                <span className="font-semibold">Address:</span> {output.script_public_key_address}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
