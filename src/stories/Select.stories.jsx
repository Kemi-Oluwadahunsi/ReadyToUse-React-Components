import { useState } from "react";
import { Select } from "../components/Select";

const basicOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

const groupedOptions = [
  { value: "react", label: "React", group: "JavaScript" },
  { value: "vue", label: "Vue", group: "JavaScript" },
  { value: "angular", label: "Angular", group: "JavaScript" },
  { value: "django", label: "Django", group: "Python" },
  { value: "flask", label: "Flask", group: "Python" },
  { value: "rails", label: "Rails", group: "Ruby" },
  { value: "laravel", label: "Laravel", group: "PHP" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
];

export default {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean", description: "Enable multi-select" },
    searchable: { control: "boolean", description: "Enable search filtering" },
    clearable: { control: "boolean", description: "Show clear button" },
    disabled: { control: "boolean" },
    grouped: { control: "boolean", description: "Render group headers" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    placeholder: { control: "text" },
    maxSelected: { control: "number", description: "Max items in multi mode" },
    onChange: { action: "changed" },
  },
  parameters: {
    docs: { story: { height: "350px" } },
  },
};

/* ── Default (Single Select) ── */
export const Default = {
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <div className="w-72">
        <Select {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: basicOptions,
    placeholder: "Choose a framework…",
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState(null);

<Select
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Choose a framework…"
/>`,
      },
    },
  },
};

/* ── Multi Select ── */
export const MultiSelect = {
  render: (args) => {
    const [value, setValue] = useState([]);
    return (
      <div className="w-80">
        <Select {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: countryOptions,
    multiple: true,
    placeholder: "Select countries…",
    maxSelected: 4,
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState([]);

<Select
  options={countries}
  value={value}
  onChange={setValue}
  multiple
  maxSelected={4}
  placeholder="Select countries…"
/>`,
      },
    },
  },
};

/* ── Grouped Options ── */
export const Grouped = {
  render: (args) => {
    const [value, setValue] = useState(null);
    return (
      <div className="w-72">
        <Select {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: groupedOptions,
    grouped: true,
    placeholder: "Pick a framework…",
  },
  parameters: {
    docs: {
      source: {
        code: `<Select
  options={[
    { value: "react", label: "React", group: "JavaScript" },
    { value: "django", label: "Django", group: "Python" },
    { value: "rails", label: "Rails", group: "Ruby" },
  ]}
  grouped
  value={value}
  onChange={setValue}
/>`,
      },
    },
  },
};

/* ── Small + Disabled ── */
export const SmallDisabled = {
  args: {
    options: basicOptions,
    value: "react",
    size: "sm",
    disabled: true,
    searchable: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<Select options={options} value="react" size="sm" disabled searchable={false} />`,
      },
    },
  },
};
