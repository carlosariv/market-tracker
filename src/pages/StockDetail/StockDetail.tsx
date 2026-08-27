import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";
import { useSearchResults } from "../../context/Context";
import { useState } from "react";
import { type CompanyProfile, searchCompanyProfile } from "../../services/CompanyProfile";
import './StockDetail.css'
import CompanyProfileCard from "../../components/CompanyProfile/CompanyProfile";
import { getQuote, type Quote } from "../../services/Quote";

function StockDetailPage() {
    // Storing and setting everything via context here
    const {
        searchResultsContext,
        setSearchResultsContext,
        searchStockCard,
        setSearchStockCard,
        watchlist,
        setWatchlist } = useSearchResults();

    const handleSearch = async (query: string) => {
        const listStockIds = await searchStockSymbol(query);
        setSearchResultsContext(listStockIds);
    };



    // Making each item on the list a clickable item
    const handleCompanyClick = async (stock: stockId) => {
        const companyProfile = await searchCompanyProfile(stock.symbol)
        const stockQuote = await getQuote(companyProfile.ticker)

        const stockCardProps = {stockId: stock, companyProfile: companyProfile, quote: stockQuote}
        setSearchStockCard(stockCardProps)

    }

    const handleAddAsset = () => {
        if(searchStockCard){
            setWatchlist(prev => ({...prev, searchStockCard}))
        }
        
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

            {searchStockCard ? (
                <CompanyProfileCard
                    companyProfile={searchStockCard.companyProfile}
                    quote={searchStockCard.quote}
                />
            ) : (<p className="profile-empty">Select a stock from the list to view its profile.</p>)}

            <button className="add-to-watchlist" onClick={handleAddAsset}>Add to Watchlist</button>
        </>
    );
}

export default StockDetailPage;

function setSearchQuote(stockQuote: Quote) {
    throw new Error("Function not implemented.");
}
