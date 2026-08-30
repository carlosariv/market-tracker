import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TrackerPage } from "../pages/TrackerPage/TrackerPage";
import type { StockCardProps } from "../components/StockCard/StockCard";

const mockUseSearchResults = vi.fn();
vi.mock("../context/Context", () => ({
  useSearchResults: () => mockUseSearchResults(),
}));

vi.mock("../components/StockCard/StockCard", () => ({
  default: ({ stockId }: any) => <div data-testid="stock-card">{stockId.symbol}</div>,
}));

vi.mock("../components/MarketNewsBlock/MarketNewsBlock", () => ({
  default: () => <div data-testid="market-news" />,
}));

vi.mock("react-icons/fa", () => ({
  FaAngleLeft: () => <span>Left</span>,
  FaAngleRight: () => <span>Right</span>,
}));

function makeStock(symbol: string, industry: string): StockCardProps {
  return {
    stockId: { description: "", displaySymbol: symbol, symbol, type: "" },
    companyProfile: {
      ticker: symbol, name: symbol, country: "US", currency: "USD", exchange: "NASDAQ",
      marketCapitalization: 1, logo: "", shareOutstanding: 1, finnhubIndustry: industry, phone: "", weburl: "",
    },
    quote: { c: 100, d: 0, dp: 0, h: 100, l: 100, o: 100, pc: 100, t: 0 },
  } as StockCardProps;
}

describe("TrackerPage interactivity", () => {
  it("clicking a category filter shows only stocks in that industry", () => {
    mockUseSearchResults.mockReturnValue({
      loadedStocks: [makeStock("TECH1", "Technology"), makeStock("BANK1", "Banking")],
    });

    render(<TrackerPage />);
    expect(screen.getAllByTestId("stock-card")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Banking" }));

    const cards = screen.getAllByTestId("stock-card");
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toBe("BANK1");
  });

  it("marks the clicked filter button as active", () => {
    mockUseSearchResults.mockReturnValue({ loadedStocks: [] });
    render(<TrackerPage />);

    const banking = screen.getByRole("button", { name: "Banking" });
    fireEvent.click(banking);

    expect(banking.className).toContain("active-filter");
  });

  it("changing the sort dropdown updates its value", () => {
    mockUseSearchResults.mockReturnValue({ loadedStocks: [] });
    render(<TrackerPage />);

    const select = screen.getByLabelText(/sort stocks/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "Price" } });

    expect(select.value).toBe("Price");
  });
});
