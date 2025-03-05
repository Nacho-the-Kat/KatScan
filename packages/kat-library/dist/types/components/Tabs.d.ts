import React from "react";
interface TabItem {
    label: string;
    content: React.ReactNode;
}
interface TabsComponentProps {
    tabs: TabItem[];
}
declare const TabsComponent: React.FC<TabsComponentProps>;
export default TabsComponent;
