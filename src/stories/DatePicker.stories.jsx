import { useState } from "react";
import { DatePicker } from "../components/DatePicker";

export default {
  title: "Inputs/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "select", options: ["single", "range"], description: "Selection mode" },
    format: { control: "text", description: "Display format (e.g. yyyy-MM-dd)" },
    showToday: { control: "boolean", description: "Highlight today's date" },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
  parameters: {
    docs: { story: { height: "420px" } },
  },
};

/* ── Default (Single Date) ── */
export const Default = {
  render: (args) => {
    const [date, setDate] = useState(null);
    return (
      <DatePicker
        {...args}
        value={date}
        onChange={(d) => {
          setDate(d);
          args.onChange?.(d);
        }}
      />
    );
  },
  args: {
    placeholder: "Pick a date",
  },
  parameters: {
    docs: {
      source: {
        code: `const [date, setDate] = useState(null);

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>`,
      },
    },
  },
};

/* ── Date Range ── */
export const DateRange = {
  render: (args) => {
    const [range, setRange] = useState({ start: null, end: null });
    return (
      <DatePicker
        {...args}
        value={range}
        onChange={(r) => {
          setRange(r);
          args.onChange?.(r);
        }}
      />
    );
  },
  args: {
    mode: "range",
    placeholder: "Select date range",
  },
  parameters: {
    docs: {
      source: {
        code: `const [range, setRange] = useState({ start: null, end: null });

<DatePicker
  mode="range"
  value={range}
  onChange={setRange}
  placeholder="Select date range"
/>`,
      },
    },
  },
};

/* ── With Min/Max Constraints ── */
export const WithMinMax = {
  render: (args) => {
    const [date, setDate] = useState(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    return (
      <div className="space-y-2">
        <DatePicker
          {...args}
          value={date}
          onChange={setDate}
          min={minDate}
          max={maxDate}
        />
        <p className="text-xs text-gray-500">
          Only dates from {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()} are selectable.
        </p>
      </div>
    );
  },
  args: {
    placeholder: "Constrained dates",
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  value={date}
  onChange={setDate}
  min={new Date(2025, 0, 1)}
  max={new Date(2025, 11, 31)}
  placeholder="Constrained dates"
/>`,
      },
    },
  },
};

/* ── Disable Weekends ── */
export const DisableWeekends = {
  render: (args) => {
    const [date, setDate] = useState(null);
    return (
      <DatePicker
        {...args}
        value={date}
        onChange={setDate}
        disableDate={(d) => d.getDay() === 0 || d.getDay() === 6}
      />
    );
  },
  args: {
    placeholder: "Weekdays only",
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  value={date}
  onChange={setDate}
  disableDate={(d) => d.getDay() === 0 || d.getDay() === 6}
  placeholder="Weekdays only"
/>`,
      },
    },
  },
};
