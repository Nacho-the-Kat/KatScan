import React from "react";
interface Token {
    tick: string;
    image?: string;
    price?: string;
    change?: number;
}
interface ListProps {
    title: string;
    icon?: React.ReactNode;
    legend?: string;
    legendRight?: boolean;
    tokens: Token[];
    maxItems?: number;
    showMoreUrl?: string;
    imageBaseUrl?: string;
    showPrice?: boolean;
}
declare const TokenList: React.FC<ListProps>;
export default TokenList;
