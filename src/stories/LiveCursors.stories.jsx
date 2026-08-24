import { LiveCursors } from "../components/LiveCursors";

export default {
  title: "Data Display/LiveCursors",
  component: LiveCursors,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { LiveCursors } from "readyui-react";\n```',
      },
    },
  },
  argTypes: {
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export const Default = {
  render: (args) => (
    <div className="max-w-md mx-auto p-8">
      <LiveCursors {...args} />
    </div>
  ),
};
