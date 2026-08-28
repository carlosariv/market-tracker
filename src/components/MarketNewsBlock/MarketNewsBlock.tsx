import { useEffect } from "react"
import { useSearchResults } from "../../context/Context"
import { getMarketNews } from "../../services/MarketNews"
import MarketNewsCard from "../MarketNews/MarketNews"
import './MarketNewsBlock.css'

export default function MarketNewsBlock({ category }: { category: string }) {
    const { searchMarketNews, setSearchMarketNews } = useSearchResults()
    console.log("Current news category "+category)
    useEffect(() => {
        const fetchMarketNews = async () => {
            try {
                // Load market news once on mount if not already in context per category
                
                if (!searchMarketNews[category]) {
                    console.log("No news for "+category)
                    const marketNews = await getMarketNews(category)
                    setSearchMarketNews(prev => ({ ...prev, [category]: marketNews }))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMarketNews();
    }, [category])


    return (
        <div className="market-news-block">
            {(searchMarketNews[category] ?? []).map((m) => (
                <MarketNewsCard key={m.id} news={m} />
            ))}
        </div>
    )
}