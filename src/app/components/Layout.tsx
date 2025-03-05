// components/Layout.tsx
"use client";

import React, { FC } from "react";
import { Menu } from "../../../packages/kat-library/dist/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "../../../packages/kat-library/dist/index";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const menuOptions = [
    { label: "Home", href: "/" },
    {
      label: "Tokens",
      children: [
        { label: "All Tokens", href: "/scan" },
        { label: "Heatmap", href: "/heatmap" },
      ],
    },
    {
      label: "NFTs",
      children: [
        { label: "All Collections", href: "#" },
      ],
    },
    
  ];

  return (
    <div className="flex flex-col min-h-screen  bg-gray-100 dark:bg-slate-900">
      {/* Header full width */}
      <header className="flex bg-white dark:bg-gray-800 shadow-md">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-11/12">
        <div className="flex-grow flex justify-between items-center">
          <div className="px-4">
            <Link href={'/'}>
            <Image
              src="/katscan_new_logo.png"
              alt="KatScan Logo"
              width={180}
              height={45}
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
        <div className="w-11/12">
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
