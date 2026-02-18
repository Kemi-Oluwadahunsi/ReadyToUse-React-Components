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

export default {
  title: "Inputs/FilterPanel",
  component: FilterPanel,
  tags: ["autodocs"],
  argTypes: {
    showActiveCount: { control: "boolean", description: "Show active filter count badge" },
    clearAllLabel: { control: "text", description: "Label for clear-all button" },
    onChange: { action: "changed" },
  },
};

/* ── Default (Object Map) ── */
export const Default = {
  render: (args) => {
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
  },
  args: {
    filters: productFilters,
  },
  parameters: {
    docs: {
      source: {
        code: `const [filters, setFilters] = useState({});

<FilterPanel
  filters={{
    category: {
      label: "Category",
      type: "single",
      options: [
        { value: "electronics", label: "Electronics" },
        { value: "clothing", label: "Clothing" },
      ],
    },
    brand: {
      label: "Brand",
      type: "multiple",
      options: [
        { value: "apple", label: "Apple" },
        { value: "samsung", label: "Samsung" },
      ],
    },
    inStock: { label: "In Stock", type: "toggle" },
  }}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Array Format (Job Filters) ── */
export const ArrayFormat = {
  render: (args) => {
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
  },
  args: {
    filters: jobFilters,
  },
  parameters: {
    docs: {
      source: {
        code: `<FilterPanel
  filters={[
    { id: "type", label: "Job Type", type: "single", options: ["Full-time", "Part-time", "Contract"] },
    { id: "level", label: "Experience", type: "multiple", options: ["Junior", "Mid", "Senior"] },
    { id: "remote", label: "Remote Only", type: "toggle" },
  ]}
  value={filters}
  onChange={setFilters}
/>`,
      },
    },
  },
};

/* ── Pre-selected Filters ── */
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
  args: {
    filters: productFilters,
  },
  parameters: {
    docs: {
      source: {
        code: `const [filters, setFilters] = useState({
  category: "electronics",
  brand: ["apple", "samsung"],
  inStock: true,
});

<FilterPanel filters={productFilters} value={filters} onChange={setFilters} />`,
      },
    },
  },
};
