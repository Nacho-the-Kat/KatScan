import { useEffect, useState } from "react";
import { CircleStackIcon, ArrowsRightLeftIcon, DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Widget } from "./index";
import { formatNumberWithWords, formatInteger } from "../utils/utils";

const API_URL = "/api/kasplex/nft/stats"; // Adjust the path as needed

const NFTStatistics = () => {
    const [stats, setStats] = useState({
      nftVolume: '',
      minorFeesPaid: '',
      royaltyFeesPaid: '',
      totalCollection: '',
      totalNFTMints: '',
      totalTransfers: '',
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          if (data.result) {
            console.log('data', data.result)
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
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h1 className="text-2xl text-teal-500 mb-4">NFTs Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center py-4">
            <Widget
              value={`${stats.nftVolume}`}
              legend="NFT Volume"
              icon={<CircleStackIcon className="size-12" />}
            />
          </div>
          <div className="text-center py-4">
            <Widget
              value={`${stats.minorFeesPaid} KAS`}
              legend="Miner Fees Paid"
              icon={<DocumentCurrencyDollarIcon className="size-12" />}
            />
          </div>
          <div className="text-center py-4">
            <Widget
              value={`${stats.royaltyFeesPaid} KAS`}
              legend="Total Fees Paid"
              icon={<DocumentCurrencyDollarIcon className="size-12" />}
            />
          </div>
          <div className="text-center py-4">
            <Widget
              value={`${stats.totalCollection}`}
              legend="Total Collection"
              icon={<ArrowsRightLeftIcon className="size-12" />}
            />
          </div>
          <div className="text-center py-4">
            <Widget
              value={`${stats.totalNFTMints}`}
              legend="Total NFT Mints"
              icon={<CircleStackIcon className="size-12" />}
            />
          </div>
          <div className="text-center py-4">
            <Widget
              value={`${stats.totalTransfers}`}
              legend="Total Transfers"
              icon={<ArrowsRightLeftIcon className="size-12" />}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default NFTStatistics;
