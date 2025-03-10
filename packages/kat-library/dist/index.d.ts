import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef } from '@tanstack/react-table';

interface AvatarProps {
    imageUrl?: string;
}
declare const Avatar: React.FC<AvatarProps>;

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

interface FavProps {
    checked?: boolean;
}
declare const Fav: React.FC<FavProps>;

interface CardProps {
    title: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Card: React.FC<CardProps>;

interface GridProps {
    children: React.ReactNode;
}
declare const Grid: React.FC<GridProps>;

interface HeaderProps {
    logoSrc: string;
    title: string;
    subtitle: string;
}
declare const Header: React.FC<HeaderProps>;

interface MenuItem {
    label: string;
    href?: string;
    children?: MenuItem[];
}
interface MenuProps {
    items: MenuItem[];
}
declare const MenuComponent: React.FC<MenuProps>;

interface PillProps {
    label: string;
    color?: "primary" | "dark" | "gray" | "accent";
}
declare const Pill: React.FC<PillProps>;

interface ProgressBarProps {
    value: number;
    color?: string;
}
declare const ProgressBar: React.FC<ProgressBarProps>;

interface SearchProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    onChange?: (query: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    suggestions?: {
        tick: string;
        image?: string;
    }[];
    showHint?: boolean;
    enableAutocomplete?: boolean;
}
declare const SearchComponent: React.FC<SearchProps>;

interface TableProps<T extends object> {
    columns: ColumnDef<T, unknown>[];
    data: T[];
    summaryText?: string;
    subText?: string;
}
declare const Table: <T extends object>({ columns, data, summaryText, subText }: TableProps<T>) => react_jsx_runtime.JSX.Element;

interface TabItem {
    label: string;
    content: React.ReactNode;
}
interface TabsComponentProps {
    tabs: TabItem[];
}
declare const TabsComponent: React.FC<TabsComponentProps>;

interface TitleProps {
    text: string;
}
declare const Title: React.FC<TitleProps>;

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

interface WidgetProps {
    value: string;
    icon?: React.ReactNode;
    legend?: string;
    onClick?: () => void;
}
declare const Widget: React.FC<WidgetProps>;

export { AffiliateComponent as Affiliates, Avatar, Card, Fav, Grid, Header, MenuComponent as Menu, Pill, ProgressBar, SearchComponent as Search, Table, TabsComponent as Tabs, Title, TokenList, Widget };
