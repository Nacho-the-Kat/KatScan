import React from "react";
interface Affiliate {
    name: string;
    icon: string;
    url?: string;
}
interface AffiliateComponentProps {
    affiliates: Affiliate[];
    displayMode?: "icons" | "iconsWithNames";
    layout?: "horizontal" | "vertical";
}
declare const AffiliateComponent: React.FC<AffiliateComponentProps>;
export default AffiliateComponent;
