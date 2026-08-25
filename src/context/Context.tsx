import React, { createContext, useContext, useState } from "react";
import type { stockId } from "../services/SymbolLookup";
import type { Quote } from "../services/Quote";
import type { StockCardProps } from "../components/StockCard/StockCard";

// Stock Search Context
type StockSearchType = {
    searchResultsContext: stockId[];
    lastQuoteSearch: Quote | undefined;

    // [industry][specific stock]
    stockCardMarkets: Record<string, StockCardProps[]>

    setSearchResultsContext: React.Dispatch<React.SetStateAction<stockId[]>>;
    setSearchQuote: React.Dispatch<
        React.SetStateAction<Quote | undefined>
    >;

    setStockCardMarkets: React.Dispatch<React.SetStateAction<Record<string, StockCardProps[]>>>;
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
    const [lastQuoteSearch, setSearchQuote] = useState<Quote>();
    const [stockCardMarkets, setStockCardMarkets] = useState<Record<string, StockCardProps[]>>({});
    return (
        <StockSearchContext.Provider
            value={{
                searchResultsContext,
                setSearchResultsContext,
                lastQuoteSearch,
                setSearchQuote,
                stockCardMarkets,
                setStockCardMarkets
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