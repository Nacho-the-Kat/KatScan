"use client";

import React, { FC, useState } from "react";
import { Menu } from "../../../packages/kat-library/dist/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "../../../packages/kat-library/dist/index";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const menuOptions = [
    { label: "Home", href: "/" },
    {
      label: "Tokens",
      children: [
        { label: "All Tokens", href: "/scan" },
        { label: "Heatmap", href: "/heatmap" },
        { label: "Compare Tokens", href: "/compare" },
      ],
    },
    {
      label: "NFTs",
      href: "/nft"
    },
  ];

  const identifyKaspaType = (input: string) => {
    const txOrBlockRegex = /^[a-f0-9]{64}$/i; // 64-char hex (TxID or Block)
    const kaspaAddressRegex = /^kaspa:[a-z0-9]{50,}$/; // Bech32 format
    const nftPattern = /OP_RETURN|NFT|metadata/i; // Possible NFT identifiers

    if (kaspaAddressRegex.test(input)) {
      return "address";
    } else if (txOrBlockRegex.test(input)) {
      return "tx_or_block";
    } else if (nftPattern.test(input)) {
      return "nft";
    } else {
      return "unknown";
    }
  };

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const searchType = identifyKaspaType(trimmedQuery);

    if (searchType === "address") {
      router.push(`/search/address/${trimmedQuery}`);
    } else if (searchType === "nft") {
      router.push(`/search/nft/${trimmedQuery}`);
    } else if (searchType === "tx_or_block") {
      try {
        const txResponse = await fetch(`https://api.kaspa.org/transactions/${trimmedQuery}`);
        if (txResponse.ok) {
          router.push(`/search/txn/${trimmedQuery}`);
          return;
        }

        const blockResponse = await fetch(`https://api.kaspa.org/blocks/${trimmedQuery}`);
        if (blockResponse.ok) {
          router.push(`/search/block/${trimmedQuery}`);
          return;
        }

        alert("Invalid Transaction ID or Block Hash.");
      } catch (error) {
        alert("Error searching. Please try again.");
      }
    } else {
      alert("Invalid search input.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="transition-opacity hover:opacity-80">
                <Image 
                  src="/katscan_new_logo.png" 
                  alt="KatScan Logo" 
                  width={150} 
                  height={38} 
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>
            <div className="z-20">
              <Menu items={menuOptions} />
            </div>
          </div>
        </div>
      </header>

      {/* Search Section - Separated from main content for visual distinction */}
      <div className="w-full bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Search
            showHint={true}
            placeholder="Address / Transaction ID / Block ID / Token"
            onSearch={handleSearch}
            onChange={(value: string) => setSearchQuery(value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-6 sm:py-8 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Made with <span className="text-primary-500">❤️</span> by Nacho & the 𐤊at Community
            </p>
            <div className="flex items-center space-x-4 text-sm text-neutral-400 dark:text-neutral-500">
              <Link href="/" className="hover:text-primary-500 transition-colors">
                Home
              </Link>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <Link href="/scan" className="hover:text-primary-500 transition-colors">
                Explorer
              </Link>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <Link href="/nft" className="hover:text-primary-500 transition-colors">
                NFTs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
