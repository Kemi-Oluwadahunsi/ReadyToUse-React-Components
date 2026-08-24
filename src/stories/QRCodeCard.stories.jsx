import { QRCodeCard } from "../components/QRCodeCard";

export default {
  title: "Data Display/QRCodeCard",
  component: QRCodeCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { QRCodeCard } from "readyui-react";\n```',
      },
    },
  },
  argTypes: {
    subtitle: { control: "text", description: "Card subtitle" },
    url: { control: "text", description: "URL to encode and display" },
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export const Default = {
  render: (args) => (
    <div className="max-w-sm mx-auto p-8">
      <QRCodeCard {...args} />
    </div>
  ),
};

export const CustomURL = {
  args: {
    subtitle: "Scan to visit our docs",
    url: "https://readyui.dev/docs",
  },
  render: (args) => (
    <div className="max-w-sm mx-auto p-8">
      <QRCodeCard {...args} />
    </div>
  ),
};
