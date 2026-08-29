import { useEffect, useState } from "react";
import { useSearchResults } from "../../context/Context";
import './Watchlist.css'
import type { StockCardProps } from "../../components/StockCard/StockCard";
import StockCardCompanyProfile from "../../components/StockCard/StockCard";


function calculateEqualWeightPL(watchlist: StockCardProps[]): number {
    // Calculate equal weight profit loss avg(dp) percent
    if(watchlist.length == 0) return 0;
    var sum = 0;
    watchlist.forEach((s) => {
        sum += s.quote.dp
    })
    return sum / watchlist.length
}

function calculateMarketCapWeightedReturn(watchlist: StockCardProps[]): number {
    if(watchlist.length == 0) return 0;
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

function getBestPerformer(watchlist: StockCardProps[]): StockCardProps | undefined {
    let currentMax: StockCardProps | undefined = undefined
    watchlist.forEach((s) => {
        if (!currentMax || s.quote.dp > currentMax.quote.dp) {
            currentMax = s
        }
    })
    return currentMax
}

function getWorstPerformer(watchlist: StockCardProps[]): StockCardProps | undefined {
    if(watchlist.length == 0) return undefined
    let currentMin = watchlist[0]
    watchlist.forEach((s) => {
        if (!currentMin || s.quote.dp < currentMin.quote.dp) {
            currentMin = s
        }
    })
    return currentMin
}

export default function Watchlist() {
    const { watchlist } = useSearchResults();

    const [equalWeightPL, setEqualWeightPL] = useState(0)
    const [marketCapWeightedReturn, setMarketCapWeightedReturn] = useState(0)
    const [bestPerformer, setBestPerformer] = useState<StockCardProps | undefined>(undefined)
    const [worstPerformer, setWorstPerfomer] = useState<StockCardProps | undefined>(undefined)

    useEffect(() => {

        if (watchlist) {
            setEqualWeightPL(calculateEqualWeightPL(watchlist))
            setMarketCapWeightedReturn(calculateMarketCapWeightedReturn(watchlist))
            setBestPerformer(getBestPerformer(watchlist))
            setWorstPerfomer(getWorstPerformer(watchlist))
        }

    }, [watchlist])

    return (

        <div className="watchlist">
            <div className='page-header page-heading'>
                <h1>Watchlist</h1>
            </div>

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
                <div className="stat">
                    <span className="stat-label">Best Perfomer</span>
                    <span className={`stat-value`}>
                        {bestPerformer ? bestPerformer.stockId.symbol: "N/A"}
                    </span>
                </div>
                <div className="stat">
                    <span className="stat-label">Worst Perfomer</span>
                    <span className={`stat-value`}>
                        {worstPerformer ? worstPerformer.stockId.symbol  : "N/A"}
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