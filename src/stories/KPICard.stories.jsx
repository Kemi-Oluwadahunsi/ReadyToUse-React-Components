import { SavingsTargetCard, MilestoneGoalCard, DividendIncomeCard } from "../components/KPICard";

export default {
  title: "Data Display/KPICard",
  component: SavingsTargetCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { SavingsTargetCard, MilestoneGoalCard, DividendIncomeCard } from "readyui-react";\n```',
      },
    },
  },
};

export const SavingsTarget = {
  render: () => (
    <div className="max-w-sm mx-auto p-8">
      <SavingsTargetCard />
    </div>
  ),
};

export const CustomTargets = {
  render: () => (
    <div className="max-w-sm mx-auto p-8">
      <SavingsTargetCard
        title="Investment Goals"
        targets={[
          { name: "EDUCATION", current: "$12,000", total: "$50,000", pct: 24 },
          { name: "VACATION", current: "$3,500", total: "$5,000", pct: 70 },
        ]}
      />
    </div>
  ),
};

export const MilestoneGoal = {
  render: () => (
    <div className="max-w-sm mx-auto p-8">
      <MilestoneGoalCard />
    </div>
  ),
};

export const DividendIncome = {
  render: () => (
    <div className="max-w-sm mx-auto p-8">
      <DividendIncomeCard />
    </div>
  ),
};
