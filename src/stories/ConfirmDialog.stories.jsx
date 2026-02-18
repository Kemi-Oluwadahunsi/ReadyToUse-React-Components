import { useState } from "react";
import { ConfirmDialog, useConfirm } from "../components/ConfirmDialog";
import { Trash2 } from "lucide-react";

export default {
  title: "Feedback/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "danger", "warning", "info", "success"],
      description: "Visual variant",
    },
    title: { control: "text" },
    message: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    showIcon: { control: "boolean" },
    closeOnOverlay: { control: "boolean" },
    onConfirm: { action: "confirmed" },
    onCancel: { action: "cancelled" },
  },
  parameters: {

    docs: {

      description: {

        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { ConfirmDialog } from \"readyui-react\";\n```",

      },

    }, layout: "fullscreen" },
};

/* Reusable wrapper that manages open/close state */
const DialogTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Open Dialog
      </button>
      <ConfirmDialog
        {...args}
        isOpen={isOpen}
        onConfirm={() => {
          args.onConfirm?.();
          setIsOpen(false);
        }}
        onCancel={() => {
          args.onCancel?.();
          setIsOpen(false);
        }}
      />
    </div>
  );
};

/* ── Default ── */
export const Default = {
  render: (args) => <DialogTemplate {...args} />,
  args: {
    title: "Are you sure?",
    message: "This action requires your confirmation before proceeding.",
    variant: "default",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    showIcon: true,
    closeOnOverlay: true,
  },
  parameters: {
    docs: {
      source: {
        code: `const [isOpen, setIsOpen] = useState(false);

<ConfirmDialog
  isOpen={isOpen}
  title="Are you sure?"
  message="This action requires your confirmation."
  onConfirm={() => setIsOpen(false)}
  onCancel={() => setIsOpen(false)}
/>`,
      },
    },
  },
};

/* ── Danger Variant ── */
export const Danger = {
  render: (args) => <DialogTemplate {...args} />,
  args: {
    title: "Delete account?",
    message:
      "This will permanently delete your account and all associated data. This cannot be undone.",
    variant: "danger",
    confirmLabel: "Delete",
    cancelLabel: "Keep account",
    showIcon: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<ConfirmDialog
  isOpen={isOpen}
  variant="danger"
  title="Delete account?"
  message="This will permanently delete your account."
  confirmLabel="Delete"
  cancelLabel="Keep account"
  onConfirm={handleDelete}
  onCancel={() => setIsOpen(false)}
/>`,
      },
    },
  },
};

/* ── Warning Variant ── */
export const Warning = {
  render: (args) => <DialogTemplate {...args} />,
  args: {
    title: "Unsaved changes",
    message: "You have unsaved changes. Do you want to leave without saving?",
    variant: "warning",
    confirmLabel: "Leave",
    cancelLabel: "Stay",
  },
  parameters: {
    docs: {
      source: {
        code: `<ConfirmDialog
  isOpen={isOpen}
  variant="warning"
  title="Unsaved changes"
  message="You have unsaved changes. Do you want to leave?"
  confirmLabel="Leave"
  cancelLabel="Stay"
  onConfirm={handleLeave}
  onCancel={() => setIsOpen(false)}
/>`,
      },
    },
  },
};

/* ── Custom Icon ── */
export const CustomIcon = {
  render: (args) => <DialogTemplate {...args} />,
  args: {
    title: "Move to trash?",
    message: "The item will be moved to trash. You can restore it within 30 days.",
    variant: "danger",
    icon: Trash2,
    confirmLabel: "Move to trash",
    cancelLabel: "Cancel",
  },
  parameters: {
    docs: {
      source: {
        code: `import { Trash2 } from "lucide-react";

<ConfirmDialog
  isOpen={isOpen}
  variant="danger"
  icon={Trash2}
  title="Move to trash?"
  message="The item will be moved to trash."
  confirmLabel="Move to trash"
  onConfirm={handleTrash}
  onCancel={() => setIsOpen(false)}
/>`,
      },
    },
  },
};
