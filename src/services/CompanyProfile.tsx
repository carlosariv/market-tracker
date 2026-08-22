// Get information on the specific company base on symbol
// https://finnhub.io/docs/api/company-profile2

import finnhub from 'finnhub';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);


export interface CompanyProfile {
    country: string;
    currency: string;
    exchange: string;
    ipo: string;
    marketCapitalization: number;
    name: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    weburl: string;
    logo: string;
    finnhubIndustry: string;
}


function companyProfileRequest(query: string): Promise<CompanyProfile> {
    return new Promise((resolve, reject) => {
        finnhubClient.symbolSearch(query, {}, (error: any, data: any, response: any) => {
            if (error) {
                reject(error);        // error path -> becomes a rejection
            } else {
                resolve(data.result as CompanyProfile);        // success path -> becomes a resolved value
            }
        });
    })
}

export async function searchCompanyProfile(query:string): Promise<CompanyProfile> {
    try {
        const data = await companyProfileRequest(query)
        return data
    } catch (error) {
        throw error
    }
}
    
