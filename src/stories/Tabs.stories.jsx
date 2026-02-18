import { Tabs } from "../components/Tabs";
import { Home, User, Settings, Bell, Shield, CreditCard } from "lucide-react";

const basicTabs = [
  {
    key: "overview",
    label: "Overview",
    content: (
      <div className="text-gray-600 dark:text-gray-300 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Overview</h3>
        <p>This dashboard gives you a bird's-eye view of all project activity, recent commits, and deployment status.</p>
      </div>
    ),
  },
  {
    key: "activity",
    label: "Activity",
    content: (
      <div className="text-gray-600 dark:text-gray-300 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        <ul className="space-y-2 text-sm">
          <li>• Jane pushed 3 commits to <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">main</code></li>
          <li>• Build #142 passed all checks</li>
          <li>• New issue opened: "Fix mobile nav"</li>
        </ul>
      </div>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    content: (
      <div className="text-gray-600 dark:text-gray-300 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
        <p>Manage repository settings, webhooks, and access control from this panel.</p>
      </div>
    ),
  },
];

const iconTabs = [
  {
    key: "home",
    label: "Home",
    icon: Home,
    content: (
      <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening today.</p>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    icon: User,
    badge: 3,
    content: (
      <p className="text-gray-600 dark:text-gray-300">Update your avatar, display name, and bio.</p>
    ),
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: Bell,
    badge: 12,
    content: (
      <p className="text-gray-600 dark:text-gray-300">You have 12 unread notifications.</p>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p className="text-gray-600 dark:text-gray-300">Configure your account preferences.</p>
    ),
  },
];

const accountTabs = [
  {
    key: "general",
    label: "General",
    icon: Settings,
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">General Settings</h3>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Display Name</label>
          <input type="text" defaultValue="Jane Doe" className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-sm text-gray-900 dark:text-white" />
        </div>
      </div>
    ),
  },
  {
    key: "security",
    label: "Security",
    icon: Shield,
    content: (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">Two-factor authentication is enabled.</p>
      </div>
    ),
  },
  {
    key: "billing",
    label: "Billing",
    icon: CreditCard,
    content: (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">Billing</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">You are on the Pro plan. Next invoice: March 1.</p>
      </div>
    ),
  },
];

export default {
  title: "Layout/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "pills", "boxed"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    fullWidth: { control: "boolean" },
    lazy: { control: "boolean" },
    animated: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

/* ── Default (Underline) ── */
export const Default = {
  args: {
    tabs: basicTabs,
  },
  parameters: {
    docs: {
      source: {
        code: `<Tabs
  tabs={[
    { key: "overview", label: "Overview", content: <Overview /> },
    { key: "activity", label: "Activity", content: <Activity /> },
    { key: "settings", label: "Settings", content: <Settings /> },
  ]}
/>`,
      },
    },
  },
};

/* ── Pills with Icons & Badges ── */
export const PillsWithIcons = {
  args: {
    tabs: iconTabs,
    variant: "pills",
  },
  parameters: {
    docs: {
      source: {
        code: `import { Home, User, Bell, Settings } from "lucide-react";

<Tabs
  variant="pills"
  tabs={[
    { key: "home", label: "Home", icon: Home, content: <Home /> },
    { key: "profile", label: "Profile", icon: User, badge: 3, content: <Profile /> },
    { key: "notifications", label: "Notifications", icon: Bell, badge: 12, content: <Notifications /> },
    { key: "settings", label: "Settings", icon: Settings, content: <Settings /> },
  ]}
/>`,
      },
    },
  },
};

/* ── Boxed Full Width ── */
export const BoxedFullWidth = {
  args: {
    tabs: basicTabs,
    variant: "boxed",
    fullWidth: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Tabs tabs={tabs} variant="boxed" fullWidth />`,
      },
    },
  },
};

/* ── Vertical Orientation ── */
export const Vertical = {
  args: {
    tabs: accountTabs,
    orientation: "vertical",
    variant: "underline",
  },
  parameters: {
    docs: {
      source: {
        code: `<Tabs
  orientation="vertical"
  tabs={[
    { key: "general", label: "General", icon: Settings, content: <General /> },
    { key: "security", label: "Security", icon: Shield, content: <Security /> },
    { key: "billing", label: "Billing", icon: CreditCard, content: <Billing /> },
  ]}
/>`,
      },
    },
  },
};

/* ── Small Size, Lazy Rendering ── */
export const SmallLazy = {
  args: {
    tabs: basicTabs,
    size: "sm",
    lazy: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Tabs tabs={tabs} size="sm" lazy />`,
      },
    },
  },
};
