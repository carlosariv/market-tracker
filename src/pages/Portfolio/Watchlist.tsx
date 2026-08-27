import { useEffect } from "react";
import { StockCardCompanyProfile, type StockCardProps } from "../../components/StockCard/StockCard";
import { useSearchResults } from "../../context/Context";
import './Watchlist.css'


function equalWeightPL(watchlist: StockCardProps[]): number {
    // Calculate equal weight profit loss avg(dp) percent
    var sum = 0;
    watchlist.forEach((s) => {
        sum += s.quote.dp
    })
    return sum / watchlist.length
}

function marketCapWeightedReturn(watchlist: StockCardProps[]): number {
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

    useEffect(() => {

    }, [watchlist])

    return (

        <div className="watchlist">
            <div className="portfolio-analysis">

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