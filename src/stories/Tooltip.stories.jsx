import { Tooltip } from "../components/Tooltip";
import { Info, Settings, HelpCircle } from "lucide-react";

export default {
  title: "Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text", description: "Tooltip content" },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Preferred position (auto-flips)",
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "focus"],
      description: "Trigger mode",
    },
    delay: {
      control: { type: "number", min: 0, max: 1000 },
      description: "Show delay in ms",
    },
    hideDelay: {
      control: { type: "number", min: 0, max: 1000 },
      description: "Hide delay in ms",
    },
    arrow: { control: "boolean", description: "Show arrow pointer" },
    disabled: { control: "boolean" },
    offset: { control: "number", description: "Distance from trigger in px" },
    maxWidth: { control: "number", description: "Max width in px" },
  },
  parameters: {

    docs: {

      description: {

        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { Tooltip } from \"readyui-react\";\n```",

      },

    }, layout: "centered" },
};

/* ── Default ── */
export const Default = {
  args: {
    content: "This is a tooltip",
    position: "top",
    arrow: true,
    delay: 200,
    children: (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm">
        Hover me
      </button>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>`,
      },
    },
  },
};

/* ── All Positions ── */
export const Positions = {
  render: () => (
    <div className="p-16 flex flex-col items-center gap-6">
      <Tooltip content="Top tooltip" position="top">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
          Top
        </button>
      </Tooltip>
      <div className="flex gap-16">
        <Tooltip content="Left tooltip" position="left">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
            Left
          </button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
            Right
          </button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" position="bottom">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
          Bottom
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="Top" position="top">...</Tooltip>
<Tooltip content="Bottom" position="bottom">...</Tooltip>
<Tooltip content="Left" position="left">...</Tooltip>
<Tooltip content="Right" position="right">...</Tooltip>`,
      },
    },
  },
};

/* ── Click Trigger ── */
export const ClickTrigger = {
  args: {
    content: "Click-triggered tooltip — click again to close.",
    trigger: "click",
    position: "bottom",
    children: (
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium text-sm">
        Click me
      </button>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="Click to toggle" trigger="click">
  <button>Click me</button>
</Tooltip>`,
      },
    },
  },
};

/* ── Rich Content ── */
export const RichContent = {
  args: {
    content: (
      <div className="space-y-1">
        <p className="font-semibold">Keyboard shortcuts</p>
        <div className="flex justify-between gap-4 text-[11px]">
          <span>Save</span>
          <kbd className="bg-gray-700 px-1 rounded">⌘S</kbd>
        </div>
        <div className="flex justify-between gap-4 text-[11px]">
          <span>Undo</span>
          <kbd className="bg-gray-700 px-1 rounded">⌘Z</kbd>
        </div>
      </div>
    ),
    position: "bottom",
    maxWidth: 200,
    children: (
      <span className="inline-flex items-center gap-1 text-sm text-gray-600 cursor-help">
        <HelpCircle className="w-4 h-4" /> Shortcuts
      </span>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip
  position="bottom"
  maxWidth={200}
  content={
    <div>
      <p className="font-semibold">Keyboard shortcuts</p>
      <div>Save — ⌘S</div>
      <div>Undo — ⌘Z</div>
    </div>
  }
>
  <span>Shortcuts</span>
</Tooltip>`,
      },
    },
  },
};
