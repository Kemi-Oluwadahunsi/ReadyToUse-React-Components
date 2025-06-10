import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Plus,
  MoreHorizontal,
  User,
  Calendar,
  Flag,
} from "lucide-react";

// Sample data
const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      color: "bg-gray-100 dark:bg-zinc-800",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      color: "bg-blue-50 dark:bg-blue-900/20",
      taskIds: ["task-4", "task-5"],
    },
    done: {
      id: "done",
      title: "Done",
      color: "bg-green-50 dark:bg-green-900/20",
      taskIds: ["task-6"],
    },
  },
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Design new landing page",
      description: "Create wireframes and mockups for the new homepage",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2024-01-15",
      tags: ["Design", "UI/UX"],
    },
    "task-2": {
      id: "task-2",
      title: "Set up authentication",
      description: "Implement user login and registration system",
      priority: "medium",
      assignee: "Jane Smith",
      dueDate: "2024-01-20",
      tags: ["Backend", "Security"],
    },
    "task-3": {
      id: "task-3",
      title: "Write documentation",
      description: "Document API endpoints and usage examples",
      priority: "low",
      assignee: "Mike Johnson",
      dueDate: "2024-01-25",
      tags: ["Documentation"],
    },
    "task-4": {
      id: "task-4",
      title: "Implement search feature",
      description: "Add global search functionality with filters",
      priority: "high",
      assignee: "Sarah Wilson",
      dueDate: "2024-01-18",
      tags: ["Frontend", "Search"],
    },
    "task-5": {
      id: "task-5",
      title: "Database optimization",
      description: "Optimize queries and add proper indexing",
      priority: "medium",
      assignee: "Tom Brown",
      dueDate: "2024-01-22",
      tags: ["Database", "Performance"],
    },
    "task-6": {
      id: "task-6",
      title: "Deploy to production",
      description: "Set up CI/CD pipeline and deploy application",
      priority: "high",
      assignee: "Alex Davis",
      dueDate: "2024-01-10",
      tags: ["DevOps", "Deployment"],
    },
  },
  columnOrder: ["todo", "inprogress", "done"],
};

// Task Card Component
function TaskCard({ task, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: "border-l-red-500 bg-red-50 dark:bg-red-900/10",
    medium: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10",
    low: "border-l-green-500 bg-green-50 dark:bg-green-900/10",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 border-l-4 p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
        priorityColors[task.priority]
      } ${isDragging ? "opacity-50 rotate-2 scale-105" : ""}`}
      {...attributes}
      {...listeners}
    >
      {/* Task header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
          {task.title}
        </h3>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Task description */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Task footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <User className="h-3 w-3" />
            <span>{task.assignee}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Priority indicator */}
      <div className="flex items-center gap-1 mt-2">
        <Flag
          className={`h-3 w-3 ${
            task.priority === "high"
              ? "text-red-500"
              : task.priority === "medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        />
        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {task.priority} priority
        </span>
      </div>

      {/* Drag handle */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}

// Column Component
function Column({ column, tasks }) {
  const { setNodeRef } = useSortable({
    id: column.id,
  });

  return (
    <div className={`${column.color} rounded-lg p-4 min-h-[500px]`}>
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {column.title}
          </h2>
          <span className="bg-gray-200 dark:bg-zinc-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Tasks list */}
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-3 min-h-[400px]">
          {tasks.map((task) => (
            <div key={task.id} className="group">
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </SortableContext>

      {/* Add task button */}
      <button className="w-full mt-3 p-3 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-zinc-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm">
        + Add a task
      </button>
    </div>
  );
}

// Main Kanban Board Component
const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Helper function to find which container a task belongs to
  const findContainer = (id) => {
    if (id in data.columns) {
      return id;
    }
    return Object.keys(data.columns).find((key) =>
      data.columns[key].taskIds.includes(id)
    );
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setData((prev) => {
      const activeItems = prev.columns[activeContainer].taskIds;
      const overItems = prev.columns[overContainer].taskIds;

      // Find the indexes for the items
      // const activeIndex = activeItems.indexOf(activeId);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev.columns) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem = over && overIndex < overItems.length - 1;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [activeContainer]: {
            ...prev.columns[activeContainer],
            taskIds: activeItems.filter((item) => item !== activeId),
          },
          [overContainer]: {
            ...prev.columns[overContainer],
            taskIds: [
              ...overItems.slice(0, newIndex),
              activeId,
              ...overItems.slice(newIndex),
            ],
          },
        },
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    if (activeContainer === overContainer) {
      const activeIndex =
        data.columns[activeContainer].taskIds.indexOf(activeId);
      const overIndex = data.columns[overContainer].taskIds.indexOf(overId);

      if (activeIndex !== overIndex) {
        setData((prev) => ({
          ...prev,
          columns: {
            ...prev.columns,
            [overContainer]: {
              ...prev.columns[overContainer],
              taskIds: arrayMove(
                prev.columns[overContainer].taskIds,
                activeIndex,
                overIndex
              ),
            },
          },
        }));
      }
    }

    setActiveId(null);
  };

  const activeTask = activeId ? data.tasks[activeId] : null;

  return (
    <div className="p-6 bg-gray-50 dark:bg-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Project Board
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Drag and drop tasks between columns to update their status
          </p>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="rotate-2 scale-105">
                <TaskCard task={activeTask} isDragging />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
