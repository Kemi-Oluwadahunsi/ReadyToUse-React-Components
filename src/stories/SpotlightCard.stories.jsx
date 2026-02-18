import { SpotlightCard } from "../components/SpotlightCard";
import { Zap, Shield, Layers } from "lucide-react";

export default {
  title: "Utilities/SpotlightCard",
  component: SpotlightCard,
  tags: ["autodocs"],
  argTypes: {
    spotlightColor: {
      control: "text",
      description: "Spotlight glow color (CSS rgba)",
    },
    spotlightSize: {
      control: { type: "range", min: 100, max: 600, step: 50 },
      description: "Glow radius in pixels",
    },
    borderGlow: {
      control: "boolean",
      description: "Apply glow to the card border",
    },
    borderColor: {
      control: "text",
      description: "Border glow color (CSS rgba)",
    },
    tilt: {
      control: "boolean",
      description: "Enable 3D tilt effect on hover",
    },
    maxTilt: {
      control: { type: "range", min: 1, max: 20, step: 1 },
      description: "Maximum tilt angle in degrees",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8" style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    spotlightColor: "rgba(59,130,246,0.15)",
    spotlightSize: 300,
    borderGlow: true,
    tilt: false,
  },
  render: (args) => (
    <SpotlightCard {...args}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Built with performance in mind. Every component is optimized for speed and minimal re-renders.
        </p>
      </div>
    </SpotlightCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SpotlightCard>
  <div className="p-6">
    <h3>Lightning Fast</h3>
    <p>Built with performance in mind.</p>
  </div>
</SpotlightCard>`,
      },
    },
  },
};

export const WithTilt = {
  args: {
    spotlightColor: "rgba(168,85,247,0.15)",
    borderColor: "rgba(168,85,247,0.3)",
    spotlightSize: 350,
    borderGlow: true,
    tilt: true,
    maxTilt: 10,
  },
  render: (args) => (
    <SpotlightCard {...args}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3D Tilt Effect</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Move your mouse over this card to see the 3D tilt effect combined with the spotlight glow.
        </p>
      </div>
    </SpotlightCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SpotlightCard
  spotlightColor="rgba(168,85,247,0.15)"
  borderColor="rgba(168,85,247,0.3)"
  tilt
  maxTilt={10}
>
  <div className="p-6">
    <h3>3D Tilt Effect</h3>
    <p>Move your mouse to see the tilt.</p>
  </div>
</SpotlightCard>`,
      },
    },
  },
};

export const CardGrid = {
  render: () => {
    const cards = [
      { icon: Zap, title: "Fast", desc: "Optimized for speed", color: "blue" },
      { icon: Shield, title: "Secure", desc: "Built-in best practices", color: "green" },
      { icon: Layers, title: "Composable", desc: "Mix and match components", color: "purple" },
    ];
    const colors = {
      blue: { spot: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.3)", bg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
      green: { spot: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)", bg: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
      purple: { spot: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.3)", bg: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
    };
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ maxWidth: 900 }}>
        {cards.map(({ icon: Icon, title, desc, color }) => (
          <SpotlightCard
            key={title}
            spotlightColor={colors[color].spot}
            borderColor={colors[color].border}
          >
            <div className="p-6">
              <div className={`p-2 rounded-lg inline-flex mb-3 ${colors[color].bg}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<div className="grid grid-cols-3 gap-4">
  <SpotlightCard spotlightColor="rgba(59,130,246,0.15)">
    <div className="p-6"><h3>Fast</h3></div>
  </SpotlightCard>
  <SpotlightCard spotlightColor="rgba(34,197,94,0.15)">
    <div className="p-6"><h3>Secure</h3></div>
  </SpotlightCard>
  <SpotlightCard spotlightColor="rgba(168,85,247,0.15)">
    <div className="p-6"><h3>Composable</h3></div>
  </SpotlightCard>
</div>`,
      },
    },
  },
};
