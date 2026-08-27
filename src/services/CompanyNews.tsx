// get latest on company news 
// https://finnhub.io/docs/api/company-news

import finnhub from 'finnhub';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi(API_KEY);

