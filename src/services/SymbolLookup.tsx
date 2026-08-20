// Used for looking up symbols 'apple' -> 'APPL'  
// https://finnhub.io/docs/api/symbol-search
const API_KEY = import.meta.env.FINNHUB_API_KEY


import finnhub from 'finnhub';

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = API_KEY
const finnhubClient = new finnhub.DefaultApi()

export async function searchStockSymbol(query: string): Promise<any> {
    finnhubClient.symbolSearch('AAPL', (error: any, data: any, response: any) => {
        console.log("Checking types")
        console.log(typeof (error))
        console.log(typeof (data))
        console.log(typeof (response))

        console.log("Look at content")

        console.log(error)
        console.log(data)
        console.log(response)
    });
}








// const BASE_URL = 'https://finnhub.io/api/v1'

// export interface SymbolResult {
//   description: string
//   displaySymbol: string
//   symbol: string
//   type: string
// }

// export async function symbolSearch(query: string): Promise<SymbolResult[]> {
//   const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&token=${API_KEY}`

//   const response = await fetch(url)

//   if (response.status === 429) {
//     throw new Error('Rate limit hit (60 calls/min on free tier). Wait a minute and retry.')
//   }
//   if (!response.ok) {
//     throw new Error(`Symbol search failed (${response.status})`)
//   }

//   const data: { count: number; result: SymbolResult[] } = await response.json()
//   return data.result
// }