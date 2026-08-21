import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import StockCard from "../../components/StockCard/StockCard";

import "./TrackerPage.css"
import SearchBar from "../../components/SearchBar/SearchBar";

export default function TrackerPage() {
    const filterCategories : Array<string> = [
        "All",
        "Technology",
        "Financials",
        "Healthcare",
        "Energy",
        "Consumer",
        "Industrials"
    ];

    const sortOptions : Array<string> = [
        "Price",
        "Change",
        "Change %",
        "Volume"
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("Price");
    const [filterCategory, setFilterCategory] = useState("All");

    return (
        <div>
            <div className="market-overview">
                <span style = {{fontWeight:600}}>Market Overview</span>
                <span>API BUDGET 18/60 this minute</span>
            </div>

            <div className="filter-heading">
                <div>
                    <SearchBar
                        value={searchQuery}
                        placeholder="Filter by company"
                        onSearch={(query) => {
                            setSearchQuery(query);
                        }}
                    />

                    <div className="filter-categories">
                        {
                            filterCategories.map(
                                (category) => {
                                    return (
                                        <button 
                                            className={`category ${filterCategory==category ? "active-btn" : ""}`}
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
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
            </div>
        </div>


    )
}