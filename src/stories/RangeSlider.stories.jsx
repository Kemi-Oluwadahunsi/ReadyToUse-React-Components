import { useState } from "react";
import { RangeSlider } from "../components/RangeSlider";

export default {
  title: "Inputs/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { RangeSlider } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    range: { control: "boolean", description: "Enable dual-handle range mode" },
    showTooltip: { control: "boolean" },
    showLabels: { control: "boolean", description: "Show min/max labels" },
    showValue: { control: "boolean", description: "Show current value below track" },
    disabled: { control: "boolean" },
    color: {
      control: "select",
      options: ["blue", "green", "red", "purple", "amber", "teal", "pink", "indigo"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    onChange: { action: "changed" },
  },
};

/* ── Default (Single) ── */
export const Default = {
  render: (args) => {
    const [value, setValue] = useState(40);
    return (
      <div className="w-full max-w-80">
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    min: 0,
    max: 100,
    showLabels: true,
    showValue: true,
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState(40);

<RangeSlider
  min={0}
  max={100}
  value={value}
  onChange={setValue}
  showLabels
  showValue
/>`,
      },
    },
  },
};

/* ── Dual-Handle Range ── */
export const DualRange = {
  render: (args) => {
    const [value, setValue] = useState([20, 80]);
    return (
      <div className="w-full max-w-80">
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    min: 0,
    max: 100,
    range: true,
    showLabels: true,
    showValue: true,
    color: "purple",
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState([20, 80]);

<RangeSlider
  range
  min={0}
  max={100}
  value={value}
  onChange={setValue}
  showLabels
  showValue
  color="purple"
/>`,
      },
    },
  },
};

/* ── Price Range with Formatter ── */
export const PriceRange = {
  render: (args) => {
    const [value, setValue] = useState([250, 750]);
    return (
      <div className="w-full max-w-96">
        <RangeSlider {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    min: 0,
    max: 1000,
    step: 50,
    range: true,
    showValue: true,
    showLabels: true,
    color: "green",
    formatValue: (v) => `$${v}`,
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState([250, 750]);

<RangeSlider
  range
  min={0}
  max={1000}
  step={50}
  value={value}
  onChange={setValue}
  showValue
  showLabels
  color="green"
  formatValue={(v) => \`$\${v}\`}
/>`,
      },
    },
  },
};

/* ── Small Disabled ── */
export const SmallDisabled = {
  args: {
    min: 0,
    max: 100,
    value: 60,
    size: "sm",
    disabled: true,
    showValue: true,
    color: "gray",
  },
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider value={60} size="sm" disabled showValue color="gray" />`,
      },
    },
  },
};
