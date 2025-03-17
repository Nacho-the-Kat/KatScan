"use client";

import { useState } from "react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface NFTFilterProps {
  traits: { [key: string]: string[] };
  onFilterChange: (trait: string, value: string) => void;
}

const NFTFilter: React.FC<NFTFilterProps> = ({ traits, onFilterChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (trait: string, value: string) => {
    const newFilters = { ...filters };
    
    if (value === "") {
      // Remove the filter if "All" is selected
      delete newFilters[trait];
    } else {
      // Add/update the filter
      newFilters[trait] = value;
    }
    
    setFilters(newFilters);
    onFilterChange(trait, value);
  };

  const clearAllFilters = () => {
    setFilters({});
    Object.keys(traits).forEach(trait => {
      onFilterChange(trait, "");
    });
  };

  const activeFilterCount = Object.keys(filters).length;

  return (
    <div className="card mb-6">
      {/* Filter header with toggle */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <button 
          className="flex items-center text-neutral-800 dark:text-neutral-200 font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FunnelIcon className="h-5 w-5 mr-2 text-primary-500" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        {activeFilterCount > 0 && (
          <button 
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors flex items-center"
            onClick={clearAllFilters}
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter content - collapsible */}
      <div className={`${isOpen ? 'block' : 'hidden'} p-4 space-y-4 divide-y divide-neutral-200 dark:divide-neutral-700`}>
        {Object.entries(traits).map(([trait, values]) => (
          <div key={trait} className="pt-4 first:pt-0">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {trait}
            </label>
            <select
              className="input"
              value={filters[trait] || ""}
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

      {/* Selected filters display */}
      {activeFilterCount > 0 && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 rounded-b-lg">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([trait, value]) => (
              <div 
                key={trait} 
                className="inline-flex items-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1 text-sm"
              >
                <span className="text-neutral-500 dark:text-neutral-400 mr-1">{trait}:</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">{value}</span>
                <button 
                  className="ml-2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                  onClick={() => handleChange(trait, "")}
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTFilter;
