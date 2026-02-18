import { ResizableSidebar } from "../components/ResizableSidebar";
import {
  Home,
  LayoutDashboard,
  FolderOpen,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Mail,
  Calendar,
  Bell,
} from "lucide-react";

const defaultItems = [
  { icon: Home, label: "Home", href: "#", active: true },
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: FolderOpen, label: "Projects", href: "#", badge: "5" },
  { icon: Users, label: "Team", href: "#" },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
];

const mailItems = [
  { icon: Mail, label: "Inbox", href: "#", active: true, badge: "24" },
  { icon: Mail, label: "Sent", href: "#" },
  { icon: Mail, label: "Drafts", href: "#", badge: "3" },
  { icon: Calendar, label: "Calendar", href: "#" },
  { icon: Bell, label: "Notifications", href: "#", badge: "7" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default {
  title: "Layout/ResizableSidebar",
  component: ResizableSidebar,
  tags: ["autodocs"],
  argTypes: {
    header: { control: "text", description: "Sidebar header text" },
    defaultWidth: { control: { type: "range", min: 180, max: 500, step: 10 } },
    minWidth: { control: "number" },
    maxWidth: { control: "number" },
    defaultCollapsed: { control: "boolean" },
    showSearch: { control: "boolean" },
    resizable: { control: "boolean" },
    onCollapse: { action: "collapse-toggled" },
    onResize: { action: "resized" },
  },
  parameters: {

    docs: {

      description: {

        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { ResizableSidebar } from \"readyui-react\";\n```",

      },

    }, layout: "fullscreen" },
};

/* ── Default ── */
export const Default = {
  args: {
    items: defaultItems,
    header: "ReadyUI",
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Drag the right edge of the sidebar to resize it, or click the chevron to collapse.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `import { Home, LayoutDashboard, FolderOpen, Users, BarChart3, Settings } from "lucide-react";

<ResizableSidebar
  header="ReadyUI"
  items={[
    { icon: Home, label: "Home", href: "#", active: true },
    { icon: LayoutDashboard, label: "Dashboard", href: "#" },
    { icon: FolderOpen, label: "Projects", href: "#", badge: "5" },
    { icon: Users, label: "Team", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ]}
>
  <main>Your page content</main>
</ResizableSidebar>`,
      },
    },
  },
};

/* ── Collapsed by Default ── */
export const CollapsedByDefault = {
  args: {
    items: defaultItems,
    header: "App",
    defaultCollapsed: true,
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Collapsed Sidebar</h1>
        <p className="text-gray-600 dark:text-gray-300">
          The sidebar starts collapsed, showing only icons. Click the chevron to expand.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<ResizableSidebar
  header="App"
  items={items}
  defaultCollapsed
>
  <main>Content</main>
</ResizableSidebar>`,
      },
    },
  },
};

/* ── Mail App Layout ── */
export const MailApp = {
  args: {
    items: mailItems,
    header: "ReadyMail",
    defaultWidth: 280,
    showSearch: true,
    footer: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-white">Jane Doe</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">jane@example.com</p>
        </div>
      </div>
    ),
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Inbox</h1>
        <div className="space-y-3">
          {[
            { from: "Alex", subject: "Project update", time: "2m ago" },
            { from: "Marketing", subject: "Q4 campaign results", time: "1h ago" },
            { from: "GitHub", subject: "New pull request #42", time: "3h ago" },
          ].map((mail, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm text-gray-900 dark:text-white">{mail.from}</span>
                <span className="text-xs text-gray-400">{mail.time}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{mail.subject}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<ResizableSidebar
  header="ReadyMail"
  items={mailItems}
  defaultWidth={280}
  showSearch
  footer={<UserAvatar />}
>
  <InboxList />
</ResizableSidebar>`,
      },
    },
  },
};

/* ── Non-Resizable ── */
export const NonResizable = {
  args: {
    items: defaultItems.slice(0, 4),
    header: "Fixed Width",
    resizable: false,
    showSearch: false,
    defaultWidth: 240,
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Fixed Sidebar</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This sidebar cannot be resized by dragging. It can still be collapsed via the toggle button.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<ResizableSidebar
  header="Fixed Width"
  items={items}
  resizable={false}
  showSearch={false}
  defaultWidth={240}
>
  <main>Content</main>
</ResizableSidebar>`,
      },
    },
  },
};
