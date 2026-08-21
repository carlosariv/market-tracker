import { useEffect, useState } from "react";
import StockCard from "../../components/StockCard/StockCard";

import "./TrackerPage.css"
import SearchBar from "../../components/SearchBar/SearchBar";
import { getQuote, type Quote } from "../../services/Quote";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";




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

    const [testStock, setTestStock] = useState<stockId | null>(null);
    const [testQuote, setTestQuote] = useState<Quote | null>(null);

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


    return (
        <div>

            <div className="market-overview">
                <span style={{ fontWeight: 600 }}>Market Overview</span>
                <span>API BUDGET 18/60 this minute</span>
            </div>

            <div className="filter-heading">
                <div>
                    <SearchBar
                        placeholder="Filter by company"
                        onSearch={(query) => { }}
                    />

                    <div className="filter-categories">
                        {
                            filterCategories.map(
                                (s) => <button className="category">{s}</button>
                            )
                        }
                    </div>
                </div>

                <select name="stock-sort" id="stock-sort-select"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                >
                    {sortOptions.map((opt) => <option value={opt} key={opt}>{opt}</option>)};
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
                {/* <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard>
                <StockCard symbol="AAPL" name="Apple inc." price={152.47}></StockCard> */}
            </div>
        </div>


    )
}