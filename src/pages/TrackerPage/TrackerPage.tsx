import { useEffect, useState } from "react";
import StockCard, { StockCardCompanyProfile, type StockCardProps } from "../../components/StockCard/StockCard";

import { getQuote, type Quote } from "../../services/Quote";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";

import "./TrackerPage.css"
import { getPeers } from "../../services/FindPeers";
import { searchCompanyProfile } from "../../services/CompanyProfile";
import { useSearchResults } from "../../context/Context";


export default function TrackerPage() {
    const filterCategories: Array<string> = [
        "All",
        "Technology",
        "Financials",
        "Healthcare",
        "Energy",
        "Consumer",
        "Industrials"
    ];

    const sortOptions: Array<string> = [
        "Price",
        "Change",
        "Change %",
        "Volume"
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("Price");
    const [filterCategory, setFilterCategory] = useState("All");
    const [testStock, setTestStock] = useState<stockId | null>(null);
    const [testQuote, setTestQuote] = useState<Quote | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const paginationSize = 3;

    useEffect(() => {
        const loadTestCard = async () => {
            try {
                const results = await searchStockSymbol('apple');
                const stockId = results[0];                        // one stockId
                const quote = await getQuote(stockId.symbol);      // one Quote
                setTestStock(stockId);
                setTestQuote(quote);

                console.log(stockId)
                console.log(quote)
            } catch (err) {
                console.error('Failed to load test card:', err);
            }
        };
        loadTestCard();
    }, []);   // empty array = run once after first render

    let maxPages = 10;

    return (
        <div>
            <div className="market-overview">
                <span style={{ fontWeight: 600, fontSize: "24px" }}>Market Overview</span>
                <span>API BUDGET 18/60 this minute</span>
            </div>

            <div className="filter-heading">
                <div>
                    <div className="filter-categories">
                        {
                            filterCategories.map(
                                (category) => {
                                    return (
                                        <button
                                            className={`btn ${filterCategory == category ? "active-btn" : ""}`}
                                            key={category}
                                            value={category}
                                            onClick={(e) => {
                                                console.log(e.currentTarget.value);
                                                setFilterCategory(e.currentTarget.value);
                                            }}
                                        >{category}</button>
                                    );
                                }
                            )
                        }
                    </div>
                </div>

                <select
                    name="stock-sort"
                    id="stock-sort-select"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                >
                    {
                        sortOptions.map((opt) => <option value={opt} key={opt}>Sort: {opt}</option>)
                    };
                </select>
            </div>

            <div className="card-grid">
                {testStock && testQuote && (
                    <>
                        <StockCard stockId={testStock} quote={testQuote} />
                        <StockCard stockId={testStock} quote={testQuote} />
                        <StockCard stockId={testStock} quote={testQuote} />
                        <StockCard stockId={testStock} quote={testQuote} />
                    </>
                )}
            </div>

            <div className="d-center">
                {
                    Array.from({ length: paginationSize }, (_, index) => Math.max(1, currentPage - 1) + index)
                        .map((page) =>
                            <button
                                key={page}
                                onClick={(e) => {
                                    setCurrentPage(page);
                                    console.log(page);
                                }}
                                className={`btn ${page == currentPage ? "active-btn" : ""}`}
                            >{page}</button>)
                }
            </div>
        </div>
    )
}


export function TrackerPageV2() {
    const filterCategories: Array<string> = [
        "All",
        "Technology",
        "Financials",
        "Healthcare",
        "Energy",
        "Consumer",
        "Industrials"
    ];

    const sortOptions: Array<string> = [
        "Price",
        "Change",
        "Change %",
        "Volume"
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("Price");
    const [filterCategory, setFilterCategory] = useState("All");
    const [testStock, setTestStock] = useState<stockId | null>(null);
    const [testQuote, setTestQuote] = useState<Quote | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const paginationSize = 3;
    const { stockCardMarkets, setStockCardMarkets } = useSearchResults();
    useEffect(() => {
        const loadTestCard = async () => {
            // console.log(stockCardMarkets['APPL'].forEach((p) => console.log(p)))
            console.log(stockCardMarkets['PLTR'])
            if (!stockCardMarkets['PLTR']) {
                try {
                    console.log("Loading apple peers")
                    const peers = await getPeers('PLTR')
                    console.log(peers)


                    const stockCards: StockCardProps[] = []

                    // Collect all relavant data for each stock card
                    for (const p of peers) {
                        stockCards.push({
                            stockId: { description: "", displaySymbol: "", symbol: p, type: "" },
                            companyProfile: await searchCompanyProfile(p),
                            quote: await getQuote(p),
                        });
                    }

                    // Getting variables from context and setting 

                    stockCardMarkets['PLTR'] = stockCards
                    setStockCardMarkets(prev => ({ ...prev, PLTR: stockCards }));
                } catch (err) {
                    console.error('Failed to load test card:', err);
                }
            }

        };
        loadTestCard();
    }, []);   // empty array = run once after first render

    let maxPages = 10;

    return (
        <div>
            <div className="market-overview">
                <span style={{ fontWeight: 600, fontSize: "24px" }}>Market Overview</span>
                <span>API BUDGET 18/60 this minute</span>
            </div>

            <div className="filter-heading">
                <div>
                    <div className="filter-categories">
                        {
                            filterCategories.map(
                                (category) => {
                                    return (
                                        <button
                                            className={`btn ${filterCategory == category ? "active-btn" : ""}`}
                                            key={category}
                                            value={category}
                                            onClick={(e) => {
                                                console.log(e.currentTarget.value);
                                                setFilterCategory(e.currentTarget.value);
                                            }}
                                        >{category}</button>
                                    );
                                }
                            )
                        }
                    </div>
                </div>

                <select
                    name="stock-sort"
                    id="stock-sort-select"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                >
                    {
                        sortOptions.map((opt) => <option value={opt} key={opt}>Sort: {opt}</option>)
                    };
                </select>
            </div>

            <div className="card-grid">

                {(stockCardMarkets['PLTR'] ?? []).map((p) => (
                    <StockCardCompanyProfile key={p.stockId.symbol} stockId={p.stockId} companyProfile={p.companyProfile} quote={p.quote} />
                ))}

            </div>

            <div className="d-center">
                {
                    Array.from({ length: paginationSize }, (_, index) => Math.max(1, currentPage - 1) + index)
                        .map((page) =>
                            <button
                                key={page}
                                onClick={(e) => {
                                    setCurrentPage(page);
                                    console.log(page);
                                }}
                                className={`btn ${page == currentPage ? "active-btn" : ""}`}
                            >{page}</button>)
                }
            </div>
        </div>
    )
}