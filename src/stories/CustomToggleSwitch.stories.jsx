import { useState } from "react";
import { ToggleSwitch } from "../components/CustomToggleSwitch";

export default {
  title: "Inputs/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label text" },
    labelPosition: { control: "select", options: ["left", "right"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    onColor: { control: "text", description: 'Tailwind bg class when on (e.g. "bg-blue-600")' },
    offColor: { control: "text", description: "Tailwind bg class when off" },
    onChange: { action: "toggled" },
  },
};

/* ── Default ── */
export const Default = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <ToggleSwitch
        {...args}
        checked={checked}
        onChange={(val) => {
          setChecked(val);
          args.onChange?.(val);
        }}
      />
    );
  },
  args: {
    label: "Enable notifications",
  },
  parameters: {
    docs: {
      source: {
        code: `const [checked, setChecked] = useState(false);

<ToggleSwitch
  label="Enable notifications"
  checked={checked}
  onChange={setChecked}
/>`,
      },
    },
  },
};

/* ── All Sizes ── */
export const Sizes = {
  render: () => {
    const [sm, setSm] = useState(true);
    const [md, setMd] = useState(true);
    const [lg, setLg] = useState(true);
    return (
      <div className="space-y-4">
        <ToggleSwitch label="Small" size="sm" checked={sm} onChange={setSm} />
        <ToggleSwitch label="Medium" size="md" checked={md} onChange={setMd} />
        <ToggleSwitch label="Large" size="lg" checked={lg} onChange={setLg} />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<ToggleSwitch label="Small"  size="sm" checked={sm} onChange={setSm} />
<ToggleSwitch label="Medium" size="md" checked={md} onChange={setMd} />
<ToggleSwitch label="Large"  size="lg" checked={lg} onChange={setLg} />`,
      },
    },
  },
};

/* ── Custom Colors ── */
export const CustomColors = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div className="space-y-4">
        <ToggleSwitch label="Green toggle" onColor="bg-green-500" checked={a} onChange={setA} />
        <ToggleSwitch label="Pink toggle" onColor="bg-pink-500" checked={b} onChange={setB} />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<ToggleSwitch label="Green toggle" onColor="bg-green-500" checked={on} onChange={setOn} />
<ToggleSwitch label="Pink toggle" onColor="bg-pink-500" checked={on} onChange={setOn} />`,
      },
    },
  },
};

/* ── Disabled ── */
export const Disabled = {
  args: {
    label: "Can't touch this",
    checked: true,
    disabled: true,
    labelPosition: "left",
  },
  parameters: {
    docs: {
      source: {
        code: `<ToggleSwitch label="Can't touch this" checked disabled labelPosition="left" />`,
      },
    },
  },
};
