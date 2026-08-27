// This is the best solution to getting an industry, finding by peers
// https://finnhub.io/docs/api/company-peers

import finnhub from 'finnhub';
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);

function getPeersRequest(symbol: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        finnhubClient.companyPeers(symbol, {}, (error: any, data:any, response:any) => {
            if (error) {
                reject(error);        
            } else {
                resolve(data);
            }
        })
    })
}

export async function getPeers(symbol:string): Promise<string[]> {
     try {
        const data = await getPeersRequest(symbol)
        console.log(data)
        return data
    } catch (error) {
        console.error('Quote search failed:', error);
        throw error;
    }
}