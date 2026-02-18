import { useState } from "react";
import { FilterPanel } from "../components/FilterComponent";

const productFilters = {
  category: {
    label: "Category",
    type: "single",
    options: [
      { value: "electronics", label: "Electronics" },
      { value: "clothing", label: "Clothing" },
      { value: "books", label: "Books" },
      { value: "home", label: "Home & Garden" },
    ],
  },
  brand: {
    label: "Brand",
    type: "multiple",
    options: [
      { value: "apple", label: "Apple" },
      { value: "samsung", label: "Samsung" },
      { value: "sony", label: "Sony" },
      { value: "lg", label: "LG" },
      { value: "nike", label: "Nike" },
    ],
  },
  inStock: {
    label: "In Stock",
    type: "toggle",
  },
};

const jobFilters = [
  {
    id: "type",
    label: "Job Type",
    type: "single",
    options: ["Full-time", "Part-time", "Contract", "Freelance"],
  },
  {
    id: "level",
    label: "Experience Level",
    type: "multiple",
    options: ["Junior", "Mid", "Senior", "Lead", "Principal"],
  },
  {
    id: "remote",
    label: "Remote Only",
    type: "toggle",
  },
];

/* ── Variant-specific filter sets ───────────────────────────────── */

const chipsFilters = {
  size: {
    label: "Size",
    type: "single",
    variant: "chips",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  color: {
    label: "Color",
    type: "multiple",
    variant: "chips",
    options: ["Red", "Blue", "Green", "Black", "White", "Navy"],
  },
};

const radioFilters = {
  sort: {
    label: "Sort By",
    type: "single",
    variant: "radio",
    options: ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular", "Best Rated"],
  },
};

const checkboxFilters = {
  features: {
    label: "Features",
    type: "multiple",
    variant: "checkbox",
    options: ["Wireless", "Noise Cancelling", "Waterproof", "Fast Charging", "Bluetooth 5.0"],
  },
};

const segmentedFilters = {
  period: {
    label: "Time Period",
    type: "single",
    variant: "segmented",
    options: ["Day", "Week", "Month", "Year"],
  },
};

const inlineFilters = {
  status: {
    label: "Status",
    type: "single",
    variant: "inline",
    options: ["All", "Active", "Pending", "Completed", "Archived"],
  },
};

const mixedFilters = {
  category: {
    label: "Category",
    type: "single",
    variant: "segmented",
    options: [
      { value: "all", label: "All" },
      { value: "electronics", label: "Electronics" },
      { value: "clothing", label: "Clothing" },
      { value: "books", label: "Books" },
    ],
  },
  size: {
    label: "Size",
    type: "single",
    variant: "chips",
    options: ["XS", "S", "M", "L", "XL"],
  },
  brand: {
    label: "Brand",
    type: "multiple",
    variant: "dropdown",
    options: [
      { value: "apple", label: "Apple" },
      { value: "samsung", label: "Samsung" },
      { value: "sony", label: "Sony" },
    ],
  },
  features: {
    label: "Features",
    type: "multiple",
    variant: "checkbox",
    options: ["Wireless", "Waterproof", "Fast Charging"],
  },
  inStock: {
    label: "In Stock",
    type: "toggle",
  },
};

export default {
  title: "Inputs/FilterPanel",
  component: FilterPanel,
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["horizontal", "vertical", "inline"],
      description: 'Panel layout: "horizontal" | "vertical" | "inline"',
    },
    showActiveCount: { control: "boolean", description: "Show active filter count badge" },
    showHeader: { control: "boolean", description: "Show the header with title and clear button" },
    showActiveTags: { control: "boolean", description: "Show removable tags for active filters" },
    title: { control: "text", description: "Header title text" },
    clearAllLabel: { control: "text", description: "Label for clear-all button" },
    onChange: { action: "changed" },
  },
  parameters: {
    docs: { description: { component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { FilterPanel } from \"readyui-react\";\n```" },
      story: { height: "350px" },
    },
  },
};

/* ── Reusable render helper ─────────────────────────────────────── */
const Template = (args) => {
  const [filters, setFilters] = useState({});
  return (
    <FilterPanel
      {...args}
      value={filters}
      onChange={(f) => {
        setFilters(f);
        args.onChange?.(f);
      }}
    />
  );
};

/* ── Default (Dropdown) ─────────────────────────────────────────── */
export const Default = {
  render: Template,
  args: { filters: productFilters },
};

/* ── Array Format ───────────────────────────────────────────────── */
export const ArrayFormat = {
  render: Template,
  args: { filters: jobFilters },
};

/* ── Pre-selected ───────────────────────────────────────────────── */
export const PreSelected = {
  render: (args) => {
    const [filters, setFilters] = useState({
      category: "electronics",
      brand: ["apple", "samsung"],
      inStock: true,
    });
    return (
      <FilterPanel
        {...args}
        value={filters}
        onChange={(f) => {
          setFilters(f);
          args.onChange?.(f);
        }}
      />
    );
  },
  args: { filters: productFilters },
};

/* ── Chips Variant ──────────────────────────────────────────────── */
export const ChipsVariant = {
  render: Template,
  args: {
    filters: chipsFilters,
    title: "Select Options",
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterPanel
  filters={{
    size: { label: "Size", type: "single", variant: "chips", options: ["XS", "S", "M", "L", "XL"] },
    color: { label: "Color", type: "multiple", variant: "chips", options: ["Red", "Blue", "Green"] },
  }}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Radio Variant ──────────────────────────────────────────────── */
export const RadioVariant = {
  render: Template,
  args: {
    filters: radioFilters,
    title: "Sort Options",
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterPanel
  filters={{
    sort: { label: "Sort By", type: "single", variant: "radio", options: ["Newest", "Price: Low to High", "Most Popular"] },
  }}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Checkbox Variant ───────────────────────────────────────────── */
export const CheckboxVariant = {
  render: Template,
  args: {
    filters: checkboxFilters,
    title: "Feature Filters",
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterPanel
  filters={{
    features: { label: "Features", type: "multiple", variant: "checkbox", options: ["Wireless", "Waterproof", "Fast Charging"] },
  }}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Segmented Variant ──────────────────────────────────────────── */
export const SegmentedVariant = {
  render: Template,
  args: {
    filters: segmentedFilters,
    title: "Time Filter",
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterPanel
  filters={{
    period: { label: "Time Period", type: "single", variant: "segmented", options: ["Day", "Week", "Month", "Year"] },
  }}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Inline Variant ─────────────────────────────────────────────── */
export const InlineVariant = {
  render: Template,
  args: {
    filters: inlineFilters,
    title: "Status Filter",
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterPanel
  filters={{
    status: { label: "Status", type: "single", variant: "inline", options: ["All", "Active", "Pending", "Completed"] },
  }}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Mixed Variants ─────────────────────────────────────────────── */
export const MixedVariants = {
  render: Template,
  args: {
    filters: mixedFilters,
    title: "Product Filters",
  },
  parameters: {
    docs: {
      description: {
        story: "Each filter can use a different variant independently — mix segmented, chips, dropdown, checkbox, and toggle in the same panel.",
      },
      source: {
        code: `<FilterPanel
  filters={{
    category: { label: "Category", type: "single", variant: "segmented", options: ["All", "Electronics", "Clothing"] },
    size: { label: "Size", type: "single", variant: "chips", options: ["S", "M", "L"] },
    brand: { label: "Brand", type: "multiple", variant: "dropdown", options: [...] },
    features: { label: "Features", type: "multiple", variant: "checkbox", options: ["Wireless", "Waterproof"] },
    inStock: { label: "In Stock", type: "toggle" },
  }}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Vertical Layout ────────────────────────────────────────────── */
export const VerticalLayout = {
  render: Template,
  args: {
    filters: {
      category: {
        label: "Category",
        type: "single",
        variant: "radio",
        options: ["Electronics", "Clothing", "Books", "Home & Garden"],
      },
      brand: {
        label: "Brand",
        type: "multiple",
        variant: "checkbox",
        options: ["Apple", "Samsung", "Sony", "LG", "Nike"],
      },
      price: {
        label: "Price Range",
        type: "single",
        variant: "chips",
        options: ["Under $25", "$25–$50", "$50–$100", "Over $100"],
      },
      inStock: { label: "In Stock Only", type: "toggle" },
    },
    layout: "vertical",
    title: "Refine Results",
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical layout stacks filters top-to-bottom — ideal for sidebar placement.",
      },
    },
  },
};

/* ── Inline Layout ──────────────────────────────────────────────── */
export const InlineLayout = {
  render: Template,
  args: {
    filters: {
      status: {
        label: "Status",
        type: "single",
        variant: "inline",
        options: ["All", "Active", "Pending", "Completed"],
      },
      priority: {
        label: "Priority",
        type: "single",
        variant: "segmented",
        options: ["Low", "Medium", "High"],
      },
      assigned: { label: "Assigned to Me", type: "toggle" },
    },
    layout: "inline",
    title: "Tasks",
  },
  parameters: {
    docs: {
      description: {
        story: "Inline layout arranges filters in a compact row with minimal spacing — ideal for toolbars.",
      },
    },
  },
};

/* ── Single Filter Only ─────────────────────────────────────────── */
export const SingleFilter = {
  render: Template,
  args: {
    filters: {
      sort: {
        label: "Sort By",
        type: "single",
        variant: "segmented",
        options: ["Newest", "Popular", "Price ↑", "Price ↓"],
      },
    },
    showHeader: false,
    showActiveTags: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Use a single filter with `showHeader={false}` and `showActiveTags={false}` for a minimal standalone control.",
      },
      source: {
        code: `<FilterPanel
  filters={{ sort: { label: "Sort By", type: "single", variant: "segmented", options: ["Newest", "Popular", "Price ↑"] } }}
  showHeader={false}
  showActiveTags={false}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── No Header / Minimal ────────────────────────────────────────── */
export const Minimal = {
  render: Template,
  args: {
    filters: chipsFilters,
    showHeader: false,
    showActiveTags: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Hide the header and active tags for a minimal look — just the filter controls.",
      },
    },
  },
};
