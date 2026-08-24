# readyui-react

[![npm version](https://img.shields.io/npm/v/readyui-react.svg)](https://www.npmjs.com/package/readyui-react)
[![license](https://img.shields.io/npm/l/readyui-react.svg)](https://github.com/Kemi-Oluwadahunsi/ReadyToUse-React-Components/blob/main/LICENSE)

A professional collection of 50+ ready-to-use, configurable React UI components with Tailwind CSS, dark mode support, and smooth animations.

**[Live Storybook Docs](https://kemi-oluwadahunsi.github.io/ReadyToUse-React-Components)**

## 🚀 Features

- 🎨 90+ production-ready UI components
- 🌙 Dark mode support across all components
- ✨ Smooth animations (CSS keyframes, no runtime dependency)
- ♿ Accessible — ARIA roles, keyboard navigation, focus traps
- 🖱️ Drag-and-drop (KanbanBoard, Sortable)
- 📱 Responsive design
- ⚡ Zero-config — ships a pre-built CSS bundle; no Tailwind install required
- 🔍 Tree-shakeable ES module + CJS builds

---

## 📦 Installation

```bash
npm install readyui-react
```

### Import the stylesheet

Add **one** of these imports at the top of your app entry file:

```js
// Option A — use the pre-built CSS (no Tailwind required in your project)
import "readyui-react/styles.css";

// Option B — if your project already uses Tailwind CSS v4, you can skip
// styles.css and let your own Tailwind build scan the library's classes.
// Just add the readyui-react source to your CSS @source directive:
//   @source "../node_modules/readyui-react/dist/**/*.js";
```

### Use a component

```jsx
import { Accordion, ToastNotification, KanbanBoard } from "readyui-react";

export default function App() {
  return <Accordion items={items} />;
}
```

---

## 🛠️ Available Scripts (for contributors)

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start the demo app dev server              |
| `npm run build`     | Build the demo app for production          |
| `npm run build:lib` | Build the library JS bundles (ES + CJS)    |
| `npm run build:css` | Build the pre-built `dist/styles.css`      |
| `npm run build:pkg` | Build both JS **and** CSS (for publishing) |
| `npm run lint`      | Run ESLint                                 |
| `npm run preview`   | Preview the demo app production build      |

## 🏗️ Project Structure

```
src/
├── components/          # All 50+ UI components
│   ├── injectRuiStyles.js  # Runtime CSS fallback (auto-skips if styles.css loaded)
│   └── ...
├── contexts/            # React context providers
├── lib-styles.css       # Tailwind entry point for dist/styles.css
└── main.jsx             # Demo app entry
dist/
├── readyui-react.es.js  # ES module bundle
├── readyui-react.cjs.js # CommonJS bundle
└── styles.css           # Pre-built Tailwind + keyframes CSS
```

## 🧩 Components

Accordion · AnimatedCounter · AvatarGroup · Badge · Breadcrumbs · Cards · ColorPicker · CommandPalette · ConfirmDialog · CopyToClipboard · CustomToggleSwitch · DarkModeToggle · DataTable · DatePicker · Drawer · FileUploader · FilterableGallery · FilterComponent · FloatingActionButton · HoverRevealCard · ImageCropper · InfiniteScroll · InteractiveStepper · KanbanBoard · Marquee · Modal · MultiSelectTagInput · NotificationBell · OTPInput · Pagination · PasswordStrength · Popover · ProgressBarSteps · RangeSlider · RatingInput · ResizableSidebar · ScrollAwareNavbar · ScrollCarousel · SearchBar · Select · Skeleton · SortableList · Spinner · SpotlightCard · Tabs · TimeLine · ToastNotification · Tooltip · TreeView · VirtualList · DarkModeToggle

## 🎨 Styling

All components are styled with **Tailwind CSS v4** utility classes. The library ships a pre-built `dist/styles.css` (≈102 KB minified) so consumers don't need Tailwind in their own project.

Custom keyframes (toast slide-in, timeline fade, spinner animations, etc.) are included in the CSS bundle **and** injected at runtime as a fallback via `injectRuiStyles.js`. The runtime injector automatically skips injection when it detects the pre-built stylesheet is loaded.

## 📚 Peer Dependencies

| Package           | Required?                                           |
| ----------------- | --------------------------------------------------- |
| `react` ≥ 18      | **Yes**                                             |
| `react-dom` ≥ 18  | **Yes**                                             |
| `tailwindcss` ≥ 4 | Optional — only if you want your own Tailwind build |

### Optional Dependencies

- `@dnd-kit/core` + `@dnd-kit/sortable` — enables KanbanBoard drag-and-drop
- `react-hot-toast` — alternative toast provider

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Oluwakemi Oluwadahunsi - KodeMaven

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DND Kit](https://dndkit.com/)
- [Lucide React](https://lucide.dev/)
