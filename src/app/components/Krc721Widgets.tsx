import { useEffect, useState } from "react";
import { CircleStackIcon, ArrowsRightLeftIcon, DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Widget } from "../../../packages/kat-library/dist/index";

const API_URL = "/api/kasplex/nft/stats"; // Adjust the path as needed


const NFTStatistics = () => {
    const [stats, setStats] = useState({
      nftVolume: 0,
      minorFeesPaid: 0,
      royaltyFeesPaid: 0,
      totalCollection: 0,
      totalNFTMints: 0,
      totalTransfers: 0,
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          if (data.result) {
            setStats({
              nftVolume: data.result.tokenTransfersTotal,
              minorFeesPaid: Number((parseInt(data.result.powFeesTotal) / 1e18).toFixed(6)), // Convert to readable KAS
              royaltyFeesPaid: Number((parseInt(data.result.royaltyFeesTotal) / 1e18).toFixed(6)),
              totalCollection: data.result.tokenDeploymentsTotal,
              totalNFTMints: data.result.tokenMintsTotal,
              totalTransfers: data.result.tokenTransfersTotal,
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
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Widget
              value={`${stats.nftVolume}`}
              legend="NFT Volume"
              icon={<CircleStackIcon className="size-12" />}
            />
          </div>
          <div className="text-center">
            <Widget
              value={`${stats.minorFeesPaid} KAS`}
              legend="Minor Fees Paid"
              icon={<DocumentCurrencyDollarIcon className="size-12" />}
            />
          </div>
          <div className="text-center">
            <Widget
              value={`${stats.royaltyFeesPaid} KAS`}
              legend="Total Fees Paid"
              icon={<DocumentCurrencyDollarIcon className="size-12" />}
            />
          </div>
          <div className="text-center">
            <Widget
              value={`${stats.totalCollection}`}
              legend="Total Collection"
              icon={<ArrowsRightLeftIcon className="size-12" />}
            />
          </div>
          <div className="text-center">
            <Widget
              value={`${stats.totalNFTMints}`}
              legend="Total NFT Mints"
              icon={<CircleStackIcon className="size-12" />}
            />
          </div>
          <div className="text-center">
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
