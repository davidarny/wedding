# Wedding Invitation Site — Даниил & Анастасия

## TL;DR

> **Quick Summary**: Build a mobile-first wedding invitation single-page site using Astro + React Islands for static generation. Mostly static content with React islands for countdown timer, RSVP form, message form, and survey. Deploys to Netlify as pure static HTML.
> 
> **Deliverables**:
> - Complete single-page wedding site with 21 content sections
> - React islands: countdown timer, RSVP form, message form, survey
> - API layer: axios → Netlify Functions → Telegram bot
> - .ics calendar file generation
> - Yandex Maps iframe integration
> - Netlify deploy configuration
> - Mobile-first responsive design with floral theme
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 → Task 5 → Task 7 → Task 14 → Task 18 → Task 20 → F1-F4

---

## Context

### Original Request
Build a wedding invitation single-page website (визитка) for the wedding of Даниил & Анастасия on June 6, 2026. Mobile-first design with floral/botanical theme. Light theme only. All content in Russian. JavaScript only (no TypeScript). kebab-case file naming. Best practices throughout.

### Interview Summary
**Key Discussions**:
- **Framework**: Astro + React Islands chosen over pure React SPA — 90% of content is static, islands only for interactive parts
- **Backend**: Existing Telegram bot — user will provide token. Netlify Functions proxy needed to hide token
- **Photos**: Placeholders for now — user will replace with real photos later
- **Map**: Yandex Maps iframe embed (no API key needed)
- **Calendar**: .ics file download on "Добавить в календарь" button click
- **Hosting**: Netlify with static deploy
- **Tests**: None — personal project, visual QA only
- **Static Generation**: Astro default `output: 'static'` — generates pure HTML at build time

**Research Findings**:
- Astro v5 + React integration is mature (58k stars) with seamless Tailwind v4 support
- react-hook-form works inside React islands with `client:visible` directive
- oxlint/oxfmt work natively with JS files, no extra config needed
- `@tailwindcss/vite` plugin is the correct integration path for Tailwind v4 in Astro

### Metis Review
**Identified Gaps** (addressed):
- **White PNG backgrounds**: All 5 floral PNGs have white (not transparent) backgrounds — will position on white sections only, use mix-blend-mode where needed
- **No .woff2 fonts**: Only .woff provided — acceptable, will note as future optimization
- **Generic image names**: `upl####.png` must be renamed to descriptive kebab-case
- **Telegram chat ID**: Need both bot token AND chat ID in env vars
- **Post-wedding countdown**: Timer should show "Свадьба состоялась!" after June 6, 2026
- **Form success/error UX**: Need loading states, success feedback, error handling
- **Duplicate submissions**: Allow — guests may want to update their response
- **SEO/OG tags**: Add basic meta tags for social sharing (wedding preview when link shared in messengers)
- **No git repo**: Initialize as first step
- **Netlify Functions**: Required as proxy for Telegram API (can't expose bot token in client-side code)

---

## Work Objectives

### Core Objective
Deliver a production-ready, mobile-first, statically-generated wedding invitation website with interactive RSVP/survey functionality via Telegram bot integration.

### Concrete Deliverables
- `dist/` folder with static HTML/CSS/JS ready for Netlify deploy
- 21 content sections matching the provided screenshots pixel-approximately
- 4 React islands (countdown, RSVP, message form, survey)
- 1 Netlify Function (Telegram proxy)
- .ics calendar event file
- Yandex Maps iframe embed
- Mobile navigation drawer
- Responsive design (mobile-first → tablet → desktop)

### Definition of Done
- [ ] `bun run build` succeeds with zero errors
- [ ] `bun run lint` passes with zero errors
- [ ] All 21 sections render correctly on mobile viewport (375px)
- [ ] All 21 sections render correctly on desktop viewport (1280px)
- [ ] Countdown timer updates in real-time
- [ ] RSVP form validates and submits (or shows stub response)
- [ ] Message form validates and submits (or shows stub response)
- [ ] Survey form validates and submits (or shows stub response)
- [ ] .ics file downloads on "Добавить в календарь" click
- [ ] Yandex Maps iframe loads
- [ ] Mobile hamburger menu opens/closes with section links

### Must Have
- Astro v5 + React integration for islands
- Tailwind CSS v4 via `@tailwindcss/vite`
- zod + react-hook-form for all forms
- axios HTTP client with base instance
- oxlint + oxfmt for linting/formatting
- kebab-case file naming (strictly enforced)
- bun as package manager
- Mobile-first responsive design
- Light theme only
- All text in Russian
- Cormorant Infant font (Bold + Light)
- Floral PNG decorations from provided assets
- Netlify Functions for Telegram proxy (token not exposed to client)
- Environment variables for TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID

### Must NOT Have (Guardrails)
- NO TypeScript files (.ts/.tsx) — JavaScript only (.js/.jsx/.astro)
- NO dark mode or theme switching
- NO unit/integration tests
- NO authentication or user accounts
- NO database — all data goes to Telegram
- NO heavy animation libraries (framer-motion, GSAP) — CSS transitions only
- NO image lazy-loading libraries — use native `loading="lazy"`
- NO SSR/dynamic rendering — static output only
- NO PascalCase or camelCase file names — kebab-case only
- NO over-engineered error handling — simple try/catch with user-friendly messages
- NO enterprise patterns (DI, factories, abstract classes)
- NO commented-out code or excessive JSDoc
- NO `console.log` in production code
- NO hardcoded Telegram tokens — env vars only

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (new project)
- **Automated tests**: None
- **Framework**: None
- **If TDD**: N/A

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **Build/Lint**: Use Bash — Run `bun run build`, `bun run lint`, verify exit codes
- **API/Functions**: Use Bash (curl) — Send requests, assert status + response
- **Static Assets**: Use Bash — Verify file existence, check output sizes

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — all start immediately, no deps):
├── Task 1: Git init + Astro project scaffolding + all deps [quick]
├── Task 2: Tailwind v4 theme config + fonts + CSS custom properties [quick]
├── Task 3: Asset pipeline — rename images, organize in public/ [quick]
├── Task 4: API service layer — axios instance + Netlify Function [quick]
├── Task 5: Shared UI components — section wrapper, decorative borders, buttons [visual-engineering]
└── Task 6: Base layout — HTML shell, meta tags, OG, sticky header skeleton [visual-engineering]

Wave 2 (Static sections — all parallel, depend on Wave 1):
├── Task 7: Hero section + Date announcement block (depends: 2, 3, 6) [visual-engineering]
├── Task 8: Dear Guest section + Couple photo (depends: 2, 3, 5) [visual-engineering]
├── Task 9: Groom/Bride sections + Quote (depends: 2, 3, 5) [visual-engineering]
├── Task 10: Info sections — Menu, Gifts, Note, Confirmation, Photo (depends: 2, 5) [visual-engineering]
├── Task 11: Dress code + "Ждем Вас" section (depends: 2, 5) [visual-engineering]
├── Task 12: Schedule timeline section (depends: 2, 5, 6) [visual-engineering]
└── Task 13: Yandex Maps iframe section (depends: 6) [quick]

Wave 3 (Interactive React islands — parallel, depend on Wave 1):
├── Task 14: Countdown timer island (depends: 2, 6) [visual-engineering]
├── Task 15: RSVP confirmation form island (depends: 4, 5) [visual-engineering]
├── Task 16: Message form + Survey island (depends: 4, 5) [visual-engineering]
└── Task 17: Calendar .ics generation + download button (depends: 6) [quick]

Wave 4 (Integration & polish — depends on Waves 2+3):
├── Task 18: Mobile navigation drawer + scroll-to (depends: 6, 7-13) [visual-engineering]
├── Task 19: Full page assembly + scroll animations (depends: 7-17) [visual-engineering]
├── Task 20: Netlify deploy config + build optimization (depends: 1, 19) [quick]
└── Task 21: Responsive polish + final visual QA pass (depends: 19) [visual-engineering]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 2-6, 20 | 1 |
| 2 | 1 | 7-12, 14 | 1 |
| 3 | 1 | 7-9 | 1 |
| 4 | 1 | 15, 16 | 1 |
| 5 | 1 | 8-12, 15, 16 | 1 |
| 6 | 1 | 7, 12-14, 17, 18 | 1 |
| 7 | 2, 3, 6 | 18, 19 | 2 |
| 8 | 2, 3, 5 | 19 | 2 |
| 9 | 2, 3, 5 | 19 | 2 |
| 10 | 2, 5 | 19 | 2 |
| 11 | 2, 5 | 19 | 2 |
| 12 | 2, 5, 6 | 19 | 2 |
| 13 | 6 | 19 | 2 |
| 14 | 2, 6 | 19 | 3 |
| 15 | 4, 5 | 19 | 3 |
| 16 | 4, 5 | 19 | 3 |
| 17 | 6 | 19 | 3 |
| 18 | 6, 7-13 | 19 | 4 |
| 19 | 7-17 | 20, 21 | 4 |
| 20 | 1, 19 | F1-F4 | 4 |
| 21 | 19 | F1-F4 | 4 |

### Agent Dispatch Summary

- **Wave 1**: **6 tasks** — T1 → `quick`, T2 → `quick`, T3 → `quick`, T4 → `quick`, T5 → `visual-engineering`, T6 → `visual-engineering`
- **Wave 2**: **7 tasks** — T7-T12 → `visual-engineering`, T13 → `quick`
- **Wave 3**: **4 tasks** — T14-T16 → `visual-engineering`, T17 → `quick`
- **Wave 4**: **4 tasks** — T18-T19, T21 → `visual-engineering`, T20 → `quick`
- **FINAL**: **4 tasks** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Git Init + Astro Project Scaffolding

  **What to do**:
  - Initialize git repo (`git init`)
  - Create Astro project using `bun create astro@latest . -- --template minimal --no-install`
  - Remove any TypeScript config files (tsconfig.json) — we use JS only
  - Install core deps: `bun add astro @astrojs/react react react-dom`
  - Install form deps: `bun add react-hook-form zod @hookform/resolvers`
  - Install API deps: `bun add axios`
  - Install dev deps: `bun add -d oxlint oxfmt`
  - Install Tailwind: `bun add -d @tailwindcss/vite`
  - Configure `astro.config.mjs`: add React integration, Tailwind vite plugin, `output: 'static'`
  - Add `.gitignore` with node_modules, dist, .env, .netlify
  - Create `package.json` scripts: `dev`, `build`, `preview`, `lint`, `format`, `format:check`
  - Add `.env.example` with `TELEGRAM_BOT_TOKEN=` and `TELEGRAM_CHAT_ID=`
  - Create `.oxlintrc.json` with JS rules (correctness + suspicious)
  - Verify: `bun run build` succeeds with empty project

  **Must NOT do**:
  - Do NOT create .ts or .tsx files
  - Do NOT install TypeScript or type definitions
  - Do NOT use npx — use bunx

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Scaffolding is straightforward command execution and config file creation
  - **Skills**: []
    - No special skills needed — standard project setup
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for scaffolding

  **Parallelization**:
  - **Can Run In Parallel**: YES (first task, starts immediately)
  - **Parallel Group**: Wave 1 (with Tasks 2-6, though they depend on this)
  - **Blocks**: Tasks 2, 3, 4, 5, 6 (all of Wave 1 depends on scaffold existing)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - No existing code — greenfield project

  **External References**:
  - Astro docs: `https://docs.astro.build/en/install-and-setup/` — Installation guide
  - Astro React integration: `https://docs.astro.build/en/guides/integrations-guide/react/`
  - Tailwind v4 Vite plugin: `https://tailwindcss.com/docs/installation/vite`
  - oxlint config: `https://oxc.rs/docs/guide/usage/linter/config`

  **WHY Each Reference Matters**:
  - Astro docs: For correct `create astro` flags and `astro.config.mjs` structure
  - React integration: For correct `@astrojs/react` configuration in Astro config
  - Tailwind v4: For `@tailwindcss/vite` plugin setup (different from Tailwind v3)
  - oxlint: For `.oxlintrc.json` schema and JS-specific rules

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Project builds successfully
    Tool: Bash
    Preconditions: All deps installed
    Steps:
      1. Run `bun run build`
      2. Check exit code is 0
      3. Verify `dist/index.html` exists
    Expected Result: Build succeeds, dist/ directory created with index.html
    Failure Indicators: Non-zero exit code, missing dist/ directory
    Evidence: .sisyphus/evidence/task-1-build-success.txt

  Scenario: Lint runs without config errors
    Tool: Bash
    Preconditions: .oxlintrc.json created
    Steps:
      1. Run `bun run lint`
      2. Check exit code is 0 (or expected lint output)
    Expected Result: Lint executes without configuration errors
    Failure Indicators: "config not found" or schema errors
    Evidence: .sisyphus/evidence/task-1-lint-runs.txt

  Scenario: No TypeScript files exist
    Tool: Bash
    Preconditions: Project scaffolded
    Steps:
      1. Run `find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .astro`
      2. Verify output is empty (zero .ts/.tsx files)
    Expected Result: No TypeScript files found outside node_modules
    Failure Indicators: Any .ts or .tsx file found
    Evidence: .sisyphus/evidence/task-1-no-typescript.txt

  Scenario: Dev server starts
    Tool: Bash
    Preconditions: Project scaffolded
    Steps:
      1. Run `bun run dev` in background
      2. Wait 5s, curl http://localhost:4321
      3. Verify 200 status
      4. Kill dev server
    Expected Result: Dev server starts and responds with 200
    Failure Indicators: Connection refused, non-200 status
    Evidence: .sisyphus/evidence/task-1-dev-server.txt
  ```

  **Commit**: YES (individual)
  - Message: `chore(init): scaffold astro project with react, tailwind, and tooling`
  - Files: All scaffolding files
  - Pre-commit: `bun run build`

- [ ] 2. Tailwind v4 Theme Config + Fonts + CSS Custom Properties

  **What to do**:
  - Create `src/styles/global.css` — main stylesheet imported by Astro layout
  - Add `@import "tailwindcss"` at top (Tailwind v4 syntax)
  - Define `@font-face` rules for Cormorant Infant Bold (.woff) and Light (.woff)
  - Define CSS `@theme` block in Tailwind v4 style with custom colors:
    - `--color-bg`: `#ffffff` (white)
    - `--color-bg-soft`: `#f7f7f2` (off-white/cream)
    - `--color-primary`: `#8B9D77` (sage green — main accent)
    - `--color-primary-dark`: `#5C6B4F` (dark sage — buttons, headings)
    - `--color-primary-light`: `#D4DFC7` (light sage — header bg, highlights)
    - `--color-text`: `#2D2D2D` (dark charcoal)
    - `--color-text-muted`: `#6B6B6B` (secondary text)
    - `--color-accent`: `#C4A97D` (warm gold — for subtle accents)
    - `--color-survey-bg`: `#E8F0EC` (light teal/mint — survey card background)
    - Dress code palette: `--color-dress-1` through `--color-dress-5` (dark forest, olive, sage, light sage, cream)
  - Define font families in theme:
    - `--font-heading`: `'Cormorant Infant', serif` (for all headings and decorative text)
    - `--font-body`: `'Cormorant Infant', serif` (same font, light weight for body)
    - `--font-cursive`: `'Cormorant Infant', serif` (bold italic for quote/labels — Жених, Невеста)
  - Define spacing scale if needed for consistent section padding
  - Ensure all theme values are accessible as Tailwind utilities (e.g., `bg-primary`, `text-heading`, `font-heading`)

  **Must NOT do**:
  - Do NOT create a `tailwind.config.js` file — Tailwind v4 uses CSS-based config with `@theme`
  - Do NOT use Tailwind v3 `@apply` syntax — use v4 conventions
  - Do NOT import fonts from Google Fonts — use local .woff files only

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: CSS configuration and theme tokens — well-defined, single file
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Overkill for config-only task

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1)
  - **Parallel Group**: Wave 1 (with Tasks 3, 4, 5, 6)
  - **Blocks**: Tasks 7-12, 14 (all visual tasks depend on theme)
  - **Blocked By**: Task 1 (needs project structure)

  **References**:

  **Pattern References**:
  - None — greenfield project

  **Asset References** (fonts to integrate):
  - `CormorantInfant-Bold.woff` — needs @font-face with `font-weight: 700`
  - `CormorantInfant-Light.woff` — needs @font-face with `font-weight: 300`

  **External References**:
  - Tailwind v4 theme config: `https://tailwindcss.com/docs/theme` — CSS-based @theme syntax
  - Tailwind v4 colors: `https://tailwindcss.com/docs/colors` — How custom colors work in v4

  **WHY Each Reference Matters**:
  - Tailwind v4 changed entirely from JS config to CSS @theme — must use new syntax
  - Font files must be referenced with correct paths relative to the CSS file

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Theme colors render correctly
    Tool: Playwright
    Preconditions: Dev server running, Task 1 complete
    Steps:
      1. Navigate to http://localhost:4321
      2. Create a temporary test element with class `bg-primary text-heading font-heading`
      3. Verify computed background-color matches #8B9D77 (or rgb equivalent)
      4. Verify font-family includes "Cormorant Infant"
      5. Screenshot the page
    Expected Result: Custom theme colors and fonts are applied via Tailwind classes
    Failure Indicators: Default Tailwind colors shown, font fallback to serif
    Evidence: .sisyphus/evidence/task-2-theme-colors.png

  Scenario: Fonts load without errors
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:4321
      2. Open Network tab, filter by font
      3. Verify CormorantInfant-Bold.woff loads with 200 status
      4. Verify CormorantInfant-Light.woff loads with 200 status
    Expected Result: Both font files load successfully
    Failure Indicators: 404 for font files, fallback fonts used
    Evidence: .sisyphus/evidence/task-2-fonts-loaded.png

  Scenario: Build still succeeds with theme
    Tool: Bash
    Preconditions: Theme CSS added
    Steps:
      1. Run `bun run build`
      2. Check exit code is 0
    Expected Result: Build succeeds with custom theme
    Failure Indicators: CSS parsing errors, build failure
    Evidence: .sisyphus/evidence/task-2-build-with-theme.txt
  ```

  **Commit**: YES (groups with Task 3)
  - Message: `feat(theme): configure tailwind theme, fonts, and organize assets`
  - Files: `src/styles/global.css`, font files in `public/fonts/`
  - Pre-commit: `bun run build`

- [ ] 3. Asset Pipeline — Rename Images, Organize in public/

  **What to do**:
  - Create directory structure: `public/fonts/`, `public/images/`, `public/images/photos/`
  - Move and rename font files:
    - `CormorantInfant-Bold.woff` → `public/fonts/cormorant-infant-bold.woff`
    - `CormorantInfant-Light.woff` → `public/fonts/cormorant-infant-light.woff`
  - Move and rename image files with descriptive kebab-case names:
    - `upl7588.png` → `public/images/floral-hero-frame.png` (hanging floral header/frame — top corners + sides, for hero section)
    - `upl7590.png` → `public/images/floral-top-border.png` (floral canopy at top only — for secondary headers)
    - `upl7591.png` → `public/images/floral-full-frame.png` (top + bottom floral borders — for "Дорогой Гость" section)
    - `upl7592.png` → `public/images/floral-corner-frame.png` (corner florals + bottom edge — for info sections)
    - `upl7593.png` → `public/images/floral-tile-pattern.png` (seamless floral pattern — for backgrounds)
  - Create placeholder images for photos:
    - `public/images/photos/couple-placeholder.jpg` — 600x400 placeholder (gray with text "Couple Photo")
    - `public/images/photos/groom-placeholder.jpg` — 400x400 placeholder (gray with text "Groom")
    - `public/images/photos/bride-placeholder.jpg` — 400x400 placeholder (gray with text "Bride")
  - Delete original files from root after moving (clean up)
  - Remove original upl*.png and CormorantInfant-*.woff from root

  **Must NOT do**:
  - Do NOT use PascalCase or camelCase for file names
  - Do NOT move files to src/ — static assets go in public/
  - Do NOT optimize/compress PNGs — that's a future task

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: File operations only — move, rename, create placeholders
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None relevant

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1)
  - **Parallel Group**: Wave 1 (with Tasks 2, 4, 5, 6)
  - **Blocks**: Tasks 7, 8, 9 (sections using images)
  - **Blocked By**: Task 1 (needs project structure with public/)

  **References**:

  **Asset References**:
  - Root directory currently has: `upl7588.png`, `upl7590.png`, `upl7591.png`, `upl7592.png`, `upl7593.png`, `CormorantInfant-Bold.woff`, `CormorantInfant-Light.woff`

  **External References**:
  - Astro public directory: `https://docs.astro.build/en/basics/project-structure/#public` — Static assets that get copied as-is to build output

  **WHY Each Reference Matters**:
  - Astro serves `public/` files at root path — `public/images/x.png` becomes `/images/x.png` in HTML

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All assets organized correctly
    Tool: Bash
    Preconditions: Files moved and renamed
    Steps:
      1. Verify `public/fonts/cormorant-infant-bold.woff` exists
      2. Verify `public/fonts/cormorant-infant-light.woff` exists
      3. Verify all 5 `public/images/floral-*.png` files exist
      4. Verify all 3 `public/images/photos/*-placeholder.jpg` files exist
      5. Verify NO `upl*.png` files remain in root
      6. Verify NO `CormorantInfant-*.woff` files remain in root
    Expected Result: All files in correct locations with kebab-case names
    Failure Indicators: Missing files, files still in root
    Evidence: .sisyphus/evidence/task-3-asset-structure.txt

  Scenario: All file names are kebab-case
    Tool: Bash
    Preconditions: Files renamed
    Steps:
      1. List all files in public/ recursively
      2. Check NONE contain uppercase letters
    Expected Result: All filenames are lowercase kebab-case
    Failure Indicators: Any uppercase character in filename
    Evidence: .sisyphus/evidence/task-3-kebab-case.txt
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `feat(theme): configure tailwind theme, fonts, and organize assets`
  - Files: public/fonts/, public/images/
  - Pre-commit: `bun run build`

- [ ] 4. API Service Layer — Axios Instance + Netlify Function for Telegram

  **What to do**:
  - Create `src/services/api-client.js` — axios instance with base config:
    - `baseURL`: `/.netlify/functions` (Netlify Functions path)
    - Default headers: `Content-Type: application/json`
    - Response/error interceptors for consistent error handling
  - Create `src/services/rsvp-service.js` — service methods:
    - `submitRsvp(data)` — POST to `/send-telegram` with type: "rsvp"
    - `submitMessage(data)` — POST to `/send-telegram` with type: "message"
    - `submitSurvey(data)` — POST to `/send-telegram` with type: "survey"
  - Create `netlify/functions/send-telegram.js` — Netlify serverless function:
    - Reads `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` from env
    - Receives JSON body with `type` and `data` fields
    - Formats message based on type (rsvp/message/survey) into readable Telegram message
    - Sends via Telegram Bot API: `https://api.telegram.org/bot{token}/sendMessage`
    - Returns 200 on success, 500 on error with generic message
    - CORS headers for local dev
  - Create `.env.example` file documenting required env vars
  - In dev mode, function should work as a stub (console.log + return success) if env vars missing

  **Must NOT do**:
  - Do NOT expose TELEGRAM_BOT_TOKEN in client-side code
  - Do NOT create complex error retry logic — simple try/catch
  - Do NOT use fetch — use axios as specified
  - Do NOT create TypeScript files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple API service + one serverless function — well-scoped
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None relevant

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 5, 6)
  - **Blocks**: Tasks 15, 16 (form islands use this service)
  - **Blocked By**: Task 1 (needs project structure)

  **References**:

  **External References**:
  - Netlify Functions: `https://docs.netlify.com/functions/get-started/` — Netlify serverless functions guide
  - Telegram Bot API: `https://core.telegram.org/bots/api#sendmessage` — sendMessage endpoint
  - Axios instance: `https://axios-http.com/docs/instance` — Creating custom instances

  **WHY Each Reference Matters**:
  - Netlify Functions path convention (`netlify/functions/`) and handler export format
  - Telegram API message formatting (parse_mode, chat_id, text params)
  - Axios interceptors pattern for consistent error handling

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: API client module exports correctly
    Tool: Bash
    Preconditions: Files created
    Steps:
      1. Run `node -e "const m = require('./src/services/api-client.js'); console.log(typeof m)"` or equivalent ESM check
      2. Verify module exports an axios instance
    Expected Result: Module exports axios instance without errors
    Failure Indicators: Import errors, undefined exports
    Evidence: .sisyphus/evidence/task-4-api-client-exports.txt

  Scenario: Netlify function has correct structure
    Tool: Bash
    Preconditions: Function file created
    Steps:
      1. Verify `netlify/functions/send-telegram.js` exists
      2. Verify it exports a `handler` function (read file, check export)
      3. Verify it reads TELEGRAM_BOT_TOKEN from process.env
      4. Verify it does NOT contain hardcoded tokens
    Expected Result: Function file has correct Netlify handler structure
    Failure Indicators: Missing handler export, hardcoded secrets
    Evidence: .sisyphus/evidence/task-4-netlify-function.txt

  Scenario: Service methods exist
    Tool: Bash
    Preconditions: Service files created
    Steps:
      1. Verify `src/services/rsvp-service.js` exists
      2. Verify it exports submitRsvp, submitMessage, submitSurvey functions
    Expected Result: All three service methods are exported
    Failure Indicators: Missing exports
    Evidence: .sisyphus/evidence/task-4-service-methods.txt
  ```

  **Commit**: YES (individual)
  - Message: `feat(api): add axios service layer and netlify function for telegram`
  - Files: `src/services/`, `netlify/functions/`
  - Pre-commit: `bun run build`

- [ ] 5. Shared UI Components — Section Wrapper, Decorative Borders, Buttons, Typography

  **What to do**:
  - Create `src/components/ui/section-wrapper.astro` — reusable section container:
    - Props: `id` (for scroll-to), `background` (image path or 'none'), `className`
    - Renders `<section>` with consistent padding, max-width, center alignment
    - Mobile: `px-4 py-12`, Desktop: `px-8 py-20`
    - Optional background image with proper positioning
  - Create `src/components/ui/decorative-dots.astro` — the "..." separator:
    - Three dots in a row, styled with primary color, letter-spacing
    - Used between sections as visual divider (seen in screenshots)
  - Create `src/components/ui/section-heading.astro` — consistent heading:
    - Props: `cursive` (boolean), `size` ('lg' | 'md' | 'sm')
    - Cursive variant uses Cormorant Infant italic style (for Жених, Невеста, quotes)
    - Non-cursive uses Cormorant Infant bold (for Меню, Примечание etc)
    - Centered text, appropriate font sizes
  - Create `src/components/ui/button.astro` — styled button:
    - Props: `variant` ('primary' | 'outline'), `icon` (optional emoji/symbol)
    - Primary: sage green bg, white text, rounded-full, shadow (for "Подтвердить", "Отправить")
    - Outline: border sage green, transparent bg (for "Добавить в календарь")
    - Hover/active states with CSS transitions
  - Create `src/components/ui/floral-frame.astro` — background decorator:
    - Props: `image` (path to floral PNG), `position` ('top' | 'full' | 'corners')
    - Positions the floral PNG as a decorative background/overlay
    - Uses `object-fit`, `object-position` for correct placement
    - White-background PNGs work because all sections have white/off-white bg

  **Must NOT do**:
  - Do NOT create React components for static UI — use Astro components
  - Do NOT add animation libraries — CSS transitions only
  - Do NOT over-abstract — these are simple presentational wrappers
  - Do NOT use PascalCase filenames

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI components requiring visual design sense — spacing, typography, decorative elements
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Needed for design decisions — font sizes, spacing rhythm, button styling
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed yet — QA will use build check

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 6)
  - **Blocks**: Tasks 8-12, 15, 16 (sections using these components)
  - **Blocked By**: Task 1 (needs project structure)

  **References**:

  **Asset References**:
  - Screenshots 1-5 (provided by user) — Show visual style of headings, buttons, separators, floral frames
  - `public/images/floral-*.png` — The 5 floral decoration images (after Task 3 renames)

  **External References**:
  - Astro components: `https://docs.astro.build/en/basics/astro-components/` — .astro component syntax with Props
  - Tailwind v4: `https://tailwindcss.com/docs` — Utility classes reference

  **WHY Each Reference Matters**:
  - Astro component syntax differs from React — uses `---` frontmatter for props, HTML for template
  - Tailwind utility classes for responsive mobile-first design (sm:, md:, lg:)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All UI components render without errors
    Tool: Bash
    Preconditions: Components created, Task 2 theme applied
    Steps:
      1. Create a temporary test page `src/pages/test-ui.astro` that imports and renders each component
      2. Run `bun run build`
      3. Verify build succeeds
      4. Delete test page
    Expected Result: All components compile and render in Astro
    Failure Indicators: Build errors mentioning component files
    Evidence: .sisyphus/evidence/task-5-components-build.txt

  Scenario: Components use correct file naming
    Tool: Bash
    Preconditions: Components created
    Steps:
      1. List all files in src/components/ui/
      2. Verify ALL filenames are kebab-case (no PascalCase)
    Expected Result: All component files follow kebab-case convention
    Failure Indicators: Any non-kebab-case filename
    Evidence: .sisyphus/evidence/task-5-naming-check.txt
  ```

  **Commit**: YES (groups with Task 6)
  - Message: `feat(layout): add shared ui components and base layout`
  - Files: `src/components/ui/`
  - Pre-commit: `bun run build`

- [ ] 6. Base Layout — HTML Shell, Meta Tags, OG, Sticky Header Skeleton

  **What to do**:
  - Create `src/layouts/base-layout.astro` — main HTML layout:
    - `<!DOCTYPE html>`, `<html lang="ru">`, proper charset/viewport meta
    - Import `global.css` (from Task 2)
    - OG meta tags for social sharing: title "Даниил & Анастасия — Свадьба", description, og:image (floral-hero-frame.png)
    - Favicon: simple green leaf emoji or generate a minimal SVG favicon
    - `<slot />` for page content
  - Create `src/components/header.astro` — sticky header:
    - Fixed/sticky at top, z-50, semi-transparent sage green background
    - Left: hamburger icon (☰) — just the button, drawer logic in Task 18
    - Center: "Приглашение" text
    - Right: "Добавить в календарь" outline button (just the button, .ics logic in Task 17)
    - Mobile: compact padding, smaller font
    - Desktop: wider padding
  - Create `src/pages/index.astro` — main page:
    - Uses `base-layout.astro`
    - Has `<Header />` component
    - Empty `<main>` with comment placeholders for each section (to be filled in Wave 2-3)
    - Proper section ordering matching screenshots

  **Must NOT do**:
  - Do NOT implement hamburger drawer functionality yet — only the button
  - Do NOT implement .ics download yet — only the button
  - Do NOT add section content — only structural skeleton

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Layout and header design require visual awareness — spacing, transparency, sticky behavior
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Header visual design — sticky behavior, background transparency, responsive sizing
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed yet — structural task

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1)
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Tasks 7, 12-14, 17, 18 (page structure needed)
  - **Blocked By**: Task 1 (needs project structure)

  **References**:

  **Screenshot References**:
  - Screenshot 1 (top) — Shows header: ☰ "Приглашение" [Добавить в календарь] on sage green background

  **External References**:
  - Astro layouts: `https://docs.astro.build/en/basics/layouts/` — Layout component pattern
  - OG tags: `https://ogp.me/` — Open Graph protocol for social sharing

  **WHY Each Reference Matters**:
  - Astro layouts use `<slot />` for content injection — different from React children
  - OG tags ensure wedding invite looks good when shared in messengers (WhatsApp, Telegram)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Layout renders with header
    Tool: Playwright
    Preconditions: Dev server running, Tasks 1-2 complete
    Steps:
      1. Navigate to http://localhost:4321
      2. Verify page has `<html lang="ru">`
      3. Verify sticky header is visible with text "Приглашение"
      4. Verify "Добавить в календарь" button exists in header
      5. Verify hamburger icon (☰) exists
      6. Screenshot at 375px width
    Expected Result: Page renders with Russian lang, sticky header with all 3 elements
    Failure Indicators: Missing header, wrong language, missing elements
    Evidence: .sisyphus/evidence/task-6-layout-mobile.png

  Scenario: OG meta tags present
    Tool: Bash
    Preconditions: Layout created
    Steps:
      1. Run `bun run build`
      2. Read dist/index.html
      3. Verify og:title, og:description, og:image meta tags exist
    Expected Result: OG tags present in built HTML
    Failure Indicators: Missing OG tags
    Evidence: .sisyphus/evidence/task-6-og-tags.txt

  Scenario: Header stays fixed on scroll
    Tool: Playwright
    Preconditions: Dev server running, some content on page
    Steps:
      1. Navigate to http://localhost:4321 at 375px width
      2. Add temporary tall content to test scroll
      3. Scroll down 500px
      4. Verify header is still visible at top (position: sticky/fixed)
      5. Screenshot
    Expected Result: Header remains visible after scrolling
    Failure Indicators: Header scrolls away
    Evidence: .sisyphus/evidence/task-6-sticky-header.png
  ```

  **Commit**: YES (groups with Task 5)
  - Message: `feat(layout): add shared ui components and base layout`
  - Files: `src/layouts/`, `src/components/header.astro`, `src/pages/index.astro`
  - Pre-commit: `bun run build`

- [ ] 7. Hero Section + Date Announcement Block

  **What to do**:
  - Create `src/components/sections/hero-section.astro`:
    - Full-viewport height (100vh or 100svh) hero with `floral-hero-frame.png` as background
    - Background image: positioned at top, covering upper half with hanging floral elements
    - Content centered vertically in lower portion:
      - "..." decorative dots (use `decorative-dots` component)
      - "ВМЕСТЕ И НАВСЕГДА" — uppercase, letter-spacing, small caps, muted text
      - "Даниил & Анастасия" — large heading, Cormorant Infant Bold, centered
    - Subtle white gradient overlay at bottom to blend into next section
  - Create `src/components/sections/date-section.astro`:
    - White background, centered text
    - "БУДЕМ СЧАСТЛИВЫ РАЗДЕЛИТЬ ЭТОТ ДЕНЬ С ВАМИ" — uppercase, letter-spacing, small text
    - "06 июня 2026" — large, Cormorant Infant Light, elegant
    - "СУББОТА, 15:00" — uppercase, letter-spacing, smaller
    - "..." decorative dots separator
    - "ЖДЕМ ВАС!" — uppercase, letter-spacing
    - Below: placeholder for countdown timer (empty div with id="countdown-slot")
  - Add both sections to `src/pages/index.astro` in correct order
  - Floral decoration at bottom of date section using `floral-top-border.png`

  **Must NOT do**:
  - Do NOT implement the countdown timer — just leave the slot/placeholder
  - Do NOT use JavaScript in these sections — pure static HTML/CSS
  - Do NOT hardcode colors — use Tailwind theme tokens

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Hero section is the most visually critical — needs perfect image positioning, typography, and spacing
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Hero visual design — background placement, text overlay, gradient blending

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-13)
  - **Blocks**: Tasks 18, 19 (page assembly depends on sections)
  - **Blocked By**: Tasks 2 (theme), 3 (assets), 6 (layout)

  **References**:

  **Screenshot References**:
  - Screenshot 1 (top half) — Hero with floral canopy, "Вместе и навсегда", "Даниил & Анастасия", date info, countdown

  **Asset References**:
  - `public/images/floral-hero-frame.png` — Main hero background with hanging flowers from top + sides
  - `public/images/floral-top-border.png` — Floral canopy for section transition

  **Component References**:
  - `src/components/ui/decorative-dots.astro` — For "..." separators
  - `src/components/ui/section-heading.astro` — For "Даниил & Анастасия" heading
  - `src/components/ui/section-wrapper.astro` — For date section container

  **WHY Each Reference Matters**:
  - Screenshot shows exact visual layout to replicate — floral at top, text centered below
  - Floral hero frame image has white background — must position on white area, flowers hang from top edge
  - Decorative dots used as visual separator between elements

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Hero section renders with floral background
    Tool: Playwright
    Preconditions: Dev server running, Tasks 1-6 complete
    Steps:
      1. Navigate to http://localhost:4321 at 375px width
      2. Verify hero section takes approximately full viewport height
      3. Verify floral-hero-frame.png is visible as background decoration
      4. Verify text "Даниил & Анастасия" is visible and centered
      5. Verify "ВМЕСТЕ И НАВСЕГДА" text is present
      6. Screenshot full hero section
    Expected Result: Hero fills viewport with floral decoration at top, names centered
    Failure Indicators: Missing background, text not centered, wrong font
    Evidence: .sisyphus/evidence/task-7-hero-mobile.png

  Scenario: Date section shows correct information
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll past hero to date section
      2. Verify "06 июня 2026" text is present
      3. Verify "СУББОТА, 15:00" text is present
      4. Verify "ЖДЕМ ВАС!" text is present
      5. Verify countdown placeholder div exists
      6. Screenshot date section
    Expected Result: All date information visible with correct formatting
    Failure Indicators: Missing text, wrong date, no countdown placeholder
    Evidence: .sisyphus/evidence/task-7-date-section.png
  ```

  **Commit**: YES (groups with Tasks 8-13)
  - Message: `feat(sections): implement all static content sections`
  - Files: `src/components/sections/hero-section.astro`, `src/components/sections/date-section.astro`

- [ ] 8. Dear Guest Section + Couple Photo

  **What to do**:
  - Create `src/components/sections/dear-guest-section.astro`:
    - `floral-full-frame.png` as decorative border (top + bottom flowers)
    - "Дорогой Гость!" — large cursive heading, Cormorant Infant Bold italic
    - Invitation text (centered, Cormorant Infant Light):
      "Мы рады сообщить Вам, что 06.06.2026 состоится самое главное торжество в нашей жизни - день нашей свадьбы! Приглашаем Вас разделить с нами радость этого незабываемого дня."
    - "06.06.2026 в 15:00" — centered, slightly emphasized
  - Create `src/components/sections/couple-photo-section.astro`:
    - `floral-corner-frame.png` as decorative border
    - Rectangular photo of couple (use `couple-placeholder.jpg`)
    - Photo with subtle shadow or border
    - Decorative floral elements around photo frame
  - Add both sections to `src/pages/index.astro`

  **Must NOT do**:
  - Do NOT use real photos — placeholders only
  - Do NOT add click/interaction to photos

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Decorative framing with floral PNGs requires visual positioning skill
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Photo framing, floral decoration placement, text typography

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 9-13)
  - **Blocks**: Task 19 (page assembly)
  - **Blocked By**: Tasks 2 (theme), 3 (assets), 5 (UI components)

  **References**:

  **Screenshot References**:
  - Screenshot 1 (bottom half) — "Дорогой Гость!" section with floral frame borders
  - Screenshot 2 (top quarter) — Date/time text and couple photo in floral frame

  **Asset References**:
  - `public/images/floral-full-frame.png` — Top + bottom border (for Dear Guest)
  - `public/images/floral-corner-frame.png` — Corner decorations (for couple photo)
  - `public/images/photos/couple-placeholder.jpg` — Placeholder photo

  **Component References**:
  - `src/components/ui/section-heading.astro` — For "Дорогой Гость!" cursive heading
  - `src/components/ui/section-wrapper.astro` — For section container
  - `src/components/ui/floral-frame.astro` — For background decoration

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Dear Guest section with floral frame
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:4321 at 375px width
      2. Scroll to Dear Guest section
      3. Verify "Дорогой Гость!" heading is visible in cursive style
      4. Verify invitation text is present and centered
      5. Verify "06.06.2026 в 15:00" is visible
      6. Verify floral frame decoration is visible
      7. Screenshot the section
    Expected Result: Section matches screenshot — cursive heading, centered text, floral frame
    Failure Indicators: Missing heading, wrong font style, no floral decoration
    Evidence: .sisyphus/evidence/task-8-dear-guest.png

  Scenario: Couple photo renders with placeholder
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to couple photo section
      2. Verify img element with src containing "couple-placeholder" exists
      3. Verify image has alt text
      4. Screenshot
    Expected Result: Placeholder photo visible in decorated frame
    Failure Indicators: Broken image, missing alt text
    Evidence: .sisyphus/evidence/task-8-couple-photo.png
  ```

  **Commit**: YES (groups with Tasks 7, 9-13)
  - Message: `feat(sections): implement all static content sections`

- [ ] 9. Groom/Bride Sections + Quote

  **What to do**:
  - Create `src/components/sections/quote-section.astro`:
    - "Там, где посеяна любовь, растёт радость!" — large cursive text (Cormorant Infant Bold italic)
    - Centered, with generous padding
    - Decorative elements (subtle floral corners or dots)
  - Create `src/components/sections/couple-profiles-section.astro`:
    - Two circular photo frames vertically stacked (mobile-first):
      - Groom: circular `groom-placeholder.jpg`, below: "Жених" in cursive
      - Bride: circular `bride-placeholder.jpg`, below: "Невеста" in cursive
    - Photos: `rounded-full`, `object-cover`, shadow, floral ring decoration around circles
    - On desktop: could be side by side (md:flex-row)
  - Add to `src/pages/index.astro`

  **Must NOT do**:
  - Do NOT use real names under photos — just "Жених" and "Невеста"
  - Do NOT add hover effects on photos

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Circular photo framing with floral decoration requires visual skill
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Circular photo styling, cursive typography, quote section layout

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 10-13)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 2, 3, 5

  **References**:

  **Screenshot References**:
  - Screenshot 2 (middle) — Quote in cursive, groom circular photo + "Жених", bride circular photo + "Невеста"

  **Asset References**:
  - `public/images/photos/groom-placeholder.jpg` — Circular groom photo
  - `public/images/photos/bride-placeholder.jpg` — Circular bride photo

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Quote renders in cursive
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to quote section at 375px width
      2. Verify quote text "Там, где посеяна любовь, растёт радость!" is visible
      3. Verify font is Cormorant Infant (cursive style)
      4. Screenshot
    Expected Result: Quote displayed in cursive italic style, centered
    Failure Indicators: Wrong font, text missing
    Evidence: .sisyphus/evidence/task-9-quote.png

  Scenario: Groom and bride photos render as circles
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to couple profiles section at 375px width
      2. Verify groom photo exists with `rounded-full` styling (circular)
      3. Verify "Жених" label under groom photo in cursive
      4. Verify bride photo exists with `rounded-full` styling
      5. Verify "Невеста" label under bride photo in cursive
      6. Screenshot full section
    Expected Result: Two circular photos vertically stacked with cursive labels
    Failure Indicators: Square photos, missing labels, wrong layout
    Evidence: .sisyphus/evidence/task-9-couple-profiles.png
  ```

  **Commit**: YES (groups with Tasks 7, 8, 10-13)

- [ ] 10. Info Sections — Menu, Gifts, Note, Confirmation, Photo

  **What to do**:
  - Create `src/components/sections/info-sections.astro` — a single component rendering 5 content blocks:
  - **Меню** block:
    - "Меню" cursive heading
    - Text: "Меню разнообразно, поэтому сообщите нам заранее, если у вас есть какие-либо предпочтения или диетические ограничения. После подтверждения вы сможете пройти опрос о своих вкусовых предпочтениях и напитках."
  - **Пожелания по подаркам** block:
    - "Пожелания по подаркам" cursive heading
    - Text: "Ваше присутствие в день нашей свадьбы - самый значимый подарок для нас!"
    - Extra text about flowers → alternatives (wine or cash equivalent)
  - **Примечание** block:
    - "Примечание" cursive heading
    - Text about "Горько": "Будем благодарны, если вы воздержитесь от криков 'Горько' на празднике, ведь поцелуй — это знак выражения чувств, он не может быть по заказу."
  - **Подтверждение** block:
    - "Подтверждение" cursive heading
    - Text: "Пожалуйста подтвердите свое присутствие до 01.01.2025"
  - **Фото** block:
    - "Фото" cursive heading
    - Text: "Опубликуйте фото дня нашей свадьбы в соц.сетях с хештегом #"
  - Each block: centered text, consistent spacing, `floral-corner-frame.png` as subtle background
  - Blocks separated by gentle spacing or thin decorative dividers

  **Must NOT do**:
  - Do NOT create 5 separate component files — one component with all blocks is fine
  - Do NOT add interactivity to these blocks

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Multiple text sections with consistent typography and decoration
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Consistent text block styling, spacing rhythm, decorative framing

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7-9, 11-13)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 2, 5

  **References**:

  **Screenshot References**:
  - Screenshot 2 (bottom) — "Меню" section, "Пожелания по подаркам" beginning
  - Screenshot 3 (full) — "Пожелания по подаркам" continued, "Примечание", "Подтверждение", "Фото"

  **Component References**:
  - `src/components/ui/section-heading.astro` — Cursive headings for each block
  - `src/components/ui/section-wrapper.astro` — Container for the section group

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All 5 info blocks render with correct headings
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to page at 375px width
      2. Scroll to info sections
      3. Verify heading "Меню" is visible in cursive
      4. Verify heading "Пожелания по подаркам" is visible
      5. Verify heading "Примечание" is visible
      6. Verify heading "Подтверждение" is visible
      7. Verify heading "Фото" is visible
      8. Screenshot each block
    Expected Result: All 5 headings visible in cursive with corresponding text
    Failure Indicators: Missing headings, wrong text, broken layout
    Evidence: .sisyphus/evidence/task-10-info-sections.png

  Scenario: Text content matches specifications
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Verify "Горько" text is present in Примечание
      2. Verify hashtag mention in Фото section
    Expected Result: Content matches screenshots text
    Failure Indicators: Missing or wrong text
    Evidence: .sisyphus/evidence/task-10-text-content.txt
  ```

  **Commit**: YES (groups with Tasks 7-9, 11-13)

- [ ] 11. Dress Code + "Ждем Вас" Section

  **What to do**:
  - Create `src/components/sections/dress-code-section.astro`:
    - "Ждем Вас!" — large cursive heading (Cormorant Infant Bold italic)
    - Text: "Будем благодарны, если при выборе нарядов на наше торжество вы придержитесь следующей палитры"
    - Color palette display: 5 circles in a row showing dress code colors:
      - Circle 1: dark forest green (#3D5A3A)
      - Circle 2: olive (#6B7B4C)
      - Circle 3: sage (#8B9D77)
      - Circle 4: light sage (#B5C4A3)
      - Circle 5: cream (#D4C9A8)
    - Circles: ~40px diameter, `rounded-full`, with subtle border, spaced evenly
    - Below circles: floral decoration transition

  **Must NOT do**:
  - Do NOT make color circles clickable or interactive
  - Do NOT hardcode hex colors inline — use CSS custom properties from theme

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Color palette display requires precise visual styling
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Color circle layout, spacing, visual balance

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7-10, 12-13)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 2, 5

  **References**:

  **Screenshot References**:
  - Screenshot 3 (bottom) — "Ждем Вас!" with 5 colored circles below

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Dress code colors render as circles
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate at 375px width, scroll to dress code section
      2. Verify "Ждем Вас!" heading in cursive
      3. Verify 5 colored circles are visible
      4. Verify circles are rounded-full (circular)
      5. Verify circles have distinct colors (not all same)
      6. Screenshot
    Expected Result: 5 distinctly colored circles in a horizontal row
    Failure Indicators: Missing circles, not round, same colors
    Evidence: .sisyphus/evidence/task-11-dress-code.png
  ```

  **Commit**: YES (groups with Tasks 7-10, 12-13)

- [ ] 12. Schedule Timeline Section

  **What to do**:
  - Create `src/components/sections/schedule-section.astro`:
    - Background: `floral-hero-frame.png` (or similar floral) with dark overlay for contrast
    - "Свадебное расписание" — large white heading on dark/floral background
    - Timeline layout — vertical line with events:
      - **Event 1**: 13:00, 06.06.2026 | "Торжественная регистрация брака" | "ЗАГС п. Оршанка, ул. Советская д. 109" | Description text
      - **Event 2**: 15:00, 06.06.2026 | "Фуршет" | "Банкетный зал" | Description text
      - **Event 3**: 15:30, 06.06.2026 | "Праздничный банкет" | "ресторан Savory House. г.Йошкар-Ола, ул. 70-летия Вооруженных сил СССР, д.20" | Description text
    - Timeline visual: vertical line on left, time/date on left of line, event details on right
    - Time in bold red/accent color, date below in smaller text
    - Event title in bold, venue below, description in lighter text
    - Mobile: stacked layout with time above event

  **Must NOT do**:
  - Do NOT make timeline interactive or animated
  - Do NOT use a timeline library — pure CSS

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Timeline is a complex visual layout with precise alignment
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Timeline vertical layout, left-right alignment, responsive stacking

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7-11, 13)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 2, 5, 6

  **References**:

  **Screenshot References**:
  - Screenshot 4 (bottom) — "Свадебное расписание" with dark floral background, timeline with 13:00 event
  - Screenshot 5 (top half) — Timeline continued: all 3 events with time/date/venue layout

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Schedule timeline renders 3 events
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate at 375px width, scroll to schedule section
      2. Verify "Свадебное расписание" heading
      3. Verify 3 timeline events are visible
      4. Verify "13:00" time for first event
      5. Verify "Торжественная регистрация брака" text
      6. Verify "15:00" and "15:30" for subsequent events
      7. Verify venue addresses are present
      8. Screenshot full section
    Expected Result: Timeline with 3 events showing time, title, and venue
    Failure Indicators: Missing events, wrong times, broken layout
    Evidence: .sisyphus/evidence/task-12-schedule.png

  Scenario: Schedule section has dark/floral background
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to schedule section
      2. Verify section has distinct background (not white)
      3. Verify text is legible against background
    Expected Result: Dark or floral background with readable white/light text
    Failure Indicators: White background, illegible text
    Evidence: .sisyphus/evidence/task-12-schedule-bg.png
  ```

  **Commit**: YES (groups with Tasks 7-11, 13)

- [ ] 13. Yandex Maps Iframe Section

  **What to do**:
  - Create `src/components/sections/map-section.astro`:
    - Yandex Maps iframe embed — full width, approximately 400px height on mobile
    - iframe src: Yandex Maps embed URL for the venue location (ресторан Savory House, г.Йошкар-Ола)
    - Use Yandex Maps "Конструктор карт" embed URL format
    - Lazy loading: `loading="lazy"` attribute on iframe
    - Fallback text if iframe fails to load: "Открыть в Яндекс.Картах" link
    - No border, rounded corners optional
    - Below map or overlay: address text for easy copy

  **Must NOT do**:
  - Do NOT use Yandex Maps JS API — iframe only
  - Do NOT require API key
  - Do NOT make map full page height

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple iframe embed — no visual complexity
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7-12)
  - **Blocks**: Task 19
  - **Blocked By**: Task 6 (layout)

  **References**:

  **Screenshot References**:
  - Screenshot 5 (bottom half) — Full Yandex Maps embed with controls

  **External References**:
  - Yandex Maps embed: `https://yandex.ru/map-constructor/` — Embed URL generator

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Map iframe renders
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate at 375px width, scroll to map section
      2. Verify iframe element exists with yandex maps src
      3. Verify iframe has loading="lazy"
      4. Verify iframe height is approximately 400px
      5. Screenshot
    Expected Result: Yandex Maps iframe visible with venue location
    Failure Indicators: Missing iframe, broken embed, no lazy loading
    Evidence: .sisyphus/evidence/task-13-yandex-map.png

  Scenario: Fallback link exists
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Verify link with text containing "Яндекс.Карт" exists near map
    Expected Result: Fallback link to Yandex Maps present
    Failure Indicators: No fallback link
    Evidence: .sisyphus/evidence/task-13-map-fallback.txt
  ```

  **Commit**: YES (groups with Tasks 7-12)
  - Message: `feat(sections): implement all static content sections`

- [ ] 14. Countdown Timer React Island

  **What to do**:
  - Create `src/components/islands/countdown-timer.jsx` — React island:
    - Target date: June 6, 2026 15:00 Moscow time (UTC+3)
    - Displays: weeks, days, hours, minutes, seconds — all updating in real-time
    - Each unit in a separate "cell": large number on top, label below
    - Labels in Russian: "недель", "дней", "часов", "минут", "секунд"
    - Layout: horizontal row of 5 cells, centered
    - Use `useState` + `useEffect` with `setInterval(1000)` for updates
    - Cleanup interval on unmount
    - **Post-wedding state**: After June 6, 2026 15:00 — show "Свадьба состоялась!" instead of countdown
    - Numbers: large, Cormorant Infant Light, slightly bold
    - Labels: small, uppercase, letter-spacing
  - Add to `src/pages/index.astro` with `client:visible` directive (hydrates when scrolled into view)
  - Style with Tailwind classes (no separate CSS file)

  **Must NOT do**:
  - Do NOT use a countdown library — simple math with Date
  - Do NOT use `client:load` — use `client:visible` to avoid hydrating when off-screen
  - Do NOT create .tsx file — use .jsx

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Timer needs both logic (countdown math) and visual design (number display)
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Number cell layout, typography, responsive sizing

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 15, 16, 17)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 2 (theme), 6 (layout)

  **References**:

  **Screenshot References**:
  - Screenshot 1 (bottom) — Countdown showing "09 недель 01 дней 09 часов 37 минут 38 секунд"

  **External References**:
  - Astro React islands: `https://docs.astro.build/en/guides/framework-components/#hydrating-interactive-components` — client:visible directive
  - React hooks: `https://react.dev/reference/react/useEffect` — Cleanup pattern for intervals

  **WHY Each Reference Matters**:
  - `client:visible` ensures JS only loads when countdown scrolls into view — better performance
  - useEffect cleanup prevents memory leaks when component unmounts

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Countdown displays and updates
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:4321 at 375px width
      2. Scroll to countdown timer section
      3. Wait for hydration (up to 5s)
      4. Verify 5 number cells are visible (weeks, days, hours, minutes, seconds)
      5. Read the "секунд" value
      6. Wait 2 seconds
      7. Read the "секунд" value again
      8. Verify it changed (decremented)
      9. Screenshot
    Expected Result: Timer shows 5 units, seconds value decrements every second
    Failure Indicators: No numbers, no update, hydration error
    Evidence: .sisyphus/evidence/task-14-countdown.png

  Scenario: Russian labels are correct
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to countdown timer
      2. Verify labels: "недель", "дней", "часов", "минут", "секунд"
    Expected Result: All 5 labels in Russian
    Failure Indicators: English labels, missing labels
    Evidence: .sisyphus/evidence/task-14-russian-labels.txt
  ```

  **Commit**: YES (groups with Tasks 15-17)
  - Message: `feat(islands): add countdown, rsvp, message form, survey, and calendar`

- [ ] 15. RSVP Confirmation Form Island

  **What to do**:
  - Create `src/components/islands/rsvp-form.jsx` — React island:
    - Big green "✓ Подтвердить" button (primary button style from Task 5)
    - On click: shows confirmation state with success animation (checkmark → "Подтверждено!")
    - Uses `rsvp-service.js` to send confirmation to Telegram
    - Simple state machine: idle → loading → success / error
    - Loading: button disabled, show spinner or "Отправка..."
    - Success: button changes to "✓ Подтверждено!" in lighter green, disabled
    - Error: show error message below button, allow retry
    - zod schema: just `{ confirmed: z.literal(true) }` (simple)
    - react-hook-form wraps the submit handler for consistency
  - Add to `src/pages/index.astro` with `client:visible`

  **Must NOT do**:
  - Do NOT create a complex multi-field form — just one button
  - Do NOT add name/email fields to RSVP — confirmation only
  - Do NOT use TypeScript — .jsx only

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Button state transitions, loading/success animations need visual skill
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Button state design, micro-animations, loading states

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 14, 16, 17)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 4 (API service), 5 (UI components)

  **References**:

  **Screenshot References**:
  - Screenshot 3 (bottom) — Green "✓ Подтвердить" full-width button

  **API References**:
  - `src/services/rsvp-service.js:submitRsvp()` — Service method for RSVP submission

  **Component References**:
  - Button styling from `src/components/ui/button.astro` — Match primary button visual style

  **External References**:
  - react-hook-form: `https://react-hook-form.com/get-started` — Basic form setup
  - @hookform/resolvers: `https://github.com/react-hook-form/resolvers#zod` — Zod resolver

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: RSVP button renders and is clickable
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate at 375px width, scroll to RSVP section
      2. Verify green "Подтвердить" button is visible
      3. Verify button has checkmark icon (✓)
      4. Click the button
      5. Verify button state changes (loading or success)
      6. Screenshot before and after click
    Expected Result: Button visible, clickable, shows state change on click
    Failure Indicators: Button missing, no state change, JS error
    Evidence: .sisyphus/evidence/task-15-rsvp-click.png

  Scenario: RSVP handles API error gracefully
    Tool: Playwright
    Preconditions: Dev server running, no TELEGRAM env vars (stub mode)
    Steps:
      1. Scroll to RSVP section
      2. Click "Подтвердить" button
      3. Wait for response
      4. Verify either success stub or graceful error message (not JS crash)
    Expected Result: Graceful handling — no unhandled errors in console
    Failure Indicators: Unhandled promise rejection, blank screen
    Evidence: .sisyphus/evidence/task-15-rsvp-error-handling.png
  ```

  **Commit**: YES (groups with Tasks 14, 16, 17)

- [ ] 16. Message Form + Survey Island

  **What to do**:
  - Create `src/components/islands/message-form.jsx` — React island:
    - **Message block**:
      - "💬 Добавить сообщение для жениха и невесты" — label
      - Textarea: bordered, full width, placeholder text
      - Checkbox: "денежный подарок" with label
      - "✈ Отправить" button (primary style)
    - **Survey block** (rendered below or as follow-up):
      - Info banner with left orange/red border: "Пожалуйста, ответьте на вопросы, которые для вас подготовили **Жених** и **Невеста**:"
      - Light teal/mint background card (`color-survey-bg`)
      - **Question 1**: "Потребуется ли вам трансфер?"
        - Radio: Нет / Только до торжества / Только после торжества / До и после торжества
      - **Question 2**: "Какой алкоголь вы предпочитаете?"
        - Radio: Красное вино / Белое вино / Шампанское / Виски/коньяк / Не буду пить алкоголь / Самогон
    - zod schema for validation:
      ```
      message: z.string().optional()
      moneyGift: z.boolean().default(false)
      transfer: z.enum(['none', 'to', 'from', 'both']).optional()
      alcohol: z.enum(['red-wine', 'white-wine', 'champagne', 'whiskey', 'none', 'moonshine']).optional()
      ```
    - react-hook-form for form state management
    - Submit sends both message + survey in one call via `submitMessage` + `submitSurvey`
    - Loading/success/error states similar to RSVP form
  - Add to `src/pages/index.astro` with `client:visible`

  **Must NOT do**:
  - Do NOT make survey questions required — all optional
  - Do NOT split into separate React components/files — one island handles both
  - Do NOT use TypeScript

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex form with multiple input types, styled card, radio buttons — visual + logic
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Form layout, radio button styling, card design, teal background

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 14, 15, 17)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 4 (API service), 5 (UI components)

  **References**:

  **Screenshot References**:
  - Screenshot 3 (bottom) — Message textarea, "денежный подарок" checkbox, "Отправить" button
  - Screenshot 4 (top half) — Survey card with teal bg, orange border info banner, radio questions

  **API References**:
  - `src/services/rsvp-service.js:submitMessage()` — Message submission
  - `src/services/rsvp-service.js:submitSurvey()` — Survey submission

  **External References**:
  - react-hook-form register: `https://react-hook-form.com/api/useform/register` — Radio button registration
  - zod enum: `https://zod.dev/?id=enums` — Enum validation

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Message form renders with all fields
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate at 375px width, scroll to message form
      2. Verify textarea is visible and editable
      3. Verify "денежный подарок" checkbox exists
      4. Verify "Отправить" button exists
      5. Type "Поздравляем!" into textarea
      6. Check the "денежный подарок" checkbox
      7. Screenshot
    Expected Result: All form fields visible and interactive
    Failure Indicators: Missing fields, non-interactive elements
    Evidence: .sisyphus/evidence/task-16-message-form.png

  Scenario: Survey questions render with radio buttons
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll to survey section
      2. Verify info banner with orange/red left border is visible
      3. Verify "Потребуется ли вам трансфер?" question with 4 radio options
      4. Verify "Какой алкоголь вы предпочитаете?" question with 6 radio options
      5. Click "Красное вино" radio
      6. Verify it becomes selected
      7. Screenshot full survey
    Expected Result: Both questions with all radio options, interactive selection
    Failure Indicators: Missing questions, non-clickable radios, missing options
    Evidence: .sisyphus/evidence/task-16-survey.png

  Scenario: Form submission sends data
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Fill textarea with "Тестовое сообщение"
      2. Select "Нет" for transfer
      3. Select "Шампанское" for alcohol
      4. Click "Отправить"
      5. Verify loading state appears briefly
      6. Verify success or stub response (not error)
    Expected Result: Form submits without errors, shows success state
    Failure Indicators: JS error, frozen loading state, no feedback
    Evidence: .sisyphus/evidence/task-16-form-submit.png
  ```

  **Commit**: YES (groups with Tasks 14, 15, 17)

- [ ] 17. Calendar .ics Generation + Download Button

  **What to do**:
  - Create `src/utils/generate-ics.js` — utility function:
    - Generates valid .ics (iCalendar) format string
    - Event details:
      - Title: "Свадьба Даниила и Анастасии"
      - Date: June 6, 2026, 15:00 Moscow time (UTC+3)
      - Duration: 6 hours (until 21:00)
      - Location: "ресторан Savory House, г.Йошкар-Ола, ул. 70-летия Вооруженных сил СССР, д.20"
      - Description: "Торжественная регистрация в 13:00, ЗАГС п. Оршанка. Фуршет в 15:00. Банкет в 15:30."
    - Returns a Blob or data URI for download
  - Wire up the "Добавить в календарь" button in header (from Task 6):
    - Create `src/components/islands/calendar-button.jsx` — React island
    - On click: call `generateIcs()`, trigger browser download of .ics file
    - File name: `wedding-daniil-anastasia.ics`
    - Use `client:load` (header is always visible, needs immediate hydration)
  - Replace the static button in header with this React island

  **Must NOT do**:
  - Do NOT use a .ics library — format is simple enough to generate manually
  - Do NOT store .ics as a static file — generate dynamically (allows easy date changes)
  - Do NOT use TypeScript

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple utility function + button click handler — well-defined output format
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 14, 15, 16)
  - **Blocks**: Task 19
  - **Blocked By**: Task 6 (header with button placeholder)

  **References**:

  **Screenshot References**:
  - Screenshot 1 (header) — "Добавить в календарь" button in top right of header

  **External References**:
  - ICS format spec: `https://icalendar.org/iCalendar-RFC-5545/` — iCalendar standard
  - ICS example: A valid .ics file needs: VCALENDAR wrapper, VEVENT with DTSTART, DTEND, SUMMARY, LOCATION, DESCRIPTION

  **WHY Each Reference Matters**:
  - .ics format has strict requirements — must follow RFC 5545 for Apple Calendar/Google Calendar compatibility
  - DTSTART/DTEND must use correct timezone format (TZID=Europe/Moscow or UTC offset)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Calendar button triggers download
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:4321 at 375px width
      2. Verify "Добавить в календарь" button in header
      3. Click the button
      4. Verify a file download is triggered
      5. Verify downloaded file has .ics extension
      6. Read file content — verify it contains "VCALENDAR" and "VEVENT"
    Expected Result: .ics file downloads with valid calendar event
    Failure Indicators: No download, wrong format, missing VEVENT
    Evidence: .sisyphus/evidence/task-17-ics-download.txt

  Scenario: ICS file contains correct event data
    Tool: Bash
    Preconditions: .ics file generated
    Steps:
      1. Read the .ics file content
      2. Verify SUMMARY contains "Свадьба"
      3. Verify DTSTART contains "20260606" (June 6, 2026)
      4. Verify LOCATION contains "Savory House" or "Йошкар-Ола"
    Expected Result: Event data matches wedding details
    Failure Indicators: Wrong date, missing location, wrong title
    Evidence: .sisyphus/evidence/task-17-ics-content.txt
  ```

  **Commit**: YES (groups with Tasks 14-16)
  - Message: `feat(islands): add countdown, rsvp, message form, survey, and calendar`

- [ ] 18. Mobile Navigation Drawer + Scroll-to

  **What to do**:
  - Create `src/components/islands/mobile-nav.jsx` — React island:
    - Hamburger menu (☰) button triggers slide-in drawer from left
    - Drawer: full-height sidebar, semi-transparent dark overlay behind
    - Navigation links to all major sections:
      - "Главная" → hero section
      - "Дата" → date section
      - "Дорогой Гость" → dear guest section
      - "О нас" → couple profiles section
      - "Меню" → menu info section
      - "Подтверждение" → RSVP section
      - "Расписание" → schedule section
      - "Карта" → map section
    - Each link: `onClick` → smooth scroll to section `id`, close drawer
    - Smooth scroll: `element.scrollIntoView({ behavior: 'smooth' })`
    - Drawer animation: CSS transition `transform: translateX(-100%)` → `translateX(0)`
    - Close: click outside drawer, click X button, or click a link
    - Body scroll lock when drawer is open
  - Replace hamburger button in header with this React island
  - Use `client:load` (header is always visible)
  - Ensure all section components have correct `id` attributes for scroll targets

  **Must NOT do**:
  - Do NOT use a drawer library — pure CSS + React state
  - Do NOT create a horizontal desktop nav bar — only mobile drawer
  - Do NOT add desktop-specific navigation (optional future enhancement)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Drawer animation, overlay, scroll behavior — visual + interaction design
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Drawer animation, overlay design, scroll-to UX

  **Parallelization**:
  - **Can Run In Parallel**: NO (needs all sections with id attributes)
  - **Parallel Group**: Wave 4 (with Task 19, but after 7-13)
  - **Blocks**: Task 19
  - **Blocked By**: Tasks 6, 7-13 (all sections must have IDs)

  **References**:

  **Screenshot References**:
  - Screenshot 1 (header) — Hamburger icon (☰) at left of header

  **Component References**:
  - All section components (Tasks 7-13) — Need `id` attributes for scroll targets

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Hamburger opens drawer
    Tool: Playwright
    Preconditions: Dev server running, all sections rendered
    Steps:
      1. Navigate at 375px width
      2. Verify hamburger icon in header
      3. Click hamburger icon
      4. Verify drawer slides in from left
      5. Verify navigation links are visible
      6. Screenshot with drawer open
    Expected Result: Drawer opens with section links
    Failure Indicators: No drawer, missing links, no animation
    Evidence: .sisyphus/evidence/task-18-drawer-open.png

  Scenario: Navigation links scroll to sections
    Tool: Playwright
    Preconditions: Dev server running, drawer open
    Steps:
      1. Open drawer
      2. Click "Расписание" link
      3. Verify drawer closes
      4. Verify page scrolls to schedule section (verify element in viewport)
      5. Screenshot showing schedule section
    Expected Result: Smooth scroll to target section, drawer closes
    Failure Indicators: No scroll, drawer stays open, wrong section
    Evidence: .sisyphus/evidence/task-18-scroll-to.png

  Scenario: Drawer closes on overlay click
    Tool: Playwright
    Preconditions: Drawer open
    Steps:
      1. Click on overlay area (outside drawer)
      2. Verify drawer closes
    Expected Result: Drawer slides out, overlay disappears
    Failure Indicators: Drawer stays open
    Evidence: .sisyphus/evidence/task-18-drawer-close.png
  ```

  **Commit**: YES (groups with Task 19)
  - Message: `feat(nav): add mobile drawer navigation and scroll animations`

- [ ] 19. Full Page Assembly + Scroll Reveal Animations

  **What to do**:
  - Update `src/pages/index.astro` with ALL sections in correct order:
    1. `<HeroSection />`
    2. `<DateSection />`
    3. `<CountdownTimer client:visible />` (island)
    4. Floral transition decoration
    5. `<DearGuestSection />`
    6. `<CouplePhotoSection />`
    7. `<QuoteSection />`
    8. `<CoupleProfilesSection />`
    9. `<InfoSections />`
    10. `<DressCodeSection />`
    11. `<RsvpForm client:visible />` (island)
    12. `<MessageForm client:visible />` (island — includes survey)
    13. `<ScheduleSection />`
    14. `<MapSection />`
  - Add scroll-reveal animation using Intersection Observer:
    - Create `src/scripts/scroll-reveal.js` — vanilla JS (not React)
    - Observes elements with `data-reveal` attribute
    - On intersect: adds `revealed` class with CSS animation (fade-in + slight upward movement)
    - CSS: `.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }`
    - `.reveal.revealed { opacity: 1; transform: translateY(0); }`
  - Add `data-reveal` to section components for subtle entrance animations
  - Add floral transition decorations between sections (using `floral-top-border.png` or `floral-tile-pattern.png`)
  - Verify overall section ordering matches screenshots
  - Include scroll-reveal script in layout: `<script src="/scripts/scroll-reveal.js" />`

  **Must NOT do**:
  - Do NOT use animation libraries (GSAP, framer-motion) — CSS transitions + Intersection Observer only
  - Do NOT add heavy animations — subtle fade-in only
  - Do NOT change section component internals — only import and order them

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Page assembly and scroll animations require visual composition sense
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Section ordering, transition decorations, scroll animation tuning

  **Parallelization**:
  - **Can Run In Parallel**: NO (needs all sections and islands complete)
  - **Parallel Group**: Wave 4 (sequential after Tasks 7-17)
  - **Blocks**: Tasks 20, 21
  - **Blocked By**: Tasks 7-17 (all sections and islands)

  **References**:

  **Screenshot References**:
  - All 5 screenshots — For correct section ordering and visual transitions between sections

  **Component References**:
  - ALL section components from Tasks 7-13 (Astro)
  - ALL island components from Tasks 14-17 (React)
  - `src/layouts/base-layout.astro` from Task 6

  **External References**:
  - Intersection Observer: `https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API` — Scroll detection
  - Astro scripts: `https://docs.astro.build/en/guides/client-side-scripts/` — How to include client-side JS

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All 21 sections render in correct order
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate at 375px width
      2. Slowly scroll through entire page
      3. Verify each section appears in expected order (hero → date → countdown → dear guest → ...)
      4. Count total distinct sections
      5. Take full-page screenshot
    Expected Result: All sections present in correct order matching screenshots
    Failure Indicators: Missing sections, wrong order, broken layout
    Evidence: .sisyphus/evidence/task-19-full-page-mobile.png

  Scenario: Scroll reveal animations trigger
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to page
      2. Verify elements with data-reveal start with opacity: 0
      3. Scroll down to trigger reveal
      4. Verify elements gain opacity: 1 and transform back to normal
      5. Screenshot showing revealed vs unrevealed sections
    Expected Result: Elements animate in as they scroll into view
    Failure Indicators: No animation, all visible immediately, jerky transitions
    Evidence: .sisyphus/evidence/task-19-scroll-reveal.png

  Scenario: Floral transitions between sections
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Scroll through page looking for section boundaries
      2. Verify floral decoration images appear between major sections
      3. Verify decorations don't overlap text
    Expected Result: Subtle floral decorations visible between sections
    Failure Indicators: No decorations, overlapping content
    Evidence: .sisyphus/evidence/task-19-floral-transitions.png
  ```

  **Commit**: YES (groups with Task 18)
  - Message: `feat(nav): add mobile drawer navigation and scroll animations`

- [ ] 20. Netlify Deploy Config + Build Optimization

  **What to do**:
  - Create `netlify.toml`:
    ```
    [build]
      command = "bun run build"
      publish = "dist"
      functions = "netlify/functions"

    [build.environment]
      NODE_VERSION = "20"

    [[headers]]
      for = "/fonts/*"
      [headers.values]
        Cache-Control = "public, max-age=31536000, immutable"

    [[headers]]
      for = "/images/*"
      [headers.values]
        Cache-Control = "public, max-age=31536000, immutable"
    ```
  - Create `public/_redirects` if needed (SPA-style routing not needed for static)
  - Verify `bun run build` produces correct `dist/` output
  - Verify `dist/index.html` exists and includes all sections
  - Verify `dist/` includes fonts and images
  - Verify Netlify Function at `netlify/functions/send-telegram.js` is in correct location
  - Add `bun run preview` script for local static preview
  - Verify build output size is reasonable (< 5MB total)

  **Must NOT do**:
  - Do NOT add SSR adapter — static only
  - Do NOT add unnecessary build plugins
  - Do NOT commit .env file (only .env.example)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Config file creation + build verification — straightforward
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 21)
  - **Parallel Group**: Wave 4 (after Task 19)
  - **Blocks**: F1-F4 (final verification)
  - **Blocked By**: Tasks 1, 19 (needs complete project)

  **References**:

  **External References**:
  - Netlify Astro deploy: `https://docs.astro.build/en/guides/deploy/netlify/` — Astro-specific Netlify config
  - Netlify Functions: `https://docs.netlify.com/functions/get-started/` — Function directory structure

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Build produces static output
    Tool: Bash
    Preconditions: All sections and islands complete
    Steps:
      1. Run `bun run build`
      2. Verify exit code 0
      3. Verify `dist/index.html` exists
      4. Verify `dist/fonts/` directory exists with .woff files
      5. Verify `dist/images/` directory exists with .png files
      6. Check total dist/ size: `du -sh dist/`
    Expected Result: Successful build, all assets in dist/, size < 5MB
    Failure Indicators: Build failure, missing assets, oversized output
    Evidence: .sisyphus/evidence/task-20-build-output.txt

  Scenario: Netlify config is valid
    Tool: Bash
    Preconditions: netlify.toml created
    Steps:
      1. Verify `netlify.toml` exists
      2. Verify it contains `command = "bun run build"`
      3. Verify it contains `publish = "dist"`
      4. Verify it contains `functions = "netlify/functions"`
    Expected Result: Valid Netlify config pointing to correct directories
    Failure Indicators: Missing config, wrong paths
    Evidence: .sisyphus/evidence/task-20-netlify-config.txt

  Scenario: Preview server works
    Tool: Bash
    Preconditions: Build complete
    Steps:
      1. Run `bun run preview` in background
      2. Wait 3s
      3. Curl localhost preview URL
      4. Verify 200 response with HTML content
      5. Kill preview server
    Expected Result: Static site serves correctly from dist/
    Failure Indicators: Connection refused, 404, no HTML
    Evidence: .sisyphus/evidence/task-20-preview-server.txt
  ```

  **Commit**: YES (groups with Task 21)
  - Message: `feat(deploy): add netlify config and responsive polish`

- [ ] 21. Responsive Polish + Final Visual QA Pass

  **What to do**:
  - Test ALL sections at 3 breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop)
  - Fix any layout issues found:
    - Hero section: proper image scaling across breakpoints
    - Countdown timer: number sizing for different widths
    - Photo sections: couple profiles side-by-side on tablet/desktop
    - Timeline: proper alignment at wider viewports
    - Form sections: max-width container on desktop (don't stretch full width)
    - Map iframe: proper height at different widths
  - Verify Cormorant Infant font renders correctly at all sizes
  - Verify floral decorations don't overlap content at any breakpoint
  - Check that no horizontal scroll appears at any viewport width
  - Verify touch targets are >= 44px for mobile (buttons, radio buttons, checkbox)
  - Add `max-w-2xl mx-auto` or similar container to center content on desktop
  - Fine-tune spacing between sections for visual rhythm

  **Must NOT do**:
  - Do NOT redesign sections — only fix responsive issues
  - Do NOT add new features or sections
  - Do NOT change color palette or typography

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Responsive debugging requires visual eye + understanding of layout at breakpoints
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `frontend-ui-ux`: Responsive layout fixes, spacing adjustments
    - `playwright`: Screenshot at different viewports for comparison

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 20)
  - **Parallel Group**: Wave 4 (after Task 19)
  - **Blocks**: F1-F4 (final verification)
  - **Blocked By**: Task 19 (full page assembly)

  **References**:

  **Screenshot References**:
  - All 5 screenshots — Mobile layout reference for pixel-approximate matching

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: No horizontal scroll at any viewport
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375px width
      2. Navigate to page
      3. Verify document.body.scrollWidth <= window.innerWidth
      4. Repeat at 768px and 1280px
    Expected Result: No horizontal overflow at any breakpoint
    Failure Indicators: scrollWidth > innerWidth at any breakpoint
    Evidence: .sisyphus/evidence/task-21-no-overflow.txt

  Scenario: Mobile screenshots match design
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375px width
      2. Take full-page screenshot
      3. Scroll through and compare section layout with provided screenshots
      4. Verify hero, date, countdown, dear guest, couple, info, dress code, RSVP, survey, schedule, map are all present and properly laid out
    Expected Result: Mobile layout closely matches provided design screenshots
    Failure Indicators: Major layout differences, misaligned elements
    Evidence: .sisyphus/evidence/task-21-mobile-full-page.png

  Scenario: Desktop layout is centered and constrained
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 1280px width
      2. Navigate to page
      3. Verify content is centered (not stretched to full width)
      4. Verify max-width container is applied
      5. Screenshot hero + date section
      6. Screenshot form section
    Expected Result: Content centered with max-width, not stretching to edges
    Failure Indicators: Full-width text, elements touching edges
    Evidence: .sisyphus/evidence/task-21-desktop-centered.png

  Scenario: Touch targets are accessible
    Tool: Playwright
    Preconditions: Dev server running at 375px
    Steps:
      1. Find all interactive elements (buttons, radio buttons, checkboxes)
      2. Verify each has minimum height/width of 44px (or equivalent touch target)
    Expected Result: All interactive elements meet 44px minimum touch target
    Failure Indicators: Tiny buttons or radio buttons
    Evidence: .sisyphus/evidence/task-21-touch-targets.txt
  ```

  **Commit**: YES (groups with Task 20)
  - Message: `feat(deploy): add netlify config and responsive polish`
  - Pre-commit: `bun run build && bun run lint`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run build). For each "Must NOT Have": search codebase for forbidden patterns (.ts files, console.log, hardcoded tokens, PascalCase filenames) — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `bun run build` + `bun run lint` + `bun run format:check`. Review all files for: empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic variable names. Verify kebab-case file naming across ALL files. Verify no .ts/.tsx files exist.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Format [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start dev server (`bun run dev`). Open in Playwright at 375px width (mobile). Scroll through ALL 21 sections — screenshot each. Test countdown updates. Fill and submit RSVP form. Fill and submit message form. Fill and submit survey. Click "Добавить в календарь" — verify .ics downloads. Open hamburger menu — click each section link. Resize to 1280px — screenshot key sections. Save all evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Sections [21/21 rendered] | Forms [3/3 working] | Navigation [PASS/FAIL] | Calendar [PASS/FAIL] | Responsive [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual files created. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance. Detect cross-task contamination. Verify all 21 sections from screenshots are present. Flag any missing sections or unaccounted files.
  Output: `Tasks [N/N compliant] | Sections [21/21 present] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| After Task(s) | Message | Files |
|---|---|---|
| 1 | `chore(init): scaffold astro project with react, tailwind, and tooling` | All scaffolding files |
| 2, 3 | `feat(theme): configure tailwind theme, fonts, and organize assets` | tailwind config, fonts, images |
| 4 | `feat(api): add axios service layer and netlify function for telegram` | api/, netlify/ |
| 5, 6 | `feat(layout): add shared ui components and base layout` | components/, layouts/ |
| 7-13 | `feat(sections): implement all static content sections` | All section components |
| 14-17 | `feat(islands): add countdown, rsvp, message form, survey, and calendar` | React islands |
| 18-19 | `feat(nav): add mobile drawer navigation and scroll animations` | nav component, page assembly |
| 20-21 | `feat(deploy): add netlify config and responsive polish` | netlify.toml, responsive fixes |
| F1-F4 | `chore(qa): final verification and polish` | Any fixes from QA |

---

## Success Criteria

### Verification Commands
```bash
bun run build          # Expected: builds successfully, dist/ created
bun run lint           # Expected: 0 errors
bun run format:check   # Expected: all files formatted
ls dist/index.html     # Expected: file exists
```

### Final Checklist
- [ ] All "Must Have" items present and working
- [ ] All "Must NOT Have" items verified absent
- [ ] All 21 sections render on mobile (375px) and desktop (1280px)
- [ ] All forms validate with zod + react-hook-form
- [ ] Countdown timer counts down to June 6, 2026 15:00
- [ ] .ics file downloads correctly
- [ ] Yandex Maps iframe loads
- [ ] Hamburger menu works with scroll-to-section
- [ ] No TypeScript files in project
- [ ] All files are kebab-case named
- [ ] No hardcoded secrets in source code
- [ ] `bun run build` produces static output in dist/
