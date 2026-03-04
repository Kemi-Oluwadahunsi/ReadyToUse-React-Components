import { useState } from "react";
import { DatePicker } from "../components/DatePicker";

export default {
  title: "Inputs/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "select", options: ["single", "multiple", "range"], description: "Selection mode" },
    format: { control: "text", description: "Display format (e.g. yyyy-MM-dd)" },
    showToday: { control: "boolean", description: "Highlight today's date" },
    placeholder: { control: "text" },
    rtl: { control: "boolean", description: "Right-to-left layout" },
    weekStart: {
      control: { type: "select" },
      options: [0, 1, 2, 3, 4, 5, 6],
      description: "First day of week (0=Sun, 1=Mon…6=Sat)",
    },
    maxSelected: {
      control: { type: "number", min: 1, max: 31 },
      description: "Max dates in multiple mode",
    },
    onChange: { action: "changed" },
  },
  parameters: {
    docs: { description: { component: "## 📥 Import\n\n```jsx\nimport { DatePicker } from \"readyui-react\";\n```" }, story: { height: "420px" } },
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

/* ── Multiple Selection ── */
export const MultipleSelection = {
  render: (args) => {
    const [dates, setDates] = useState([]);
    return (
      <div className="space-y-3">
        <DatePicker
          {...args}
          value={dates}
          onChange={(d) => {
            setDates(d);
            args.onChange?.(d);
          }}
        />
        {dates.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {dates.map((d, i) => (
              <span key={i} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded-md">
                {d.toLocaleDateString()}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  },
  args: {
    mode: "multiple",
    placeholder: "Select multiple dates",
    maxSelected: 10,
  },
  parameters: {
    docs: {
      source: {
        code: `const [dates, setDates] = useState([]);

<DatePicker
  mode="multiple"
  value={dates}
  onChange={setDates}
  maxSelected={10}
  placeholder="Select multiple dates"
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

/* ── Unavailable Dates ── */
export const UnavailableDates = {
  render: (args) => {
    const [date, setDate] = useState(null);
    const today = new Date();
    const unavailable = [
      new Date(today.getFullYear(), today.getMonth(), 10),
      new Date(today.getFullYear(), today.getMonth(), 15),
      new Date(today.getFullYear(), today.getMonth(), 20),
      new Date(today.getFullYear(), today.getMonth(), 25),
    ];
    return (
      <div className="space-y-2">
        <DatePicker
          {...args}
          value={date}
          onChange={setDate}
          unavailableDates={unavailable}
        />
        <p className="text-xs text-gray-500">
          The 10th, 15th, 20th, and 25th of this month are unavailable.
        </p>
      </div>
    );
  },
  args: {
    placeholder: "Some dates blocked",
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  value={date}
  onChange={setDate}
  unavailableDates={[
    new Date(2025, 5, 10),
    new Date(2025, 5, 15),
    new Date(2025, 5, 20),
  ]}
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

/* ── Date Presets (Range) ── */
export const WithPresets = {
  render: (args) => {
    const [range, setRange] = useState({ start: null, end: null });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const presets = [
      { label: "Today", value: { start: today, end: today } },
      {
        label: "Last 7 days",
        value: {
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
          end: today,
        },
      },
      {
        label: "Last 30 days",
        value: {
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29),
          end: today,
        },
      },
      {
        label: "This month",
        value: {
          start: new Date(today.getFullYear(), today.getMonth(), 1),
          end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
        },
      },
      {
        label: "Last month",
        value: {
          start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          end: new Date(today.getFullYear(), today.getMonth(), 0),
        },
      },
    ];

    return (
      <DatePicker
        {...args}
        value={range}
        onChange={(r) => {
          setRange(r);
          args.onChange?.(r);
        }}
        presets={presets}
      />
    );
  },
  args: {
    mode: "range",
    placeholder: "Pick a range or preset",
  },
  parameters: {
    docs: {
      source: {
        code: `const presets = [
  { label: "Today", value: { start: today, end: today } },
  { label: "Last 7 days", value: { start: weekAgo, end: today } },
  { label: "This month", value: { start: monthStart, end: monthEnd } },
];

<DatePicker
  mode="range"
  value={range}
  onChange={setRange}
  presets={presets}
/>`,
      },
    },
  },
};

/* ── RTL Layout ── */
export const RTL = {
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
    rtl: true,
    placeholder: "اختر تاريخ",
    dayLabels: ["أح", "إث", "ثل", "أر", "خم", "جم", "سب"],
    monthLabels: [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
    ],
    weekStart: 6,
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  rtl
  weekStart={6}
  dayLabels={["أح","إث","ثل","أر","خم","جم","سب"]}
  monthLabels={["يناير","فبراير","مارس",...]}
  placeholder="اختر تاريخ"
  value={date}
  onChange={setDate}
/>`,
      },
    },
  },
};

/* ── Custom Week Start (Monday) ── */
export const MondayStart = {
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
    weekStart: 1,
    placeholder: "Week starts Monday",
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  weekStart={1}
  value={date}
  onChange={setDate}
  placeholder="Week starts Monday"
/>`,
      },
    },
  },
};
