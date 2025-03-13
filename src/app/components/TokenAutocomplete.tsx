"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Token {
  id: number;
  tick: string;
  logo?: string;
}

interface TokenAutocompleteProps {
  onSelect: (token: Token) => void;
  placeholder?: string;
}

const TokenAutocomplete: React.FC<TokenAutocompleteProps> = ({ 
  onSelect, 
  placeholder = "Search for a token..." 
}) => {
  const [query, setQuery] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch tokens on component mount
  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tokens');
        if (!response.ok) throw new Error('Failed to fetch tokens');
        const data = await response.json();
        setTokens(data);
        
        // Initially show all tokens when dropdown is opened
        if (query.trim() === '') {
          setFilteredTokens(data);
        } else {
          const lowerQuery = query.toLowerCase();
          setFilteredTokens(data.filter((token: Token) => 
            token.tick.toLowerCase().includes(lowerQuery)
          ));
        }
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Filter tokens based on search query
  useEffect(() => {
    if (!tokens.length) return;
    
    if (query.trim() === '') {
      // Show all tokens when query is empty
      setFilteredTokens(tokens);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = tokens.filter(token => 
      token.tick.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredTokens(filtered);
  }, [query, tokens]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTokenSelect = (token: Token) => {
    onSelect(token);
    setQuery(token.tick);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    // Show all tokens when focusing if query is empty
    if (query.trim() === '' && tokens.length > 0) {
      setFilteredTokens(tokens);
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      )}
      
      {showDropdown && filteredTokens.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredTokens.map((token) => (
            <div
              key={token.id}
              onClick={() => handleTokenSelect(token)}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
            >
              <img 
                src={`https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.tick}.jpg`} 
                alt={token.tick}
                className="w-6 h-6 mr-2 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-gray-800 dark:text-gray-200">{token.tick}</span>
            </div>
          ))}
        </div>
      )}
      
      {showDropdown && query && filteredTokens.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-3 text-center text-gray-500 dark:text-gray-400">
          No tokens found
        </div>
      )}
    </div>
  );
};

export default TokenAutocomplete; 