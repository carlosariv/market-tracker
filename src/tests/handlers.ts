import { http, HttpResponse } from "msw";

export const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export const handlers = [
  http.get(`${FINNHUB_BASE_URL}/search`, ({ request }) => {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    return HttpResponse.json({
      count: 1,
      result: [{ description: `${q.toUpperCase()} CO`, displaySymbol: q.toUpperCase(), symbol: q.toUpperCase(), type: "Common Stock" }],
    });
  }),

  http.get(`${FINNHUB_BASE_URL}/stock/profile2`, ({ request }) => {
    const symbol = new URL(request.url).searchParams.get("symbol") ?? "";
    return HttpResponse.json({
      ticker: symbol,
      name: `${symbol} Inc.`,
      country: "US",
      currency: "USD",
      exchange: "NASDAQ",
      marketCapitalization: 100000,
      logo: "",
      shareOutstanding: 1000,
      finnhubIndustry: "Technology",
      phone: "",
      weburl: "",
    });
  }),

  http.get(`${FINNHUB_BASE_URL}/quote`, () => {
    return HttpResponse.json({ c: 100, d: 1, dp: 1, h: 105, l: 95, o: 99, pc: 99, t: 1700000000 });
  }),

  http.get(`${FINNHUB_BASE_URL}/company-news`, ({ request }) => {
    const symbol = new URL(request.url).searchParams.get("symbol") ?? "";
    return HttpResponse.json([
      { category: "company", datetime: 1700000000, headline: `${symbol} news`, id: 1, image: "", related: symbol, source: "Wire", summary: "s", url: "https://example.com/1" },
    ]);
  }),

  http.get(`${FINNHUB_BASE_URL}/news`, ({ request }) => {
    const category = new URL(request.url).searchParams.get("category") ?? "";
    // Returns more than 6 on purpose to check that getMarketNews() truncates.
    return HttpResponse.json(
      Array.from({ length: 8 }, (_, i) => ({
        category, datetime: 1700000000 + i, headline: `headline ${i}`, id: i, image: "", related: "", source: "Wire", summary: "s", url: `https://example.com/${i}`,
      }))
    );
  }),
];
