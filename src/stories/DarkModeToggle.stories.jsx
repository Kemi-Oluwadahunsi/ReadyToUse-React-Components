import { useState } from "react";
import { DarkModeToggle } from "../components/darkMode/DarkModeToggle";

export default {
  title: "Utilities/DarkModeToggle",
  component: DarkModeToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { DarkModeToggle } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["light", "dark", "system"],
      description: "Current theme mode",
    },
    variant: {
      control: "select",
      options: ["segmented", "icon", "switch"],
      description: "Toggle UI variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Toggle size",
    },
    showSystem: {
      control: "boolean",
      description: "Whether to show the system option",
    },
  },
};

export const Default = {
  args: {
    mode: "light",
    variant: "segmented",
    size: "md",
    showSystem: true,
  },
  render: (args) => {
    const [mode, setMode] = useState(args.mode);
    return <DarkModeToggle {...args} mode={mode} onChange={setMode} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [mode, setMode] = useState("light");

<DarkModeToggle
  mode={mode}
  onChange={setMode}
  variant="segmented"
  size="md"
  showSystem
/>`,
      },
    },
  },
};

export const IconVariant = {
  args: {
    mode: "light",
    variant: "icon",
    size: "md",
    showSystem: true,
  },
  render: (args) => {
    const [mode, setMode] = useState(args.mode);
    return <DarkModeToggle {...args} mode={mode} onChange={setMode} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [mode, setMode] = useState("light");

<DarkModeToggle
  mode={mode}
  onChange={setMode}
  variant="icon"
/>`,
      },
    },
  },
};

export const SwitchVariant = {
  args: {
    mode: "light",
    variant: "switch",
    size: "md",
  },
  render: (args) => {
    const [mode, setMode] = useState(args.mode);
    return <DarkModeToggle {...args} mode={mode} onChange={setMode} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [mode, setMode] = useState("light");

<DarkModeToggle
  mode={mode}
  onChange={setMode}
  variant="switch"
/>`,
      },
    },
  },
};

export const AllSizes = {
  render: () => {
    const [mode, setMode] = useState("light");
    return (
      <div className="flex flex-col gap-4 items-start">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 w-8">SM</span>
          <DarkModeToggle mode={mode} onChange={setMode} size="sm" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 w-8">MD</span>
          <DarkModeToggle mode={mode} onChange={setMode} size="md" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 w-8">LG</span>
          <DarkModeToggle mode={mode} onChange={setMode} size="lg" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<DarkModeToggle mode={mode} onChange={setMode} size="sm" />
<DarkModeToggle mode={mode} onChange={setMode} size="md" />
<DarkModeToggle mode={mode} onChange={setMode} size="lg" />`,
      },
    },
  },
};
