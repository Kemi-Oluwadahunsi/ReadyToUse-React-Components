import { useState } from "react";
import { AvatarGroup } from "../components/AvatarGroup";
import { Modal } from "../components/Modal";
import { Popover } from "../components/Popover";
import { Select } from "../components/Select";
import { RangeSlider } from "../components/RangeSlider";
import { PasswordStrength } from "../components/PasswordStrength";
import { Pagination } from "../components/Pagination";
import { Spinner } from "../components/Spinner";
import { SortableList } from "../components/SortableList";
import { Badge } from "../components/Badge";
import {
  Bell, Mail, Heart, Settings, Info,
  ShoppingCart, User, MessageCircle,
} from "lucide-react";

/* =========================================
   AVATAR GROUP DEMO
   ========================================= */
const sampleAvatars = [
  { name: "Alice Johnson", status: "online" },
  { name: "Bob Smith", status: "busy" },
  { name: "Carol Davis", status: "away" },
  { name: "Dan Wilson", status: "online" },
  { name: "Eve Brown", status: "offline" },
  { name: "Frank Lee" },
  { name: "Grace Kim", status: "online" },
  { name: "Hank Patel" },
];

export const AvatarGroupDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Avatar Group</h2>
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-3">Stack (default, max 5)</p>
        <AvatarGroup avatars={sampleAvatars} max={5} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Grid variant, large</p>
        <AvatarGroup avatars={sampleAvatars} variant="grid" size="lg" max={6} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Sizes</p>
        <div className="space-y-4">
          {["xs", "sm", "md", "lg", "xl"].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-6">{s}</span>
              <AvatarGroup avatars={sampleAvatars.slice(0, 4)} size={s} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Without border ring</p>
        <AvatarGroup avatars={sampleAvatars.slice(0, 5)} bordered={false} />
      </div>
    </div>
  </div>
);

/* =========================================
   MODAL DEMO
   ========================================= */
export const ModalDemo = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("md");
  const [anim, setAnim] = useState("scale");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Modal</h2>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {["sm", "md", "lg", "xl", "full"].map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setOpen(true); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {["scale", "slide-up", "slide-down", "fade"].map((a) => (
            <button
              key={a}
              onClick={() => { setAnim(a); setOpen(true); }}
              className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`${size.toUpperCase()} Modal — ${anim}`}
        size={size}
        animation={anim}
        footer={
          <>
            <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm">Cancel</button>
            <button onClick={() => setOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Confirm</button>
          </>
        }
      >
        <p>This is a fully configurable modal with size <strong>{size}</strong> and <strong>{anim}</strong> animation. It supports close-on-overlay, Escape key, body scroll lock, and custom footer content.</p>
      </Modal>
    </div>
  );
};

/* =========================================
   POPOVER DEMO
   ========================================= */
export const PopoverDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Popover</h2>
    <div className="space-y-8">
      <div className="flex flex-wrap gap-6 items-center justify-center py-12">
        {["bottom", "top", "left", "right"].map((p) => (
          <Popover
            key={p}
            placement={p}
            trigger={
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                {p}
              </button>
            }
          >
            <div className="w-48">
              <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Popover ({p})</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">This floating panel has an arrow and auto-dismisses on click outside or Escape.</p>
            </div>
          </Popover>
        ))}
      </div>
      <Popover
        placement="bottom"
        align="start"
        trigger={
          <button className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm">
            Rich content
          </button>
        }
      >
        <div className="w-64 space-y-2">
          <p className="font-semibold text-gray-900 dark:text-white text-sm">Settings</p>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" defaultChecked className="rounded" /> Notifications
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" className="rounded" /> Dark mode
          </label>
        </div>
      </Popover>

      {/* Hover trigger mode */}
      <div>
        <p className="text-sm text-gray-500 mb-4">Hover mode</p>
        <div className="flex flex-wrap gap-6 items-center">
          <Popover
            triggerMode="hover"
            placement="top"
            trigger={
              <span className="text-blue-600 dark:text-blue-400 underline cursor-pointer text-sm">Hover me (text)</span>
            }
          >
            <p className="text-sm text-gray-700 dark:text-gray-300 w-40">This popover opens on hover and stays open while your cursor is over it.</p>
          </Popover>
          <Popover
            triggerMode="hover"
            placement="bottom"
            trigger={
              <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm">Hover button</button>
            }
          >
            <div className="w-48">
              <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Quick info</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Appears after 150ms delay and stays while hovering the content.</p>
            </div>
          </Popover>
          <Popover
            triggerMode="hover"
            hoverDelay={0}
            hoverCloseDelay={200}
            placement="right"
            trigger={
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 text-xs cursor-help">?</span>
            }
          >
            <p className="text-xs text-gray-600 dark:text-gray-300 w-36">Instant tooltip-style popover with no delay.</p>
          </Popover>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================
   SELECT DEMO
   ========================================= */
const fruits = [
  { value: "apple", label: "Apple", group: "Common" },
  { value: "banana", label: "Banana", group: "Common" },
  { value: "cherry", label: "Cherry", group: "Common" },
  { value: "dragon", label: "Dragon Fruit", group: "Exotic" },
  { value: "elderberry", label: "Elderberry", group: "Exotic" },
  { value: "fig", label: "Fig", group: "Common" },
  { value: "guava", label: "Guava", group: "Exotic" },
  { value: "kiwi", label: "Kiwi", group: "Exotic" },
  { value: "lemon", label: "Lemon", group: "Common" },
  { value: "mango", label: "Mango", group: "Exotic" },
];

export const SelectDemo = () => {
  const [single, setSingle] = useState(null);
  const [multi, setMulti] = useState([]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Select</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-2">Single select</p>
          <Select options={fruits} value={single} onChange={setSingle} placeholder="Pick a fruit…" />
          <p className="text-xs text-gray-400 mt-1">Selected: {single || "none"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Multi select with groups</p>
          <Select options={fruits} value={multi} onChange={setMulti} multiple grouped placeholder="Pick fruits…" />
          <p className="text-xs text-gray-400 mt-1">Selected: {multi.join(", ") || "none"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Small, disabled</p>
          <Select options={fruits} value="apple" onChange={() => {}} size="sm" disabled />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   RANGE SLIDER DEMO
   ========================================= */
export const RangeSliderDemo = () => {
  const [val, setVal] = useState(40);
  const [range, setRange] = useState([20, 80]);
  const [price, setPrice] = useState([100, 500]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Range Slider</h2>
      <div className="space-y-10">
        <div>
          <p className="text-sm text-gray-500 mb-4">Single slider</p>
          <RangeSlider value={val} onChange={setVal} showLabels showValue />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-4">Range slider (dual handles)</p>
          <RangeSlider value={range} onChange={setRange} range showLabels showValue color="violet" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-4">Price range ($0 – $1000, step $10)</p>
          <RangeSlider
            value={price}
            onChange={setPrice}
            range
            min={0}
            max={1000}
            step={10}
            minGap={50}
            showLabels
            showValue
            color="emerald"
            formatValue={(v) => `$${v}`}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-4">Sizes</p>
          <div className="space-y-6">
            {["sm", "md", "lg"].map((s) => (
              <div key={s}>
                <span className="text-xs text-gray-400">{s}</span>
                <RangeSlider value={50} onChange={() => {}} size={s} showTooltip={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   PASSWORD STRENGTH DEMO
   ========================================= */
export const PasswordStrengthDemo = () => {
  const [pw, setPw] = useState("");
  const [strength, setStrength] = useState("empty");

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Password Strength</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-2">With meter + rule checklist</p>
          <PasswordStrength value={pw} onChange={setPw} onStrengthChange={setStrength} />
          <p className="text-xs text-gray-400 mt-2">Strength: {strength}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Meter only (no rules)</p>
          <PasswordStrength value={pw} onChange={setPw} showRules={false} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Large, no toggle</p>
          <PasswordStrength value={pw} onChange={setPw} size="lg" showToggle={false} showRules={false} />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   PAGINATION DEMO
   ========================================= */
export const PaginationDemo = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pagination</h2>
      <div className="space-y-10">
        <div>
          <p className="text-sm text-gray-500 mb-3">Default</p>
          <Pagination currentPage={page1} totalPages={10} onPageChange={setPage1} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Outline variant + jump to page</p>
          <Pagination currentPage={page2} totalPages={50} onPageChange={setPage2} variant="outline" showJumpTo />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Minimal + page size selector</p>
          <Pagination
            currentPage={page1}
            totalPages={20}
            onPageChange={setPage1}
            variant="minimal"
            showPageSize
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Sizes</p>
          <div className="space-y-4">
            {["sm", "md", "lg"].map((s) => (
              <div key={s}>
                <span className="text-xs text-gray-400 mb-1 block">{s}</span>
                <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} size={s} showFirstLast={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   SPINNER DEMO
   ========================================= */
export const SpinnerDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Spinner</h2>
    <div className="space-y-10">
      <div>
        <p className="text-sm text-gray-500 mb-4">Variants (48px)</p>
        <div className="flex flex-wrap items-center gap-8">
          {["ring", "dots", "bars", "orbit", "pulse", "dual-ring", "ripple", "square-spin", "gradient"].map((v) => (
            <div key={v} className="flex flex-col items-center gap-2">
              <Spinner variant={v} size={48} color="#3b82f6" />
              <span className="text-xs text-gray-400">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Sizes</p>
        <div className="flex items-center gap-6">
          {[16, 24, 32, 48, 64].map((s) => (
            <Spinner key={s} size={s} color="#8b5cf6" />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Custom colors</p>
        <div className="flex items-center gap-6">
          <Spinner color="#ef4444" size={36} />
          <Spinner color="#10b981" size={36} variant="dots" />
          <Spinner color="#f59e0b" size={36} variant="bars" />
          <Spinner color="#ec4899" size={36} variant="orbit" />
        </div>
      </div>
    </div>
  </div>
);

/* =========================================
   SORTABLE LIST DEMO
   ========================================= */
export const SortableListDemo = () => {
  const [items, setItems] = useState([
    { id: "1", label: "Learn React", priority: "high" },
    { id: "2", label: "Build components", priority: "high" },
    { id: "3", label: "Write tests", priority: "medium" },
    { id: "4", label: "Deploy to npm", priority: "medium" },
    { id: "5", label: "Update README", priority: "low" },
  ]);

  const colors = { high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300", medium: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300", low: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Sortable List</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-3">Drag to reorder</p>
          <SortableList
            items={items}
            onReorder={setItems}
            renderItem={(item) => (
              <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg">
                <span className="text-sm text-gray-800 dark:text-gray-200">{item.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[item.priority]}`}>
                  {item.priority}
                </span>
              </div>
            )}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Default rendering (no renderItem)</p>
          <SortableList
            items={[
              { id: "a", label: "Item Alpha" },
              { id: "b", label: "Item Beta" },
              { id: "c", label: "Item Gamma" },
            ]}
            onReorder={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   BADGE DEMO
   ========================================= */
export const BadgeDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Badge</h2>
    <div className="space-y-10">
      <div>
        <p className="text-sm text-gray-500 mb-4">On icons</p>
        <div className="flex items-center gap-8">
          <Badge content={3}>
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Badge>
          <Badge content={12} color="blue">
            <Mail className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Badge>
          <Badge content={150} max={99} color="purple">
            <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Badge>
          <Badge variant="dot" color="green">
            <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Dot with pulse</p>
        <div className="flex items-center gap-8">
          <Badge variant="dot" pulse>
            <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Badge>
          <Badge variant="dot" pulse color="green">
            <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Colors</p>
        <div className="flex items-center gap-4">
          {["red", "blue", "green", "yellow", "gray", "purple"].map((c) => (
            <Badge key={c} content={c} color={c} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Outline variant</p>
        <div className="flex items-center gap-4">
          <Badge content="New" variant="outline" color="blue" />
          <Badge content="Sale" variant="outline" color="red" />
          <Badge content="Beta" variant="outline" color="purple" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Positions</p>
        <div className="flex items-center gap-8">
          {["top-right", "top-left", "bottom-right", "bottom-left"].map((p) => (
            <Badge key={p} content={1} position={p} color="blue">
              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                <Info className="h-5 w-5 text-gray-500" />
              </div>
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Sizes</p>
        <div className="flex items-center gap-6">
          {["sm", "md", "lg"].map((s) => (
            <Badge key={s} content={5} size={s}>
              <Heart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </div>
);
