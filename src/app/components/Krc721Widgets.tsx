import { JSX, useEffect, useState } from "react";
import { CircleStackIcon, ArrowsRightLeftIcon, DocumentCurrencyDollarIcon, PhotoIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Widget } from "../../../packages/kat-library/dist/index";
import { formatNumberWithWords, formatInteger } from "../utils/utils";

const API_URL = "/api/kasplex/nft/stats";

const NFTStatistics = () => {
  const [stats, setStats] = useState({
    nftVolume: '',
    minorFeesPaid: '',
    royaltyFeesPaid: '',
    totalCollection: '',
    totalNFTMints: '',
    totalTransfers: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.result) {
          setStats({
            nftVolume: formatInteger(data.result.tokenTransfersTotal),
            minorFeesPaid: formatInteger(data.result.powFeesTotal), 
            royaltyFeesPaid: formatInteger(data.result.royaltyFeesTotal),
            totalCollection: formatInteger(data.result.tokenDeploymentsTotal),
            totalNFTMints: formatInteger(data.result.tokenMintsTotal),
            totalTransfers: formatInteger(data.result.tokenTransfersTotal),
          });
        }
      } catch (error) {
        console.error("Error fetching NFT statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // NFT Widget component with loading state
  const NFTWidget = ({ 
    icon, 
    title, 
    value,
    className = ""
  }: { 
    icon: JSX.Element; 
    title: string; 
    value: string;
    className?: string;
  }) => (
    <div className={`card flex flex-col items-center p-6 transition-all hover:shadow-md ${className}`}>
      <div className="rounded-full bg-secondary-100 dark:bg-secondary-900/20 p-3 mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2 text-center">
        {title}
      </h3>
      {loading ? (
        <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
      ) : (
        <p className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
          {value}
        </p>
      )}
    </div>
  );

  return (
    <section className="space-y-6 mt-12">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <span className="border-b-2 border-secondary-500 pb-2">NFT Statistics</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NFTWidget
          icon={<PhotoIcon className="h-6 w-6 text-secondary-500" />}
          title="Total Collections"
          value={stats.totalCollection}
        />
        <NFTWidget
          icon={<CircleStackIcon className="h-6 w-6 text-secondary-500" />}
          title="Total NFT Mints"
          value={stats.totalNFTMints}
        />
        <NFTWidget
          icon={<ArrowsRightLeftIcon className="h-6 w-6 text-secondary-500" />}
          title="Total Transfers"
          value={stats.totalTransfers}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
        <NFTWidget
          icon={<CurrencyDollarIcon className="h-6 w-6 text-secondary-500" />}
          title="Miner Fees Paid"
          value={`${stats.minorFeesPaid} KAS`}
          className="lg:col-span-1"
        />
        <NFTWidget
          icon={<DocumentCurrencyDollarIcon className="h-6 w-6 text-secondary-500" />}
          title="Royalty Fees Paid"
          value={`${stats.royaltyFeesPaid} KAS`}
          className="lg:col-span-1"
        />
      </div>
    </section>
  );
};

export default NFTStatistics;
