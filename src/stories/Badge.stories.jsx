import { Badge } from "../components/Badge";
import { Bell, Mail, ShoppingCart } from "lucide-react";

export default {
  title: "Utilities/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { Badge } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "Badge content (number or text). Omit for dot variant.",
    },
    variant: {
      control: "select",
      options: ["default", "dot", "outline"],
      description: "Badge style variant",
    },
    color: {
      control: "select",
      options: ["red", "blue", "green", "yellow", "gray", "purple"],
      description: "Badge color",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Badge size",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description: "Badge position relative to child element",
    },
    pulse: {
      control: "boolean",
      description: "Animate with a pulse effect",
    },
    show: {
      control: "boolean",
      description: "Show or hide the badge",
    },
    max: {
      control: "number",
      description: "Max count before showing max+",
    },
  },
};

export const Default = {
  args: {
    content: 5,
    color: "red",
    size: "md",
    position: "top-right",
    show: true,
    pulse: false,
  },
  render: (args) => (
    <div className="p-8">
      <Badge {...args}>
        <button className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
          <Bell className="h-6 w-6" />
        </button>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge content={5} color="red">
  <button className="p-2 rounded-lg bg-gray-100">
    <Bell className="h-6 w-6" />
  </button>
</Badge>`,
      },
    },
  },
};

export const AllColors = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8">
      {["red", "blue", "green", "yellow", "gray", "purple"].map((color) => (
        <Badge key={color} content={3} color={color}>
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xs text-gray-500 capitalize">
            {color}
          </div>
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge content={3} color="red"><Icon /></Badge>
<Badge content={3} color="blue"><Icon /></Badge>
<Badge content={3} color="green"><Icon /></Badge>
<Badge content={3} color="yellow"><Icon /></Badge>
<Badge content={3} color="gray"><Icon /></Badge>
<Badge content={3} color="purple"><Icon /></Badge>`,
      },
    },
  },
};

export const DotVariant = {
  render: () => (
    <div className="flex gap-6 p-8">
      <Badge variant="dot" color="red" pulse>
        <button className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
          <Mail className="h-6 w-6" />
        </button>
      </Badge>
      <Badge variant="dot" color="green">
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
          JD
        </div>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `{/* Pulsing notification dot */}
<Badge variant="dot" color="red" pulse>
  <Mail className="h-6 w-6" />
</Badge>

{/* Online status dot */}
<Badge variant="dot" color="green">
  <Avatar />
</Badge>`,
      },
    },
  },
};

export const OutlineAndOverflow = {
  render: () => (
    <div className="flex gap-6 p-8 items-center">
      <Badge content={7} variant="outline" color="blue">
        <button className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
          <ShoppingCart className="h-6 w-6" />
        </button>
      </Badge>
      <Badge content={150} max={99} color="red">
        <button className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
          <Bell className="h-6 w-6" />
        </button>
      </Badge>
      <Badge content="New" color="purple" size="lg">
        <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-sm">
          Features
        </button>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `{/* Outline variant */}
<Badge content={7} variant="outline" color="blue">
  <ShoppingCart />
</Badge>

{/* Count overflow (max) */}
<Badge content={150} max={99} color="red">
  <Bell />
</Badge>

{/* Text badge */}
<Badge content="New" color="purple" size="lg">
  <button>Features</button>
</Badge>`,
      },
    },
  },
};
