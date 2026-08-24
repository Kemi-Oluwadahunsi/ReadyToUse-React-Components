import { CodeBlock } from "../components/CodeBlock";

export default {
  title: "Utilities/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { CodeBlock } from "readyui-react";\n```',
      },
    },
  },
  argTypes: {
    code: { control: "text", description: "Code string to display" },
    language: { control: "text", description: "Language label (e.g. tsx, jsx, bash)" },
    title: { control: "text", description: "File name in the header bar" },
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export const Default = {
  args: {
    code: `import { Button } from "readyui-react";

export default function App() {
  return <Button onClick={() => alert("Hello!")}>Click me</Button>;
}`,
    language: "tsx",
    title: "App.tsx",
  },
  render: (args) => (
    <div className="max-w-lg mx-auto p-8">
      <CodeBlock {...args} />
    </div>
  ),
};

export const BashCommand = {
  args: {
    code: "npm install readyui-react",
    language: "bash",
    title: "Terminal",
  },
  render: (args) => (
    <div className="max-w-lg mx-auto p-8">
      <CodeBlock {...args} />
    </div>
  ),
};
