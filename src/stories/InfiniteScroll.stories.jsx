import { useState, useCallback } from "react";
import { InfiniteScroll } from "../components/InfiniteScroll";

const generateItems = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `Item ${start + i}`,
    description: `This is the description for item number ${start + i}.`,
  }));

const DefaultRender = (args) => {
  const [items, setItems] = useState(generateItems(1, 20));
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setItems((prev) => {
      const next = [...prev, ...generateItems(prev.length + 1, 20)];
      if (next.length >= 100) setHasMore(false);
      return next;
    });
  }, []);

  return (
    <InfiniteScroll
      {...args}
      items={items}
      hasMore={hasMore}
      loadMore={loadMore}
      renderItem={(item) => (
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-zinc-700/50">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {item.id}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
          </div>
        </div>
      )}
    />
  );
};

export default {
  title: "Data Display/InfiniteScroll",
  component: InfiniteScroll,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { InfiniteScroll } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    threshold: { control: { type: "number", min: 50, max: 500 } },
    showScrollTop: { control: "boolean" },
    skeletonCount: { control: { type: "number", min: 1, max: 10 } },
  },
};

export const Default = {
  render: DefaultRender,
  args: {
    threshold: 200,
    showScrollTop: true,
    skeletonCount: 3,
  },
  parameters: {
    docs: {
      source: {
        code: `const [items, setItems] = useState(initialItems);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  const newItems = await fetchMoreItems();
  setItems(prev => [...prev, ...newItems]);
  if (items.length >= 100) setHasMore(false);
};

<InfiniteScroll
  items={items}
  hasMore={hasMore}
  loadMore={loadMore}
  renderItem={(item) => <div>{item.title}</div>}
/>`,
      },
    },
  },
};

export const FixedHeight = {
  render: (args) => {
    const [items, setItems] = useState(generateItems(1, 20));
    const [hasMore, setHasMore] = useState(true);

    const loadMore = useCallback(async () => {
      await new Promise((r) => setTimeout(r, 800));
      setItems((prev) => {
        const next = [...prev, ...generateItems(prev.length + 1, 15)];
        if (next.length >= 80) setHasMore(false);
        return next;
      });
    }, []);

    return (
      <InfiniteScroll
        {...args}
        items={items}
        hasMore={hasMore}
        loadMore={loadMore}
        height={400}
        renderItem={(item) => (
          <div className="p-3 border-b border-gray-100 dark:border-zinc-700/50">
            <p className="text-sm text-gray-900 dark:text-white">{item.title}</p>
          </div>
        )}
      />
    );
  },
  args: {
    threshold: 150,
    showScrollTop: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<InfiniteScroll
  items={items}
  hasMore={hasMore}
  loadMore={loadMore}
  height={400}
  renderItem={(item) => <div>{item.title}</div>}
/>`,
      },
    },
  },
};

export const CustomEndMessage = {
  render: (args) => {
    const [items, setItems] = useState(generateItems(1, 15));
    const [hasMore, setHasMore] = useState(true);

    const loadMore = useCallback(async () => {
      await new Promise((r) => setTimeout(r, 600));
      setItems((prev) => {
        const next = [...prev, ...generateItems(prev.length + 1, 15)];
        if (next.length >= 30) setHasMore(false);
        return next;
      });
    }, []);

    return (
      <InfiniteScroll
        {...args}
        items={items}
        hasMore={hasMore}
        loadMore={loadMore}
        endMessage={<p className="text-center py-4 text-green-600 font-medium">🎉 You've seen it all!</p>}
        renderItem={(item) => (
          <div className="p-3 border-b border-gray-100 dark:border-zinc-700/50">
            <p className="text-sm text-gray-900 dark:text-white">{item.title}</p>
          </div>
        )}
      />
    );
  },
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<InfiniteScroll
  items={items}
  hasMore={hasMore}
  loadMore={loadMore}
  endMessage={<p>🎉 You've seen it all!</p>}
  renderItem={(item) => <div>{item.title}</div>}
/>`,
      },
    },
  },
};
