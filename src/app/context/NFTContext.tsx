"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface NFT {
  id: number;
  fkCollection: number;
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

interface CollectionInfo {
  tick: string;
  ticker: string;
  deployer: string;
  state: string;
  max: number;
  minted: number;
  royaltyFee: number;
}

interface NFTContextType {
  selectedNFT: NFT | null;
  collectionInfo: CollectionInfo | null;
  setSelectedNFT: (nft: NFT) => void;
  setCollectionInfo: (info: CollectionInfo) => void;
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

export const NFTProvider = ({ children }: { children: ReactNode }) => {
  const [selectedNFT, setSelectedNFTState] = useState<NFT | null>(null);
  const [collectionInfo, setCollectionInfoState] = useState<CollectionInfo | null>(null);

  useEffect(() => {
    const storedNFT = localStorage.getItem("selectedNFT");
    const storedCollection = localStorage.getItem("collectionInfo");

    if (storedNFT) setSelectedNFTState(JSON.parse(storedNFT));
    if (storedCollection) setCollectionInfoState(JSON.parse(storedCollection));
  }, []);

  const setSelectedNFT = (nft: NFT) => {
    setSelectedNFTState(nft);
    localStorage.setItem("selectedNFT", JSON.stringify(nft));
  };

  const setCollectionInfo = (info: CollectionInfo) => {
    setCollectionInfoState(info);
    localStorage.setItem("collectionInfo", JSON.stringify(info));
  };

  return (
    <NFTContext.Provider value={{ selectedNFT, collectionInfo, setSelectedNFT, setCollectionInfo }}>
      {children}
    </NFTContext.Provider>
  );
};

export const useNFTContext = () => {
  const context = useContext(NFTContext);
  if (!context) {
    throw new Error("useNFTContext must be used within an NFTProvider");
  }
  return context;
};
