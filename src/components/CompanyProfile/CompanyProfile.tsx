import type { CompanyProfile } from "../../services/CompanyProfile";
import './CompanyProfile.css'

type CompanyProfileCardProps = {
    companyProfile?: CompanyProfile;   // optional, see below
};

export default function CompanyProfileCard({ companyProfile }: CompanyProfileCardProps) {
    return (
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
    )
}