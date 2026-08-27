import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { stockId } from "../services/SymbolLookup";
import type { StockCardProps } from "../components/StockCard/StockCard";
import { searchCompanyProfile } from "../services/CompanyProfile";
import { getQuote } from "../services/Quote";
import { PriorityQueue } from "@datastructures-js/priority-queue";

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
    symbolQueue: PriorityQueue<SymbolRequest>;

    requestStock : (symbol: string, priority: number) => void;
    setSearchResultsContext: React.Dispatch<React.SetStateAction<stockId[]>>;
    setSearchStockCard: React.Dispatch<React.SetStateAction<StockCardProps | undefined>>;
    setStockCardMarkets: React.Dispatch<React.SetStateAction<Record<string, StockCardProps[]>>>;
    setWatchlist: React.Dispatch<React.SetStateAction<StockCardProps[]>>;
    setLoadedStocks: React.Dispatch<React.SetStateAction<StockCardProps[]>>;
};

type SymbolRequest = {
    symbol: string;
    priority: number;
}

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

    const processingRef = useRef(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [queueVersion, setQueueVersion] = useState(0);
    const symbolQueue = useRef(
        new PriorityQueue<SymbolRequest>(
            (a: SymbolRequest, b: SymbolRequest) => {
                return b.priority - a.priority;
            },
            defaultSymbols.map((s: string) => { return { symbol: s, priority: 1 } })
        )
    );

    const [loadedStocks, setLoadedStocks] = useState<StockCardProps[]>([]);

    function requestStock(symbol: string, priority: number = 0) {
        //NOTE: Don't load a stock if already loaded
        if (loadedStocks.some((stock: StockCardProps, index: number, array: StockCardProps[]) => stock.stockId.symbol == symbol)) {
            return;
        }

        symbolQueue.current.push({symbol, priority});
        setQueueVersion(prev => prev + 1);
        console.log(`requesting ${symbol}`);
        console.log(`new queue size ${symbolQueue.current.size()}`);
    }

    const loadStockNext = useCallback(async () => {
        if (processingRef.current) {
            return;
        }

        if (symbolQueue.current.isEmpty()) {
            console.log('queue finished');
            return;
        }

        processingRef.current = true;
        setProcessing(true);
        const symbolReq = symbolQueue.current.front()!;

        console.log(`processing: ${symbolReq.symbol}`);

        try {
            symbolQueue.current.pop();

            let stockCard: StockCardProps = {
                stockId: { description: "", displaySymbol: "", symbol: symbolReq.symbol, type: "" },
                companyProfile: await searchCompanyProfile(symbolReq.symbol),
                quote: await getQuote(symbolReq.symbol)
            };

            console.log(symbolQueue.current.size());

            //NOTE: Delay only if priority is low
            if (symbolReq.priority < 10) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            setLoadedStocks(prev => [...prev, stockCard]);
        } catch (e) {
        } finally {
            processingRef.current = false;
            setProcessing(false);
        }
    }, []);

    useEffect(() => {
        console.log(`processing: ${processing}`);
        if (!symbolQueue.current.isEmpty()) {
            loadStockNext();
        }
    }, [processing, queueVersion, loadStockNext]);

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
                symbolQueue: symbolQueue.current,
                requestStock,
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