import { ContributionBarChart, MiniSparkline } from "../components/Charts";

export default {
  title: "Data Display/Charts",
  component: ContributionBarChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { ContributionBarChart, MiniSparkline } from "readyui-react";\n```',
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Chart title" },
    subtitle: { control: "text", description: "Chart subtitle" },
    data: { control: "object", description: "Array of { label, value } objects" },
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export const BarChart = {
  args: {
    title: "Contribution History",
    subtitle: "Last 6 months of activity",
  },
  render: (args) => (
    <div className="max-w-md mx-auto p-8">
      <ContributionBarChart {...args} />
    </div>
  ),
};

export const CustomData = {
  args: {
    title: "Revenue",
    subtitle: "Monthly breakdown",
    data: [
      { label: "Jan", value: 40 },
      { label: "Feb", value: 65 },
      { label: "Mar", value: 55 },
      { label: "Apr", value: 80 },
      { label: "May", value: 72 },
      { label: "Jun", value: 95 },
    ],
  },
  render: (args) => (
    <div className="max-w-md mx-auto p-8">
      <ContributionBarChart {...args} />
    </div>
  ),
};

export const Sparkline = {
  render: () => (
    <div className="max-w-sm mx-auto p-8 space-y-3">
      <MiniSparkline name="Vanguard" shares="450 Shares" data={[30, 40, 35, 50, 70, 85]} />
      <MiniSparkline name="S&P 500" shares="120 Shares" data={[60, 55, 70, 65, 80, 75]} />
    </div>
  ),
};
