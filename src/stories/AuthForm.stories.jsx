import { AuthForm } from "../components/AuthForm";

export default {
  title: "Inputs & Forms/AuthForm",
  component: AuthForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: '## 📥 Import\n\n```jsx\nimport { AuthForm } from "readyui-react";\n```',
      },
    },
  },
  argTypes: {
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export const Default = {
  render: (args) => (
    <div className="max-w-sm mx-auto p-8">
      <AuthForm {...args} />
    </div>
  ),
};
