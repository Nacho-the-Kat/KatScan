"use client";

export const runtime = 'edge';

import { useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import { useNFTContext } from "@/app/context/NFTContext";
import { useEffect, useState } from "react";

export default function NFTDetailPage() {
  const { selectedNFT, collectionInfo } = useNFTContext();
  const router = useRouter();
  const [nft, setNFT] = useState(selectedNFT);
  const [collection, setCollection] = useState(collectionInfo);

  useEffect(() => {
    if (!selectedNFT) {
      const storedNFT = localStorage.getItem("selectedNFT");
      const storedCollection = localStorage.getItem("collectionInfo");

      if (storedNFT) setNFT(JSON.parse(storedNFT));
      if (storedCollection) setCollection(JSON.parse(storedCollection));
    }
  }, [selectedNFT]);

  if (!nft) {
    router.back();
    return null;
  }

  const formatImageUrl = (imagePath: string): string => {
    if (!imagePath || !collection?.tick) return '';
    
    // Extract just the filename from the path
    const filename = imagePath.split("/").pop();
    if (!filename) return '';
    
    // Return the sized URL - this should match the expected path structure
    return `https://katapi.nachowyborski.xyz/static/krc721/sized/${collection.tick}/${filename}`;
  };

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    
    // If the sized image fails, try the thumbnail version
    if (img.src.includes('/sized/')) {
      const filename = img.src.split('/').pop();
      if (filename && collection?.tick) {
        img.src = `https://katapi.nachowyborski.xyz/static/krc721/thumbnails/${collection.tick}/${filename}`;
      }
    }
  };

  return (
    <Layout>
      <div className="w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">NFT: {nft?.name}</h1>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <Image
                src={formatImageUrl(nft?.image || '')}
                alt={nft?.name || ''}
                width={600}
                height={600}
                className="rounded-md w-full h-auto"
                onError={handleImageError}
                unoptimized // Allow direct URL usage without Next.js image optimization
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Collection: {collection?.tick}</h2>

            {collection && (
              <div className="text-gray-700 dark:text-gray-300">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">Attributes</h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Trait</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nft?.attributes.map((attr, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{attr.trait_type}</td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{attr.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex mb-4 mt-8">
                  <span className="font-semibold">State:</span>
                  <span className="px-3 ml-4 py-1 rounded-full bg-blue-500 text-white text-xs uppercase">
                    {collection.state.charAt(0).toUpperCase() + collection.state.slice(1)}
                  </span>
                </div>
                <p>
                  <span className="font-semibold">Deployer:</span> {collection.deployer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
