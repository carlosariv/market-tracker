

import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol } from "../../services/SymbolLookup";

function StockDetailPage(){
    return(
        <SearchBar value={""} placeholder={""} onSearch={function (query: string): void {
            throw new Error("Function not implemented.");
        } }/>
    );
}


export default StockDetailPage;