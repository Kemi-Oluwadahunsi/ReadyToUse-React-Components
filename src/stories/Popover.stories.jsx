import { Popover } from "../components/Popover";
import { Settings, User, LogOut, HelpCircle } from "lucide-react";

export default {
  title: "Feedback/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    triggerMode: {
      control: "select",
      options: ["click", "hover"],
      description: "How the popover is opened",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Preferred placement",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment along the placement axis",
    },
    showArrow: { control: "boolean", description: "Show arrow pointer" },
    closeOnClickOutside: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    offset: { control: "number", description: "Distance from trigger in px" },
  },
  parameters: {
    layout: "centered",
    docs: { story: { height: "350px" } },
  },
};

/* ── Default ── */
export const Default = {
  args: {
    triggerMode: "click",
    placement: "bottom",
    align: "center",
    showArrow: true,
    offset: 8,
    trigger: (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm">
        Open Popover
      </button>
    ),
    children: (
      <div className="w-56">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Popover Title
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This is a popover with some helpful content.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Popover
  trigger={<button>Open Popover</button>}
  placement="bottom"
>
  <div>
    <p>Popover Title</p>
    <p>Some helpful content.</p>
  </div>
</Popover>`,
      },
    },
  },
};

/* ── Hover Mode ── */
export const HoverTrigger = {
  args: {
    triggerMode: "hover",
    placement: "right",
    showArrow: true,
    trigger: (
      <span className="inline-flex items-center gap-1 text-sm text-gray-600 cursor-help">
        <HelpCircle className="w-4 h-4" /> What is this?
      </span>
    ),
    children: (
      <div className="w-52">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Hover-triggered popovers appear after a short delay and close when you
          move your cursor away.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Popover
  triggerMode="hover"
  placement="right"
  trigger={<span>What is this?</span>}
>
  <p>Hover-triggered content.</p>
</Popover>`,
      },
    },
  },
};

/* ── Menu-Style Popover ── */
export const MenuPopover = {
  render: () => (
    <div className="p-16">
      <Popover
        triggerMode="click"
        placement="bottom"
        align="end"
        trigger={
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        }
      >
        <div className="w-48 -m-2">
          {[
            { icon: User, label: "Profile" },
            { icon: Settings, label: "Settings" },
            { icon: HelpCircle, label: "Help" },
            { icon: LogOut, label: "Sign out" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Popover
  triggerMode="click"
  placement="bottom"
  align="end"
  trigger={<Settings />}
>
  <button>Profile</button>
  <button>Settings</button>
  <button>Help</button>
  <button>Sign out</button>
</Popover>`,
      },
    },
  },
};

/* ── Placements ── */
export const Placements = {
  render: () => (
    <div className="p-20 flex flex-col items-center gap-8">
      <Popover
        placement="top"
        trigger={
          <button className="px-3 py-1.5 bg-gray-800 text-white rounded text-sm">
            Top
          </button>
        }
      >
        <p className="text-sm w-36">Content above the trigger.</p>
      </Popover>
      <div className="flex gap-20">
        <Popover
          placement="left"
          trigger={
            <button className="px-3 py-1.5 bg-gray-800 text-white rounded text-sm">
              Left
            </button>
          }
        >
          <p className="text-sm w-36">Content to the left.</p>
        </Popover>
        <Popover
          placement="right"
          trigger={
            <button className="px-3 py-1.5 bg-gray-800 text-white rounded text-sm">
              Right
            </button>
          }
        >
          <p className="text-sm w-36">Content to the right.</p>
        </Popover>
      </div>
      <Popover
        placement="bottom"
        trigger={
          <button className="px-3 py-1.5 bg-gray-800 text-white rounded text-sm">
            Bottom
          </button>
        }
      >
        <p className="text-sm w-36">Content below the trigger.</p>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Popover placement="top" trigger={<button>Top</button>}>...</Popover>
<Popover placement="bottom" trigger={<button>Bottom</button>}>...</Popover>
<Popover placement="left" trigger={<button>Left</button>}>...</Popover>
<Popover placement="right" trigger={<button>Right</button>}>...</Popover>`,
      },
    },
  },
};
