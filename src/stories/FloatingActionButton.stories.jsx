import { FloatingActionButton } from "../components/FloatingActionButton";
import { Edit, Upload, Share2, Bookmark } from "lucide-react";

export default {
  title: "Utilities/FloatingActionButton",
  component: FloatingActionButton,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "top-right", "top-left"],
      description: "Screen position of the FAB",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "FAB size",
    },
    mainColor: {
      control: "text",
      description: "Tailwind bg classes for the main button",
    },
    hideOnScroll: {
      control: "boolean",
      description: "Hide FAB when scrolling down",
    },
    showBackdrop: {
      control: "boolean",
      description: "Show backdrop overlay when expanded",
    },
  },
  parameters: {

    docs: {

      description: {

        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { FloatingActionButton } from \"readyui-react\";\n```",

      },

    },
    layout: "fullscreen",
  },
};

const defaultActions = [
  {
    id: "edit",
    icon: Edit,
    label: "Edit",
    color: "bg-emerald-500 hover:bg-emerald-600",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "upload",
    icon: Upload,
    label: "Upload File",
    color: "bg-violet-500 hover:bg-violet-600",
    onClick: () => console.log("Upload clicked"),
  },
  {
    id: "share",
    icon: Share2,
    label: "Share",
    color: "bg-orange-500 hover:bg-orange-600",
    onClick: () => console.log("Share clicked"),
  },
];

export const Default = {
  args: {
    actions: defaultActions,
    position: "bottom-right",
    size: "md",
    mainColor: "bg-blue-600 hover:bg-blue-700",
    hideOnScroll: false,
    showBackdrop: true,
  },
  render: (args) => (
    <div style={{ height: "400px", position: "relative" }}>
      <div className="p-6 text-gray-500 text-sm">
        Click the + button in the corner to expand sub-actions.
      </div>
      <FloatingActionButton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Edit, Upload, Share2 } from "lucide-react";

const actions = [
  { id: "edit", icon: Edit, label: "Edit", color: "bg-emerald-500 hover:bg-emerald-600", onClick: () => {} },
  { id: "upload", icon: Upload, label: "Upload File", color: "bg-violet-500 hover:bg-violet-600", onClick: () => {} },
  { id: "share", icon: Share2, label: "Share", color: "bg-orange-500 hover:bg-orange-600", onClick: () => {} },
];

<FloatingActionButton
  actions={actions}
  position="bottom-right"
  mainColor="bg-blue-600 hover:bg-blue-700"
/>`,
      },
    },
  },
};

export const BottomLeft = {
  args: {
    actions: defaultActions,
    position: "bottom-left",
    size: "md",
    mainColor: "bg-purple-600 hover:bg-purple-700",
    hideOnScroll: false,
    showBackdrop: true,
  },
  render: (args) => (
    <div style={{ height: "400px", position: "relative" }}>
      <div className="p-6 text-gray-500 text-sm">
        FAB positioned at bottom-left.
      </div>
      <FloatingActionButton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<FloatingActionButton
  actions={actions}
  position="bottom-left"
  mainColor="bg-purple-600 hover:bg-purple-700"
/>`,
      },
    },
  },
};

export const SmallWithTwoActions = {
  args: {
    actions: [
      {
        id: "bookmark",
        icon: Bookmark,
        label: "Bookmark",
        color: "bg-amber-500 hover:bg-amber-600",
        onClick: () => console.log("Bookmark"),
      },
      {
        id: "share",
        icon: Share2,
        label: "Share",
        color: "bg-teal-500 hover:bg-teal-600",
        onClick: () => console.log("Share"),
      },
    ],
    position: "bottom-right",
    size: "sm",
    mainColor: "bg-rose-500 hover:bg-rose-600",
    hideOnScroll: false,
    showBackdrop: false,
  },
  render: (args) => (
    <div style={{ height: "400px", position: "relative" }}>
      <div className="p-6 text-gray-500 text-sm">
        Small size, no backdrop, two actions.
      </div>
      <FloatingActionButton {...args} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<FloatingActionButton
  actions={[
    { id: "bookmark", icon: Bookmark, label: "Bookmark", onClick: () => {} },
    { id: "share", icon: Share2, label: "Share", onClick: () => {} },
  ]}
  size="sm"
  mainColor="bg-rose-500 hover:bg-rose-600"
  showBackdrop={false}
/>`,
      },
    },
  },
};
