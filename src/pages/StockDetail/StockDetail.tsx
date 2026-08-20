

import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol } from "../../services/SymbolLookup";

function StockDetailPage(){
    return(
        <SearchBar placeholder={"Apple"} onSearch={searchStockSymbol}/>
    );
}


export default StockDetailPage;