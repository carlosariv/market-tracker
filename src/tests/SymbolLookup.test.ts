import { describe, it, expect } from "vitest";
import { searchStockSymbol } from "../services/SymbolLookup";

describe("searchStockSymbol", () => {
  it("resolves stock results for a query", async () => {
    const results = await searchStockSymbol("apple");
    expect(results[0].symbol).toBe("AAPL");
  });
});
