import { useState, useCallback } from "react";
import {
  DndContext, DragOverlay, closestCorners,
  KeyboardSensor, PointerSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, MoreHorizontal, Flag } from "lucide-react";

/**
 * KanbanBoard - A drag-and-drop Kanban board component.
 */
/*
 * @param {Object} data - { columns: { [id]: { id, title, color?, taskIds } }, tasks: { [id]: { id, title, description?, priority?, tags?, ...} }, columnOrder: string[] }
 * @param {Function} onDataChange - Callback with updated data after drag: (data) => void
 * @param {Function} renderCard - Custom card renderer: (task) => JSX
 * @param {Function} onAddTask - Callback when "Add task" is clicked: (columnId) => void
 * @param {string} className - Additional CSS classes
 */

// Default Task Card
function TaskCard({ task, renderCard }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  if (renderCard) {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {renderCard(task)}
      </div>
    );
  }

  const priorityStyles = {
    high: "border-l-red-500",
    medium: "border-l-amber-500",
    low: "border-l-green-500",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 border-l-4 p-4 cursor-grab active:cursor-grabbing transition-shadow duration-200 hover:shadow-md ${
        priorityStyles[task.priority] || "border-l-gray-300"
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{task.title}</h4>
        <GripVertical className="h-4 w-4 text-gray-300 dark:text-zinc-600 flex-shrink-0" />
      </div>
      {task.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      )}
      {task.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">{tag}</span>
          ))}
        </div>
      )}
      {task.priority && (
        <div className="flex items-center gap-1.5">
          <Flag className={`h-3 w-3 ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-amber-500" : "text-green-500"}`} />
          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{task.priority}</span>
        </div>
      )}
    </div>
  );
}

// Column
function Column({ column, tasks, renderCard, onAddTask }) {
  const { setNodeRef } = useSortable({ id: column.id });

  return (
    <div className={`rounded-xl p-3 sm:p-4 min-h-[200px] sm:min-h-[400px] ${column.color || "bg-gray-50 dark:bg-zinc-800/50"}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{column.title}</h3>
          <span className="bg-gray-200 dark:bg-zinc-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        {onAddTask && (
          <button onClick={() => onAddTask(column.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-2 sm:space-y-3 min-h-[100px] sm:min-h-[300px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} renderCard={renderCard} />
          ))}
        </div>
      </SortableContext>
      {onAddTask && (
        <button
          onClick={() => onAddTask(column.id)}
          className="w-full mt-3 p-2.5 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg text-gray-400 dark:text-gray-500 hover:border-gray-400 dark:hover:border-zinc-500 hover:text-gray-500 transition-colors text-sm"
        >
          + Add task
        </button>
      )}
    </div>
  );
}

const KanbanBoard = ({
  data: initialData,
  onDataChange,
  renderCard,
  onAddTask,
  className = "",
}) => {
  // Normalize: if columns lack taskIds, derive them from tasks
  const normalize = (d) => {
    const needsFix = Object.values(d.columns).some((c) => !Array.isArray(c.taskIds));
    if (!needsFix) return d;
    const cols = { ...d.columns };
    for (const key of Object.keys(cols)) {
      cols[key] = { ...cols[key], taskIds: cols[key].taskIds || [] };
    }
    for (const [tid, task] of Object.entries(d.tasks || {})) {
      if (task.column && cols[task.column] && !cols[task.column].taskIds.includes(tid)) {
        cols[task.column] = { ...cols[task.column], taskIds: [...cols[task.column].taskIds, tid] };
      }
    }
    return { ...d, columns: cols };
  };

  const [data, setData] = useState(() => normalize(initialData));
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findContainer = useCallback((id) => {
    if (id in data.columns) return id;
    return Object.keys(data.columns).find((key) => (data.columns[key].taskIds || []).includes(id));
  }, [data.columns]);

  const updateData = useCallback((newData) => {
    setData(newData);
    onDataChange?.(newData);
  }, [onDataChange]);

  const handleDragStart = (e) => setActiveId(e.active.id);

  const handleDragOver = (e) => {
    const { active, over } = e;
    if (!over) return;
    const ac = findContainer(active.id);
    const oc = findContainer(over.id);
    if (!ac || !oc || ac === oc) return;

    setData((prev) => {
      const aItems = prev.columns[ac].taskIds;
      const oItems = prev.columns[oc].taskIds;
      const overIdx = oItems.indexOf(over.id);
      const newIdx = over.id in prev.columns ? oItems.length : Math.max(0, overIdx);

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [ac]: { ...prev.columns[ac], taskIds: aItems.filter((i) => i !== active.id) },
          [oc]: { ...prev.columns[oc], taskIds: [...oItems.slice(0, newIdx), active.id, ...oItems.slice(newIdx)] },
        },
      };
    });
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) { setActiveId(null); return; }
    const ac = findContainer(active.id);
    const oc = findContainer(over.id);
    if (!ac || !oc) { setActiveId(null); return; }

    if (ac === oc) {
      const aIdx = data.columns[ac].taskIds.indexOf(active.id);
      const oIdx = data.columns[oc].taskIds.indexOf(over.id);
      if (aIdx !== oIdx) {
        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [oc]: { ...data.columns[oc], taskIds: arrayMove(data.columns[oc].taskIds, aIdx, oIdx) },
          },
        };
        updateData(newData);
      }
    }
    setActiveId(null);
  };

  const activeTask = activeId ? data.tasks[activeId] : null;

  return (
    <div className={className}>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {data.columnOrder.map((colId) => {
            const column = data.columns[colId];
            const tasks = column.taskIds.map((tid) => data.tasks[tid]).filter(Boolean);
            return <Column key={colId} column={column} tasks={tasks} renderCard={renderCard} onAddTask={onAddTask} />;
          })}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 scale-105 opacity-90">
              <TaskCard task={activeTask} renderCard={renderCard} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

KanbanBoard.displayName = "KanbanBoard";
TaskCard.displayName = "TaskCard";
Column.displayName = "Column";

export { KanbanBoard, TaskCard };
export default KanbanBoard;
