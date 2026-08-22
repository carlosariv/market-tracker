import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol } from "../../services/SymbolLookup";
import { useSearchResults } from "../../context/Context";

function StockDetailPage() {
    // Storing and setting everything via context here
    const { searchResultsContext, setSearchResultsContext } = useSearchResults();

    const handleSearch = async (query: string) => {
        const listStockIds = await searchStockSymbol(query);

        setSearchResultsContext(listStockIds);
    };

    return (
        <>
            <div>
                <SearchBar
                    placeholder={"Apple"}
                    onSearch={handleSearch}
                />

                <ul className="stock-search-list">
                    {searchResultsContext.map((stock, index) => (
                        <li
                            className="stock-search-list-item"
                            key={index}
                        >
                            {stock.description} {stock.symbol} {stock.type}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                    
            </div>
        </>
    );
}

export default StockDetailPage;