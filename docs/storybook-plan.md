# Storybook Implementation Plan for ReadyUI React

---

## Phase 1: Setup & Configuration

- [x] **Step 1** — Install Storybook: Run `npx storybook@latest init` (auto-detects Vite + React, installs `@storybook/react-vite`, `@storybook/addon-essentials`, etc.)
- [x] **Step 2** — Configure Tailwind: Import `../src/index.css` in `.storybook/preview.jsx` so all Tailwind utilities + dark mode work inside stories.
- [x] **Step 3** — Configure dark mode toggle: Added globalTypes toolbar toggle + decorator that applies `dark` class to `<html>` and wraps stories.
- [x] **Step 4** — Set up auto-generated docs: `@storybook/addon-docs` configured with `autodocs` tag support. Removed `addon-vitest` (not needed). Renamed `preview.js` → `preview.jsx` for JSX support.

---

## Phase 2: Story File Structure

- [x] **Step 5** — Created `src/stories/` folder with 51 story files covering all components.
- [x] **Step 6** — Sidebar organized using `title` hierarchy: Layout, Cards, Inputs, Data Display, Feedback, Navigation, Utilities.

---

## Phase 3: Story Content (per component)

- [x] **Step 7** — Default export (meta) for each story file with title, component ref, argTypes, and `tags: ["autodocs"]`.
- [x] **Step 8** — Primary story (Default) with interactive Controls for every prop.
- [x] **Step 9** — Variant stories — 2-4 named exports per component showing meaningful variants.
- [x] **Step 10** — Code snippet blocks via `parameters.docs.source.code` on every story for copyable usage examples.

---

## Phase 4: Enhanced Docs Pages

- [x] **Step 11** — MDX docs for complex components — Created `src/stories/docs/KanbanBoardDocs.mdx`, `DataTableDocs.mdx`, `PricingCardsDocs.mdx` with overview, import snippet, embedded Canvas examples, ArgTypes, data structures, and accessibility notes.

- [x] **Step 12** — "Copy code" button — Verified working via `parameters.docs.source.code` on all stories + `@storybook/addon-docs` built-in source blocks.

---

## Phase 5: Global Enhancements

- [x] **Step 13** — Sidebar organization — Configured `storySort` in `.storybook/preview.jsx` with order: Getting Started → Layout → Cards → Inputs → Data Display → Feedback → Navigation → Utilities.

- [x] **Step 14** — "Getting Started" page — Created `src/stories/GettingStarted.mdx` with installation, CSS import, quick example, component categories table, dark mode usage, and GitHub/npm links.

- [x] **Step 15** — Viewport & responsive addon — Available via Storybook toolbar. Components render correctly.

- [x] **Step 16** — Accessibility addon — `@storybook/addon-a11y` installed and configured with `test: "todo"` mode.

---

## Phase 6: Build & Deploy

- [x] **Step 17** — Build static Storybook — Scripts already in `package.json`: `"storybook"` and `"build-storybook"`. Build verified passing (`storybook-static/` output).

- [ ] **Step 18** — Deploy — Host `storybook-static/` on GitHub Pages, Vercel, or Chromatic.

- [ ] **Step 19** — CI integration (optional) — Run `build-storybook` in CI to catch broken stories on every PR.

---

## Story File Checklist

Create one `.stories.jsx` file for each component/group below. Mark done when written.

### Cards (15 variants in one file)
- [x] `Cards.stories.jsx` — BasicCard, ProfileCard, ProductCard, TestimonialCard, BlogCard, StatsCard, TeamCard, FeatureCard, NotificationCard, ImageOverlayCard, HorizontalCard, PricingCardSingle, MetricCard, InteractiveCard, GlassCard

### Layout
- [x] `Accordion.stories.jsx`
- [x] `Drawer.stories.jsx`
- [x] `Modal.stories.jsx`
- [x] `Tabs.stories.jsx`
- [x] `ResizableSidebar.stories.jsx`

### Inputs
- [x] `Select.stories.jsx`
- [x] `OTPInput.stories.jsx`
- [x] `RangeSlider.stories.jsx`
- [x] `ColorPicker.stories.jsx`
- [x] `DatePicker.stories.jsx`
- [x] `MultiSelectTagInput.stories.jsx`
- [x] `SearchBar.stories.jsx`
- [x] `PasswordStrength.stories.jsx`
- [x] `CustomToggleSwitch.stories.jsx`
- [x] `RatingInput.stories.jsx`
- [x] `FileUploader.stories.jsx`
- [x] `FilterComponent.stories.jsx`

### Data Display
- [x] `DataTable.stories.jsx`
- [x] `TimeLine.stories.jsx`
- [x] `TreeView.stories.jsx`
- [x] `VirtualList.stories.jsx`
- [x] `PricingCards.stories.jsx`
- [x] `FilterableGallery.stories.jsx`
- [x] `KanbanBoard.stories.jsx`
- [x] `InfiniteScroll.stories.jsx`
- [x] `ImageCropper.stories.jsx`
- [x] `AvatarGroup.stories.jsx`
- [x] `AnimatedCounter.stories.jsx`
- [x] `Marquee.stories.jsx`

### Feedback
- [x] `ToastNotification.stories.jsx`
- [x] `Spinner.stories.jsx`
- [x] `Skeleton.stories.jsx`
- [x] `ConfirmDialog.stories.jsx`
- [x] `Tooltip.stories.jsx`
- [x] `Popover.stories.jsx`
- [x] `NotificationBell.stories.jsx`

### Navigation
- [x] `Breadcrumbs.stories.jsx`
- [x] `Pagination.stories.jsx`
- [x] `ScrollAwareNavbar.stories.jsx`
- [x] `ScrollCarousel.stories.jsx`
- [x] `ProgressBarSteps.stories.jsx`
- [x] `InteractiveStepper.stories.jsx`
- [x] `CommandPalette.stories.jsx`

### Utilities
- [x] `DarkModeToggle.stories.jsx`
- [x] `CopyToClipboard.stories.jsx`
- [x] `Badge.stories.jsx`
- [x] `FloatingActionButton.stories.jsx`
- [x] `HoverRevealCard.stories.jsx`
- [x] `SpotlightCard.stories.jsx`
- [x] `SortableList.stories.jsx`

---

## Estimated Totals

| Category       | Components | Stories (≈) |
|----------------|------------|-------------|
| Cards          | 15 + PricingCards | ~50   |
| Layout         | 5          | ~30         |
| Inputs         | 12         | ~35         |
| Data Display   | 12         | ~25         |
| Feedback       | 7          | ~20         |
| Navigation     | 7          | ~15         |
| Utilities      | 7          | ~15         |
| **Total**      | **65+**    | **~190**    |
