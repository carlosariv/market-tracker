import { describe, it, expect } from "vitest";
import { searchCompanyProfile } from "../services/CompanyProfile";

describe("searchCompanyProfile", () => {
  it("resolves a company profile for a symbol", async () => {
    const profile = await searchCompanyProfile("AAPL");
    expect(profile.ticker).toBe("AAPL");
    expect(profile.name).toBe("Apple Inc");
  });
});
