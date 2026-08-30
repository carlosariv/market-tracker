# Group Project Presentation Guide

## Overview

When presenting your group project, the presentation should be **10–15 minutes** long and focus on **showcasing the major features** of the project — not walking through every line of code. Every team member must speak during the presentation, though no one is required to specifically call out what they personally contributed.

---

## Team Coordination

Since multiple people are presenting from one shared screen, coordination matters as much as content.

- **One person shares their screen** for the entire presentation. Decide who this is ahead of time.
- **Know your hand-off cues.** The screen-sharer needs to know exactly when to switch views (e.g., from the IDE to the terminal, from one feature demo to another) as each teammate speaks. This can work two ways:
   - The active presenter gives a **direct verbal call-out** ("go ahead and pull up the transaction history screen")
   - The screen-sharer follows **practiced cues** — because you've rehearsed the flow enough times that they know what's coming next without being told
- **Assign speaking sections in advance** so the hand-offs between teammates are smooth and no one is scrambling to figure out when it's their turn.
- **Practice as a full group, not just individually.** A demo that each person is comfortable with alone can still fall apart if the screen-share hand-offs haven't been rehearsed together.

---

## What to Cover

Structure your presentation around these points, spending most of your time on the live demo. Distribute these sections across your team members so everyone has speaking time.

1. **Quick Intro (~1 min)**
   - What the app does and the tech stack (Java, Angular, Spring, React, etc... and any specific build tools/libraries e.g. MongoDB Driver, Maven, Node, Axios, etc...)
   - Quick round of who's on the team (names only or optionally specific contributions if they can be summarized quickly)

2. **Architecture Overview (~1–2 min)**
   - Briefly show your application structure (Presentation Layer(s), Service(s), DAOs, Models, Configurations, etc...)
   - If your team divided work along architectural lines (e.g., one person on DAO, another on Services, another on Components, etc...), this is a natural point to hand off between speakers

3. **Live Demo (5–7 min)** — the core of your presentation
   - Showcase the 'application flow' of your program
   - Creating a user/entity
   - Features/functionality to expect with new data
   - Rejections/validation failures present
   - Other related features
   - Split the demo into logical segments and assign a different speaker to each segment where possible, so multiple team members are actively narrating (not just the person with the keyboard)

4. **Testing (~1 min)**
   - Run your test suite live (if applicable) or show results
   - Mention what business rules your tests cover

5. **Wrap-Up (~1–2 min)**
   - One or two things the team is proud of or found challenging
   - Any optional enhancements completed
   - Good spot for each remaining teammate who hasn't spoken yet to add a closing thought

---

## General Presentation Tips

**Screen & Display**
- Zoom in your IDE/terminal font size so text is readable from across the room (increase font size, don't just rely on your normal working setup)
- Use **dark mode with high contrast**, or light mode with large, bold text
- Close unrelated tabs, notifications, and messaging apps before sharing your screen
- Maximize your terminal/console window; avoid tiny, cluttered windows
- Whoever is sharing their screen should have **everyone's needed windows/tabs already open** before presenting starts, so no one is waiting on a slow app launch or login mid-demo

**Delivery**
- Practice your demo path beforehand so you're not improvising queries or account numbers live
- Have sample/seed data ready in advance — don't waste demo time typing out registration forms from scratch
- If something breaks, don't panic — briefly explain what *should* happen and move on
- Rehearse the verbal hand-offs between speakers, not just each person's individual part — transitions are often where group presentations lose time or composure

**Time Management**
- Time yourselves as a full group a few times beforehand (10–15 minutes with multiple speakers goes by fast!)
- Prioritize the demo over narration; show, don't just tell
- Have a mental "cut list" of lower-priority items to skip if you're running long — agree on this as a team in advance so no one is caught off guard
- Know roughly how much time each section/speaker should take so the presentation doesn't run long due to one segment eating into another's time
- One Team Member should act as a 'Time Keeper' (typically this person can open and close for the team). The Time keeper should make sure the presentation does not go over time (i.e. provide a "three-minute warning" and/or "one-minute warning" to the team to make sure all priority items are discussed).

**Technical Prep**
- Confirm your application and any dependent systems (databases, apis, etc...) are running and connected *before* you start presenting
- Double-check your config files
- Confirm this on the machine that will actually be sharing its screen — not just on each teammate's individual laptop, and make sure that individual can run the application while sharing the screen!
