// Get latest on market news
// https://finnhub.io/docs/api/market-news

import finnhub from 'finnhub';
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);

export interface MarketNews {
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

function marketNewsRequest(category: string): Promise<MarketNews[]> {
    return new Promise((resolve, reject) => {
        finnhubClient.marketNews(category, {}, (error: any, data:any, response:any) => {
            if (error) {
                reject(error);        
            } else {
                resolve(data.slice(0,6));
            }
        })
    })
}

export async function getMarketNews(category:string): Promise<MarketNews[]> {
     try {
        const data = await marketNewsRequest(category)
        console.log(data)
        return data
    } catch (error) {
        console.error('Quote search failed:', error);
        throw error;
    }
}