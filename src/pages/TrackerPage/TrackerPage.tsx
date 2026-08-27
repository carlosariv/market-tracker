import { useEffect, useState } from "react";
import StockCard, { StockCardCompanyProfile, type StockCardProps } from "../../components/StockCard/StockCard";

import { getQuote, type Quote } from "../../services/Quote";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";

import "./TrackerPage.css"
import { getPeers } from "../../services/FindPeers";
import { searchCompanyProfile } from "../../services/CompanyProfile";
import { useSearchResults } from "../../context/Context";

export function TrackerPage() {
    // TODO: Make categories map to specific industries when filtering. e.g Technology emcompasses Bio-Technology.
    // Or does finnhub have a option for that?
    const filterCategories: Array<string> = [
        "All",
        "Banking",
        "Technology",
        "Financial Services",
        "Health Care",
        "Energy",
        "Retail",
        "Industrials",
        "Other"
    ];

    const sortOptions: Array<string> = [
        "Price",
        "Change",
        "Change %",
        "Volume"
    ];

    const [sortOption, setSortOption] = useState("Price");
    const [filterCategory, setFilterCategory] = useState("All");
    const [testStock, setTestStock] = useState<stockId | null>(null);
    const [testQuote, setTestQuote] = useState<Quote | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { stockCardMarkets, setStockCardMarkets, loadedStocks} = useSearchResults();

    const paginationSize = 3;
    const cardsPerPage = 15;
    const pagesAvailable = (loadedStocks.length / cardsPerPage) + 1;
    const cardIndexStart = cardsPerPage * (currentPage - 1);
    const cardIndexEnd   = Math.min(cardIndexStart + cardsPerPage, loadedStocks.length - 1);

    const visibleCards: StockCardProps[] = loadedStocks
        .filter((card) => filterCategory=="All" || (card.companyProfile?.finnhubIndustry===filterCategory))
        .sort((a: StockCardProps, b: StockCardProps) : number => {
            // TODO: Sort handlers
            return b.quote.pc - a.quote.pc;
        })
        .slice(cardIndexStart, cardIndexEnd);

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
                        setSortOption(e.target.value);
                    }}
                >
                    {
                        sortOptions.map((opt) => <option value={opt} key={opt}>Sort: {opt}</option>)
                    };
                </select>
            </div>

            <div className="card-grid">
                {
                    visibleCards.map((card) => (
                        <StockCardCompanyProfile key={card.stockId.symbol} stockId={card.stockId} companyProfile={card.companyProfile} quote={card.quote} />
                    ))
                }

            </div>

            <div className="d-center">
                <button 
                    className="btn"
                    onClick={(e) => {
                        if (currentPage > 1) {
                            setCurrentPage(prev => prev-1);
                        }
                    }
                }> L </button>

                {
                    Array.from({ length: paginationSize }, (_, index) => Math.max(1, currentPage - 1) + index)
                        .map((page) =>
                            <button
                                key={page}
                                onClick={(e) => {
                                    setCurrentPage(page);
                                }}
                                className={`btn ${page == currentPage ? "active-btn" : ""}`}
                            >{page}</button>)
                }

                <button
                    className="btn"
                    onClick={(e) => {
                        if (currentPage < pagesAvailable - 1) {
                            setCurrentPage(prev => prev + 1);
                        }
                    }
                }> R </button>
            </div>
        </div>
    )
}