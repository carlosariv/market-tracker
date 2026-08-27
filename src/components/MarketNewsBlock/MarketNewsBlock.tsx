import { useEffect } from "react"
import { useSearchResults } from "../../context/Context"
import { getMarketNews } from "../../services/MarketNews"
import MarketNewsCard from "../MarketNews/MarketNews"

export default function MarketNewsBlock({ category }: { category: string }) {
    const { searchMarketNews, setSearchMarketNews } = useSearchResults()

    useEffect(() => {
        const fetchMarketNews = async () => {
            try {
                // Load market news once on mount if not already in context per category
                if (!searchMarketNews[category]) {
                    const marketNews = await getMarketNews(category)
                    setSearchMarketNews(prev => ({ ...prev, [category]: marketNews }))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMarketNews();
    }, [])


    return (
        <div className="market-news-block">
            {(searchMarketNews[category] ?? []).map((m) => (
                <MarketNewsCard key={m.id} news={m} />
            ))}
        </div>
    )
}