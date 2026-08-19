# Wireframe Plan — What the Finnhub Free Tier Lets Us Put on Each Page

Companion to `DevelopmentPlan.md` (v5). That doc says *when* each page gets built; this one says *what goes on
it*, because the free tier decides most of that for us.

## The four facts that drive every decision

1. **1 symbol = 1 API call.** There is no batch-quote endpoint. Any element showing N symbols' prices costs N
   calls against a ceiling of **60/min**.
2. **`/stock/candle` returns 403 on free keys.** No price charts, anywhere. Biggest visual constraint.
3. **`/quote` returns exactly 8 fields** — `c` price, `d` change, `dp` % change, `o` open, `h` day high,
   `l` day low, `pc` prev close, `t` timestamp. **No volume, no market cap, no P/E.**
4. **Everything else is per-symbol too.** `profile2` (logo, industry, market cap) = 1 call/symbol.
   `company-news` = 1 call/symbol.

**Rule of thumb:** anything drawn once per row in a list must come from `/quote` alone, be cached 24h, or be
hardcoded.

Data source for browsing: a curated **~36-symbol universe** in `src/data/universe.ts` (ticker, company name,
sector), paginated **12 per page**.

---

## Page 1 — Market

Browse / search / filter. **12 calls per page view.**

### Include

| Element | Source | Cost |
|---|---|---|
| Card grid, 12 per page, 1/2/3 columns responsive | universe + `/quote` | 12 |
| Ticker, company name, sector tag | hardcoded | 0 |
| Price, $ change, % change (green/red) | `/quote` `c` `d` `dp` | — |
| Mini day-range bar: low ──●── high | `/quote` `l` `h` `c` | — |
| Star watchlist toggle | localStorage | 0 |
| Search box (filters loaded cards as you type) | client-side | 0 |
| "Search all markets" button → results list | `/search`, debounced 400ms | 1/query |
| Sector filter (6 chips or dropdown) | hardcoded field | 0 |
| Sort: % change, price, A–Z | client-side | 0 |
| Pagination `‹ 1 2 3 ›` | — | 12/page |
| "As of 9:41 AM" + Refresh button | `/quote` `t` | 12 on click |
| Market open/closed badge | derived from `quote.t` | 0 |
| Skeleton cards that fill in individually | — | — |
| Empty state + error state | — | — |

### Omit

| Element | Why |
|---|---|
| Sparkline / mini chart per card | `/stock/candle` 403. **Day-range bar is the substitute** |
| Volume column | Not a field in `/quote` |
| Market cap / P/E / dividend columns | 1 extra call per symbol; 12 → 36 calls |
| Company logos on cards | Logos are in `profile2` = +12 calls. **Use monogram tiles** (ticker initials) |
| Market-wide "top gainers/losers" | No screener endpoint. Label ours **"Top movers in your universe"** |
| Infinite scroll over all US stocks | `/stock/symbol` = ~25k rows, no sectors, no prices |
| API-driven sector filter | Sector needs `profile2` per symbol — hardcode it |
| Auto-refresh of all 36 | Refresh the visible 12 only |

---

## Page 2 — Stock Detail (`/stock/:symbol`)

**Fixed cost: 3 calls** — `/quote` + `/stock/profile2` + `/company-news`.

### Include

| Element | Source |
|---|---|
| Header: real logo, name, ticker, exchange | `profile2` |
| Hero price block: large price, $ change, % change | `/quote` `c` `d` `dp` |
| **Large day-range bar** — Low ├──●──┤ High, tick at prev close | `/quote` `l` `h` `c` `pc` |
| Stat strip: Open · Prev Close · Day High · Day Low | `/quote` |
| Company facts: industry, country, currency, IPO date, market cap, shares outstanding, website | `profile2` |
| News feed, 5–10 items: thumbnail, headline, source, relative date, link out | `/company-news` |
| Add / Remove from Watchlist button | localStorage |
| Peer chips linking to their detail pages | `/stock/peers` *(verify Day 4)* |
| "Market closed — showing last close" notice | `quote.t` |
| Back to Market link | — |

The day-range bar is the chart's replacement. Give it real visual weight — it is the hero, not a footnote.

### Omit

| Element | Why |
|---|---|
| Any price chart (line, candlestick, area) | `/stock/candle` = 403 |
| 1D / 1W / 1M / 1Y range toggle | Nothing to plot — don't draw the toggle |
| 52-week range bar | Needs `/stock/metric`. **Conditional** — verify Day 4, reuse the range-bar component if free |
| Prices on peer chips | +1 call each. Chips are navigation, not data |
| Financials, earnings history, analyst ratings | Premium or unverified |
| Bid/ask, order book, level 2 | Not on free tier |
| "vs S&P 500" comparison | Needs an index series = candles = 403 |

---

## Page 3 — Watchlist (protected route)

Reuses `StockCard`. **Every row is another quote call, and the user controls the row count.**

### Include

| Element | Notes |
|---|---|
| **20-symbol cap with a visible "12 / 20" counter** | Design it in from day one. 50 symbols = 50 calls = the whole budget |
| "Watchlist full — remove one to add another" on the star button at 20 | Real, demoable validation state (US-13/15) |
| Same stock cards as Market, plus ✕ remove | ≤20 calls, mostly cache hits |
| Rows filling in progressively (skeleton → data) | Reflects the throttled queue |
| "Refresh all" button, disabled while draining, "3 of 12…" progress | — |
| Sort + filter (same controls as Market) | 0 calls |
| Empty state: illustration + "Browse the market →" | First thing seen after login — make it good |
| Signed-in-as chip / logout in nav | `watchlist:<username>` in localStorage |

### Omit

| Element | Why |
|---|---|
| Unlimited watchlist | Unbounded API cost. The cap *is* the design |
| Price alerts / notifications | Needs continuous server-side polling; no backend |
| Auto-refresh every few seconds | 20 rows every 10s = 120 calls/min. 60s minimum, visible tab only |
| Portfolio P&L from purchase price | No account data — **but** a good zero-cost stretch: user types shares + cost basis into a validated form, stored locally, P&L computed from `quote.c`. Second real form for US-13 |

---

## Cross-page

| Element | Where | Why |
|---|---|---|
| API budget meter — "18 / 60 calls this minute" (dev only) | global corner widget | Debug tool *and* the best presentation visual |
| Rate-limit toast — "Hit Finnhub's free-tier limit — retrying in 12s" | global | 429 must degrade gracefully |
| Market open/closed badge | navbar | Explains static numbers during weekend dry runs |
| Login page | `/login` | 0 API calls; username + password validation only |

**WebSocket live ticks (Day 8, last):** wireframe as an *effect on existing elements*, not new elements —
prices flash green/red on tick. Subscribe to visible page + watchlist only (≤24 symbols, under the free
50-symbol cap). Silent on weekends and after hours, so REST `/quote` always paints the number first; the socket
only updates it. If the socket dies the page must look exactly as it does now.

---

## Cost summary

| Screen | Calls |
|---|---|
| Market, per page of 12 | 12 |
| Filter / sort / local search | 0 |
| "Search all markets" | 1 |
| Stock detail | 3 |
| Watchlist (20 max) | ≤20 |
| Login | 0 |

Worst realistic demo minute — Market + 2 page turns + 2 detail views + 1 search ≈ **43 calls**, inside 60.

---

## Confirm before finalizing (Day 4, Tue 8/18)

Run a throwaway script against the real free key; record status codes in the README:

- **`/stock/peers`** → decides the peer-chip row on the detail page.
- **`/stock/metric?metric=all`** → decides the 52-week range bar.

Draw both as dashed/optional in Figma until the spike returns. Don't design around an endpoint that hasn't
returned 200 on our own key — `/stock/candle` used to be free.
