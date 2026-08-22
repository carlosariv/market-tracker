import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";
import { useSearchResults } from "../../context/Context";
import { useState } from "react";
import { type CompanyProfile, searchCompanyProfile } from "../../services/CompanyProfile";
import './StockDetail.css'
import CompanyProfileCard from "../../components/CompanyProfile/CompanyProfile";

function StockDetailPage() {
    // Storing and setting everything via context here
    const { searchResultsContext, setSearchResultsContext } = useSearchResults();

    const handleSearch = async (query: string) => {
        const listStockIds = await searchStockSymbol(query);

        setSearchResultsContext(listStockIds);
    };

    // Eventually throw all of this in context for persistent look up 
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile>()

    // Making each item on the list a clickable item
    const handleCompanyClick = async (stock: stockId) => {
        const companyProfile = await searchCompanyProfile(stock.symbol)
        console.log(companyProfile)
        setCompanyProfile(companyProfile)
    }

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
                            onClick={() => handleCompanyClick(stock)}
                        >
                            {stock.description} {stock.symbol}
                        </li>
                    ))}
                </ul>
            </div>

           <CompanyProfileCard companyProfile={companyProfile} />
        </>
    );
}

export default StockDetailPage;