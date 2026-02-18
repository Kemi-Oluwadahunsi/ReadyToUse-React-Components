import { useState } from "react";
import { Drawer } from "../components/Drawer";
import { ShoppingCart, Settings, Bell, Trash2 } from "lucide-react";

export default {
  title: "Layout/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean", description: "Controlled open state" },
    position: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Slide-in direction",
    },
    size: { control: "text", description: 'Width or height (e.g. "380px", "50%")' },
    showOverlay: { control: "boolean" },
    closeOnOverlay: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    showCloseButton: { control: "boolean" },
    onClose: { action: "closed" },
  },
  // Drawers use portals, so we add padding to avoid Storybook canvas clipping
  parameters: {

    docs: {

      description: {

        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { Drawer } from \"readyui-react\";\n```",

      },

    }, layout: "fullscreen" },
};

/* Helper wrapper that manages open/close state */
const DrawerTemplate = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Open Drawer
      </button>
      <Drawer {...args} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

/* ── Default (Right) ── */
export const Default = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    position: "right",
    header: "Notifications",
    children: (
      <div className="space-y-4">
        {["Your order has shipped!", "New comment on your post", "Weekly report is ready"].map(
          (msg, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Bell className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{msg}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{i + 1}h ago</p>
              </div>
            </div>
          )
        )}
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open Drawer</button>

<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  position="right"
  header="Notifications"
>
  <p>Your drawer content here</p>
</Drawer>`,
      },
    },
  },
};

/* ── Left Position ── */
export const LeftSidebar = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    position: "left",
    size: "300px",
    header: "Navigation",
    children: (
      <nav className="space-y-1">
        {["Dashboard", "Projects", "Team", "Settings"].map((label) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-sm"
          >
            {label}
          </a>
        ))}
      </nav>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  position="left"
  size="300px"
  header="Navigation"
>
  <nav>…</nav>
</Drawer>`,
      },
    },
  },
};

/* ── Bottom Sheet ── */
export const BottomSheet = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    position: "bottom",
    size: "320px",
    header: "Shopping Cart",
    footer: (
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold text-gray-900 dark:text-white">Total: $128.00</span>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Checkout
        </button>
      </div>
    ),
    children: (
      <div className="space-y-4">
        {[
          { name: "Wireless Earbuds", price: "$59.00", qty: 1 },
          { name: "USB-C Cable", price: "$12.00", qty: 2 },
          { name: "Phone Case", price: "$25.00", qty: 1 },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.qty}</p>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.price}</span>
          </div>
        ))}
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  position="bottom"
  size="320px"
  header="Shopping Cart"
  footer={<CheckoutBar />}
>
  <CartItems />
</Drawer>`,
      },
    },
  },
};

/* ── With Header & Footer ── */
export const WithHeaderAndFooter = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    position: "right",
    size: "420px",
    header: (
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-gray-500" />
        <span>Settings</span>
      </div>
    ),
    footer: (
      <div className="flex gap-3 w-full justify-end">
        <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Changes
        </button>
      </div>
    ),
    children: (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Display Name</label>
          <input
            type="text"
            defaultValue="Jane Doe"
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Email</label>
          <input
            type="email"
            defaultValue="jane@example.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-200">Dark Mode</span>
          <button className="w-10 h-6 bg-blue-600 rounded-full relative">
            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  header={<><Settings /> Settings</>}
  footer={<SaveCancelButtons />}
  size="420px"
>
  <SettingsForm />
</Drawer>`,
      },
    },
  },
};

/* ── No Overlay ── */
export const NoOverlay = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    position: "right",
    showOverlay: false,
    header: "Side Panel",
    children: (
      <p className="text-sm text-gray-600 dark:text-gray-300">
        This drawer has no backdrop overlay. The page behind remains fully visible and interactive.
      </p>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  showOverlay={false}
  header="Side Panel"
>
  <p>No overlay behind this drawer.</p>
</Drawer>`,
      },
    },
  },
};
