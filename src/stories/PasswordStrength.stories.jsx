import { useState } from "react";
import { PasswordStrength } from "../components/PasswordStrength";

export default {
  title: "Inputs/PasswordStrength",
  component: PasswordStrength,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { PasswordStrength } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    showRules: { control: "boolean", description: "Show rule checklist" },
    showMeter: { control: "boolean", description: "Show strength bar" },
    showToggle: { control: "boolean", description: "Show visibility toggle" },
    minLength: { control: "number", description: "Minimum password length" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    onStrengthChange: { action: "strength-changed" },
  },
};

/* ── Default ── */
export const Default = {
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <div className="w-80">
        <PasswordStrength {...args} value={password} onChange={setPassword} />
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      source: {
        code: `const [password, setPassword] = useState("");

<PasswordStrength
  value={password}
  onChange={setPassword}
  onStrengthChange={(level) => console.log(level)}
/>`,
      },
    },
  },
};

/* ── Meter Only (No Rules) ── */
export const MeterOnly = {
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <div className="w-80">
        <PasswordStrength {...args} value={password} onChange={setPassword} />
      </div>
    );
  },
  args: {
    showRules: false,
    showMeter: true,
    placeholder: "Create a password…",
  },
  parameters: {
    docs: {
      source: {
        code: `<PasswordStrength
  value={password}
  onChange={setPassword}
  showRules={false}
  placeholder="Create a password…"
/>`,
      },
    },
  },
};

/* ── Custom Rules ── */
export const CustomRules = {
  render: (args) => {
    const [password, setPassword] = useState("");
    return (
      <div className="w-80">
        <PasswordStrength {...args} value={password} onChange={setPassword} />
      </div>
    );
  },
  args: {
    customRules: [
      { label: "At least 10 characters", test: (pw) => pw.length >= 10 },
      { label: "Contains a number", test: (pw) => /\d/.test(pw) },
      { label: "Contains uppercase", test: (pw) => /[A-Z]/.test(pw) },
      { label: "No spaces", test: (pw) => !/\s/.test(pw) },
    ],
    placeholder: "Enter a strong password…",
    size: "lg",
  },
  parameters: {
    docs: {
      source: {
        code: `<PasswordStrength
  value={password}
  onChange={setPassword}
  size="lg"
  customRules={[
    { label: "At least 10 characters", test: (pw) => pw.length >= 10 },
    { label: "Contains a number", test: (pw) => /\\d/.test(pw) },
    { label: "Contains uppercase", test: (pw) => /[A-Z]/.test(pw) },
    { label: "No spaces", test: (pw) => !/\\s/.test(pw) },
  ]}
/>`,
      },
    },
  },
};

/* ── Small Disabled ── */
export const SmallDisabled = {
  args: {
    value: "Secr3t!",
    size: "sm",
    disabled: true,
    showToggle: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<PasswordStrength value="Secr3t!" size="sm" disabled showToggle={false} />`,
      },
    },
  },
};
