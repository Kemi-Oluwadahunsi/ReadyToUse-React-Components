import { useState } from "react";
import { CommandPalette } from "../components/CommandPalette";
import {
  Home,
  Settings,
  User,
  FileText,
  Search,
  Moon,
  LogOut,
  Plus,
  Download,
  Trash2,
  Copy,
  Share2,
} from "lucide-react";

export default {
  title: "Navigation/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    placeholder: { control: "text" },
    maxResults: { control: { type: "number", min: 3, max: 20 } },
    enableHotkey: { control: "boolean" },
  },
};

const commandItems = [
  { id: "home", label: "Go to Home", icon: Home, group: "Navigation", shortcut: "⌘H" },
  { id: "settings", label: "Open Settings", icon: Settings, group: "Navigation", shortcut: "⌘," },
  { id: "profile", label: "View Profile", icon: User, group: "Navigation" },
  { id: "new-doc", label: "New Document", icon: Plus, group: "Actions", shortcut: "⌘N" },
  { id: "search", label: "Search Files", icon: Search, group: "Actions", shortcut: "⌘F" },
  { id: "export", label: "Export as PDF", icon: Download, group: "Actions" },
  { id: "copy-link", label: "Copy Link", icon: Copy, group: "Actions" },
  { id: "share", label: "Share", icon: Share2, group: "Actions" },
  { id: "dark-mode", label: "Toggle Dark Mode", icon: Moon, group: "Preferences", shortcut: "⌘D" },
  { id: "docs", label: "Documentation", icon: FileText, group: "Help", description: "View the full documentation" },
  { id: "delete", label: "Delete Item", icon: Trash2, group: "Danger" },
  { id: "logout", label: "Log Out", icon: LogOut, group: "Account", shortcut: "⌘Q" },
];

export const Default = {
  args: {
    isOpen: true,
    items: commandItems,
    placeholder: "Type a command or search...",
    maxResults: 8,
    enableHotkey: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.isOpen);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
          Open Command Palette{" "}
          <kbd className="ml-2 text-xs bg-gray-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded">⌘K</kbd>
        </button>
        <CommandPalette
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          onSelect={(item) => {
            console.log("Selected:", item.label);
            setOpen(false);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);

<CommandPalette
  isOpen={open}
  onClose={() => setOpen(false)}
  items={[
    { id: "home", label: "Go to Home", icon: Home, group: "Navigation", shortcut: "⌘H" },
    { id: "settings", label: "Open Settings", icon: Settings, group: "Navigation", shortcut: "⌘," },
    { id: "new-doc", label: "New Document", icon: Plus, group: "Actions", shortcut: "⌘N" },
    { id: "search", label: "Search Files", icon: Search, group: "Actions", shortcut: "⌘F" },
  ]}
  onSelect={(item) => console.log("Selected:", item.label)}
/>`,
      },
    },
  },
};

export const WithRecentItems = {
  args: {
    isOpen: true,
    items: commandItems,
    recentItems: ["settings", "new-doc", "dark-mode"],
    placeholder: "Search commands...",
    maxResults: 10,
    enableHotkey: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.isOpen);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Open Palette (with recents)
        </button>
        <CommandPalette
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          onSelect={(item) => setOpen(false)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<CommandPalette
  isOpen={open}
  onClose={() => setOpen(false)}
  items={commands}
  recentItems={["settings", "new-doc", "dark-mode"]}
  onSelect={(item) => console.log(item)}
/>`,
      },
    },
  },
};

export const MinimalActions = {
  args: {
    isOpen: true,
    items: [
      { id: "copy", label: "Copy to Clipboard", icon: Copy, group: "Edit" },
      { id: "share", label: "Share Link", icon: Share2, group: "Edit" },
      { id: "download", label: "Download File", icon: Download, group: "File" },
      { id: "delete", label: "Delete", icon: Trash2, group: "Danger", description: "Permanently remove this item" },
    ],
    placeholder: "What do you want to do?",
    maxResults: 4,
    enableHotkey: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.isOpen);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
          Quick Actions
        </button>
        <CommandPalette
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          onSelect={(item) => setOpen(false)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<CommandPalette
  isOpen={open}
  onClose={() => setOpen(false)}
  items={[
    { id: "copy", label: "Copy to Clipboard", icon: Copy, group: "Edit" },
    { id: "share", label: "Share Link", icon: Share2, group: "Edit" },
    { id: "download", label: "Download File", icon: Download, group: "File" },
    { id: "delete", label: "Delete", icon: Trash2, group: "Danger" },
  ]}
  placeholder="What do you want to do?"
  maxResults={4}
/>`,
      },
    },
  },
};
