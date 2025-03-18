import React from "react";
import Image from "next/image";

interface HeaderProps {
  logoSrc: string;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, title, subtitle }) => {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <nav className="flex items-center lg:grow">
            <ul className="flex grow justify-start flex-wrap items-center">
              <li className="relative group">
                <a
                  className="flex items-center px-3 py-2 text-sm font-medium transition-colors"
                  href="https://katpool.xyz"
                >
                  <Image
                    src={logoSrc}
                    alt="Navigation Logo"
                    width={50}
                    height={50}
                    className="mr-6 opacity-100"
                  />
                </a>
              </li>
              <li className="relative group">
                <span className="flex items-center px-3 py-2 text-xl font-medium transition-colors text-gray-400 dark:text-white hover:text-primary-500 dark:hover:text-primary-400">
                  {title}
                </span>
              </li>
              <li className="relative group">
                <span className="flex items-center px-3 py-2 text-sm font-medium transition-colors text-gray-500">
                  {subtitle}
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
