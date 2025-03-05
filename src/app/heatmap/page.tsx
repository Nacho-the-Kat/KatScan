"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Layout from "@/app/components/Layout";

export default function MintHeatmap() {
  const [mintData, setMintData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMintData = async () => {
      try {
        const response = await fetch("/api/mint-totals");
        if (!response.ok) throw new Error("Failed to fetch mint totals");

        const jsonData = await response.json();
        const formattedData = jsonData.map((item, index) => ({
          x: item.tick,
          y: item.mintTotal,
          color: getColor(index), // Assign different colors
        }));

        setMintData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMintData();
  }, []);

  // Function to assign different colors to each token
  const getColor = (index) => {
    const colors = [
      "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
      "#546E7A", "#D4526E", "#F86624", "#A5978B", "#26A69A"
    ];
    return colors[index % colors.length]; // Cycle through colors
  };

  const chartOptions = {
    chart: {
      type: "treemap",
       // Ensures it blends with Tailwind classes
    },
    title: {
      text: "Mint Heatmap",
      style: {
        color: "#ffffff", // Default light mode color
      },
    },
    legend: {
      show: true,
      labels: {
        colors: "#000000", // Default legend color
      },
    },
    tooltip: {
      theme: "dark", // Always use dark tooltip (works with dark:bg-gray-900)
      style: {
        fontSize: "14px",
      },
      y: {
        formatter: (value) => `Mint: ${value}`, // Add "Mint: " in tooltip
      },
    },
    plotOptions: {
      treemap: {
        distributed: true, // Ensures each item has a unique color
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
        <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
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
