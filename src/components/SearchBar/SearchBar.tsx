import { useState } from "react";

import './SearchBar.css';
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
    placeholder: string;
    onSearch: (query: string) => Promise<any>
}

export default function SearchBar({
    placeholder = "Search ..",
    onSearch
}: SearchBarProps) {
    const [value, setValue] = useState("");
    return (

        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch(value);
                    }
                }}
            />
            <button
                type="submit"
                className="search-btn"
                onClick={(e) => {
                    onSearch(value);
                }}
            >
                <FaSearch/>
            </button>

            {/* <input
        /> */}

        </div>
    );
}