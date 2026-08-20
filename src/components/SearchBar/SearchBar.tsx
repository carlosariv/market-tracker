import { useState } from "react";

type SearchBarProps = {
    placeholder: string;
    onSearch: (query: string) => void;
}

export default function SearchBar({
    placeholder = "Search ..",
    onSearch
}: SearchBarProps) {
    const [value, setValue] = useState("");
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onSearch(value);
                }
            }}
        />
    );
}