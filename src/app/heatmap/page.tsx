"use client";

import React, { useEffect, useState, useCallback } from "react";
import dynamic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
import Layout from "@/app/components/Layout";
import { getTreemapChartTheme } from "../utils/chartTheme";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] flex items-center justify-center">Loading Chart...</div>
});

interface MintItem {
  tick: string;
  mintTotal: number;
}

interface FormattedMintData {
  x: string;
  y: number;
  color: string;
}

// Define timeframe options
interface TimeframeOption {
  label: string;
  value: string;
}

const timeframes: TimeframeOption[] = [
  { label: "All Time", value: "all" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Last 90 Days", value: "90days" },
];

export default function MintHeatmap() {
  const [mintData, setMintData] = useState<FormattedMintData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>("30days");
  const [totalMints, setTotalMints] = useState(0);

  // Get start date based on timeframe
  const getStartDate = (timeframe: string): Date => {
    const now = new Date();
    switch (timeframe) {
      case "7days":
        now.setDate(now.getDate() - 7);
        return now;
      case "30days":
        now.setDate(now.getDate() - 30);
        return now;
      case "90days":
        now.setDate(now.getDate() - 90);
        return now;
      default:
        // "all" - set to distant past
        now.setFullYear(now.getFullYear() - 10);
        return now;
    }
  };

  const fetchMintData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const startDate = getStartDate(timeframe);
      const startTimestamp = Math.floor(startDate.getTime() / 1000);

      const apiUrl = `/api/kasplex/mints?since=${startTimestamp}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.result || !Array.isArray(data.result)) {
        throw new Error("Invalid response format");
      }

      const result: MintItem[] = data.result;

      // Sort by mint count (descending) and take top 100
      const sortedData = result.sort((a, b) => b.mintTotal - a.mintTotal).slice(0, 100);

      // Calculate total mints for percentage
      const total = sortedData.reduce((sum, item) => sum + item.mintTotal, 0);
      setTotalMints(total);

      // Transform data for treemap
      const formattedData: FormattedMintData[] = sortedData.map((item, index) => {
        // Apply logarithmic scale to make visualization more balanced
        // Add 1 to avoid log(0) and use natural log for better scaling
        const logValue = Math.log(item.mintTotal + 1);

        return {
          x: item.tick,
          y: logValue, // Logarithmic value for better visualization
          color: getColorGradient(index, sortedData.length),
        };
      });

      setMintData(formattedData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error("Error fetching mint data:", err);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    if (timeframe) {
      void fetchMintData();
    }
  }, [timeframe, fetchMintData]);

  // Enhanced color gradient function for better visualization
  const getColorGradient = (index: number, total: number): string => {
    // Calculate percentage position in the dataset (0 to 1)
    const position = index / (total - 1);
    
    // Define colors from teal (primary) to amber (warning) to red (error)
    if (position < 0.4) {
      // Top 40% - Primary color range (teal shades)
      const intensity = Math.floor((position / 0.4) * 500);
      return `var(--primary-${intensity || 500})`;
    } else if (position < 0.7) {
      // Next 30% - Warning color range (amber shades)
      const normalizedPos = (position - 0.4) / 0.3;
      const intensity = Math.floor(normalizedPos * 500);
      return `var(--warning-${intensity || 500})`;
    } else {
      // Bottom 30% - Error color range (red shades)
      const normalizedPos = (position - 0.7) / 0.3;
      const intensity = Math.floor(normalizedPos * 500);
      return `var(--error-${intensity || 500})`;
    }
  };

  // Get chart theme based on dark mode
  const isDarkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const baseChartTheme = getTreemapChartTheme(isDarkMode);
  
  // Merge base theme with specific options for this chart
  const chartOptions: ApexOptions = {
    ...baseChartTheme,
    title: {
      text: "Token Mint Heatmap",
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 600,
        fontFamily: 'var(--font-geist-sans)',
        color: isDarkMode ? '#e5e7eb' : '#1f2937', // neutral-200 or neutral-800
      },
    },
    tooltip: {
      ...baseChartTheme.tooltip,
      y: {
        formatter: (value: number): string => {
          const actualValue = Math.exp(value) - 1;
          const percentage = ((actualValue / totalMints) * 100).toFixed(2);
          return `Mints: ${Math.round(actualValue).toLocaleString()}\nPercentage: ${percentage}%`;
        },
      },
    },
  };

  const chartSeries = [
    {
      data: mintData,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="card mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Timeframe
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="input w-full"
              >
                {timeframes.map((tf) => (
                  <option key={tf.value} value={tf.value}>
                    {tf.label}
                  </option>
                ))}
              </select>
            </div>
            {totalMints > 0 && (
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-4 py-2">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">Total Mints:</span>
                <span className="ml-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200">{totalMints.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="h-[650px] w-full flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
                <p className="text-neutral-500 dark:text-neutral-400">Loading mint data...</p>
              </div>
            ) : error ? (
              <div className="h-[200px] flex items-center justify-center bg-error-50 dark:bg-error-900/10 rounded-md p-6">
                <p className="text-error-500 dark:text-error-400">{error}</p>
              </div>
            ) : mintData.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-md p-6">
                <p className="text-neutral-500 dark:text-neutral-400">No mint data available for the selected timeframe.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-neutral-800 rounded-md">
                <Chart options={chartOptions} series={chartSeries} type="treemap" height={650} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
