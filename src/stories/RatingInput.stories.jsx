import { useState } from "react";
import { RatingInput } from "../components/RatingInput";
import { Heart } from "lucide-react";

export default {
  title: "Inputs/RatingInput",
  component: RatingInput,
  tags: ["autodocs"],
  argTypes: {
    max: { control: { type: "number", min: 3, max: 10 }, description: "Maximum stars" },
    allowHalf: { control: "boolean", description: "Enable half-star precision" },
    readOnly: { control: "boolean", description: "Read-only display" },
    showValue: { control: "boolean", description: "Show numeric value" },
    allowClear: { control: "boolean", description: "Click active star to clear" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    color: { control: "color", description: "Active star color" },
    emptyColor: { control: "color", description: "Empty star color" },
    onChange: { action: "changed" },
  },
};

/* ── Default ── */
export const Default = {
  render: (args) => {
    const [value, setValue] = useState(3);
    return (
      <RatingInput
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange?.(v);
        }}
      />
    );
  },
  args: {
    showValue: true,
  },
  parameters: {
    docs: {
      source: {
        code: `const [rating, setRating] = useState(3);

<RatingInput value={rating} onChange={setRating} showValue />`,
      },
    },
  },
};

/* ── Half Stars with Labels ── */
export const HalfStarsWithLabels = {
  render: (args) => {
    const [value, setValue] = useState(2.5);
    return <RatingInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    allowHalf: true,
    showValue: true,
    labels: ["Terrible", "Bad", "OK", "Good", "Excellent"],
    size: "lg",
  },
  parameters: {
    docs: {
      source: {
        code: `<RatingInput
  allowHalf
  showValue
  labels={["Terrible", "Bad", "OK", "Good", "Excellent"]}
  size="lg"
  value={rating}
  onChange={setRating}
/>`,
      },
    },
  },
};

/* ── Custom Heart Icon ── */
export const CustomHeartIcon = {
  render: (args) => {
    const [value, setValue] = useState(4);
    return <RatingInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    max: 5,
    color: "#ec4899",
    emptyColor: "#f9a8d4",
    size: "xl",
    renderIcon: (idx, { isFilled }) => (
      <Heart
        style={{
          width: 36,
          height: 36,
          fill: isFilled ? "#ec4899" : "none",
          color: isFilled ? "#ec4899" : "#f9a8d4",
          transition: "all .15s",
        }}
      />
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `import { Heart } from "lucide-react";

<RatingInput
  max={5}
  size="xl"
  value={rating}
  onChange={setRating}
  renderIcon={(idx, { isFilled }) => (
    <Heart
      style={{
        width: 36, height: 36,
        fill: isFilled ? "#ec4899" : "none",
        color: isFilled ? "#ec4899" : "#f9a8d4",
      }}
    />
  )}
/>`,
      },
    },
  },
};

/* ── Read-Only Display ── */
export const ReadOnly = {
  args: {
    value: 4,
    readOnly: true,
    showValue: true,
    size: "md",
  },
  parameters: {
    docs: {
      source: {
        code: `<RatingInput value={4} readOnly showValue />`,
      },
    },
  },
};
