

import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";

function StockDetailPage(){
    const [searchResults, setSearchResults] = useState<stockId[]>([])

    const handleSearch = async (query: string) => {
        const listStockIds = await searchStockSymbol(query)
        setSearchResults(listStockIds)
    }
    return(
        <SearchBar placeholder={"Apple"} onSearch={searchStockSymbol}/>
    );
}


export default StockDetailPage;