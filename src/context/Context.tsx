import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { stockId } from "../services/SymbolLookup";
import type { StockCardProps } from "../components/StockCard/StockCard";
import { searchCompanyProfile } from "../services/CompanyProfile";
import { getQuote } from "../services/Quote";
import type { CompanyNews } from "../services/CompanyNews";
import type { MarketNews } from "../services/MarketNews";

const defaultSymbols: string[] = [
    "AAPL", "MSFT", "NVDA", "GOOGL", "META", "AMZN", "AVGO", "ORCL", "AMD", "CRM", "PLTR",
    "JPM", "BAC", "WFC", "GS", "MS", "V", "MA", "AXP", "BLK", "SCHW",
    "LLY", "JNJ", "UNH", "ABBV", "MRK", "PFE", "ABT", "TMO", "AMGN", "ISRG",
    "XOM", "CVX", "COP", "EOG", "SLB", "OXY", "MPC", "PSX", "VLO", "HAL",
    "WMT", "COST", "HD", "MCD", "NKE", "SBUX", "TGT", "LOW", "KO", "PEP",
    "GE", "CAT", "DE", "HON", "UPS", "RTX", "BA", "LMT", "UNP", "ETN"
];

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

    loadedStocks: StockCardProps[];
    // Queue for stock symbols to be loaded
    stockQueue: string[];

    // Last searched Company News
    searchCompanyNews: CompanyNews[]

    // Last searched Market news
    searchMarketNews: MarketNews[]

    setSearchResultsContext: React.Dispatch<React.SetStateAction<stockId[]>>;
    setSearchStockCard: React.Dispatch<React.SetStateAction<StockCardProps | undefined>>;
    setStockCardMarkets: React.Dispatch<React.SetStateAction<Record<string, StockCardProps[]>>>;
    setWatchlist: React.Dispatch<React.SetStateAction<StockCardProps[]>>;
    setStockQueue: React.Dispatch<React.SetStateAction<string[]>>;
    setLoadedStocks: React.Dispatch<React.SetStateAction<StockCardProps[]>>;
    setSearchCompanyNews: React.Dispatch<React.SetStateAction<CompanyNews[]>>
    setSearchMarketNews: React.Dispatch<React.SetStateAction<MarketNews[]>>
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
    const [searchCompanyNews, setSearchCompanyNews] = useState<CompanyNews[]>([])
    const [searchMarketNews, setSearchMarketNews] = useState<MarketNews[]>([])

    const [symbolQueue, setSymbolQueue] = useState<string[]>(defaultSymbols);
    const [loadedStocks, setLoadedStocks] = useState<StockCardProps[]>([]);
    const [processing, setProcessing] = useState<boolean>(false);

    const queueRef = useRef(symbolQueue);
    queueRef.current = symbolQueue;

    useEffect(() => {
        queueRef.current = symbolQueue;
    });

    const loadStockNext = useCallback(async () => {
        if (queueRef.current.length == 0) {
            console.log('queue finished');
            setProcessing(false);
            return;
        }

        setProcessing(true);
        const symbol = queueRef.current[0];

        console.log(`processing: ${symbol}`);
        console.log('queue before: ', queueRef.current);

        let stockCard: StockCardProps = {
            stockId: { description: "", displaySymbol: "", symbol: symbol, type: "" },
            companyProfile: await searchCompanyProfile(symbol),
            quote: await getQuote(symbol),
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setLoadedStocks(prev => [...prev, stockCard]);
        setSymbolQueue(prevQueue => prevQueue.slice(1));
        setProcessing(false);

        console.log('finished');
    }, []);

    useEffect(() => {
        console.log('checking the queue for processing?')
        if (symbolQueue.length > 0 && !processing) {
            loadStockNext();
        }
        console.log('done checking the queue for processing?')

        console.log(loadedStocks);
    }, [symbolQueue.length, processing, loadStockNext]);


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
                setWatchlist,
                loadedStocks,
                setLoadedStocks,
                stockQueue: symbolQueue,
                setStockQueue: setSymbolQueue,
                searchCompanyNews,
                setSearchCompanyNews,
                searchMarketNews,
                setSearchMarketNews
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