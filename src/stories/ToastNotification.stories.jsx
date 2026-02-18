import { ToastProvider, useToast } from "../components/ToastNotification";

export default {
  title: "Feedback/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-right",
        "top-left",
        "top-center",
        "bottom-right",
        "bottom-left",
        "bottom-center",
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
  },
  parameters: { layout: "fullscreen" },
};

/* Helper component that uses the toast hook */
const ToastTrigger = ({ type = "success", title, message }) => {
  const { addToast } = useToast();
  const colors = {
    success: "bg-emerald-600 hover:bg-emerald-700",
    error: "bg-red-600 hover:bg-red-700",
    warning: "bg-amber-600 hover:bg-amber-700",
    info: "bg-blue-600 hover:bg-blue-700",
  };
  return (
    <button
      onClick={() => addToast({ title, message, type })}
      className={`px-4 py-2 text-white rounded-lg transition-colors font-medium text-sm ${colors[type]}`}
    >
      Show {type} toast
    </button>
  );
};

/* ── Default ── */
export const Default = {
  render: (args) => (
    <ToastProvider {...args}>
      <div className="p-8 flex flex-wrap gap-3">
        <ToastTrigger type="success" title="Saved!" message="Your changes have been saved." />
        <ToastTrigger type="error" title="Error" message="Something went wrong." />
        <ToastTrigger type="warning" title="Warning" message="This action cannot be undone." />
        <ToastTrigger type="info" title="Info" message="A new version is available." />
      </div>
    </ToastProvider>
  ),
  args: {
    position: "top-right",
    maxToasts: 5,
    defaultDuration: 4000,
  },
  parameters: {
    docs: {
      source: {
        code: `
<ToastProvider position="top-right" maxToasts={5}>
  <App />
</ToastProvider>

// Inside a child component:
const { addToast } = useToast();
addToast({ title: "Saved!", message: "Your changes have been saved.", type: "success" });
`,
      },
    },
  },
};

/* ── Bottom-Center Position ── */
export const BottomCenter = {
  render: (args) => (
    <ToastProvider {...args}>
      <div className="p-8 flex flex-wrap gap-3">
        <ToastTrigger type="info" title="Notification" message="Toast appears at the bottom center." />
      </div>
    </ToastProvider>
  ),
  args: {
    position: "bottom-center",
    maxToasts: 3,
    defaultDuration: 3000,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider position="bottom-center" maxToasts={3} defaultDuration={3000}>
  <App />
</ToastProvider>`,
      },
    },
  },
};

/* ── Persistent Toast (no auto-dismiss) ── */
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
    position: "top-right",
    maxToasts: 5,
    defaultDuration: 0,
  },
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider defaultDuration={0}>
  {/* Toasts stay until dismissed manually */}
</ToastProvider>`,
      },
    },
  },
};

/* ── With Action Button ── */
const ActionTrigger = () => {
  const { addToast } = useToast();
  return (
    <button
      onClick={() =>
        addToast({
          title: "File deleted",
          message: "report_q4.pdf was removed.",
          type: "error",
          action: { label: "Undo", onClick: () => alert("Undo clicked!") },
        })
      }
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
    >
      Delete file (with undo)
    </button>
  );
};

export const WithAction = {
  render: (args) => (
    <ToastProvider {...args}>
      <div className="p-8">
        <ActionTrigger />
      </div>
    </ToastProvider>
  ),
  args: {
    position: "top-right",
    maxToasts: 5,
    defaultDuration: 6000,
  },
  parameters: {
    docs: {
      source: {
        code: `addToast({
  title: "File deleted",
  message: "report_q4.pdf was removed.",
  type: "error",
  action: { label: "Undo", onClick: () => undoDelete() },
});`,
      },
    },
  },
};
