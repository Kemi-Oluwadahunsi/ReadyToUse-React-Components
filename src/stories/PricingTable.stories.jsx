import { PricingTable } from "../components/PricingTable";

export default {
  title: "Data Display/PricingTable",
  component: PricingTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { PricingTable } from "readyui-react";\n```',
      },
    },
  },
  argTypes: {
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export const Default = {
  render: (args) => (
    <div className="p-8">
      <PricingTable {...args} />
    </div>
  ),
};
