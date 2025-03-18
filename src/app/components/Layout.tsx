"use client";

import React, { FC, useState } from "react";
import { Menu, Search } from "./index";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Header */}
      <header className="flex bg-white dark:bg-gray-800 shadow-md">
        <div className="flex-grow flex justify-center items-center">
          <div className="w-full px-4 sm:w-11/12">
            <div className="flex flex-row justify-between items-center py-4">
              <div className="flex items-center">
                <Link href={"/"}>
                  <Image src="/katscan_new_logo.png" alt="KatScan Logo" width={180} height={45} />
                </Link>
              </div>
              <div className="z-9">
                <Menu items={menuOptions} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start py-4 sm:py-8">
        <div className="w-full px-4 sm:w-11/12">
          <div className="block w-full">
            <Search
              showHint={true}
              placeholder="Address / Transaction ID / Block ID / Token"
              onSearch={handleSearch}
              onChange={(value: string) => setSearchQuery(value)} // Capture input changes
              onKeyDown={handleKeyDown} // Trigger search on Enter key
            />
          </div>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-white dark:bg-slate-800">
        <p className="text-center text-gray-400 dark:text-white">
          Made with ❤️ by Nacho & the 𐤊at Community
        </p>
      </footer>
    </div>
  );
};

export default Layout;
