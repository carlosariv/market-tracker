import { describe, it, expect } from "vitest";
import { getCompanyNews } from "../services/CompanyNews";

describe("getCompanyNews", () => {
  it("resolves a list of news items for a symbol", async () => {
    const news = await getCompanyNews("AAPL", "2026-08-28", "2026-08-29");
    expect(news[0].related).toBe("AAPL");
  });
});
