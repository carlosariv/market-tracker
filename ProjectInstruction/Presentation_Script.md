# MarketTracker — 10 Minute Presentation Script

**Presenters:** Sergio & Carlos
**Format:** one shared screen, live demo
**Target:** 10 minutes (guide allows 10–15, so we have breathing room)

> This is a *guideline*, not a word-for-word script. Bullets are the beats you need to hit —
> say them in your own words. The timestamps are the important part; if you're past the
> time on a section, move on.

---

## Roles

| Role | Who | Notes |
|---|---|---|
| Screen share + keyboard | **Sergio** | App running on `npm run dev`, browser + IDE + terminal already open |
| Timekeeper / opener / closer | **Carlos** | Gives a "3 minutes left" and "1 minute left" heads-up |

Swap these if Carlos's machine is the one that runs the app more reliably — just decide before you start.

**Before you present (5 min of prep):**
- `npm run dev` already running, app already logged in *and* logged out once so you know the flow works
- Browser zoomed to ~125%, dark mode, only the app tab + IDE open, notifications off
- A second terminal tab ready with the project dir, so `npm test` is one command away
- Have a registration username/password picked in advance — don't invent one live.
  Use something that passes every rule, e.g. `demo1` / `Abcdefg1!`
- Confirm the Finnhub API key in `.env` is working — hit the markets page once and watch cards load

---

## Timeline at a glance

| Time | Section | Speaker |
|---|---|---|
| 0:00 – 1:00 | Intro | Carlos |
| 1:00 – 2:30 | Architecture | Sergio → Carlos |
| 2:30 – 3:15 | Demo: auth + validation | Sergio |
| 3:15 – 5:00 | Demo: Market Overview | Carlos |
| 5:00 – 6:30 | Demo: Stocks page | Sergio |
| 6:30 – 7:30 | Demo: Watchlist | Sergio |
| 7:30 – 8:30 | Testing (live `npm test`) | Carlos |
| 8:30 – 10:00 | Wrap-up | Sergio → Carlos |

---

## 0:00 – 1:00 · Intro — **Carlos**

*Screen: the app on the login page, or the Market Overview page. Something that looks good.*

- "We're Carlos and Sergio, and this is **MarketTracker** — a stock market dashboard that pulls live
  market data and news from the Finnhub API."
- What it does in one sentence: browse the market, search any company, and build a watchlist that
  tells you how your picks are actually performing.
- Tech stack — hit these quickly, don't linger:
  - **React 19 + TypeScript**, built with **Vite**
  - **React Router 7** for client-side routing
  - **Finnhub REST API** via the official `finnhub` JS client
  - **React Context API** for shared state (no Redux — we didn't need it)
  - **Vitest + React Testing Library + MSW** for tests
- Quick split: "Carlos mainly built the Market Overview page, Sergio mainly built the Stocks page
  and the Watchlist — auth, routing, and the shared context we did together."

**Hand off:** "Sergio's going to walk through how it's put together."

---

## 1:00 – 2:30 · Architecture — **Sergio**

*Screen: switch to the IDE, `src/` folder expanded in the file tree.*

### Sergio (~1 min) — the layers

Point at the folders as you talk:

- **`src/services/`** — our API layer. One file per Finnhub endpoint: `SymbolLookup`, `CompanyProfile`,
  `Quote`, `CompanyNews`, `MarketNews`. Each one wraps the callback-style Finnhub client in a Promise
  and returns a typed result. Nothing else in the app talks to Finnhub directly.
- **`src/context/Context.tsx`** — the shared state layer. Holds the loaded stocks, the watchlist,
  search results, and cached news. Because it's shared, moving between pages doesn't re-fetch anything.
- **`src/components/`** — reusable presentational pieces: `StockCard`, `SearchBar`, `CompanyProfile`,
  `MarketNewsBlock`, `Navbar`, `Footer`. The same `StockCard` renders on both the Market Overview
  page and the Watchlist.
- **`src/pages/`** — the routes themselves: Login/Register, TrackerPage, StockDetail, Watchlist.
- **`App.tsx`** — routing plus a `ProtectedLayout` route that checks auth and redirects to `/login`
  if you're not signed in. Auth state itself lives in `AuthContext` and persists in `sessionStorage`.

**Worth calling out (this is the interesting one):** open `src/context/Context.tsx` around line 78.

- "Finnhub's free tier rate-limits us, and the Market Overview page needs ~60 companies, each
  needing two API calls. So instead of firing 120 requests at once, we put symbols in a
  **priority queue** and drain it one at a time with a throttle."
- "When you click a specific stock, we push it in with a high priority so it jumps the line and
  skips the delay — the thing the user is actually waiting on loads immediately."

### Carlos (~30 sec) — how that shows up in the UI

- "That's why the Market Overview grid fills in progressively instead of hanging on a blank screen —
  cards appear as the queue drains."

**Hand off:** "Let's actually run it — Sergio, take us to the login page."

---

## 2:30 – 3:15 · Demo: Auth + validation — **Carlos**

*Screen: browser. Start logged out, at `/login`.*

Keep this tight — 45 seconds. It's the least interesting part.

- First show the guard: type `/watchlist` in the URL bar → it bounces you to `/login`. "Protected
  routes are enforced at the router level."
- Click through to **Register**.
- **Show validation failing** (this is a rubric item, don't skip it) — pick two, not all five:
  - Password `Ab1!` → "Password must be at least 8 characters long."
  - Password `abcdefg1!` → "Password must contain uppercase character(s)."
- Then register properly with your pre-planned credentials → redirects to `/login`.
- Log in → lands on **Market Overview**.
- One line: "Auth state lives in `sessionStorage`, so a refresh keeps you signed in."

**Hand off:** "And this is the Market Overview page — Carlos built this one."

---

## 3:15 – 5:00 · Demo: Market Overview — **Carlos**

*Screen: `/markets`. This is your section, take the time.*

- "This is the landing page — about 60 large-cap companies across six sectors, loading live."
- **Card anatomy:** logo, name, ticker and exchange, current price, the day's change in dollars
  and percent (green/red), plus industry, market cap and shares outstanding. All of it live from
  Finnhub's quote and company-profile endpoints.
- **Filtering** — click through a couple of the category buttons (Technology, Energy, Banking).
  "Filters by the industry Finnhub reports for each company. The active filter is highlighted, and
  changing it resets you to page 1."
- **Sorting** — open the dropdown, sort by **Price**, then by **Change %**. "Four sort options —
  Name, Price, Change, and Change %. Sorting and filtering compose, so you can look at just
  Technology, sorted by the biggest movers."
- **Pagination** — 15 cards per page, click through a page or two.
- **Scroll to the bottom** for the market news block. "News is tied to the filter — switch the
  category and the headlines below follow it. And we cache news per category in context, so
  flipping back and forth doesn't spend another API call."
  - *(Demo this: click Technology, scroll down, then click Energy, scroll down.)*

**Hand off:** "Sergio, show them the search side."

---

## 5:00 – 6:30 · Demo: Stocks page — **Sergio**

*Screen: click **Stocks** in the navbar.*

- "The Market Overview covers a fixed set of companies. This page lets you look up anything on
  the US exchanges."
- Search something recognizable — **`apple`** or **`tesla`**. "Finnhub's symbol search does the
  name-to-ticker lookup, so you don't have to know the ticker."
- Click a result from the list. Talk over the load:
  - "That click does three things: pushes the symbol into the queue at high priority so it skips
    the throttle, pulls the company profile and quote, and fetches today's news for that company."
- Point out the profile card and the news items underneath it.
- Click **Add to Watchlist**. Note that the button flips to **Remove from Watchlist** —
  "the button reflects what's actually in the list, so you can't double-add."
- **Add two or three more** so the watchlist has something to work with. Do this quickly —
  search, click, add, repeat. Pick companies with a mix of up and down days if you can.

---

## 6:30 – 7:30 · Demo: Watchlist — **Sergio**

*Screen: click **Watchlist** in the navbar.*

- "Same cards, but with portfolio analytics on top. Four stats:"
  - **Equal Weight P&L** — "the average day change across everything you're watching. This is
    what you'd have made if you'd put the same dollar amount into each one."
  - **Mcap Weighted Return** — "the same idea, but weighted by market cap, so a move in Apple
    counts more than a move in a small company. Closer to how an index actually behaves."
  - **Best / Worst Performer** — "the biggest gainer and biggest loser in the list today."
- Recompute live: go back to Stocks, remove one holding, come back — "the stats recalculate
  whenever the watchlist changes."
- Close with the navbar: "Everything you've seen is one page load — routing is entirely
  client-side, no refreshes."

**Hand off:** "Carlos is going to run the tests."

---

## 7:30 – 8:30 · Testing — **Carlos**

*Screen: switch to the terminal. Font already large.*

- Run it: `npm test`
- While it runs, cover what's in there:
  - "**20 tests across 9 files**, running on Vitest with React Testing Library."
  - "The service tests hit **MSW** — Mock Service Worker — which intercepts the Finnhub calls at
    the network layer. So the tests exercise our real service code and real parsing, but they
    never spend an API call and they don't fail because the market's closed."
- Business rules the tests actually cover — name three or four:
  - **Auth:** login is rejected with no registered account, accepted with matching credentials,
    rejected on a wrong password, and logout clears the session
  - **Registration validation:** empty username, password under 8 characters, missing uppercase,
    and mismatched confirmation are all rejected — a valid one stores the credentials and redirects
  - **Market Overview:** clicking a category filter shows only that industry, and the sort dropdown
    updates correctly
  - **Services:** each endpoint parses into the right shape, and market news is capped at 6 items
- Show the green output and move on. Don't read the test names aloud.

---

## 8:30 – 10:00 · Wrap-up — **Sergio**, then **Carlos**

### Sergio (~45 sec) — what we're proud of / what was hard

Pick two, don't list everything:

- **Rate limiting was the real problem.** "The obvious version of this page fires 120 requests on
  mount and gets throttled into a broken page. The priority queue was our answer — it gave us
  a smooth progressive load *and* a way to let user-initiated requests cut the line."
- **Shared context paid off.** "Because loaded stocks, the watchlist, and news all live in one
  context, navigating between pages is instant and costs zero extra API calls."
- **What was hard:** "Coordinating async state with React's render cycle. We had a bug where the
  queue would process the same symbol twice — the fix was tracking the in-flight state in a ref
  rather than in state, so it updates synchronously."

### Carlos (~45 sec) — close it out

- Anything extra you want to claim: the portfolio analytics on the watchlist, per-category news
  caching, responsive layout, the shared design system in `src/styles/`.
- What we'd do next if we kept going: price charts over time, a real backend for auth instead of
  browser storage, and broadening test coverage to the Watchlist and Stocks pages.
- "Thanks — happy to take questions."

---

## Cut list (agree on this in advance)

If Carlos calls **"3 minutes left"** and you're still in the demo, cut in this order:

1. The registration validation failures — show one instead of two
2. The pagination walkthrough on Market Overview
3. Removing a holding from the watchlist to show the stats recompute
4. Adding a third and fourth stock to the watchlist — two is enough to make the stats meaningful

**Never cut:** the live test run, and at least one validation failure. Both are explicitly on
the rubric.

## If something breaks

- **Cards don't load / stuck empty:** it's the API rate limit or the key. Say "this is pulling
  live from Finnhub and we're on the free tier" — then switch to the IDE and talk through the
  queue code while it catches up.
- **A search returns nothing:** try a different company, don't retry the same one twice.
- **Anything else:** describe what should happen in one sentence and move on. Don't debug live.
