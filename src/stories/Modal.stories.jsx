import { useState } from "react";
import { Modal } from "../components/Modal";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export default {
  title: "Layout/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean", description: "Show / hide modal" },
    title: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Modal width preset",
    },
    animation: {
      control: "select",
      options: ["scale", "slide-up", "slide-down", "fade", "none"],
      description: "Open/close animation",
    },
    centered: { control: "boolean" },
    closeOnOverlay: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    showCloseButton: { control: "boolean" },
    onClose: { action: "closed" },
  },
  parameters: { layout: "fullscreen" },
};

/* Reusable wrapper that manages state */
const ModalTemplate = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Open Modal
      </button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

/* ── Default ── */
export const Default = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    title: "Welcome to ReadyUI",
    children: (
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        ReadyUI provides production-ready React components styled with Tailwind CSS. Every component is accessible, responsive, and easy to customize.
      </p>
    ),
    footer: (
      <>
        <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Get Started
        </button>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open Modal</button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Welcome to ReadyUI"
  footer={<><button>Cancel</button><button>Get Started</button></>}
>
  <p>Your content here</p>
</Modal>`,
      },
    },
  },
};

/* ── Small Confirmation ── */
export const ConfirmDelete = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    title: "Delete Project",
    size: "sm",
    children: (
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete <strong>"My Project"</strong>? This action cannot be undone and all associated data will be permanently removed.
        </p>
      </div>
    ),
    footer: (
      <>
        <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          Delete
        </button>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete Project"
  size="sm"
  footer={<><button>Cancel</button><button>Delete</button></>}
>
  <p>Are you sure? This cannot be undone.</p>
</Modal>`,
      },
    },
  },
};

/* ── Large with form ── */
export const LargeForm = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    title: "Create New User",
    size: "lg",
    animation: "slide-up",
    children: (
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "First Name", placeholder: "Jane" },
          { label: "Last Name", placeholder: "Doe" },
          { label: "Email", placeholder: "jane@example.com", type: "email" },
          { label: "Role", placeholder: "Developer" },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    ),
    footer: (
      <>
        <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Create User
        </button>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Create New User"
  size="lg"
  animation="slide-up"
  footer={<><button>Cancel</button><button>Create User</button></>}
>
  <form>…fields…</form>
</Modal>`,
      },
    },
  },
};

/* ── Success Feedback ── */
export const SuccessMessage = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    size: "sm",
    showCloseButton: false,
    animation: "scale",
    children: (
      <div className="text-center py-4">
        <div className="mx-auto w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Payment Successful</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your payment of <strong>$49.99</strong> has been processed. A receipt has been sent to your email.
        </p>
      </div>
    ),
    footer: (
      <button className="w-full px-4 py-2.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
        Done
      </button>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  size="sm"
  showCloseButton={false}
  footer={<button className="w-full …">Done</button>}
>
  <SuccessIcon />
  <h3>Payment Successful</h3>
  <p>Your payment has been processed.</p>
</Modal>`,
      },
    },
  },
};

/* ── Info Modal – Fade Animation ── */
export const InfoFade = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    title: "About this feature",
    size: "md",
    animation: "fade",
    children: (
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          This feature uses end-to-end encryption to keep your data safe. All communications are secured with TLS 1.3 and keys are rotated every 24 hours.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="About this feature"
  animation="fade"
>
  <p>Feature details…</p>
</Modal>`,
      },
    },
  },
};
