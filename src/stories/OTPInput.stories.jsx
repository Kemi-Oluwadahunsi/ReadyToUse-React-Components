import { useState } from "react";
import { OTPInput } from "../components/OTPInput";

export default {
  title: "Inputs/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { OTPInput } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    length: { control: { type: "number", min: 3, max: 8 }, description: "Number of digits" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    type: { control: "select", options: ["number", "text"] },
    masked: { control: "boolean", description: "Show dots instead of digits" },
    disabled: { control: "boolean" },
    error: { control: "boolean", description: "Show error state" },
    autoFocus: { control: "boolean" },
    placeholder: { control: "text" },
    onComplete: { action: "completed" },
    onChange: { action: "changed" },
  },
};

/* ── Default (6-digit numeric) ── */
export const Default = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <OTPInput
        {...args}
        value={value}
        onChange={setValue}
        onComplete={(otp) => args.onComplete?.(otp)}
      />
    );
  },
  args: {
    length: 6,
    autoFocus: false,
  },
  parameters: {
    docs: {
      source: {
        code: `const [otp, setOtp] = useState("");

<OTPInput
  length={6}
  value={otp}
  onChange={setOtp}
  onComplete={(code) => console.log("OTP:", code)}
/>`,
      },
    },
  },
};

/* ── 4-Digit Small ── */
export const FourDigitSmall = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <OTPInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    length: 4,
    size: "sm",
    autoFocus: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<OTPInput length={4} size="sm" value={otp} onChange={setOtp} />`,
      },
    },
  },
};

/* ── Masked (Password-style) ── */
export const Masked = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <OTPInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    length: 6,
    masked: true,
    size: "lg",
    autoFocus: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<OTPInput length={6} masked size="lg" value={otp} onChange={setOtp} />`,
      },
    },
  },
};

/* ── Error State ── */
export const ErrorState = {
  render: (args) => {
    const [value, setValue] = useState("12");
    return (
      <div className="space-y-2">
        <OTPInput {...args} value={value} onChange={setValue} />
        <p className="text-sm text-red-500">Invalid code. Please try again.</p>
      </div>
    );
  },
  args: {
    length: 6,
    error: true,
    autoFocus: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<OTPInput length={6} error value={otp} onChange={setOtp} />
<p className="text-red-500">Invalid code. Please try again.</p>`,
      },
    },
  },
};
