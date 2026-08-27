// get latest on company news 
// https://finnhub.io/docs/api/company-news

import finnhub from 'finnhub';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);


export interface CompanyNews {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}


function companyNewsRequest(symbol: string, startDate: string, endDate: string): Promise<CompanyNews[]> {
    return new Promise((resolve, reject) => {
        finnhubClient.companyNews(symbol, startDate, endDate, (error: any, data: any, response: any) => {
            if (error) {
                reject(error);
            } else {
                console.log(data)
                resolve(data);
            }
        })
    })
}

export async function getCompanyNews(symbol: string, startDate: string, endDate: string): Promise<CompanyNews[]> {
    try {
        const data = await companyNewsRequest(symbol, startDate, endDate)
        console.log(data)
        return data
    } catch (error) {
        console.error('Company news search failed:', error);
        throw error;
    }
}