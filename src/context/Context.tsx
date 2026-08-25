import React, { createContext, useContext, useState } from "react";
import type { stockId } from "../services/SymbolLookup";
import type { Quote } from "../services/Quote";

// Stock Search Context
type StockSearchType = {
    searchResultsContext: stockId[];
    lastQuoteSearch: Quote | undefined;

    setSearchResultsContext: React.Dispatch<React.SetStateAction<stockId[]>>;
    setSearchQuote: React.Dispatch<
        React.SetStateAction<Quote | undefined>
    >;
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
    return (
        <StockSearchContext.Provider
            value={{
                searchResultsContext,
                setSearchResultsContext,
                lastQuoteSearch,
                setSearchQuote
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