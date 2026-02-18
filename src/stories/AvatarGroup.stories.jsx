import { AvatarGroup } from "../components/AvatarGroup";

const sampleAvatars = [
  { name: "Alice Johnson", src: "https://i.pravatar.cc/150?u=alice", status: "online" },
  { name: "Bob Smith", src: "https://i.pravatar.cc/150?u=bob", status: "online" },
  { name: "Carol Lee", src: "https://i.pravatar.cc/150?u=carol", status: "busy" },
  { name: "Dan Brown", src: "https://i.pravatar.cc/150?u=dan", status: "away" },
  { name: "Eva Garcia", src: "https://i.pravatar.cc/150?u=eva", status: "offline" },
  { name: "Frank Miller", src: "https://i.pravatar.cc/150?u=frank", status: "online" },
  { name: "Grace Kim", src: "https://i.pravatar.cc/150?u=grace", status: "online" },
  { name: "Hank Wilson", src: "https://i.pravatar.cc/150?u=hank", status: "away" },
];

const initialsOnly = [
  { name: "Alice Johnson", status: "online" },
  { name: "Bob Smith", status: "busy" },
  { name: "Carol Lee", status: "online" },
  { name: "Dan Brown", status: "away" },
  { name: "Eva Garcia", status: "offline" },
  { name: "Frank Miller" },
];

export default {
  title: "Data Display/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  argTypes: {
    max: { control: { type: "number", min: 1, max: 10 } },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: { type: "select" },
      options: ["stack", "grid"],
    },
    bordered: { control: "boolean" },
  },
};

export const Default = {
  args: {
    avatars: sampleAvatars,
    max: 5,
    size: "md",
    variant: "stack",
  },
  parameters: {
    docs: {
      source: {
        code: `<AvatarGroup
  avatars={[
    { name: "Alice Johnson", src: "https://i.pravatar.cc/150?u=alice", status: "online" },
    { name: "Bob Smith", src: "https://i.pravatar.cc/150?u=bob", status: "online" },
    { name: "Carol Lee", src: "https://i.pravatar.cc/150?u=carol", status: "busy" },
    { name: "Dan Brown", src: "https://i.pravatar.cc/150?u=dan", status: "away" },
    { name: "Eva Garcia", src: "https://i.pravatar.cc/150?u=eva", status: "offline" },
    { name: "Frank Miller", src: "https://i.pravatar.cc/150?u=frank", status: "online" },
  ]}
  max={5}
/>`,
      },
    },
  },
};

export const GridVariant = {
  args: {
    avatars: sampleAvatars,
    max: 6,
    size: "lg",
    variant: "grid",
  },
  parameters: {
    docs: {
      source: {
        code: `<AvatarGroup avatars={avatars} variant="grid" size="lg" max={6} />`,
      },
    },
  },
};

export const InitialsOnly = {
  args: {
    avatars: initialsOnly,
    max: 4,
    size: "md",
    variant: "stack",
  },
  parameters: {
    docs: {
      source: {
        code: `<AvatarGroup
  avatars={[
    { name: "Alice Johnson", status: "online" },
    { name: "Bob Smith", status: "busy" },
    { name: "Carol Lee", status: "online" },
  ]}
  max={4}
/>`,
      },
    },
  },
};

export const AllSizes = {
  render: () => (
    <div className="space-y-6">
      {["xs", "sm", "md", "lg", "xl"].map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 w-8">{size}</span>
          <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size={size} max={4} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AvatarGroup avatars={avatars} size="xs" />
<AvatarGroup avatars={avatars} size="sm" />
<AvatarGroup avatars={avatars} size="md" />
<AvatarGroup avatars={avatars} size="lg" />
<AvatarGroup avatars={avatars} size="xl" />`,
      },
    },
  },
};
