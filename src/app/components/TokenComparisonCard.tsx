"use client";

import React from 'react';
import { ArrowTrendingUpIcon, CircleStackIcon, UsersIcon } from '@heroicons/react/24/outline';
import { formatNumberWithWords, formatInteger, formatDecimalNumber } from '../utils/utils';
import Image from 'next/image';

interface TokenDetails {
  id: number;
  tick: string;
  max: number;
  lim: number;
  minted: number;
  holderTotal: number;
  mintTotal: number;
  transferTotal: number;
  dec: number;
  logo?: string;
}

interface TokenComparisonCardProps {
  token: TokenDetails | null;
  isLoading: boolean;
}

const TokenComparisonCard: React.FC<TokenComparisonCardProps> = ({ token, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="card h-full flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-sm">Select a token to view details</p>
      </div>
    );
  }

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center mb-6">
        <div className="relative w-12 h-12 mr-4 rounded-full shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <Image 
            src={`https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${token.tick}.jpg`} 
            alt={token.tick}
            fill
            className="object-cover"
            sizes="48px"
            onError={(e) => {
              // TypeScript needs casting for the error event target
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/200x200?text=KRC20';
            }}
          />
        </div>
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{token.tick}</h2>
      </div>

      <div className="space-y-6 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">Max Supply</p>
            <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{formatDecimalNumber(token.max, token.dec)} <span className="text-xs font-normal text-neutral-500">{token.tick}</span></p>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">Minted</p>
            <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{formatDecimalNumber(token.minted, token.dec)} <span className="text-xs font-normal text-neutral-500">{token.tick}</span></p>
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-neutral-200 dark:border-neutral-700 pt-4">
          <div className="flex items-center py-2 border-b border-neutral-100 dark:border-neutral-800">
            <UsersIcon className="h-5 w-5 text-primary-500 mr-3" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Holders</span>
            <span className="ml-auto text-sm font-medium text-neutral-800 dark:text-neutral-200">{formatInteger(token.holderTotal)}</span>
          </div>
          
          <div className="flex items-center py-2 border-b border-neutral-100 dark:border-neutral-800">
            <CircleStackIcon className="h-5 w-5 text-primary-500 mr-3" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Mint Transactions</span>
            <span className="ml-auto text-sm font-medium text-neutral-800 dark:text-neutral-200">{formatInteger(token.mintTotal)}</span>
          </div>
          
          <div className="flex items-center py-2">
            <ArrowTrendingUpIcon className="h-5 w-5 text-primary-500 mr-3" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">Transfer Transactions</span>
            <span className="ml-auto text-sm font-medium text-neutral-800 dark:text-neutral-200">{formatInteger(token.transferTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenComparisonCard; 