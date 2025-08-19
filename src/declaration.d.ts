declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

// Fix for react-icons TypeScript compatibility
declare module "react-icons/fa" {
  import { ComponentType } from "react";
  export const FaX: ComponentType<any>;
  export const FaCopy: ComponentType<any>;
  export const FaExternalLinkAlt: ComponentType<any>;
  export const FaCoins: ComponentType<any>;
  export const FaWallet: ComponentType<any>;
  export const FaExchangeAlt: ComponentType<any>;
  export const FaUsers: ComponentType<any>;
  export const FaChartBar: ComponentType<any>;
  export const FaCalculator: ComponentType<any>;
  export const FaArrowRight: ComponentType<any>;
  export const FaBars: ComponentType<any>;
  export const FaChartLine: ComponentType<any>;
  export const FaColumns: ComponentType<any>;
  export const FaFireAlt: ComponentType<any>;
  export const FaRobot: ComponentType<any>;
  export const FaSearch: ComponentType<any>;
  export const FaPaintBrush: ComponentType<any>;
  export const FaBullhorn: ComponentType<any>;
  export const FaChartPie: ComponentType<any>;
}

declare module "react-icons/fa6" {
  import { ComponentType } from "react";
  export const FaFileLines: ComponentType<any>;
}