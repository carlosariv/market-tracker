import { useEffect, useState } from "react";
import { StockCardCompanyProfile, type StockCardProps } from "../../components/StockCard/StockCard";
import { useSearchResults } from "../../context/Context";
import './Watchlist.css'


function calculateEqualWeightPL(watchlist: StockCardProps[]): number {
    // Calculate equal weight profit loss avg(dp) percent
    var sum = 0;
    watchlist.forEach((s) => {
        sum += s.quote.dp
    })
    return sum / watchlist.length
}

function calculateMarketCapWeightedReturn(watchlist: StockCardProps[]): number {
    var sumMcapWeighted = 0
    var sumMcap = 0

    watchlist.forEach((s) => {
        if (s.companyProfile) {
            sumMcap += s.companyProfile.marketCapitalization
            sumMcapWeighted += s.companyProfile.marketCapitalization * s.quote.dp
        }
    })

    return sumMcapWeighted / sumMcap
}


export default function Watchlist() {
    const { watchlist } = useSearchResults();

    const [equalWeightPL, setEqualWeightPL] = useState(0)
    const [marketCapWeightedReturn, setMarketCapWeightedReturn] = useState(0)

    useEffect(() => {

        if(watchlist){
            setEqualWeightPL(calculateEqualWeightPL(watchlist))
            setMarketCapWeightedReturn(calculateMarketCapWeightedReturn(watchlist))
        }

    }, [watchlist])

    return (

        <div className="watchlist">
            <div className="portfolio-analysis">
                <div className="stat">
                    <span className="stat-label">Equal Weight P&L</span>
                    <span className={`stat-value ${equalWeightPL >= 0 ? "positive" : "negative"}`}>
                        {equalWeightPL > 0 ? "+" : ""}{equalWeightPL.toFixed(2)}%
                    </span>
                </div>
                <div className="stat">
                    <span className="stat-label">Mcap Weighted Return</span>
                    <span className={`stat-value ${marketCapWeightedReturn >= 0 ? "positive" : "negative"}`}>
                        {marketCapWeightedReturn > 0 ? "+" : ""}{marketCapWeightedReturn.toFixed(2)}%
                    </span>
                </div>
            </div>

            <div className="card-grid">
                {watchlist.map((s) => (
                    <StockCardCompanyProfile
                        key={s.stockId.symbol}
                        stockId={s.stockId}
                        companyProfile={s.companyProfile}
                        quote={s.quote} />
                ))}
            </div>

        </div>

    )
}