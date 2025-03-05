import React from "react";
interface PillProps {
    label: string;
    color?: "primary" | "dark" | "gray" | "accent";
}
declare const Pill: React.FC<PillProps>;
export default Pill;
