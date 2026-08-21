// Get current price update
// https://finnhub.io/docs/api/quote

import finnhub from 'finnhub';
import type { stockId } from './SymbolLookup';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);
/*
Response Attributes:

c Current price

d Change

dp Percent change

h High price of the day

l Low price of the day

o Open price of the day

pc Previous close price
*/

export interface quote {
  "c": number,
  "h": number,
  "l": number,
  "o": number,
  "pc": number,
  "t": number 
}


function getQuoteRequest(symbol:string): Promise<quote> {
    return new Promise((resolve, reject) => {
        finnhubClient.quote(symbol, {}, (error: any, data: any, response: any) => {
            if (error) {
                reject(error);        
            } else {
                resolve(data);
            }
        });
    })
}

export async function getQuote(symbol:string) : Promise<quote> {
    try {
        const data = await getQuoteRequest(symbol)
        return data
    } catch (error) {
        console.error('Quote search failed:', error);
        throw error;
    }
    
}