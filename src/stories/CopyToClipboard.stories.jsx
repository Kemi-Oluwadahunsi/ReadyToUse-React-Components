import { CopyToClipboard } from "../components/CopyToClipboard";

export default {
  title: "Utilities/CopyToClipboard",
  component: CopyToClipboard,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "Text to copy to clipboard",
    },
    variant: {
      control: "select",
      options: ["button", "icon", "minimal", "code"],
      description: "Visual variant of the copy trigger",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    label: {
      control: "text",
      description: "Button label before copy",
    },
    successLabel: {
      control: "text",
      description: "Button label after copy",
    },
    showTooltip: {
      control: "boolean",
      description: "Show tooltip feedback on copy",
    },
    resetDelay: {
      control: "number",
      description: "Feedback display duration in ms",
    },
  },
};

export const Default = {
  args: {
    text: "npm install readyui-react",
    variant: "button",
    size: "md",
    label: "Copy",
    successLabel: "Copied!",
    showTooltip: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<CopyToClipboard text="npm install readyui-react" />`,
      },
    },
  },
};

export const CodeBlock = {
  args: {
    text: `import { CopyToClipboard } from "readyui-react";

function App() {
  return (
    <CopyToClipboard text="Hello World" />
  );
}`,
    variant: "code",
    size: "md",
  },
  parameters: {
    docs: {
      source: {
        code: `<CopyToClipboard
  text={\`import { CopyToClipboard } from "readyui-react";

function App() {
  return (
    <CopyToClipboard text="Hello World" />
  );
}\`}
  variant="code"
/>`,
      },
    },
  },
};

export const IconOnly = {
  args: {
    text: "https://readyui.dev",
    variant: "icon",
    size: "md",
    showTooltip: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">https://readyui.dev</span>
      <CopyToClipboard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CopyToClipboard text="https://readyui.dev" variant="icon" />`,
      },
    },
  },
};

export const MinimalLink = {
  args: {
    text: "sk-abc123def456ghi789",
    variant: "minimal",
    label: "Copy API Key",
    successLabel: "Key Copied!",
    size: "md",
  },
  parameters: {
    docs: {
      source: {
        code: `<CopyToClipboard
  text="sk-abc123def456ghi789"
  variant="minimal"
  label="Copy API Key"
  successLabel="Key Copied!"
/>`,
      },
    },
  },
};
