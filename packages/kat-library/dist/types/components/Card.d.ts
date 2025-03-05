import React from "react";
interface CardProps {
    title: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Card: React.FC<CardProps>;
export default Card;
