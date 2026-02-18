// Import Tailwind + global styles so components render correctly
import "../src/index.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  // Dark-mode toolbar toggle
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Toggle light / dark mode",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "☀️  Light", icon: "sun" },
          { value: "dark",  title: "🌙  Dark",  icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      // Apply dark class to story root so Tailwind dark: variants work
      document.documentElement.classList.toggle("dark", theme === "dark");
      return (
        <div className={`flex items-center justify-center py-8 px-6 ${theme === "dark" ? "bg-zinc-950 text-white" : "bg-white text-gray-900"}`}>
          <div className="w-full max-w-4xl">
            <Story />
          </div>
        </div>
      );
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: [
          "Getting Started",
          "Layout",
          "Cards",
          "Inputs",
          "Data Display",
          "Feedback",
          "Navigation",
          "Utilities",
        ],
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;