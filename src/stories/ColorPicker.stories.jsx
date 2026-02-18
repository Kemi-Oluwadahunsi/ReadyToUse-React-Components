import { useState } from "react";
import { ColorPicker } from "../components/ColorPicker";

export default {
  title: "Inputs/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    showInput: { control: "boolean", description: "Show hex input field" },
    showPresets: { control: "boolean", description: "Show preset swatches" },
    showAlpha: { control: "boolean", description: "Show alpha slider" },
    inline: { control: "boolean", description: "Render inline (no popover)" },
    onChange: { action: "changed" },
  },
  parameters: {
    docs: { story: { height: "420px" } },
  },
};

/* ── Default (Popover Trigger) ── */
export const Default = {
  render: (args) => {
    const [color, setColor] = useState("#3b82f6");
    return (
      <ColorPicker
        {...args}
        value={color}
        onChange={setColor}
      />
    );
  },
  args: {},
  parameters: {
    docs: {
      source: {
        code: `const [color, setColor] = useState("#3b82f6");

<ColorPicker value={color} onChange={setColor} />`,
      },
    },
  },
};

/* ── Inline Picker ── */
export const Inline = {
  render: (args) => {
    const [color, setColor] = useState("#22c55e");
    return (
      <div className="w-64">
        <ColorPicker {...args} value={color} onChange={setColor} />
      </div>
    );
  },
  args: {
    inline: true,
  },
  parameters: {
    docs: {
      source: {
        code: `const [color, setColor] = useState("#22c55e");

<ColorPicker inline value={color} onChange={setColor} />`,
      },
    },
  },
};

/* ── With Alpha Slider ── */
export const WithAlpha = {
  render: (args) => {
    const [color, setColor] = useState("#8b5cf6");
    return (
      <ColorPicker {...args} value={color} onChange={setColor} />
    );
  },
  args: {
    showAlpha: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker showAlpha value={color} onChange={setColor} />`,
      },
    },
  },
};

/* ── Custom Presets ── */
export const CustomPresets = {
  render: (args) => {
    const [color, setColor] = useState("#ef4444");
    return (
      <ColorPicker {...args} value={color} onChange={setColor} />
    );
  },
  args: {
    presets: [
      "#ef4444", "#f97316", "#eab308", "#22c55e",
      "#3b82f6", "#8b5cf6", "#ec4899", "#000000",
    ],
    inline: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker
  inline
  presets={["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#000000"]}
  value={color}
  onChange={setColor}
/>`,
      },
    },
  },
};
