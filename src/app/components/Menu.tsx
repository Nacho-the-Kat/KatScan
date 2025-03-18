"use client";

import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/solid";

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

interface MenuProps {
  items: MenuItem[];
}

const MenuComponent: React.FC<MenuProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<number | null>(null);

  let closeTimeout: NodeJS.Timeout;

  // Desktop Hover Logic
  const handleMouseEnter = (index: number) => {
    clearTimeout(closeTimeout);
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setOpenIndex(null);
    }, 300);
  };

  return (
    <nav className="p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Menu */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 rounded-md focus:outline-none z-50">
              {items.map((item, idx) => (
                <div key={idx} className="py-1">
                  <button
                    onClick={() =>
                      setMobileSubmenuOpen(mobileSubmenuOpen === idx ? null : idx)
                    }
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex justify-between items-center"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDownIcon
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          mobileSubmenuOpen === idx ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {item.children && mobileSubmenuOpen === idx && (
                    <div className="pr-4 text-right">
                      {item.children.map((subItem, subIdx) => (
                        <a
                          key={subIdx}
                          href={subItem.href || "#"}
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.href || "#"}
                className="text-gray-700 dark:text-white px-3 py-2 font-medium hover:text-primary-500 flex items-center"
              >
                {item.label}
                {item.children && (
                  <ChevronDownIcon
                    className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                )}
              </a>
              {item.children && openIndex === idx && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md transition-opacity duration-200 z-50">
                  {item.children.map((subItem, subIdx) => (
                    <div
                      key={subIdx}
                      className="relative group"
                      onMouseEnter={() => handleMouseEnter(idx)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a
                        href={subItem.href || "#"}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        {subItem.label}
                      </a>
                      {subItem.children && (
                        <div className="absolute left-full top-0 ml-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md transition-opacity duration-200 z-[60]">
                          {subItem.children.map((thirdLevelItem, thirdIdx) => (
                            <a
                              key={thirdIdx}
                              href={thirdLevelItem.href || "#"}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                              {thirdLevelItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MenuComponent;
