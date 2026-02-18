import { useState } from "react";
import { SearchBar } from "../components/SearchBar";

const suggestions = [
  "React components",
  "React hooks tutorial",
  "React state management",
  "Vue 3 composition API",
  "Angular signals",
  "Svelte stores",
  "TypeScript generics",
  "JavaScript closures",
  "CSS Grid layout",
  "Tailwind CSS utilities",
  "Node.js streams",
  "GraphQL subscriptions",
];

export default {
  title: "Inputs/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    debounceMs: { control: "number", description: "Debounce delay in ms" },
    maxSuggestions: { control: "number", description: "Max visible suggestions" },
    showIcon: { control: "boolean", description: "Show search icon" },
    onSearch: { action: "searched" },
    onSuggestionSelect: { action: "suggestion-selected" },
  },
  parameters: {
    docs: { story: { height: "350px" } },
  },
};

/* ── Default ── */
export const Default = {
  render: (args) => {
    const [query, setQuery] = useState("");
    return (
      <div className="w-96">
        <SearchBar {...args} value={query} />
      </div>
    );
  },
  args: {
    suggestions,
    placeholder: "Search documentation…",
  },
  parameters: {
    docs: {
      source: {
        code: `<SearchBar
  suggestions={["React components", "Vue 3 API", "Angular signals"]}
  onSearch={(q) => console.log("Search:", q)}
  placeholder="Search documentation…"
/>`,
      },
    },
  },
};

/* ── With Recent & Trending ── */
export const WithRecentAndTrending = {
  render: (args) => (
    <div className="w-96">
      <SearchBar {...args} />
    </div>
  ),
  args: {
    suggestions,
    recentSearches: ["React hooks", "CSS Grid", "Node.js"],
    trendingSearches: ["AI tools", "Rust web frameworks", "Bun runtime"],
    placeholder: "Search…",
  },
  parameters: {
    docs: {
      source: {
        code: `<SearchBar
  suggestions={suggestions}
  recentSearches={["React hooks", "CSS Grid", "Node.js"]}
  trendingSearches={["AI tools", "Rust web frameworks", "Bun runtime"]}
  placeholder="Search…"
/>`,
      },
    },
  },
};

/* ── Custom Debounce ── */
export const CustomDebounce = {
  render: (args) => (
    <div className="w-96">
      <SearchBar {...args} />
    </div>
  ),
  args: {
    suggestions,
    debounceMs: 100,
    maxSuggestions: 4,
    placeholder: "Fast search (100ms debounce)…",
  },
  parameters: {
    docs: {
      source: {
        code: `<SearchBar
  suggestions={suggestions}
  debounceMs={100}
  maxSuggestions={4}
  placeholder="Fast search (100ms debounce)…"
/>`,
      },
    },
  },
};
