// Get latest on market news
// https://finnhub.io/docs/api/market-news

import finnhub from 'finnhub';
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);

