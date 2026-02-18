/**
 * SortableList - Drag-and-drop reorderable list with grab handles and smooth animations.
 */
/*
 * @param {Array} items - Array of item objects (must have unique `id`)
 * @param {Function} onReorder - (newItems: Array) => void
 * @param {Function} renderItem - (item, index, { handleProps }) => JSX
 * @param {boolean} showHandle - Show grab handle (default true)
 * @param {string} direction - "vertical" | "horizontal" (default "vertical")
 * @param {boolean} disabled - (default false)
 * @param {number} animationDuration - Transition ms (default 200)
 * @param {string} className - Extra CSS
 * @param {string} itemClassName - CSS class per item wrapper
 */
import { useState, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";

const SortableList = ({
  items = [],
  onReorder,
  renderItem,
  showHandle = true,
  direction = "vertical",
  disabled = false,
  animationDuration = 200,
  className = "",
  itemClassName = "",
}) => {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const containerRef = useRef(null);

  const handleDragStart = useCallback(
    (e, idx) => {
      if (disabled) return;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(idx));
      setDragIdx(idx);
    },
    [disabled]
  );

  const handleDragOver = useCallback(
    (e, idx) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (idx !== overIdx) setOverIdx(idx);
    },
    [overIdx]
  );

  const handleDrop = useCallback(
    (e, dropIdx) => {
      e.preventDefault();
      const from = dragIdx;
      if (from === null || from === dropIdx) {
        setDragIdx(null);
        setOverIdx(null);
        return;
      }
      const newItems = [...items];
      const [moved] = newItems.splice(from, 1);
      newItems.splice(dropIdx, 0, moved);
      onReorder?.(newItems);
      setDragIdx(null);
      setOverIdx(null);
    },
    [dragIdx, items, onReorder]
  );

  const handleDragEnd = useCallback(() => {
    setDragIdx(null);
    setOverIdx(null);
  }, []);

  // Touch handlers for mobile
  const touchState = useRef({ idx: null, el: null, startY: 0, startX: 0 });

  const handleTouchStart = useCallback(
    (e, idx) => {
      if (disabled) return;
      const touch = e.touches[0];
      touchState.current = {
        idx,
        el: e.currentTarget,
        startY: touch.clientY,
        startX: touch.clientX,
      };
      setDragIdx(idx);
    },
    [disabled]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches[0];
      if (!containerRef.current) return;
      const children = [...containerRef.current.children];
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        if (direction === "vertical") {
          if (touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
            setOverIdx(i);
            break;
          }
        } else {
          if (touch.clientX >= rect.left && touch.clientX <= rect.right) {
            setOverIdx(i);
            break;
          }
        }
      }
    },
    [direction]
  );

  const handleTouchEnd = useCallback(() => {
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      const newItems = [...items];
      const [moved] = newItems.splice(dragIdx, 1);
      newItems.splice(overIdx, 0, moved);
      onReorder?.(newItems);
    }
    setDragIdx(null);
    setOverIdx(null);
  }, [dragIdx, overIdx, items, onReorder]);

  const isVertical = direction === "vertical";

  const handleProps = (idx) => ({
    draggable: !disabled,
    onDragStart: (e) => handleDragStart(e, idx),
    onTouchStart: (e) => handleTouchStart(e, idx),
    style: { cursor: disabled ? "default" : "grab" },
    "aria-label": "Drag handle",
  });

  return (
    <div
      ref={containerRef}
      className={`flex ${isVertical ? "flex-col" : "flex-row flex-wrap"} gap-1 ${className}`}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, idx) => {
        const isDragging = dragIdx === idx;
        const isOver = overIdx === idx && dragIdx !== null && dragIdx !== idx;

        return (
          <div
            key={item.id}
            draggable={!disabled}
            onDragStart={(e) => !showHandle && handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDrop={(e) => handleDrop(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-2 rounded-xl transition-all ${itemClassName}
              ${isDragging ? "opacity-40 scale-95" : "opacity-100"}
              ${isOver ? (isVertical ? "border-t-2 border-blue-500" : "border-l-2 border-blue-500") : ""}
            `}
            style={{ transitionDuration: `${animationDuration}ms` }}
          >
            {showHandle && (
              <span {...handleProps(idx)} className="flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 touch-none">
                <GripVertical className="h-5 w-5" />
              </span>
            )}
            <div className="flex-1 min-w-0">
              {renderItem ? renderItem(item, idx, { handleProps: handleProps(idx) }) : (
                <div className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                  {item.label || item.title || item.name || JSON.stringify(item)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

SortableList.displayName = "SortableList";

export { SortableList };
export default SortableList;
