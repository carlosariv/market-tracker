import React, { createContext, useContext, useState } from "react";
import type { stockId } from "../services/SymbolLookup";
import type { StockCardProps } from "../components/StockCard/StockCard";

// Stock Search Context
type StockSearchType = {
    // This stores the search list on stock detail
    searchResultsContext: stockId[];

    // Store the last company profile searched for stock detail
    searchStockCard: StockCardProps | undefined

    // Stores the trackerpagev2 stock grid
    // [industry][specific stock]
    stockCardMarkets: Record<string, StockCardProps[]>

    // Context watchlist
    watchlist: StockCardProps[]

    setSearchResultsContext: React.Dispatch<React.SetStateAction<stockId[]>>;
    setSearchStockCard: React.Dispatch<React.SetStateAction<StockCardProps | undefined>>;
    setStockCardMarkets: React.Dispatch<React.SetStateAction<Record<string, StockCardProps[]>>>;
    setWatchlist: React.Dispatch<React.SetStateAction<StockCardProps[]>>;
};

const StockSearchContext = createContext<StockSearchType | undefined>(
    undefined
);

export function SearchResultsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [searchResultsContext, setSearchResultsContext] = useState<stockId[]>([]);
    const [searchStockCard, setSearchStockCard] = useState<StockCardProps>();
    const [stockCardMarkets, setStockCardMarkets] = useState<Record<string, StockCardProps[]>>({});
    const [watchlist, setWatchlist] = useState<StockCardProps[]>([])
    return (
        <StockSearchContext.Provider
            value={{
                searchResultsContext,
                setSearchResultsContext,
                searchStockCard,
                setSearchStockCard,
                stockCardMarkets,
                setStockCardMarkets,
                watchlist,
                setWatchlist
            }}
        >
            {children}
        </StockSearchContext.Provider>
    );
}

export function useSearchResults() {
    const context = useContext(StockSearchContext);

    if (!context) {
        throw new Error(
            "useSearchResults must be used inside SearchResultsProvider"
        );
    }

    return context;
}