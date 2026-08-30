import { describe, it, expect } from "vitest";
import { getMarketNews } from "../services/MarketNews";

describe("getMarketNews", () => {
  it("resolves at most 6 news items even if the API returns more", async () => {
    const news = await getMarketNews("technology");
    expect(news.length).toBe(6);
  });
});
