import { describe, it, expect } from "vitest";
import { getQuote } from "../services/Quote";

describe("getQuote", () => {
  it("resolves the quote for a symbol", async () => {
    const quote = await getQuote("AAPL");
    expect(quote.c).toBeGreaterThan(100);
  });
});
