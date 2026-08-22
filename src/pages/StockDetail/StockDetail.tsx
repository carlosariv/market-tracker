import SearchBar from "../../components/SearchBar/SearchBar";
import { searchStockSymbol, type stockId } from "../../services/SymbolLookup";
import { useSearchResults } from "../../context/Context";
import { useState } from "react";
import { type CompanyProfile, searchCompanyProfile } from "../../services/CompanyProfile";
import './StockDetail.css'

function StockDetailPage() {
    // Storing and setting everything via context here
    const { searchResultsContext, setSearchResultsContext } = useSearchResults();

    const handleSearch = async (query: string) => {
        const listStockIds = await searchStockSymbol(query);

        setSearchResultsContext(listStockIds);
    };

    // Eventually throw all of this in context for persistent look up 
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile>()

    // Making each item on the list a clickable item
    const handleCompanyClick = async (stock: stockId) => {
        const companyProfile = await searchCompanyProfile(stock.symbol)
        console.log(companyProfile)
        setCompanyProfile(companyProfile)
    }

    return (
        <>
            <div>
                <SearchBar
                    placeholder={"Apple"}
                    onSearch={handleSearch}
                />

                <ul className="stock-search-list">
                    {searchResultsContext.map((stock, index) => (
                        <li
                            className="stock-search-list-item"
                            key={index}
                            onClick={() => handleCompanyClick(stock)}
                        >
                            {stock.description} {stock.symbol}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="company-profile">
                {companyProfile ? (
                    <>
                        <div className="profile-header">
                            <img src={companyProfile.logo} alt={`${companyProfile.name} logo`} />
                            <div>
                                <h2>{companyProfile.name}</h2>
                                <span className="profile-ticker">
                                    {companyProfile.ticker} · {companyProfile.exchange}
                                </span>
                            </div>
                        </div>

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
                            <div>
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
                            </div>
                        </dl>

                        <a
                            className="profile-link"
                            href={companyProfile.weburl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {companyProfile.weburl}
                        </a>
                    </>
                ) : (
                    <p className="profile-empty">Select a stock from the list to view its profile.</p>
                )}
            </div>
        </>
    );
}

export default StockDetailPage;