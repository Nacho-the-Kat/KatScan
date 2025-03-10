import React from "react";
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
export default SearchComponent;
