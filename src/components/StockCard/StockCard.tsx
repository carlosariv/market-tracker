import './StockCard.css';

import type { stockId } from '../../services/SymbolLookup';
import type { Quote } from '../../services/Quote';
import type { CompanyProfile } from '../../services/CompanyProfile';


export interface StockCardProps {
    stockId: stockId,
    quote: Quote,
    companyProfile?: CompanyProfile
}

export default function StockCardCompanyProfile({companyProfile,quote }:StockCardProps){
        return (
            <div className="company-profile">
            {companyProfile ? (
                <>
                    <div className="profile-header">
                        <img src={companyProfile.logo} alt={`${companyProfile.name} logo`} />
                        <h2>{companyProfile.name}</h2>
                    </div>

                    <h2 className="profile-ticker">
                        {companyProfile.ticker} · {companyProfile.exchange}
                    </h2>
                    {quote && (
                        <div className="quote-current">
                            <div className="quote-price">
                                <span>${quote.c.toFixed(2)}</span>
                            </div>

                            <div className={`quote-change ${quote.d >= 0 ? "positive" : "negative"}`}>
                                {quote.d >= 0 ? "+" : ""}
                                {quote.d.toFixed(2)}
                                {" "}
                                ({quote.dp >= 0 ? "+" : ""}
                                {quote.dp.toFixed(2)}%)
                            </div>
                        </div>
                    )}

                    <dl className="profile-grid">
                        <div>
                            <dt>Industry</dt>
                            <dd>{companyProfile.finnhubIndustry}</dd>
                        </div>
                        <div>
                            <dt>Market Cap</dt>
                            <dd>${companyProfile.marketCapitalization.toLocaleString()}M</dd>
                        </div>
                        <div>
                            <dt>Shares Out</dt>
                            <dd>{companyProfile.shareOutstanding.toLocaleString()}M</dd>
                        </div>
                        {/* <div>
                            <dt>IPO</dt>
                            <dd>{companyProfile.ipo}</dd>
                        </div>
                        <div>
                            <dt>Country</dt>
                            <dd>{companyProfile.country}</dd>
                        </div>
                        <div>
                            <dt>Phone</dt>
                            <dd>{companyProfile.phone}</dd>
                        </div> */}
                    </dl>

                    {/* <a
                        className="profile-link"
                        href={companyProfile.weburl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {companyProfile.weburl}
                    </a> */}
                </>
            ) : (
                <p className="profile-empty">Select a stock from the list to view its profile.</p>
            )}
        </div>
        )
}