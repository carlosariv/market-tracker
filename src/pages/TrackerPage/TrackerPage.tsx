import { useEffect, useState } from "react";

import "./TrackerPage.css"
import { useSearchResults } from "../../context/Context";
import MarketNewsBlock from "../../components/MarketNewsBlock/MarketNewsBlock";
import type { StockCardProps } from "../../components/StockCard/StockCard";
import StockCardCompanyProfile from "../../components/StockCard/StockCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export function TrackerPage() {
    const filterCategories: Array<string> = [
        "All",
        "Banking",
        "Technology",
        "Financial Services",
        "Health Care",
        "Energy",
        "Retail",
    ];

    const sortOptions: Array<string> = [
        "Name",
        "Price",
        "Change",
        "Change %",
    ];

    const [sortOption, setSortOption] = useState("Name");
    const [filterCategory, setFilterCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const { loadedStocks } = useSearchResults();

    const sorter: (a: StockCardProps, b: StockCardProps) => number = (() => {
        switch (sortOption) {
            default:
            case "Name":
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
        .filter((card) => filterCategory=="All" || (card.companyProfile?.finnhubIndustry===filterCategory));

    const cardsPerPage = 15;
    const pagesAvailable = Math.trunc(visibleCards.length / cardsPerPage) + 1;
    const cardIndexStart = cardsPerPage * (currentPage - 1);
    const cardIndexEnd   = Math.min(cardIndexStart + cardsPerPage, visibleCards.length);

    const pageStart = Math.max(currentPage - 1, 1);
    const pageEnd = Math.min(currentPage + 1, pagesAvailable);

    const pageCards: StockCardProps[] = visibleCards
        .sort(sorter)
        .slice(cardIndexStart, cardIndexEnd);

    return (
        <div>
            <section className="page-header">

                {/* Title */}
                <div className="page-heading">
                    <h1>Market Overview</h1>
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
                                onClick={() => {
                                    setFilterCategory(category)
                                    setCurrentPage(1);
                                }}
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
                            onChange={(e) => {
                                setSortOption(e.target.value)
                                setCurrentPage(1);
                            }}
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

            <div className="card-grid">
                {
                    pageCards.map((card) => (
                        <StockCardCompanyProfile key={card.stockId.symbol} stockId={card.stockId} companyProfile={card.companyProfile} quote={card.quote} />
                    ))
                }

            </div>

            <div className="pagination-container">
                <button 
                    className="btn"
                    disabled={ currentPage == 1 }
                    onClick={(e) => {
                        setCurrentPage(prev => prev - 1);
                    }}
                >
                    <FaAngleLeft/>
                </button>

                {
                    Array.from({ length: pageEnd-pageStart + 1 }, (_, index) => pageStart + index)
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
                    disabled={ currentPage >= pagesAvailable-1 }
                    onClick={(e) => {
                        setCurrentPage(prev => prev + 1);
                    }}
                >
                    <FaAngleRight style={{fontWeight: "100"}}/>
                </button>
            </div>

            <MarketNewsBlock category={filterCategory} />
            
        </div>
    )
}