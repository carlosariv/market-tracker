// Get information on the specific company base on symbol
// https://finnhub.io/docs/api/company-profile2

import finnhub from 'finnhub';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);


export interface CompanyProfile {
    ticker: string;
    name: string;
    country: string;
    currency: string;
    estimateCurrency?: string;
    exchange: string;
    ipo?: string;
    marketCapitalization: number;
    logo: string;
    shareOutstanding: number;
    finnhubIndustry: string;
    phone: string;
    weburl: string;
    floatingShare?: number;
}


function companyProfileRequest(query: string): Promise<CompanyProfile> {
    return new Promise((resolve, reject) => {
        finnhubClient.companyProfile2({symbol :query} , (error: any, data: any, response: any) => {
            if (error) {
                reject(error);        // error path -> becomes a rejection
            } else {
                resolve(data as CompanyProfile);        // success path -> becomes a resolved value
            }
        });
    })
}

export async function searchCompanyProfile(query: string): Promise<CompanyProfile> {
    try {
        const data = await companyProfileRequest(query)

        return data
    } catch (error) {
        throw error
    }
}

