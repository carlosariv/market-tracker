import type { CompanyNews } from "../../services/CompanyNews";
import './CompanyNews.css'

export type CompanyNewsCardProps = {
    news?: CompanyNews;
};

function formatDateTime(unixSeconds: number): string {
    return new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function CompanyNewsCard({ news }: CompanyNewsCardProps) {
    return (
        <div className="company-news">
            {news ? (
                <>
                    <div className="news-header">
                        {news.image && (
                            <img src={news.image} alt={news.headline} />
                        )}
                        <div>
                            <h2>{news.headline}</h2>
                            <span className="news-meta">
                                {news.source} · {formatDateTime(news.datetime)}
                            </span>
                        </div>
                    </div>

                    {news.summary && (
                        <p className="news-summary">{news.summary}</p>
                    )}

                    <a
                        className="news-link"
                        href={news.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read full story
                    </a>
                </>
            ) : (
                <p className="news-empty">No news available for this company.</p>
            )}
        </div>
    )
}
