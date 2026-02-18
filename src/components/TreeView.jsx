import { useState, useCallback, useMemo } from "react";
import { ChevronRight, Folder, FolderOpen, File, Check, Minus } from "lucide-react";

/**
 * TreeView - Hierarchical tree with expand/collapse, select, drag-reorder.
 */
/*
 * @param {Array} data - Tree nodes: [{ id, label, children?, icon?, disabled? }]
 * @param {Function} onSelect - (node, selectedIds) => void
 * @param {boolean} multiSelect - Allow multi-select (default false)
 * @param {boolean} showCheckboxes - Show checkboxes in multi-select (default true when multiSelect)
 * @param {Set|Array} defaultExpanded - Initially expanded node IDs
 * @param {Set|Array} defaultSelected - Initially selected node IDs
 * @param {boolean} expandOnSelect - Auto-expand on select (default true)
 * @param {Function} renderLabel - Custom label: (node, { isExpanded, isSelected, depth }) => JSX
 * @param {boolean} showIcons - Show file/folder icons (default true)
 * @param {boolean} showLines - Show indent guide lines (default true)
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {string} className - Extra CSS
 */

/* ── TreeNode extracted to module level to prevent remounts ── */
const TreeNode = ({
  node,
  depth,
  expanded,
  selected,
  multiSelect,
  displayCheckboxes,
  showIcons,
  showLines,
  cfg,
  renderLabel,
  onToggleExpand,
  onSelect,
  getCheckState,
}) => {
  const hasChildren = node.children?.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);
  const checkState = displayCheckboxes ? getCheckState(node) : null;

  return (
    <div>
      <div
        onClick={() => onSelect(node)}
        className={`group flex items-center gap-1 ${cfg.py} ${cfg.px} rounded-md cursor-pointer transition-colors select-none
          ${isSelected && !multiSelect ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "hover:bg-gray-100 dark:hover:bg-gray-700/50"}
          ${node.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
        style={{ paddingLeft: depth * cfg.indent + 4 }}
      >
        {/* Expand toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            hasChildren && onToggleExpand(node.id);
          }}
          className={`shrink-0 p-0.5 rounded transition-transform ${hasChildren ? "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" : "invisible"}`}
          style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .15s" }}
        >
          <ChevronRight style={{ width: cfg.icon, height: cfg.icon }} />
        </button>

        {/* Checkbox */}
        {displayCheckboxes && (
          <span
            className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              checkState === "checked"
                ? "bg-blue-500 border-blue-500 text-white"
                : checkState === "indeterminate"
                ? "bg-blue-200 border-blue-400 text-blue-700 dark:bg-blue-800 dark:border-blue-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            {checkState === "checked" && <Check className="w-3 h-3" />}
            {checkState === "indeterminate" && <Minus className="w-3 h-3" />}
          </span>
        )}

        {/* Icon */}
        {showIcons && (
          <span className="shrink-0 text-gray-400 dark:text-gray-500">
            {node.icon ? (
              node.icon
            ) : hasChildren ? (
              isExpanded ? (
                <FolderOpen style={{ width: cfg.icon, height: cfg.icon }} className="text-amber-500" />
              ) : (
                <Folder style={{ width: cfg.icon, height: cfg.icon }} className="text-amber-500" />
              )
            ) : (
              <File style={{ width: cfg.icon, height: cfg.icon }} className="text-gray-400" />
            )}
          </span>
        )}

        {/* Label */}
        <span className={`${cfg.text} truncate text-gray-700 dark:text-gray-300`}>
          {renderLabel ? renderLabel(node, { isExpanded, isSelected, depth }) : node.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {showLines && (
            <div
              className="absolute top-0 bottom-0 border-l border-gray-200 dark:border-gray-700"
              style={{ left: depth * cfg.indent + 12 }}
            />
          )}
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selected={selected}
              multiSelect={multiSelect}
              displayCheckboxes={displayCheckboxes}
              showIcons={showIcons}
              showLines={showLines}
              cfg={cfg}
              renderLabel={renderLabel}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              getCheckState={getCheckState}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({
  data = [],
  onSelect,
  multiSelect = false,
  showCheckboxes,
  defaultExpanded = [],
  defaultSelected = [],
  expandOnSelect = true,
  renderLabel,
  showIcons = true,
  showLines = true,
  size = "md",
  className = "",
}) => {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
  const [selected, setSelected] = useState(() => new Set(defaultSelected));

  const displayCheckboxes = showCheckboxes !== undefined ? showCheckboxes : multiSelect;

  const sizeConfig = useMemo(
    () => ({
      sm: { text: "text-xs", indent: 16, icon: 14, py: "py-0.5", px: "px-1" },
      md: { text: "text-sm", indent: 20, icon: 16, py: "py-1", px: "px-2" },
      lg: { text: "text-base", indent: 24, icon: 18, py: "py-1.5", px: "px-2.5" },
    }),
    []
  );
  const cfg = sizeConfig[size] || sizeConfig.md;

  /* --- Collect all descendant IDs --- */
  const getDescendants = useCallback((node) => {
    const ids = [];
    const walk = (n) => { ids.push(n.id); n.children?.forEach(walk); };
    walk(node);
    return ids;
  }, []);

  const toggleExpand = useCallback((nodeId) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (node) => {
      if (node.disabled) return;

      if (multiSelect) {
        setSelected((prev) => {
          const next = new Set(prev);
          const ids = getDescendants(node);
          const allSelected = ids.every((id) => prev.has(id));
          ids.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
          onSelect?.(node, next);
          return next;
        });
      } else {
        const next = new Set([node.id]);
        setSelected(next);
        onSelect?.(node, next);
      }

      if (expandOnSelect && node.children?.length) {
        setExpanded((prev) => {
          const next = new Set(prev);
          next.add(node.id);
          return next;
        });
      }
    },
    [multiSelect, expandOnSelect, onSelect, getDescendants]
  );

  /* --- Check state for checkboxes --- */
  const getCheckState = useCallback(
    (node) => {
      if (!node.children?.length) return selected.has(node.id) ? "checked" : "unchecked";
      const ids = getDescendants(node).slice(1); // skip self
      if (ids.length === 0) return selected.has(node.id) ? "checked" : "unchecked";
      const checkedCount = ids.filter((id) => selected.has(id)).length;
      if (checkedCount === 0) return "unchecked";
      if (checkedCount === ids.length) return "checked";
      return "indeterminate";
    },
    [selected, getDescendants]
  );

  return (
    <div className={`p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-auto ${className}`} role="tree">
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          expanded={expanded}
          selected={selected}
          multiSelect={multiSelect}
          displayCheckboxes={displayCheckboxes}
          showIcons={showIcons}
          showLines={showLines}
          cfg={cfg}
          renderLabel={renderLabel}
          onToggleExpand={toggleExpand}
          onSelect={handleSelect}
          getCheckState={getCheckState}
        />
      ))}
      {data.length === 0 && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">No items</p>
      )}
    </div>
  );
};

TreeNode.displayName = "TreeNode";
TreeView.displayName = "TreeView";

export { TreeView };
export default TreeView;
