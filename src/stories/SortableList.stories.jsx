import { useState } from "react";
import { SortableList } from "../components/SortableList";
import { File, Image, Music, Video, Archive } from "lucide-react";

export default {
  title: "Utilities/SortableList",
  component: SortableList,
  tags: ["autodocs"],
  argTypes: {
    showHandle: {
      control: "boolean",
      description: "Show drag handle on each item",
    },
    direction: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Layout direction",
    },
    disabled: {
      control: "boolean",
      description: "Disable drag-and-drop",
    },
    animationDuration: {
      control: { type: "range", min: 0, max: 500, step: 50 },
      description: "Transition duration in ms",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8" style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

const defaultItems = [
  { id: "1", label: "Introduction" },
  { id: "2", label: "Getting Started" },
  { id: "3", label: "Core Concepts" },
  { id: "4", label: "Advanced Patterns" },
  { id: "5", label: "API Reference" },
];

export const Default = {
  args: {
    showHandle: true,
    direction: "vertical",
    disabled: false,
    animationDuration: 200,
  },
  render: (args) => {
    const [items, setItems] = useState(defaultItems);
    return (
      <SortableList
        {...args}
        items={items}
        onReorder={setItems}
        renderItem={(item) => (
          <div className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
            {item.label}
          </div>
        )}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const [items, setItems] = useState([
  { id: "1", label: "Introduction" },
  { id: "2", label: "Getting Started" },
  { id: "3", label: "Core Concepts" },
  { id: "4", label: "Advanced Patterns" },
  { id: "5", label: "API Reference" },
]);

<SortableList
  items={items}
  onReorder={setItems}
  showHandle
  renderItem={(item) => (
    <div className="p-3 bg-white border rounded-lg">{item.label}</div>
  )}
/>`,
      },
    },
  },
};

const fileItems = [
  { id: "f1", name: "report.pdf", type: "file", icon: File },
  { id: "f2", name: "photo.png", type: "image", icon: Image },
  { id: "f3", name: "song.mp3", type: "music", icon: Music },
  { id: "f4", name: "demo.mp4", type: "video", icon: Video },
  { id: "f5", name: "backup.zip", type: "archive", icon: Archive },
];

export const CustomRenderItem = {
  args: {
    showHandle: true,
    direction: "vertical",
  },
  render: (args) => {
    const [items, setItems] = useState(fileItems);
    return (
      <SortableList
        {...args}
        items={items}
        onReorder={setItems}
        renderItem={(item) => {
          const Icon = item.icon;
          return (
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg">
              <Icon className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
              <span className="ml-auto text-xs text-gray-400 capitalize">{item.type}</span>
            </div>
          );
        }}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<SortableList
  items={files}
  onReorder={setFiles}
  renderItem={(item) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <FileIcon className="h-5 w-5" />
      <span>{item.name}</span>
      <span className="ml-auto text-xs">{item.type}</span>
    </div>
  )}
/>`,
      },
    },
  },
};

export const NoHandle = {
  args: {
    showHandle: false,
    direction: "vertical",
  },
  render: (args) => {
    const [items, setItems] = useState([
      { id: "p1", label: "High Priority" },
      { id: "p2", label: "Medium Priority" },
      { id: "p3", label: "Low Priority" },
    ]);
    return (
      <SortableList
        {...args}
        items={items}
        onReorder={setItems}
        renderItem={(item) => (
          <div className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 cursor-grab">
            {item.label}
          </div>
        )}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<SortableList
  items={priorities}
  onReorder={setPriorities}
  showHandle={false}
  renderItem={(item) => (
    <div className="p-3 border rounded-lg cursor-grab">{item.label}</div>
  )}
/>`,
      },
    },
  },
};

export const Horizontal = {
  args: {
    showHandle: false,
    direction: "horizontal",
  },
  render: (args) => {
    const [items, setItems] = useState([
      { id: "t1", label: "Mon" },
      { id: "t2", label: "Tue" },
      { id: "t3", label: "Wed" },
      { id: "t4", label: "Thu" },
      { id: "t5", label: "Fri" },
    ]);
    return (
      <SortableList
        {...args}
        items={items}
        onReorder={setItems}
        renderItem={(item) => (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 cursor-grab whitespace-nowrap">
            {item.label}
          </div>
        )}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<SortableList
  items={days}
  onReorder={setDays}
  direction="horizontal"
  showHandle={false}
  renderItem={(item) => (
    <div className="px-4 py-2 border rounded-lg cursor-grab">{item.label}</div>
  )}
/>`,
      },
    },
  },
};
