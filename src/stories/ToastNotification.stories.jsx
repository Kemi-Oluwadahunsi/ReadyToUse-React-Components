import { ToastProvider, useToast } from "../components/ToastNotification";

export default {
  title: "Feedback/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["minimal", "modern", "alert"],
      description: "Design variant",
    },
    position: {
      control: "select",
      options: [
        "top-right",
        "top-left",
        "top-center",
        "bottom-right",
        "bottom-left",
        "bottom-center",
        "center",
      ],
      description: "Position of the toast stack",
    },
    maxToasts: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum number of visible toasts",
    },
    defaultDuration: {
      control: { type: "number", min: 0, step: 500 },
      description: "Auto-dismiss duration in ms (0 = persistent)",
    },
    backdrop: {
      control: "boolean",
      description: "Show backdrop overlay (best with center position + alert variant)",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '## 📥 Import\n\n```jsx\nimport { ToastProvider, useToast } from "readyui-react";\n```\n\n## Variants\n\n| Variant | Description |\n|---------|-------------|\n| `minimal` | Clean compact toast with colored left border |\n| `modern` | Rich card with gradient accent bar and progress timer |\n| `alert` | Prominent alert card with backdrop support, centerable |',
      },
    },
    layout: "fullscreen",
  },
};

/* ─── Trigger helper ─── */
const ToastTrigger = ({ type = "success", title, message, withAction }) => {
  const { addToast } = useToast();
  const colors = {
    success: "bg-emerald-600 hover:bg-emerald-700",
    error: "bg-red-600 hover:bg-red-700",
    warning: "bg-amber-600 hover:bg-amber-700",
    info: "bg-blue-600 hover:bg-blue-700",
  };
  return (
    <button
      onClick={() =>
        addToast({
          title,
          message,
          type,
          ...(withAction
            ? { action: { label: "Undo", onClick: () => {} } }
            : {}),
        })
      }
      className={`px-4 py-2 text-white rounded-lg transition-colors font-medium text-sm cursor-pointer ${colors[type]}`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
};

/* ─── All-types trigger panel ─── */
const AllTypesPanel = ({ withAction = false }) => (
  <div className="p-8 space-y-4">
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
      Click a button to fire a toast:
    </p>
    <div className="flex flex-wrap gap-3">
      <ToastTrigger
        type="success"
        title="Changes saved"
        message="Your profile has been updated successfully."
        withAction={withAction}
      />
      <ToastTrigger
        type="error"
        title="Upload failed"
        message="The file couldn't be uploaded. Please try again."
        withAction={withAction}
      />
      <ToastTrigger
        type="warning"
        title="Storage almost full"
        message="You've used 90% of your storage quota."
        withAction={withAction}
      />
      <ToastTrigger
        type="info"
        title="New update available"
        message="Version 2.4.0 is ready to install."
        withAction={withAction}
      />
    </div>
  </div>
);

/* ════════════════════════════════════════════════
   STORY: Minimal Variant (default)
   ════════════════════════════════════════════════ */
export const Minimal = {
  render: (args) => (
    <ToastProvider {...args}>
      <AllTypesPanel />
    </ToastProvider>
  ),
  args: {
    variant: "minimal",
    position: "top-right",
    maxToasts: 5,
    defaultDuration: 4000,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider variant="minimal" position="top-right">
  <App />
</ToastProvider>

// Inside a child:
const { addToast } = useToast();
addToast({ title: "Saved!", message: "Your changes were saved.", type: "success" });`,
      },
    },
  },
};

/* ════════════════════════════════════════════════
   STORY: Modern Variant — progress bar + gradient
   ════════════════════════════════════════════════ */
export const Modern = {
  render: (args) => (
    <ToastProvider {...args}>
      <AllTypesPanel />
    </ToastProvider>
  ),
  args: {
    variant: "modern",
    position: "top-right",
    maxToasts: 5,
    defaultDuration: 5000,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider variant="modern" position="top-right" defaultDuration={5000}>
  <App />
</ToastProvider>`,
      },
    },
  },
};

/* ════════════════════════════════════════════════
   STORY: Modern with Actions
   ════════════════════════════════════════════════ */
export const ModernWithActions = {
  render: (args) => (
    <ToastProvider {...args}>
      <AllTypesPanel withAction />
    </ToastProvider>
  ),
  args: {
    variant: "modern",
    position: "top-right",
    maxToasts: 5,
    defaultDuration: 8000,
  },
  parameters: {
    docs: {
      source: {
        code: `addToast({
  title: "File deleted",
  message: "report.pdf was removed.",
  type: "error",
  action: { label: "Undo", onClick: () => restoreFile() },
});`,
      },
    },
  },
};

/* ════════════════════════════════════════════════
   STORY: Alert Variant — prominent card
   ════════════════════════════════════════════════ */
export const Alert = {
  render: (args) => (
    <ToastProvider {...args}>
      <AllTypesPanel />
    </ToastProvider>
  ),
  args: {
    variant: "alert",
    position: "top-center",
    maxToasts: 3,
    defaultDuration: 6000,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider variant="alert" position="top-center">
  <App />
</ToastProvider>`,
      },
    },
  },
};

/* ════════════════════════════════════════════════
   STORY: Alert Center with Backdrop (modal-like)
   ════════════════════════════════════════════════ */
export const AlertCenterBackdrop = {
  render: (args) => (
    <ToastProvider {...args}>
      <AllTypesPanel withAction />
    </ToastProvider>
  ),
  args: {
    variant: "alert",
    position: "center",
    maxToasts: 1,
    defaultDuration: 0,
    backdrop: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider variant="alert" position="center" backdrop defaultDuration={0} maxToasts={1}>
  <App />
</ToastProvider>

// Shows a single modal-like alert in the center of the screen
addToast({
  title: "Are you sure?",
  message: "This action cannot be undone.",
  type: "warning",
  action: { label: "Confirm", onClick: () => handleConfirm() },
});`,
      },
    },
  },
};

/* ════════════════════════════════════════════════
   STORY: Bottom Center — Modern
   ════════════════════════════════════════════════ */
export const BottomCenter = {
  render: (args) => (
    <ToastProvider {...args}>
      <div className="p-8">
        <ToastTrigger
          type="info"
          title="Notification"
          message="Toast appears at the bottom center."
        />
      </div>
    </ToastProvider>
  ),
  args: {
    variant: "modern",
    position: "bottom-center",
    maxToasts: 3,
    defaultDuration: 3000,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider variant="modern" position="bottom-center" />`,
      },
    },
  },
};

/* ════════════════════════════════════════════════
   STORY: Persistent (no auto-dismiss)
   ════════════════════════════════════════════════ */
export const Persistent = {
  render: (args) => (
    <ToastProvider {...args}>
      <div className="p-8">
        <ToastTrigger
          type="warning"
          title="Persistent Toast"
          message="This toast won't auto-dismiss. Close it manually."
        />
      </div>
    </ToastProvider>
  ),
  args: {
    variant: "modern",
    position: "top-right",
    maxToasts: 5,
    defaultDuration: 0,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider variant="modern" defaultDuration={0}>
  {/* Toasts stay until manually dismissed */}
</ToastProvider>`,
      },
    },
  },
};
