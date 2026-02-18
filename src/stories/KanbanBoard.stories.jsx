import { useState } from "react";
import { KanbanBoard } from "../components/KanbanBoard";

const defaultData = {
  columnOrder: ["todo", "in-progress", "done"],
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      color: "bg-gray-50 dark:bg-zinc-800/50",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      color: "bg-blue-50/50 dark:bg-blue-900/10",
      taskIds: ["task-5", "task-6"],
    },
    done: {
      id: "done",
      title: "Done",
      color: "bg-green-50/50 dark:bg-green-900/10",
      taskIds: ["task-7", "task-8"],
    },
  },
  tasks: {
    "task-1": { id: "task-1", title: "Set up project scaffolding", description: "Initialize the repo with Vite, React, and Tailwind CSS.", priority: "high", tags: ["setup"] },
    "task-2": { id: "task-2", title: "Design system tokens", description: "Define colors, spacing, and typography scales.", priority: "medium", tags: ["design"] },
    "task-3": { id: "task-3", title: "Write API schema", priority: "medium", tags: ["backend"] },
    "task-4": { id: "task-4", title: "Create landing page wireframe", priority: "low", tags: ["design", "frontend"] },
    "task-5": { id: "task-5", title: "Build authentication flow", description: "Implement login, register, and password reset.", priority: "high", tags: ["auth", "frontend"] },
    "task-6": { id: "task-6", title: "Dashboard layout", priority: "medium", tags: ["frontend"] },
    "task-7": { id: "task-7", title: "CI/CD pipeline", description: "GitHub Actions for build, test, and deploy.", priority: "high", tags: ["devops"] },
    "task-8": { id: "task-8", title: "README documentation", priority: "low", tags: ["docs"] },
  },
};

export default {
  title: "Data Display/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
  argTypes: {},
};

export const Default = {
  render: (args) => {
    const [data, setData] = useState(args.data);
    return <KanbanBoard {...args} data={data} onDataChange={setData} />;
  },
  args: {
    data: defaultData,
  },
  parameters: {
    docs: {
      source: {
        code: `const [data, setData] = useState({
  columnOrder: ["todo", "in-progress", "done"],
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: ["task-1", "task-2"] },
    "in-progress": { id: "in-progress", title: "In Progress", taskIds: ["task-3"] },
    done: { id: "done", title: "Done", taskIds: ["task-4"] },
  },
  tasks: {
    "task-1": { id: "task-1", title: "Set up project", priority: "high", tags: ["setup"] },
    "task-2": { id: "task-2", title: "Design tokens", priority: "medium", tags: ["design"] },
    "task-3": { id: "task-3", title: "Build auth flow", priority: "high", tags: ["auth"] },
    "task-4": { id: "task-4", title: "Write docs", priority: "low", tags: ["docs"] },
  },
});

<KanbanBoard data={data} onDataChange={setData} />`,
      },
    },
  },
};

export const WithAddTask = {
  render: (args) => {
    const [data, setData] = useState(args.data);
    const handleAddTask = (columnId) => {
      const id = `task-${Date.now()}`;
      setData((prev) => ({
        ...prev,
        tasks: { ...prev.tasks, [id]: { id, title: "New Task", priority: "low", tags: [] } },
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            taskIds: [...prev.columns[columnId].taskIds, id],
          },
        },
      }));
    };
    return <KanbanBoard {...args} data={data} onDataChange={setData} onAddTask={handleAddTask} />;
  },
  args: {
    data: defaultData,
  },
  parameters: {
    docs: {
      source: {
        code: `<KanbanBoard
  data={data}
  onDataChange={setData}
  onAddTask={(columnId) => { /* add a new task to the column */ }}
/>`,
      },
    },
  },
};

export const MinimalBoard = {
  render: (args) => {
    const [data, setData] = useState(args.data);
    return <KanbanBoard {...args} data={data} onDataChange={setData} />;
  },
  args: {
    data: {
      columnOrder: ["backlog", "active", "review"],
      columns: {
        backlog: { id: "backlog", title: "Backlog", taskIds: ["t1", "t2"] },
        active: { id: "active", title: "Active", taskIds: ["t3"] },
        review: { id: "review", title: "Review", taskIds: [] },
      },
      tasks: {
        t1: { id: "t1", title: "Research competitors", priority: "medium" },
        t2: { id: "t2", title: "User interviews", priority: "high" },
        t3: { id: "t3", title: "Prototype v1", priority: "high", tags: ["design"] },
      },
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<KanbanBoard data={minimalData} onDataChange={setData} />`,
      },
    },
  },
};
