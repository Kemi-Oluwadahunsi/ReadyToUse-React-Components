import { useState } from "react";
import { NotificationBell } from "../components/Notification-bell/NotificationBell";

const sampleNotifications = [
  {
    id: 1,
    title: "New comment on your post",
    message: "Alice replied: \"Great write-up! I learned a lot from this.\"",
    time: "2 min ago",
    read: false,
    type: "info",
    body: "Alice replied to your post \"Getting Started with React\":\n\n\"Great write-up! I learned a lot from this. Could you cover hooks in more detail next time?\"",
  },
  {
    id: 2,
    title: "Deployment successful",
    message: "v2.4.1 deployed to production.",
    time: "15 min ago",
    read: false,
    type: "success",
    body: "Your deployment of version 2.4.1 to production was successful.\n\nBuild duration: 42s\nRegion: us-east-1\nCommit: a3f9b21",
  },
  {
    id: 3,
    title: "Payment failed",
    message: "Your monthly subscription payment could not be processed.",
    time: "1 hour ago",
    read: false,
    type: "error",
    body: "We were unable to process your payment for the Pro plan ($29/mo). Please update your payment method in Settings → Billing.",
  },
  {
    id: 4,
    title: "Security alert",
    message: "A new device logged into your account from Tokyo, Japan.",
    time: "3 hours ago",
    read: true,
    type: "warning",
  },
  {
    id: 5,
    title: "Team invitation",
    message: "Bob invited you to join the Design Systems team.",
    time: "Yesterday",
    read: true,
    type: "info",
  },
  {
    id: 6,
    title: "Weekly digest",
    message: "Your weekly activity summary is ready.",
    time: "2 days ago",
    read: true,
    type: "info",
  },
];

export default {
  title: "Feedback/NotificationBell",
  component: NotificationBell,
  tags: ["autodocs"],
  argTypes: {
    maxVisible: {
      control: { type: "number", min: 1, max: 20 },
      description: "Max items before 'view all'",
    },
    emptyMessage: { control: "text" },
    bellColor: { control: "text", description: "Tailwind color classes for bell icon" },
    onRead: { action: "read" },
    onReadAll: { action: "readAll" },
    onClear: { action: "clear" },
    onDelete: { action: "delete" },
  },
  parameters: { layout: "centered" },
};

/* Stateful wrapper */
const BellTemplate = (args) => {
  const [notifications, setNotifications] = useState(args.notifications);

  return (
    <div className="p-8 flex justify-end">
      <NotificationBell
        {...args}
        notifications={notifications}
        onRead={(id) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
          args.onRead?.(id);
        }}
        onReadAll={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          args.onReadAll?.();
        }}
        onClear={() => {
          setNotifications([]);
          args.onClear?.();
        }}
        onDelete={(id) => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
          args.onDelete?.(id);
        }}
      />
    </div>
  );
};

/* ── Default ── */
export const Default = {
  render: (args) => <BellTemplate {...args} />,
  args: {
    notifications: sampleNotifications,
    maxVisible: 5,
    emptyMessage: "No new notifications",
  },
  parameters: {
    docs: {
      source: {
        code: `<NotificationBell
  notifications={[
    { id: 1, title: "New comment", message: "Alice replied...", time: "2 min ago", read: false, type: "info" },
    { id: 2, title: "Deployed", message: "v2.4.1 deployed.", time: "15 min ago", read: false, type: "success" },
  ]}
  onRead={(id) => markAsRead(id)}
  onReadAll={() => markAllRead()}
  onClear={() => clearAll()}
  onDelete={(id) => deleteNotification(id)}
/>`,
      },
    },
  },
};

/* ── Empty State ── */
export const Empty = {
  render: (args) => <BellTemplate {...args} />,
  args: {
    notifications: [],
    emptyMessage: "You're all caught up!",
  },
  parameters: {
    docs: {
      source: {
        code: `<NotificationBell
  notifications={[]}
  emptyMessage="You're all caught up!"
/>`,
      },
    },
  },
};

/* ── All Read ── */
export const AllRead = {
  render: (args) => <BellTemplate {...args} />,
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: true })),
    maxVisible: 5,
  },
  parameters: {
    docs: {
      source: {
        code: `<NotificationBell
  notifications={notifications.map(n => ({ ...n, read: true }))}
/>`,
      },
    },
  },
};

/* ── Custom Bell Color ── */
export const CustomColor = {
  render: (args) => <BellTemplate {...args} />,
  args: {
    notifications: sampleNotifications.slice(0, 3),
    bellColor: "text-blue-600 dark:text-blue-400",
    maxVisible: 5,
  },
  parameters: {
    docs: {
      source: {
        code: `<NotificationBell
  bellColor="text-blue-600 dark:text-blue-400"
  notifications={notifications}
/>`,
      },
    },
  },
};
