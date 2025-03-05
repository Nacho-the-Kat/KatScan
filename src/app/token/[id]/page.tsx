"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";
import { Tab } from "@headlessui/react";
import {
  Avatar,
  Pill,
  ProgressBar,
} from "../../../../packages/kat-library/dist/index";

import {
  calculateValue,
  formatNumberWithWords,
  formatPreMinted,
} from "../../utils/utils";
// AffiliateComponent is not available in the distributed package
// import AffiliateComponent from "../../../packages/kat-library/dist/index"; 
import { useParams } from "next/navigation";
import TopHoldersTable from "@/app/components/TopHoldersTable";
import RecentOperationsTable from "@/app/components/RecentOperationsTable";
import HolderDistributionTable from "@/app/components/HolderDistributionTable";
import Image from "next/image";


interface TokenData {
  id: number;
  tick: string;
  max: number;
  lim: number;
  pre: number;
  mtsAdd: number;
  minted: number;
  holderTotal: number;
  mintTotal: number;
  transferTotal: number;
  dec: number;
  state: string;
  to: string;
  logo: string;
  socials: string;
}

const formatDate = (timestamp: number): string => {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};


export default function Home() {
  const { id } = useParams(); // ✅ Get the ID from the URL params

  const [token, setToken] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!id) return; // ✅ Prevent fetching when ID is undefined

    const fetchTokenData = async () => {
      try {
        const response = await fetch(`/api/token/${id}`);
        if (!response.ok) throw new Error("Failed to fetch token data");
        const jsonData = await response.json();
        setToken(jsonData.result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [id]); 

  // // Pagination Logic
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prev) => prev - 1);
  //   }
  // };

  // const columns: ColumnDef<Token, unknown>[] = [
  //   {
  //     accessorKey: "avatar",
  //     header: "",
  //     cell: ({ row }) => (
  //       <Avatar
  //         imageUrl={`https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${row.original.logo}`}
  //       />
  //     ),
  //   },
  //   {
  //     accessorKey: "ticker",
  //     header: "Ticker",
  //     cell: ({ row }) => (
  //       <div className="flex items-center gap-2">
  //         {/* <Fav /> */}
  //         <Link href={`/token/${row.original.id}`}>{row.original.tick}</Link>
  //       </div>
  //     ),
  //   },
  //   {
  //     accessorKey: "launchType",
  //     header: "Launch Type",
  //     cell: ({ row }) => {
  //       console.log("row.original.state", row.original);
  //       return (
  //         <Pill
  //           label={row.original.pre === 0 ? "Fair Mint" : "Pre-Mint"}
  //           color={row.original.pre === 0 ? "accent" : "dark"}
  //         />
  //       );
  //     },
  //   },
  //   {
  //     accessorKey: "state",
  //     header: "Status",
  //   },
  //   {
  //     accessorKey: "max",
  //     header: "Max Supply",
  //     cell: ({ row }) =>
  //       formatNumberWithWords(row.original.max, row.original.dec),
  //   },
  //   {
  //     accessorKey: "pre",
  //     header: "Pre-Minted",
  //     cell: ({ row }) =>
  //       formatPreMinted(row.original.pre, row.original.max, row.original.dec),
  //   },
  //   {
  //     accessorKey: "minted",
  //     header: "Total Minted",
  //     cell: ({ row }) =>
  //       formatNumberWithWords(row.original.max, row.original.dec),
  //   },
  //   {
  //     accessorKey: "mintingProgress",
  //     header: "Minting Progress",
  //     cell: ({ row }) => {
  //       const percentage =
  //         (calculateValue(row.original.minted, row.original.dec) /
  //           calculateValue(row.original.max, row.original.dec)) *
  //         100;
  //       const formattedPercentage =
  //         percentage < 1 && percentage > 0 ? "<1" : Math.round(percentage);

  //       return (
  //         <div className="flex items-center gap-2">
  //           <ProgressBar value={Number(formattedPercentage)} />
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     accessorKey: "mtsAdd",
  //     header: "Deployed On",
  //     cell: ({ row }) => <>{formatDate(row.original.mtsAdd)}</>,
  //   },
  // ];

  return (
    <Layout>
      <div className="space-y-8">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && token && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full flex h-full px-4 items-center justify-center col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out  ">
                <div className="w-4/12 flex items-center gap-4">
                  {/* Avatar aligned to the left */}
                  <Avatar
                    imageUrl={`https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.logo}`}
                  />
                  <h1 className="text-teal-400 text-xl font-bold whitespace-nowrap">
                   {token.tick}
                  </h1>
                </div>

                {/* Table container centered and taking 80% height */}
                <div className="flex justify-center items-center w-full h-full">
                  <table className="w-4/5 border-collapse text-left">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                          Price
                        </td>
                        <td className="px-4 py-3 text-gray-500">$X</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                          Market Cap
                        </td>
                        <td className="px-4 py-3 text-gray-500">$X</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                          Volume
                        </td>
                        <td className="px-4 py-3 text-gray-500">$X</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                          Total Minted
                        </td>
                        <td className="px-4 py-3 text-gray-500">$X</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Second child: Existing Stats Grid */}
              <div className="grid grid-cols-3 gap-4 col-span-1">
                <div className="py-4 flex items-center flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out">
                  <h1 className="text-teal-400 text-xl">Max Supply</h1>
                  <p>{ formatNumberWithWords(token.max, token.dec)}</p>
                </div>
                <div className="py-4 flex items-center flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out">
                  <h1 className="text-teal-400 text-xl">Total Minted</h1>
                  <p>{ formatNumberWithWords(token.max, token.dec)}</p>
                </div>
                <div className="py-4 flex items-center flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out text-center">
                  <h1 className="text-teal-400 text-xl">Limit per Mint</h1>
                  <p>{formatNumberWithWords(token.lim, token.dec)}</p>
                </div>
                <div className="py-4 flex items-center flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out text-right">
                  <h1 className="text-teal-400 text-xl">Total Mints</h1>
                  <p>{token.mintTotal}</p>
                </div>
                <div className="py-4 flex items-center flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out text-right">
                  <h1 className="text-teal-400 text-xl">Total Holders</h1>
                  <p>{token.holderTotal}</p>
                </div>
                <div className="py-4 flex items-center flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out text-right">
                  <h1 className="text-teal-400 text-xl">Total Transfers</h1>
                  <p>{token.transferTotal}</p>
                </div>
              </div>
            </div>

            <div className="block mt-6">
            <div className="grid grid-cols-12 gap-4">
              {/* Token Details (4/12) */}
              <div className="col-span-12 md:col-span-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-teal-500 dark:text-teal-500">Token Details</h2>
                <p className="text-gray-500  pb-4 mb-12 border-b border-gray-500">Additional Details for {token.tick}.</p>
                <div className="mb-8">
                  <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">Deployed On:</h3>
                  <p className="text-gray-400 mt-2 pb-8 mb-4 border-b border-teal-500">{formatDate(token.mtsAdd)}</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">Total Minted:</h3>
                  <p className="text-gray-400 mt-2 pb-8 mb-4 border-b border-teal-500">
                  <ProgressBar
                      hidePercentage={true}
                      value={
                        Number(  Math.round(calculateValue(token.minted, token.dec) / calculateValue(token.max, token.dec) * 100))
                      }
                    />
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">Pre-Minted:</h3>
                  <p className="text-gray-400  mt-2 pb-8 mb-4 border-b border-teal-500">
                    {formatPreMinted(token.pre, token.max, token.dec)}
                  </p>
                </div>
                <div className="mb-8">
                  <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">Launch Type:</h3>
                  <p className="text-gray-400 mt-2 pb-8 mb-4 border-b border-teal-500">
                  <Pill
                    label={token.pre === 0 ? "Fair Mint" : "Pre-Mint"}
                    color={token.pre === 0 ? "accent" : "dark"}
                  />
                  </p>
                </div>
                <div>
                  <Image 
                    src="/nft.png" 
                    alt="Nacho KatScan" 
                    width={300}
                    height={150}
                    className="w-full rounded-md" 
                  />
                </div>
              </div>

              {/* Tabs (8/12) */}
              <div className="col-span-12 md:col-span-8 bg-white dark:bg-gray-800 p-4 rounded-lg">
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                        <div className="relative">
                          {/* Regular bottom border */}
                          <div className="absolute bottom-0 left-0 w-full"></div>
                
                          <Tab.List className="flex relative z-10">
                            {['Top Holders', 'Recent Operations', 'Holder Distribution'].map((tab, index) => (
                              <Tab
                                key={index}
                                className={({ selected }) =>
                                  `px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none relative
                                  ${
                                    selected
                                      ? "text-teal-500"
                                      : "text-gray-700 dark:text-gray-400 hover:text-teal-400"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <div className="relative">
                                    {tab}
                                    {/* Selected indicator (thicker and positioned above the default border) */}
                                    {selected && (
                                      <div className="absolute left-0 right-0  border-b-4 border-teal-400"></div>
                                    )}
                                  </div>
                                )}
                              </Tab>
                            ))}
                          </Tab.List>
                        </div>
                
                        {/* Tab Panels (No Wrapper) */}
                        <Tab.Panels>
                         
                            <Tab.Panel className="pt-4 pl-4">
                              <TopHoldersTable />
                            </Tab.Panel>
                            <Tab.Panel className="pt-4 pl-4">
                              <RecentOperationsTable />
                            </Tab.Panel>
                            <Tab.Panel className="pt-4 pl-4">
                              <HolderDistributionTable />
                            </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
              </div>
            </div>
          </div>

            {/* Pagination Controls */}
            {/* <div className="flex justify-between items-center mt-4">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <p className="text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div> */}
          </>
        )}
      </div>
    </Layout>
  );
}
