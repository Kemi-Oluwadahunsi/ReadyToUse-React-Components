import { AnimatedCounter } from "../components/AnimatedCounter";

export default {
  title: "Data Display/AnimatedCounter",
  component: AnimatedCounter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📥 Import\n\n```jsx\nimport { AnimatedCounter } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    end: { control: { type: "number" } },
    start: { control: { type: "number" } },
    duration: { control: { type: "number", min: 500, max: 5000, step: 100 } },
    easing: {
      control: { type: "select" },
      options: ["linear", "easeOut", "easeInOut", "spring"],
    },
    prefix: { control: "text" },
    suffix: { control: "text" },
    decimals: { control: { type: "number", min: 0, max: 4 } },
    separator: { control: "text" },
    triggerOnView: { control: "boolean" },
    delay: { control: { type: "number", min: 0, max: 3000, step: 100 } },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export const Default = {
  args: {
    end: 12345,
    duration: 2000,
    easing: "easeOut",
    size: "lg",
    className: "text-gray-900 dark:text-white",
  },
  parameters: {
    docs: {
      source: {
        code: `<AnimatedCounter end={12345} duration={2000} size="lg" />`,
      },
    },
  },
};

export const Currency = {
  args: {
    end: 49999,
    prefix: "$",
    duration: 2500,
    easing: "easeInOut",
    size: "xl",
    className: "text-green-600",
  },
  parameters: {
    docs: {
      source: {
        code: `<AnimatedCounter end={49999} prefix="$" duration={2500} easing="easeInOut" size="xl" />`,
      },
    },
  },
};

export const Percentage = {
  args: {
    end: 97.5,
    suffix: "%",
    decimals: 1,
    duration: 1500,
    easing: "spring",
    size: "lg",
    className: "text-blue-600",
  },
  parameters: {
    docs: {
      source: {
        code: `<AnimatedCounter end={97.5} suffix="%" decimals={1} easing="spring" size="lg" />`,
      },
    },
  },
};

export const MultipleCounters = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800 text-center space-y-1.5 sm:space-y-2">
        <AnimatedCounter
          end={1200}
          suffix="+"
          duration={2000}
          size="lg"
          className="text-blue-600"
        />
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Happy Customers</p>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800 text-center space-y-1.5 sm:space-y-2">
        <AnimatedCounter
          end={99.9}
          suffix="%"
          decimals={1}
          duration={2500}
          delay={300}
          size="lg"
          className="text-green-600"
        />
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Uptime</p>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800 text-center space-y-1.5 sm:space-y-2">
        <AnimatedCounter
          end={50}
          prefix="$"
          suffix="M"
          duration={3000}
          delay={600}
          size="lg"
          className="text-purple-600"
        />
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Revenue</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
  <AnimatedCounter end={1200} suffix="+" size="lg" />
  <AnimatedCounter end={99.9} suffix="%" decimals={1} delay={300} size="lg" />
  <AnimatedCounter end={50} prefix="$" suffix="M" delay={600} size="lg" />
</div>`,
      },
    },
  },
};
