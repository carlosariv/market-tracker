import { createContext, useContext, useState } from "react";
import type { stockId } from "../services/SymbolLookup";


// Stock Search Context
type StockSearchType = {
    searchResults: stockId[];
    setSearchResults: React.Dispatch<React.SetStateAction<stockId[]>>;
};

const StockSearchContext = createContext<StockSearchType | undefined>(
    undefined
);

export function SearchResultsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [searchResults, setSearchResults] = useState<stockId[]>([]);

    return (
        <StockSearchContext.Provider
            value={{ searchResults, setSearchResults }}
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