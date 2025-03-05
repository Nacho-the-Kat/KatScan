import React from "react";
interface MenuItem {
    label: string;
    href?: string;
    children?: MenuItem[];
}
interface MenuProps {
    items: MenuItem[];
}
declare const MenuComponent: React.FC<MenuProps>;
export default MenuComponent;
