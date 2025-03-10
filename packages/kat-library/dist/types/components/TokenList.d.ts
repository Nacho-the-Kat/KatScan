import React from "react";
interface Token {
    tick: string;
    id?: string | number;
    image?: string;
    price?: string;
    change?: number;
    pillLabel?: string;
    pillStyle?: "primary" | "dark" | "gray" | "accent";
    tokenLink?: string;
}
interface ListProps {
    title: string;
    icon?: React.ReactNode;
    legend?: string;
    tokens: Token[];
    maxItems?: number;
    showMoreUrl?: string;
    showPrice?: boolean;
}
declare const TokenList: React.FC<ListProps>;
export default TokenList;
