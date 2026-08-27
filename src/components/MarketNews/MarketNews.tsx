import type { MarketNews } from "../../services/MarketNews";
import './MarketNews.css'

export type MarketNewsCardProps = {
    news?: MarketNews;
};

function formatDateTime(unixSeconds: number): string {
    return new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function MarketNewsCard({ news }: MarketNewsCardProps) {
    return (
        <div className="market-news">
            {news ? (
                <>
                    <div className="market-news-header">
                        {news.image && (
                            <img src={news.image} alt={news.headline} />
                        )}
                        <div>
                            {news.category && (
                                <span className="market-news-category">{news.category}</span>
                            )}
                            <h2>{news.headline}</h2>
                            <span className="market-news-meta">
                                {news.source} · {formatDateTime(news.datetime)}
                            </span>
                        </div>
                    </div>

                    {news.summary && (
                        <p className="market-news-summary">{news.summary}</p>
                    )}

                    <a
                        className="market-news-link"
                        href={news.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read full story
                    </a>
                </>
            ) : (
                <p className="market-news-empty">No market news available.</p>
            )}
        </div>
    )
}
