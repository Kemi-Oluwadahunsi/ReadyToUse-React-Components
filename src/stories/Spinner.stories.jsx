import { Spinner } from "../components/Spinner";

export default {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "ring",
        "dots",
        "bars",
        "orbit",
        "pulse",
        "dual-ring",
        "ripple",
        "square-spin",
        "gradient",
      ],
      description: "Spinner animation style",
    },
    size: {
      control: { type: "number", min: 16, max: 120 },
      description: "Size in px",
    },
    color: { control: "color", description: "Spinner color" },
    speed: {
      control: { type: "number", min: 0.2, max: 3, step: 0.1 },
      description: "Animation duration in seconds",
    },
    label: { control: "text", description: "Accessible label" },
    overlay: { control: "boolean", description: "Show full-screen overlay" },
  },
};

/* ── Default ── */
export const Default = {
  args: {
    variant: "ring",
    size: 32,
    color: "#3b82f6",
    speed: 1,
  },
  parameters: {
    docs: {
      source: {
        code: `<Spinner variant="ring" size={32} color="#3b82f6" />`,
      },
    },
  },
};

/* ── All Variants ── */
export const AllVariants = {
  render: () => {
    const variants = [
      "ring",
      "dots",
      "bars",
      "orbit",
      "pulse",
      "dual-ring",
      "ripple",
      "square-spin",
      "gradient",
    ];
    return (
      <div className="p-8 flex flex-wrap gap-10 items-end">
        {variants.map((v) => (
          <div key={v} className="flex flex-col items-center gap-2">
            <Spinner variant={v} size={36} color="#3b82f6" />
            <span className="text-xs text-gray-500 font-mono">{v}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Spinner variant="ring" />
<Spinner variant="dots" />
<Spinner variant="bars" />
<Spinner variant="orbit" />
<Spinner variant="pulse" />
<Spinner variant="dual-ring" />
<Spinner variant="ripple" />
<Spinner variant="square-spin" />
<Spinner variant="gradient" />`,
      },
    },
  },
};

/* ── Different Sizes ── */
export const Sizes = {
  render: () => (
    <div className="p-8 flex items-center gap-8">
      {[16, 24, 32, 48, 64].map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Spinner variant="ring" size={s} color="#6366f1" />
          <span className="text-xs text-gray-500">{s}px</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Spinner size={16} />
<Spinner size={24} />
<Spinner size={32} />
<Spinner size={48} />
<Spinner size={64} />`,
      },
    },
  },
};

/* ── With Overlay ── */
export const WithOverlay = {
  args: {
    variant: "dual-ring",
    size: 48,
    color: "#fff",
    overlay: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Spinner variant="dual-ring" size={48} color="#fff" overlay />`,
      },
    },
  },
};
