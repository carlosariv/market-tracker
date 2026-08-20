import { useState } from "react";

type SearchBarProps = {
    value: string;
    placeholder: string;
    onSearch: (query: string) => void;
}

export default function SearchBar({ value, placeholder = "Search ..", onSearch }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value = {value}
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}