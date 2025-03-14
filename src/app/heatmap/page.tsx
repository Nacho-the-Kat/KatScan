"use client";

import React, { useEffect, useState, useCallback } from "react";
import dynamic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
import Layout from "@/app/components/Layout";

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

const timeframes = [
  { value: 'day', label: 'Last 24 Hours' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'all', label: 'All Time' },
];

export default function MintHeatmap() {
  const [mintData, setMintData] = useState<FormattedMintData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>('week');
  const [totalMints, setTotalMints] = useState<number>(0);

  const getStartDate = (timeframe: string): Date => {
    const now = new Date();
    switch (timeframe) {
      case 'day':
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        return today;
      case 'week':
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return weekAgo;
      case 'month':
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return monthAgo;
      case 'year':
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        return yearAgo;
      case 'all':
        return new Date('2024-01-01T00:00:00Z');
      default:
        const defaultDate = new Date(now);
        defaultDate.setDate(now.getDate() - 7);
        return defaultDate;
    }
  };

  const fetchMintData = useCallback(async () => {
    if (!timeframe) return;
    setLoading(true);
    const startDate = getStartDate(timeframe);
    const endDate = new Date();

    try {
      console.log('Fetching data with dates:', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });

      const response = await fetch(`/api/mint-totals?startDate=${encodeURIComponent(startDate.toISOString())}&endDate=${encodeURIComponent(endDate.toISOString())}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      
      if (!Array.isArray(jsonData)) {
        throw new Error('Invalid data format received');
      }

      if (jsonData.length > 0) {
        // Sort data by mintTotal in descending order and take top 100
        const sortedData = [...jsonData]
          .sort((a, b) => b.mintTotal - a.mintTotal)
          .slice(0, 100)
          .map((item: MintItem, index: number) => ({
            x: item.tick,
            y: Math.log(item.mintTotal + 1), // Use log scale like original
            color: getColor(index),
          }));

        setMintData(sortedData);
        setTotalMints(jsonData.reduce((sum: number, item: MintItem) => sum + item.mintTotal, 0));
        setError(null);
      } else {
        setMintData([{ x: 'No data', y: 0, color: getColor(0) }]);
        setTotalMints(0);
      }
    } catch (error: unknown) {
      console.error('Error in fetchMintData:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setMintData([{ x: 'Error', y: 0, color: getColor(0) }]);
      setTotalMints(0);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    if (timeframe) {
      void fetchMintData();
    }
  }, [timeframe, fetchMintData]);

  const getColor = (index: number): string => {
    // Use HSL colors like the original
    const hue = (1 - index / 100) * 120; // 120 for green to red gradient
    return `hsl(${hue}, 70%, 50%)`;
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "treemap",
    },
    title: {
      text: "Token Mint Heatmap",
      style: {
        color: "#ffffff",
      },
    },
    legend: {
      show: true,
      labels: {
        colors: "#000000",
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "14px",
      },
      y: {
        formatter: (value: number): string => {
          const actualValue = Math.exp(value) - 1;
          const percentage = ((actualValue / totalMints) * 100).toFixed(2);
          return `Mints: ${Math.round(actualValue).toLocaleString()}\nPercentage: ${percentage}%`;
        },
      },
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
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
        <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 ml-2">
                Timeframe
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 ml-2"
              >
                {timeframes.map((tf) => (
                  <option key={tf.value} value={tf.value}>
                    {tf.label}
                  </option>
                ))}
              </select>
            </div>
            {totalMints > 0 && (
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mr-2">
                Total Mints: {totalMints.toLocaleString()}
              </div>
            )}
          </div>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-300">Loading mint data...</p>
          ) : error ? (
            <p className="text-red-500 dark:text-red-400">Error: {error}</p>
          ) : (
            <div className="dark:bg-gray-900 p-4 rounded-md">
              <Chart options={chartOptions} series={chartSeries} type="treemap" height={650} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
