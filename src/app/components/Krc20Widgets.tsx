import { JSX, useEffect, useState } from "react";
import { CircleStackIcon, ArrowsRightLeftIcon, DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Widget } from "../../../packages/kat-library/dist/index";

const API_URL = "/api/kasplex/info";



const TokenStatistics = () => {
  const [stats, setStats] = useState({
    opTotal: 0,
    tokenTotal: 0,
    feeTotal: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.result) {
          setStats({
            opTotal: data.result.opTotal,
            tokenTotal: data.result.tokenTotal,
            feeTotal: parseFloat(data.result.feeTotal),
          });
        }
      } catch (error) {
        console.error("Error fetching token statistics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-teal-500">Token Statistics</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="py-4 text-center">
          <Widget
            value={`Total KRC20 Transactions`}
            icon={<CircleStackIcon className="size-12" />}
            legend={`${stats.opTotal}`}
          />
        </div>
        <div className="py-4 text-center">
          <Widget
            value={`Total KRC20 Tokens Deployed`}
            icon={<ArrowsRightLeftIcon className="size-12" />}
            legend={`${stats.tokenTotal}`}
          />
        </div>
        <div className="py-4 text-center">
          <Widget
            value={`Total Fees Paid (KAS)`}
            icon={<DocumentCurrencyDollarIcon className="size-12" />}
            legend={`${stats.feeTotal}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenStatistics;
