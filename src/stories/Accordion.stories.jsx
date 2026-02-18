import { Accordion } from "../components/Accordion";

const sampleItems = [
  {
    id: "1",
    title: "What is ReadyUI?",
    content:
      "ReadyUI is a collection of beautifully crafted, ready-to-use React components built with Tailwind CSS. Drop them into any project and ship faster.",
  },
  {
    id: "2",
    title: "Is it free to use?",
    content:
      "Yes! ReadyUI is completely free and open-source. You can use it in personal and commercial projects without any restrictions.",
  },
  {
    id: "3",
    title: "How do I install it?",
    content:
      "Simply copy the component files into your project or install the package via npm. Each component is self-contained with zero external dependencies beyond React and Tailwind CSS.",
  },
  {
    id: "4",
    title: "Can I customize the styles?",
    content:
      "Absolutely. Every component accepts a className prop and is built with Tailwind utility classes, making customization straightforward.",
  },
];

const richItems = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300">Follow these steps to get up and running:</p>
        <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
          <li>Install the package</li>
          <li>Import the component</li>
          <li>Pass your data as props</li>
        </ol>
      </div>
    ),
  },
  {
    id: "advanced",
    title: "Advanced Usage",
    content: (
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300">
          You can nest any JSX inside accordion content, including forms, images, and other components.
        </p>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
          💡 Tip: Use the <code className="font-mono">allowMultiple</code> prop to let users expand several panels at once.
        </div>
      </div>
    ),
  },
  {
    id: "api",
    title: "API Reference",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead>
            <tr className="border-b dark:border-zinc-700">
              <th className="py-2 pr-4 font-medium">Prop</th>
              <th className="py-2 pr-4 font-medium">Type</th>
              <th className="py-2 font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-zinc-700">
              <td className="py-2 pr-4">items</td>
              <td className="py-2 pr-4">Array</td>
              <td className="py-2">[]</td>
            </tr>
            <tr className="border-b dark:border-zinc-700">
              <td className="py-2 pr-4">allowMultiple</td>
              <td className="py-2 pr-4">boolean</td>
              <td className="py-2">false</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">variant</td>
              <td className="py-2 pr-4">string</td>
              <td className="py-2">"default"</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
];

export default {
  title: "Layout/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { Accordion } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Sizing variant",
    },
    allowMultiple: {
      control: "boolean",
      description: "Allow multiple panels open simultaneously",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Chevron icon placement",
    },
    onToggle: { action: "toggled" },
  },
};

/* ── Default ── */
export const Default = {
  args: {
    items: sampleItems,
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion
  items={[
    { id: "1", title: "What is ReadyUI?", content: "ReadyUI is a collection of..." },
    { id: "2", title: "Is it free to use?", content: "Yes! ReadyUI is completely free..." },
    { id: "3", title: "How do I install it?", content: "Simply copy the component files..." },
  ]}
/>`,
      },
    },
  },
};

/* ── Allow Multiple ── */
export const AllowMultiple = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    defaultOpen: ["1", "3"],
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion
  items={items}
  allowMultiple
  defaultOpen={["1", "3"]}
/>`,
      },
    },
  },
};

/* ── Bordered Variant ── */
export const Bordered = {
  args: {
    items: sampleItems,
    variant: "bordered",
    size: "sm",
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion items={items} variant="bordered" size="sm" />`,
      },
    },
  },
};

/* ── Separated Variant ── */
export const Separated = {
  args: {
    items: sampleItems,
    variant: "separated",
    size: "lg",
    iconPosition: "left",
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion items={items} variant="separated" size="lg" iconPosition="left" />`,
      },
    },
  },
};

/* ── Rich Content (JSX inside panels) ── */
export const RichContent = {
  args: {
    items: richItems,
    allowMultiple: true,
    defaultOpen: ["getting-started"],
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion
  items={[
    { id: "getting-started", title: "Getting Started", content: <StepList /> },
    { id: "advanced", title: "Advanced Usage", content: <Tips /> },
    { id: "api", title: "API Reference", content: <PropsTable /> },
  ]}
  allowMultiple
  defaultOpen={["getting-started"]}
/>`,
      },
    },
  },
};
