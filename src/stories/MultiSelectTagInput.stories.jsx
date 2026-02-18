import { useState } from "react";
import { MultiSelectTagInput } from "../components/MultiSelectTagInput";

const techSkills = [
  "JavaScript", "TypeScript", "React", "Vue", "Angular",
  "Node.js", "Python", "Go", "Rust", "Docker",
  "Kubernetes", "AWS", "GraphQL", "PostgreSQL", "Redis",
];

const colors = [
  "Red", "Orange", "Yellow", "Green", "Blue",
  "Indigo", "Violet", "Pink", "Teal", "Cyan",
];

export default {
  title: "Inputs/MultiSelectTagInput",
  component: MultiSelectTagInput,
  tags: ["autodocs"],
  argTypes: {
    allowCustom: { control: "boolean", description: "Allow typing custom tags" },
    maxItems: { control: "number", description: "Maximum selectable items" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    tagColor: { control: "text", description: "Tailwind classes for tag styling" },
    onChange: { action: "changed" },
  },
  parameters: {
    docs: { description: { component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { MultiSelectTagInput } from \"readyui-react\";\n```" }, story: { height: "350px" } },
  },
};

/* ── Default ── */
export const Default = {
  render: (args) => {
    const [selected, setSelected] = useState([]);
    return (
      <div className="w-96">
        <MultiSelectTagInput {...args} value={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    options: techSkills,
    placeholder: "Search skills…",
  },
  parameters: {
    docs: {
      source: {
        code: `const [selected, setSelected] = useState([]);

<MultiSelectTagInput
  options={["JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js"]}
  value={selected}
  onChange={setSelected}
  placeholder="Search skills…"
/>`,
      },
    },
  },
};

/* ── With Max Items ── */
export const MaxItems = {
  render: (args) => {
    const [selected, setSelected] = useState(["React", "TypeScript"]);
    return (
      <div className="w-96">
        <MultiSelectTagInput {...args} value={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    options: techSkills,
    maxItems: 5,
    placeholder: "Pick up to 5…",
  },
  parameters: {
    docs: {
      source: {
        code: `<MultiSelectTagInput
  options={skills}
  value={selected}
  onChange={setSelected}
  maxItems={5}
  placeholder="Pick up to 5…"
/>`,
      },
    },
  },
};

/* ── Allow Custom Tags ── */
export const AllowCustom = {
  render: (args) => {
    const [selected, setSelected] = useState([]);
    return (
      <div className="w-96">
        <MultiSelectTagInput {...args} value={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    options: colors,
    allowCustom: true,
    placeholder: "Type a color or add your own…",
  },
  parameters: {
    docs: {
      source: {
        code: `<MultiSelectTagInput
  options={colors}
  value={selected}
  onChange={setSelected}
  allowCustom
  placeholder="Type a color or add your own…"
/>`,
      },
    },
  },
};

/* ── Disabled with Pre-selected ── */
export const Disabled = {
  args: {
    options: techSkills,
    defaultValue: ["React", "Node.js", "Docker"],
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<MultiSelectTagInput
  options={skills}
  defaultValue={["React", "Node.js", "Docker"]}
  disabled
/>`,
      },
    },
  },
};
