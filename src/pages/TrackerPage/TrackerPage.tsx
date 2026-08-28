import { useEffect, useState } from "react";
import StockCard, { StockCardCompanyProfile, type StockCardProps } from "../../components/StockCard/StockCard";

import { getQuote, type Quote } from "../../services/Quote";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";

import "./TrackerPage.css"
import { getPeers } from "../../services/FindPeers";
import { searchCompanyProfile } from "../../services/CompanyProfile";
import { useSearchResults } from "../../context/Context";
import MarketNewsBlock from "../../components/MarketNewsBlock/MarketNewsBlock";

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
        "Alphabet",
        "Price",
        "Change",
        "Change %",
    ];

    const [sortOption, setSortOption] = useState("Alphabet");
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

    const sorter: (a: StockCardProps, b: StockCardProps) => number = (() => {
        switch (sortOption) {
            default:
            case "Alphabet":
                return (a: StockCardProps, b: StockCardProps): number => {
                    return a.companyProfile!.name.localeCompare(b.companyProfile!.name);
                }
            case "Price":
                return (a: StockCardProps, b: StockCardProps): number => {
                    return b.quote.c - a.quote.c;
                };
            case "Change":
                return (a: StockCardProps, b: StockCardProps): number => {
                    return b.quote.d - a.quote.d;
                }
            case "Change %":
                return (a: StockCardProps, b: StockCardProps): number => {
                    return b.quote.dp - a.quote.dp;
                }
        }
    })();

    const visibleCards: StockCardProps[] = loadedStocks
        .filter((card) => filterCategory=="All" || (card.companyProfile?.finnhubIndustry===filterCategory))
        .sort(sorter)
        .slice(cardIndexStart, cardIndexEnd);

    return (
        <div>
            <section className="market-header">

                {/* Title */}
                <div className="market-overview">
                    <h1>Market Overview</h1>

                    <span className="api-budget">
                        API Budget{" "}
                        <strong>{18}</strong>
                    </span>
                </div>

                {/* Filters + Sorting */}
                <div className="filter-heading">

                    <div className="filter-categories">
                        {filterCategories.map((category) => (
                            <button
                                type="button"
                                className={`filter-btn ${filterCategory === category
                                        ? "active-filter"
                                        : ""
                                    }`}
                                key={category}
                                onClick={() => setFilterCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <label className="sort-container">
                        <select
                            name="stock-sort"
                            id="stock-sort-select"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            aria-label="Sort stocks"
                        >
                            {sortOptions.map((option) => (
                                <option value={option} key={option}>
                                    Sort: {option}
                                </option>
                            ))}
                        </select>

                        <span className="sort-arrow">⌄</span>
                    </label>

                </div>
            </section>

            {/* <div className="market-overview">
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
            </div> */}

            <div className="card-grid">
                {
                    visibleCards.map((card) => (
                        <StockCardCompanyProfile key={card.stockId.symbol} stockId={card.stockId} companyProfile={card.companyProfile} quote={card.quote} />
                    ))
                }

            </div>

            <div className="pagination-container">
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

            <MarketNewsBlock category={filterCategory} />
            
        </div>
    )
}