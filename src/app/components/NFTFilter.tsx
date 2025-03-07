"use client";

import { useState } from "react";

interface NFTFilterProps {
  traits: { [key: string]: string[] };
  onFilterChange: (trait: string, value: string) => void;
}

const NFTFilter: React.FC<NFTFilterProps> = ({ traits, onFilterChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleChange = (trait: string, value: string) => {
    setFilters((prev) => ({ ...prev, [trait]: value }));
    onFilterChange(trait, value);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <h1 className="text-teal-400 text-xl mb-2 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">Filters</h1>

      {Object.entries(traits).map(([trait, values]) => (
        <div key={trait} className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-1">
            {trait}
          </label>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
            onChange={(e) => handleChange(trait, e.target.value)}
          >
            <option value="">All</option>
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default NFTFilter;
