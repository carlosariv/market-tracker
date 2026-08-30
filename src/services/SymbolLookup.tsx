// Used for looking up symbols 'apple' -> 'APPL'  
// https://finnhub.io/docs/api/symbol-search

import finnhub from 'finnhub';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);

// This interface and each element returned from the query has the same shape

export interface stockId {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string

}



function symbolSearchRequest(query: string): Promise<stockId[]> {
    return new Promise((resolve, reject) => {
        finnhubClient.symbolSearch(query, {exchange: 'US'}, (error: any, data: any, response: any) => {
            if (error) {
                reject(error);        // error path -> becomes a rejection
            } else {
                resolve(data.result as stockId[]);        // success path -> becomes a resolved value
            }
        });
    });
}

// Returna a list of stock ids
export async function searchStockSymbol(query: string): Promise<stockId[]> {
    try {
        const data = await symbolSearchRequest(query);
        return data
    } catch (err) {
        console.error('Symbol search failed:', err);
        throw err;
    }
}
