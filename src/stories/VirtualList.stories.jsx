import { VirtualList } from "../components/VirtualList";

const generateItems = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: `Item ${i + 1}`,
    name: [
      "Alice Johnson", "Bob Smith", "Carol Lee", "Dan Brown", "Eva Garcia",
      "Frank Miller", "Grace Kim", "Hank Wilson", "Ivy Chen", "Jake Martinez",
    ][i % 10],
    email: `user${i + 1}@example.com`,
  }));

export default {
  title: "Data Display/VirtualList",
  component: VirtualList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { VirtualList } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    itemHeight: { control: { type: "number", min: 30, max: 120 } },
    height: { control: { type: "number", min: 200, max: 800 } },
    overscan: { control: { type: "number", min: 0, max: 20 } },
    showScrollbar: { control: "boolean" },
  },
};

export const Default = {
  args: {
    items: generateItems(10000),
    itemHeight: 60,
    height: 400,
    overscan: 5,
  },
  parameters: {
    docs: {
      source: {
        code: `<VirtualList
  items={Array.from({ length: 10000 }, (_, i) => ({ id: i + 1, label: \`Item \${i + 1}\` }))}
  itemHeight={60}
  height={400}
/>`,
      },
    },
  },
};

export const CustomRenderItem = {
  args: {
    items: generateItems(5000),
    itemHeight: 72,
    height: 400,
    renderItem: (item, index, style) => (
      <div
        key={index}
        style={style}
        className="flex items-center gap-3 px-4 border-b border-gray-100 dark:border-zinc-700/50 hover:bg-blue-50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {item.name?.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.email}</p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<VirtualList
  items={items}
  itemHeight={72}
  height={400}
  renderItem={(item, index, style) => (
    <div key={index} style={style} className="flex items-center gap-3 px-4">
      <span>{item.name}</span>
    </div>
  )}
/>`,
      },
    },
  },
};

export const SmallItems = {
  args: {
    items: generateItems(50000),
    itemHeight: 36,
    height: 300,
    overscan: 10,
  },
  parameters: {
    docs: {
      source: {
        code: `<VirtualList
  items={items}
  itemHeight={36}
  height={300}
  overscan={10}
/>`,
      },
    },
  },
};
