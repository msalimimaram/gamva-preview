# GAMva Preview — OctoLife Experience

<p align="center">
  <strong>A mobile-first concept for a more connected approach to personal growth.</strong><br/>
  Goals, routines, challenges, coaching, community, and social impact — designed as one experience.
</p>

<p align="center">
  <a href="https://gamva-preview.vercel.app/"><strong>▶ Explore the live preview</strong></a>
  ·
  <a href="https://github.com/msalimimaram/gamva_mobile">Flutter mobile client</a>
  ·
  <a href="https://github.com/msalimimaram/GAMva">Django backend</a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Status" src="https://img.shields.io/badge/Status-Design%20Preview-7C3AED" />
</p>

---

## Overview

GAMva is a life-improvement platform concept built around **OctoLife**, a framework for making progress across multiple dimensions of life rather than focusing on a single metric. This repository presents the web-based product and interaction preview.

The design direction is premium, dark, and mobile-first. It emphasizes clarity, personal agency, and sustainable progress instead of public ranking or shame-based motivation.

> **Project status:** This repository is the interactive design/experience preview. It should not be interpreted as proof that every screen is connected to production services or that all product workflows are production-ready.

## Product principles

- **Whole-person progress:** connect different areas of life in one coherent experience.
- **User agency:** users remain in control of goals, routines, and participation.
- **Support over shame:** missed days should be treated as information, not as a reason to erase progress.
- **Progress with context:** encourage consistency without reducing people to a leaderboard score.
- **Mobile-first craft:** prioritize readable hierarchy, deliberate interaction, and responsive layouts.
- **Room to grow:** establish a product experience that can evolve alongside the Flutter client and Django backend.

## OctoLife dimensions

The product concept organizes personal growth into eight connected dimensions:

1. **Health** — movement, fitness, and physical well-being.
2. **Learning** — knowledge, study, and skill development.
3. **Financial** — financial habits and money management.
4. **Personal Development** — self-improvement and daily practices.
5. **Career** — professional growth and meaningful work.
6. **Mental & Emotional** — reflection, emotional well-being, and balance.
7. **Challenge & Entertainment** — exploration, play, and shared experiences.
8. **Overcoming Fears** — gradual, intentional steps beyond one's comfort zone.

## Experience areas

The intended product ecosystem brings together:

- OctoLife overview and personal progress
- Goals and routines
- Challenges and progress reporting
- Social connections and community participation
- Content such as articles, journals, podcasts, and videos
- Profile and personal preferences
- A future coach and commerce ecosystem

These describe the product direction, not a claim that every capability is currently implemented or connected.

## Technology

The preview repository uses:

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React icons
- Recharts for data visualizations

The wider GAMva product is being developed across separate repositories:

| Component | Responsibility | Repository |
|---|---|---|
| Web preview | Visual and interaction reference | [gamva-preview](https://github.com/msalimimaram/gamva-preview) |
| Mobile client | Flutter application | [gamva_mobile](https://github.com/msalimimaram/gamva_mobile) |
| Backend | Django API and business services | [GAMva](https://github.com/msalimimaram/GAMva) |

The backend and mobile repositories are private. Access to them is required to inspect their source.

## Run locally

### Prerequisites

- Node.js version compatible with the repository's toolchain configuration
- pnpm

### Install and start

```bash
pnpm install
pnpm dev
```

### Build for preview

```bash
pnpm build
pnpm preview
```

The deployed experience is also available at [gamva-preview.vercel.app](https://gamva-preview.vercel.app/).

## Scope and limitations

This repository is primarily a **product-design and frontend preview**. Before treating any workflow as production-ready, verify its implementation, accessibility, responsive behavior, error states, data persistence, and service integration independently. Do not infer backend integration from a visual screen alone.

## Project direction

The long-term ambition is to make personal development feel more connected and actionable: one platform where people can work on different areas of life, build sustainable routines, join challenges, learn, connect with others, and contribute to meaningful causes.

---

<p align="center">
  <sub>GAMva · OctoLife · Designed around progress across life, not just one metric.</sub>
</p>
