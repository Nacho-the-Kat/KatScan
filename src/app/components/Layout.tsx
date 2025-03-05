// components/Layout.tsx
"use client";

import React, { FC } from "react";
import { Menu } from "../../../packages/kat-library/dist/index";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const menuOptions = [
    { label: "Home", href: "/" },
    { label: "Scan", href: "/scan" },
    { label: "Mint Heatmap", href: "/heatmap" },
    { label: "Announcements", href: "/announcements" },
    // {
    //   label: "Explore KRC-20",
    //   children: [
    //     { label: "Search Transactions", href: "#" },
    //     { label: "Search Addresses", href: "#" },
    //     { label: "Top Holders", href: "/top-holders" },
    //   ],
    // },
    // {
    //   label: "Analyze KRC-20",
    //   children: [
    //     { label: "All Tokens", href: "#" },
    //     { label: "Side by side", href: "#" },
    //     { label: "Mint Heatmap", href: "#" },
    //     { label: "MarketCap Cal", href: "#" },
    //   ],
    // },
    // {
    //   label: "Tools",
    //   children: [
    //     { label: "Trade on KSPR", href: "#" },
    //     { label: "Mint and Deploy", href: "#" },
    //     { label: "Announcements", href: "#" },
    //   ],
    // },
  ];

  return (
    <div className="flex flex-col min-h-screen  bg-gray-100 dark:bg-slate-900">
      {/* Header full width */}
      <header className="flex bg-white dark:bg-slate-800 dark:bg-gray-800 shadow-md">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-8/12">
        <div className="flex-grow flex justify-between items-center">
          <div >
            <Link href={'/'}>
            <img
              src="/katscan_new_logo.png"
              alt="Nacho KatScan"
              width={200}
              height={50}
            />
            </Link>
          </div>
          <div>
            <Menu items={menuOptions} />
          </div>
        </div>
        </div>
        </div>
      </header>

      {/* Main content centrado, contenedor 8/12 */}
      <main className="flex-grow flex justify-center items-start py-8">
        <div className="w-8/12">
          {children}          
        </div>
      </main>

      {/* Sticky footer full width */}
      <footer className="w-full p-4  bg-white dark:bg-slate-800">
        <p className="text-center text-gray-400 dark:text-white">
          Made with ❤️ by the Nacho the 𐤊at Community
        </p>
      </footer>
    </div>
  );
};

export default Layout;
