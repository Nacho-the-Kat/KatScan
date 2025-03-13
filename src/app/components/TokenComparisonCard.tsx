"use client";

import React from 'react';
import { ArrowTrendingUpIcon, CircleStackIcon, UsersIcon } from '@heroicons/react/24/outline';
import { formatNumberWithWords, formatInteger } from '../utils/utils';

interface TokenDetails {
  id: number;
  tick: string;
  max: number;
  lim: number;
  minted: number;
  holderTotal: number;
  mintTotal: number;
  transferTotal: number;
  logo?: string;
}

interface TokenComparisonCardProps {
  token: TokenDetails | null;
  isLoading: boolean;
}

const TokenComparisonCard: React.FC<TokenComparisonCardProps> = ({ token, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-6xl mb-4">📊</div>
        <p>Select a token to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center mb-6">
        <img 
          src={`https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.tick}.jpg`} 
          alt={token.tick}
          className="w-12 h-12 mr-4 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=KRC20';
          }}
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{token.tick}</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Max Supply</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{formatInteger(token.max)}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Minted</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{formatInteger(token.minted)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <UsersIcon className="h-5 w-5 text-teal-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Holders:</span>
            <span className="ml-auto text-gray-800 dark:text-gray-200">{formatInteger(token.holderTotal)}</span>
          </div>
          
          <div className="flex items-center">
            <CircleStackIcon className="h-5 w-5 text-teal-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Mint Transactions:</span>
            <span className="ml-auto text-gray-800 dark:text-gray-200">{formatInteger(token.mintTotal)}</span>
          </div>
          
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="h-5 w-5 text-teal-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Transfer Transactions:</span>
            <span className="ml-auto text-gray-800 dark:text-gray-200">{formatInteger(token.transferTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenComparisonCard; 