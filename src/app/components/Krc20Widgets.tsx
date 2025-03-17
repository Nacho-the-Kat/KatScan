import { JSX, useEffect, useState } from "react";
import { CircleStackIcon, ArrowsRightLeftIcon, DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Widget } from "../../../packages/kat-library/dist/index";
import { formatNumberWithWords, formatInteger } from "../utils/utils";

const API_URL = "/api/kasplex/info";

const TokenStatistics = () => {
  const [stats, setStats] = useState({
    opTotal: '',
    tokenTotal: '',
    feeTotal: '',
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
            opTotal: formatInteger(data.result.opTotal),
            tokenTotal: formatInteger(data.result.tokenTotal),
            feeTotal: formatInteger(data.result.feeTotal),
          });
        }
      } catch (error) {
        console.error("Error fetching token statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Widget component with loading state
  const StatsWidget = ({ 
    icon, 
    title, 
    value 
  }: { 
    icon: JSX.Element; 
    title: string; 
    value: string; 
  }) => (
    <div className="card flex flex-col items-center p-6 transition-all hover:shadow-md">
      <div className="rounded-full bg-primary-100 dark:bg-primary-900/20 p-3 mb-4">
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
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        <span className="border-b-2 border-primary-500 pb-2">Token Statistics</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsWidget
          icon={<CircleStackIcon className="h-6 w-6 text-primary-500" />}
          title="Total KRC20 Transactions"
          value={stats.opTotal}
        />
        <StatsWidget
          icon={<ArrowsRightLeftIcon className="h-6 w-6 text-primary-500" />}
          title="Total KRC20 Tokens Deployed"
          value={stats.tokenTotal}
        />
        <StatsWidget
          icon={<DocumentCurrencyDollarIcon className="h-6 w-6 text-primary-500" />}
          title="Total Fees Paid"
          value={`${stats.feeTotal} KAS`}
        />
      </div>
    </section>
  );
};

export default TokenStatistics;
