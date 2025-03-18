import React, { useState } from "react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import Pill from "./Pill"; // Import the Pill component

interface Token {
  tick: string;
  id?: string | number;
  image?: string;
  price?: string;
  change?: number;
  pillLabel?: string; // Pill text
  pillStyle?: "primary" | "dark" | "gray" | "accent"; // Pill style
  tokenLink?: string; // Custom URL for the token link
}

interface ListProps {
  title: string;
  icon?: React.ReactNode;
  legend?: string;
  tokens: Token[];
  maxItems?: number;
  showMoreUrl?: string;
  showPrice?: boolean;
}

const TokenList: React.FC<ListProps> = ({
  title,
  icon,
  legend,
  tokens,
  maxItems = 10,
  showMoreUrl,
  showPrice = true,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedTokens = showAll ? tokens : tokens.slice(0, maxItems);

  return (
    <div className="bg-white min-h-80 dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center">
          {icon && <span className="text-gray-500 dark:text-gray-300">{icon}</span>}
          <h3 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        {legend && (
          <span className="ml-auto text-sm text-gray-600 dark:text-gray-400">{legend}</span>
        )}
      </div>

      {/* Token List */}
      <div className="mt-3 space-y-3">
        {displayedTokens.map((token, index) => {
          const [imageError, setImageError] = useState(false);
          const tokenLink = token.tokenLink || "#"; // Default to #

          return (
            <div key={index} className="flex items-center justify-between">
              {/* Index */}
              <span className="text-sm text-gray-500 dark:text-gray-400 w-6">{index + 1}</span>

              {/* Token Image */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center ml-4">
                {token.image && !imageError ? (
                  <img
                    src={token.image}
                    alt={token.tick}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <CircleStackIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>

              {/* Token Name & Price */}
              <div className="flex-1 ml-3">
                <a href={tokenLink} className="text-gray-900 dark:text-white font-medium hover:text-teal-500">
                  {token.tick}
                </a>
                {showPrice && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{token.price || "$0.000000"}</p>
                )}
              </div>

              {/* Price Change Badge */}
              {token.change !== undefined && (
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    token.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {token.change >= 0 ? `${token.change}` : `${token.change}`}
                </span>
              )}

              {/* Display Pill if it exists in the token data */}
              {token.pillLabel && <Pill label={token.pillLabel} color={token.pillStyle || "primary"} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokenList;
