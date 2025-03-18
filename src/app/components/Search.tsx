import React, { useState } from "react";
import { MagnifyingGlassIcon, CircleStackIcon } from "@heroicons/react/24/solid";

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onChange?: (query: string) => void; // ✅ Optional onChange
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // ✅ Optional onKeyDown
  suggestions?: { tick: string; image?: string }[];
  showHint?: boolean;
  enableAutocomplete?: boolean;
}

const SearchComponent: React.FC<SearchProps> = ({
  placeholder = "Search...",
  onSearch,
  onChange,
  onKeyDown,
  suggestions = [],
  showHint = false,
  enableAutocomplete = false,
}) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<{ tick: string; image?: string }[]>([]);
  const [hintVisible, setHintVisible] = useState(showHint);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setHintVisible(true);

    // ✅ Call onChange only if it's provided
    if (onChange) {
      onChange(newQuery);
    }

    if (enableAutocomplete) {
      if (newQuery.trim() === "") {
        setShowAutocomplete(false);
        setFilteredSuggestions([]);
      } else {
        const filtered = suggestions.filter((item) =>
          item.tick.toLowerCase().includes(newQuery.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setShowAutocomplete(filtered.length > 0);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // ✅ Call onKeyDown only if it's provided
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (event.key === "Enter" && onSearch) {
      onSearch(query);
      setHintVisible(false);
      setShowAutocomplete(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowAutocomplete(false);
    setFilteredSuggestions([]);
    
    if (onSearch) onSearch(suggestion);
  };

  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon className="absolute left-3 top-5 h-5 w-5 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-4 py-4 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
        placeholder={placeholder}
      />
      {hintVisible && showHint && query && (
        <p className="absolute left-10 top-full mt-1 text-xs text-gray-500 dark:text-gray-400">
          Press <span className="font-semibold">Enter</span> to search
        </p>
      )}
      {enableAutocomplete && showAutocomplete && filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg max-h-40 overflow-y-auto z-10">
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item.tick)}
              className="flex items-center px-4 py-2 cursor-pointer text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.tick}
                  className="w-6 h-6 rounded-full mr-2"
                />
              ) : (
                <CircleStackIcon className="w-6 h-6 text-gray-400 mr-2" />
              )}
              {item.tick}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
