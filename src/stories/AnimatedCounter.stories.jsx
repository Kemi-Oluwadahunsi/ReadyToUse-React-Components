import { AnimatedCounter } from "../components/AnimatedCounter";

export default {
  title: "Data Display/AnimatedCounter",
  component: AnimatedCounter,
  tags: ["autodocs"],
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
  },
};

export const Default = {
  args: {
    end: 12345,
    duration: 2000,
    easing: "easeOut",
    className: "text-4xl font-bold text-gray-900 dark:text-white",
  },
  parameters: {
    docs: {
      source: {
        code: `<AnimatedCounter end={12345} duration={2000} />`,
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
    className: "text-5xl font-extrabold text-green-600",
  },
  parameters: {
    docs: {
      source: {
        code: `<AnimatedCounter end={49999} prefix="$" duration={2500} easing="easeInOut" />`,
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
    className: "text-4xl font-bold text-blue-600",
  },
  parameters: {
    docs: {
      source: {
        code: `<AnimatedCounter end={97.5} suffix="%" decimals={1} easing="spring" />`,
      },
    },
  },
};

export const MultipleCounters = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="text-center space-y-2">
        <AnimatedCounter
          end={1200}
          suffix="+"
          duration={2000}
          className="text-4xl font-bold text-blue-600"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">Happy Customers</p>
      </div>
      <div className="text-center space-y-2">
        <AnimatedCounter
          end={99.9}
          suffix="%"
          decimals={1}
          duration={2500}
          delay={300}
          className="text-4xl font-bold text-green-600"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">Uptime</p>
      </div>
      <div className="text-center space-y-2">
        <AnimatedCounter
          end={50}
          prefix="$"
          suffix="M"
          duration={3000}
          delay={600}
          className="text-4xl font-bold text-purple-600"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="grid grid-cols-3 gap-8">
  <AnimatedCounter end={1200} suffix="+" />
  <AnimatedCounter end={99.9} suffix="%" decimals={1} delay={300} />
  <AnimatedCounter end={50} prefix="$" suffix="M" delay={600} />
</div>`,
      },
    },
  },
};
