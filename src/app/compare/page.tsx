"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";
import TokenAutocomplete from "@/app/components/TokenAutocomplete";
import TokenComparisonCard from "@/app/components/TokenComparisonCard";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Table, Tabs } from "../../../packages/kat-library/dist/index";
import { formatNumberWithWords, formatInteger, formatKRC20Amount, formatDecimalNumber } from "../utils/utils";
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Token {
  id: number;
  tick: string;
  logo?: string;
}

interface TokenDetails {
  id: number;
  tick: string;
  max: number;
  lim: number;
  pre: number;
  mtsAdd: number;
  minted: number;
  holderTotal: number;
  mintTotal: number;
  transferTotal: number;
  dec: number;
  state: string;
  hashRev?: string;
  opScoreMod?: number;
  opScoreAdd?: number;
  to?: string;
  logo?: string;
  socials?: string;
}

interface HolderGroup {
  group: string;
  balance: string;
  percentage: number;
}

export default function CompareToken() {
  const [token1, setToken1] = useState<Token | null>(null);
  const [token2, setToken2] = useState<Token | null>(null);
  const [token1Details, setToken1Details] = useState<TokenDetails | null>(null);
  const [token2Details, setToken2Details] = useState<TokenDetails | null>(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("supply");

  // Handle token selection with duplicate prevention
  const handleToken1Select = (token: Token) => {
    if (token2 && token.tick === token2.tick) {
      setError("You cannot select the same token twice");
      return;
    }
    setToken1(token);
    setError(null);
  };

  const handleToken2Select = (token: Token) => {
    if (token1 && token.tick === token1.tick) {
      setError("You cannot select the same token twice");
      return;
    }
    setToken2(token);
    setError(null);
  };

  // Fetch token details when a token is selected
  useEffect(() => {
    const fetchTokenDetails = async (token: Token, setDetails: React.Dispatch<React.SetStateAction<TokenDetails | null>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      if (!token) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/token-details/${token.tick}`);
        if (!response.ok) throw new Error(`Failed to fetch details for ${token.tick}`);
        const data = await response.json();
        
        if (data.status === 200 && data.result) {
          setDetails(data.result);
        } else {
          throw new Error(`Invalid response for ${token.tick}`);
        }
      } catch (error) {
        console.error(`Error fetching token details:`, error);
        setError(`Failed to load details for ${token.tick}`);
      } finally {
        setLoading(false);
      }
    };

    if (token1) {
      fetchTokenDetails(token1, setToken1Details, setLoading1);
    } else {
      setToken1Details(null);
    }

    if (token2) {
      fetchTokenDetails(token2, setToken2Details, setLoading2);
    } else {
      setToken2Details(null);
    }
  }, [token1, token2]);

  // Swap tokens
  const handleSwapTokens = () => {
    setToken1(token2);
    setToken2(token1);
    setToken1Details(token2Details);
    setToken2Details(token1Details);
  };

  // Prepare table data for comparison
  const getComparisonTableData = () => {
    if (!token1Details || !token2Details) return [];

    return [
      {
        metric: "Max Supply",
        [token1Details.tick]: `${formatDecimalNumber(token1Details.max, token1Details.dec)} ${token1Details.tick}`,
        [token2Details.tick]: `${formatDecimalNumber(token2Details.max, token2Details.dec)} ${token2Details.tick}`
      },
      {
        metric: "Minted",
        [token1Details.tick]: `${formatDecimalNumber(token1Details.minted, token1Details.dec)} ${token1Details.tick}`,
        [token2Details.tick]: `${formatDecimalNumber(token2Details.minted, token2Details.dec)} ${token2Details.tick}`
      },
      {
        metric: "Pre-Minted",
        [token1Details.tick]: `${formatDecimalNumber(token1Details.pre, token1Details.dec)} ${token1Details.tick}`,
        [token2Details.tick]: `${formatDecimalNumber(token2Details.pre, token2Details.dec)} ${token2Details.tick}`
      },
      {
        metric: "Total Holders",
        [token1Details.tick]: formatInteger(token1Details.holderTotal),
        [token2Details.tick]: formatInteger(token2Details.holderTotal)
      }
    ];
  };

  // Get table columns based on selected tokens
  const getTableColumns = () => {
    const columns = [
      { header: "Metric", accessorKey: "metric" }
    ];

    if (token1Details) {
      columns.push({ header: token1Details.tick, accessorKey: token1Details.tick });
    }

    if (token2Details) {
      columns.push({ header: token2Details.tick, accessorKey: token2Details.tick });
    }

    return columns;
  };

  // Render token header with logo and name
  const renderTokenHeader = (tokenDetails: TokenDetails | null, loading: boolean) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      );
    }

    if (!tokenDetails) {
      return (
        <div className="flex items-center justify-center h-20 text-gray-500">
          No token selected
        </div>
      );
    }

    return (
      <div className="flex items-center p-4">
        <img 
          src={tokenDetails.logo ? `https://katapi.nachowyborski.xyz/static/krc20/thumbnails/${tokenDetails.tick}.jpg` : 'https://placehold.co/200x200?text=KRC20'} 
          alt={tokenDetails.tick}
          className="w-12 h-12 mr-4 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=KRC20';
          }}
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{tokenDetails.tick}</h2>
      </div>
    );
  };

  // Create tab content components
  const SupplyTab = () => {
    if (!token1Details || !token2Details) return null;
    
    // Create individual chart components for better organization
    const SupplyChart = ({ title, series, options, chartType = 'bar' }: { 
      title: string; 
      series: any[]; 
      options: any; 
      chartType?: 'bar' | 'area' | 'line' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap';
    }) => {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">{title}</h4>
          <div className="h-80">
            {typeof window !== 'undefined' && (
              <Chart 
                options={options}
                series={series}
                type={chartType}
                height="100%"
              />
            )}
          </div>
        </div>
      );
    };
    
    // Chart options and series for Max Supply
    const maxSupplyOptions = {
      chart: {
        type: 'bar' as const,
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [token1Details.tick, token2Details.tick],
      },
      yaxis: {
        labels: {
          formatter: function(value: number) {
            return formatDecimalNumber(value, token1Details.dec);
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(value: number, { dataPointIndex }: { seriesIndex: number; dataPointIndex: number; w: any }) {
            const tokenDetails = dataPointIndex === 0 ? token1Details : token2Details;
            return `${formatDecimalNumber(value, tokenDetails.dec)} ${tokenDetails.tick}`;
          }
        }
      },
      colors: ['#14b8a6'] // teal-500
    };
    
    const maxSupplySeries = [{
      name: 'Max Supply',
      data: [token1Details.max, token2Details.max]
    }];
    
    // Chart options and series for Minted
    const mintedOptions = {
      ...maxSupplyOptions,
      colors: ['#0ea5e9'] // sky-500
    };
    
    const mintedSeries = [{
      name: 'Minted',
      data: [token1Details.minted, token2Details.minted]
    }];
    
    // Chart options and series for Pre-Minted
    const preMintedOptions = {
      ...maxSupplyOptions,
      colors: ['#8b5cf6'] // violet-500
    };
    
    const preMintedSeries = [{
      name: 'Pre-Minted',
      data: [token1Details.pre, token2Details.pre]
    }];
    
    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-6">Supply Comparison</h3>
        
        {/* Text comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{token1Details.tick} Supply</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Max Supply:</span>
                <span className="font-semibold">{formatDecimalNumber(token1Details.max, token1Details.dec)} {token1Details.tick}</span>
              </div>
              <div className="flex justify-between">
                <span>Minted:</span>
                <span className="font-semibold">{formatDecimalNumber(token1Details.minted, token1Details.dec)} {token1Details.tick}</span>
              </div>
              <div className="flex justify-between">
                <span>Minting Progress:</span>
                <span className="font-semibold">
                  {Math.round((token1Details.minted / token1Details.max) * 100)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{token2Details.tick} Supply</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Max Supply:</span>
                <span className="font-semibold">{formatDecimalNumber(token2Details.max, token2Details.dec)} {token2Details.tick}</span>
              </div>
              <div className="flex justify-between">
                <span>Minted:</span>
                <span className="font-semibold">{formatDecimalNumber(token2Details.minted, token2Details.dec)} {token2Details.tick}</span>
              </div>
              <div className="flex justify-between">
                <span>Minting Progress:</span>
                <span className="font-semibold">
                  {Math.round((token2Details.minted / token2Details.max) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart comparisons - 3 in a row on desktop, 1 per row on tablet/mobile */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          <SupplyChart 
            title="Max Supply Comparison" 
            series={maxSupplySeries} 
            options={maxSupplyOptions} 
          />
          
          <SupplyChart 
            title="Minted Comparison" 
            series={mintedSeries} 
            options={mintedOptions} 
          />
          
          <SupplyChart 
            title="Pre-Minted Comparison" 
            series={preMintedSeries} 
            options={preMintedOptions} 
          />
        </div>
      </div>
    );
  };

  const HoldersTab = () => {
    if (!token1Details || !token2Details) return null;
    
    const [token1Distribution, setToken1Distribution] = useState<HolderGroup[]>([]);
    const [token2Distribution, setToken2Distribution] = useState<HolderGroup[]>([]);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [error1, setError1] = useState<string | null>(null);
    const [error2, setError2] = useState<string | null>(null);

    useEffect(() => {
      const fetchDistribution = async (ticker: string, setDistribution: any, setLoading: any, setError: any) => {
        try {
          const API_KASPLEX_URL = "https://api.kasplex.org/v1";
          const response = await fetch(`${API_KASPLEX_URL}/krc20/token/${ticker}`);
          const jsonData = await response.json();

          if (!response.ok) {
            throw new Error(`Failed to fetch token info: ${jsonData.error || response.statusText}`);
          }

          if (!jsonData.result?.[0]) {
            throw new Error("No token data available");
          }

          const tokenData = jsonData.result[0];

          if (!Array.isArray(tokenData.holder) || tokenData.holder.length === 0) {
            throw new Error("No holder data available");
          }

          const sortedHolders = [...tokenData.holder].sort((a, b) => 
            Number(b.amount) - Number(a.amount)
          );

          const maxSupply = Number(tokenData.max);
          const distributions = [];
          const ranges = [
            { start: 0, end: 10, label: "Top 10" },
            { start: 10, end: 20, label: "11-20" },
            { start: 20, end: 30, label: "21-30" },
            { start: 30, end: 40, label: "31-40" },
            { start: 40, end: 50, label: "41-50" }
          ];

          let totalCalculatedBalance = 0;

          ranges.forEach(({ start, end, label }) => {
            const holders = sortedHolders.slice(start, end);
            const balance = holders.reduce((sum, holder) => sum + Number(holder.amount), 0);
            totalCalculatedBalance += balance;
            
            distributions.push({
              group: label,
              balance: balance.toString(),
              percentage: (balance / maxSupply) * 100
            });
          });

          const remainingBalance = maxSupply - totalCalculatedBalance;
          distributions.push({
            group: "Remaining",
            balance: remainingBalance.toString(),
            percentage: (remainingBalance / maxSupply) * 100
          });

          setDistribution(distributions);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchDistribution(token1Details.tick, setToken1Distribution, setLoading1, setError1);
      fetchDistribution(token2Details.tick, setToken2Distribution, setLoading2, setError2);
    }, [token1Details.tick, token2Details.tick]);

    const getChartOptions = (tokenTick: string) => ({
      chart: {
        type: 'pie' as const,
        height: 350,
        toolbar: {
          show: false
        }
      },
      labels: ['Top 10', '11-20', '21-30', '31-40', '41-50', 'Remaining'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      colors: ['#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444', '#6b7280'],
      title: {
        text: `${tokenTick} Holder Distribution`,
        align: 'center' as const,
        style: {
          fontSize: '16px',
          fontWeight: 600
        }
      }
    });

    const renderDistributionChart = (
      distribution: HolderGroup[],
      tokenTick: string,
      loading: boolean,
      error: string | null,
      totalHolders: number
    ) => {
      if (loading) {
        return (
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="flex justify-center items-center h-80">
            <p className="text-red-500">Error: {error}</p>
          </div>
        );
      }

      const series = distribution.map(item => item.percentage);
      
      return (
        <div>
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{tokenTick}</h4>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-3xl font-bold text-teal-500">{formatInteger(totalHolders)}</span>
              <span className="text-gray-600 dark:text-gray-400">Total Holders</span>
            </div>
          </div>
          <div className="h-80">
            {typeof window !== 'undefined' && (
              <Chart 
                options={getChartOptions(tokenTick)}
                series={series}
                type="pie"
                height="100%"
              />
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-6">Holder Distribution Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {renderDistributionChart(
              token1Distribution,
              token1Details.tick,
              loading1,
              error1,
              token1Details.holderTotal
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {renderDistributionChart(
              token2Distribution,
              token2Details.tick,
              loading2,
              error2,
              token2Details.holderTotal
            )}
          </div>
        </div>
      </div>
    );
  };

  const MintingTab = () => {
    if (!token1Details || !token2Details) return null;
    
    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">Minting Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{token1Details.tick} Minting</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Progress:</span>
                  <span>{Math.round((token1Details.minted / token1Details.max) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
                  <div 
                    className="bg-teal-500 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, Math.round((token1Details.minted / token1Details.max) * 100))}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Mint Transactions:</span>
                <span className="font-semibold">{formatInteger(token1Details.mintTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>State:</span>
                <span className="font-semibold capitalize">{token1Details.state}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{token2Details.tick} Minting</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Progress:</span>
                  <span>{Math.round((token2Details.minted / token2Details.max) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
                  <div 
                    className="bg-teal-500 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, Math.round((token2Details.minted / token2Details.max) * 100))}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Mint Transactions:</span>
                <span className="font-semibold">{formatInteger(token2Details.mintTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>State:</span>
                <span className="font-semibold capitalize">{token2Details.state}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const bothTokensSelected = token1Details && token2Details;

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Compare Tokens</h1>
          
          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {/* Token Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Select Token 1</label>
              <TokenAutocomplete 
                onSelect={handleToken1Select} 
                placeholder="Search for first token..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Select Token 2</label>
              <TokenAutocomplete 
                onSelect={handleToken2Select} 
                placeholder="Search for second token..."
              />
            </div>
          </div>
          
          {/* Swap Button - Only show if both tokens are selected */}
          {token1 && token2 && (
            <div className="flex justify-center mb-8">
              <button 
                onClick={handleSwapTokens}
                className="flex items-center bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <ArrowsRightLeftIcon className="h-5 w-5 mr-2" />
                Swap Tokens
              </button>
            </div>
          )}
          
          {/* Token Headers */}
          {(token1 || token2) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {renderTokenHeader(token1Details, loading1)}
              {renderTokenHeader(token2Details, loading2)}
            </div>
          )}
          
          {/* Comparison Table - Only show if both tokens are selected */}
          {bothTokensSelected && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Token Comparison</h2>
              <Table 
                data={getComparisonTableData()}
                columns={getTableColumns()}
              />
            </div>
          )}
          
          {/* Tabs for detailed comparison */}
          {bothTokensSelected && (
            <div>
              <Tabs
                tabs={[
                  { label: "Supply", content: <SupplyTab /> },
                  { label: "Holder Distribution", content: <HoldersTab /> },
                  { label: "Minting Progress", content: <MintingTab /> }
                ]}
              />
            </div>
          )}
          
          {/* Token Cards - Only show if not both tokens are selected */}
          {!bothTokensSelected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <TokenComparisonCard token={token1Details} isLoading={loading1} />
              <TokenComparisonCard token={token2Details} isLoading={loading2} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
