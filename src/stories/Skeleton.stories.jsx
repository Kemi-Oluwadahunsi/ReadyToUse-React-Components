import { Skeleton, SkeletonGroup } from "../components/Skeleton";

export default {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "text",
        "circle",
        "rect",
        "card",
        "avatar",
        "list",
        "table",
        "button",
        "banner",
        "profile",
      ],
      description: "Skeleton shape preset",
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
      description: "Animation style",
    },
    width: { control: "text", description: "CSS width" },
    height: { control: "text", description: "CSS height" },
    lines: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of text lines (text variant)",
    },
    rows: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of rows (list/table variant)",
    },
    cols: {
      control: { type: "number", min: 1, max: 8 },
      description: "Number of columns (table variant)",
    },
    loading: { control: "boolean", description: "Show skeleton or children" },
    borderRadius: { control: "number", description: "Border radius in px" },
  },
};

/* ── Default (Text Lines) ── */
export const Default = {
  args: {
    variant: "text",
    lines: 3,
    animation: "pulse",
  },
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="text" lines={3} />`,
      },
    },
  },
};

/* ── All Variants ── */
export const AllVariants = {
  render: () => (
    <div className="p-8 space-y-10 max-w-xl">
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Text</h3>
        <Skeleton variant="text" lines={3} />
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Circle</h3>
        <div className="flex gap-4">
          <Skeleton variant="circle" width={32} />
          <Skeleton variant="circle" width={48} />
          <Skeleton variant="circle" width={64} />
        </div>
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Avatar</h3>
        <Skeleton variant="avatar" />
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Card</h3>
        <Skeleton variant="card" width={300} />
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">List</h3>
        <Skeleton variant="list" rows={3} />
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Table</h3>
        <Skeleton variant="table" rows={3} cols={4} />
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Button &amp; Banner</h3>
        <div className="flex gap-4 items-start">
          <Skeleton variant="button" />
          <Skeleton variant="banner" width={300} height={120} />
        </div>
      </section>
      <section>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Profile</h3>
        <Skeleton variant="profile" width={220} />
      </section>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="text" lines={3} />
<Skeleton variant="circle" width={48} />
<Skeleton variant="avatar" />
<Skeleton variant="card" width={300} />
<Skeleton variant="list" rows={3} />
<Skeleton variant="table" rows={3} cols={4} />
<Skeleton variant="button" />
<Skeleton variant="banner" width={300} height={120} />
<Skeleton variant="profile" width={220} />`,
      },
    },
  },
};

/* ── Loading Toggle ── */
export const LoadingToggle = {
  render: (args) => (
    <div className="p-8 max-w-sm">
      <Skeleton {...args}>
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-900">Content Loaded</h2>
          <p className="text-sm text-gray-600">
            This content appears once loading is complete.
          </p>
        </div>
      </Skeleton>
    </div>
  ),
  args: {
    variant: "text",
    lines: 3,
    loading: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="text" lines={3} loading={isLoading}>
  <div>
    <h2>Content Loaded</h2>
    <p>This content appears once loading is complete.</p>
  </div>
</Skeleton>`,
      },
    },
  },
};

/* ── SkeletonGroup ── */
export const GroupUsage = {
  render: () => (
    <div className="p-8 max-w-md">
      <SkeletonGroup
        count={4}
        gap={20}
        renderItem={(i) => <Skeleton key={i} variant="avatar" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SkeletonGroup
  count={4}
  gap={20}
  renderItem={(i) => <Skeleton key={i} variant="avatar" />}
/>`,
      },
    },
  },
};
