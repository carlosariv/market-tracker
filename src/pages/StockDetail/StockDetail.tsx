

import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";

function StockDetailPage() {
    const [searchResults, setSearchResults] = useState<stockId[]>([])

    useEffect(() => {
        

        console.log(searchResults)
    }, [searchResults])

    const handleSearch = async (query: string) => {
        const listStockIds = await searchStockSymbol(query)
        setSearchResults(listStockIds)
    }
    return (
        <>
            <div>
                <SearchBar placeholder={"Apple"} onSearch={handleSearch} />

                <ul className="stock-search-list">
                    {searchResults.map((stock, index) => (
                        <li className="stock-search-list-item" key={index}>
                            {stock.description} {stock.symbol} {stock.type}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}


export default StockDetailPage;