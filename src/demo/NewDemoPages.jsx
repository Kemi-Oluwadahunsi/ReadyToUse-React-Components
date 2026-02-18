import { useState, useCallback, useRef } from "react";
import { CommandPalette } from "../components/CommandPalette";
import { DataTable } from "../components/DataTable";
import { DatePicker } from "../components/DatePicker";
import { Drawer } from "../components/Drawer";
import { FileUploader } from "../components/FileUploader";
import { InfiniteScroll } from "../components/InfiniteScroll";
import { ImageCropper } from "../components/ImageCropper";
import { ConfirmDialog, useConfirm } from "../components/ConfirmDialog";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Skeleton, SkeletonGroup } from "../components/Skeleton";
import { Tabs } from "../components/Tabs";
import { Tooltip } from "../components/Tooltip";
import { OTPInput } from "../components/OTPInput";
import { RatingInput } from "../components/RatingInput";
import { ColorPicker } from "../components/ColorPicker";
import { TreeView } from "../components/TreeView";
import { Marquee } from "../components/Marquee";
import { SpotlightCard } from "../components/SpotlightCard";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { CopyToClipboard } from "../components/CopyToClipboard";
import {
  Home, Settings, User, Search, FileText, Layout, Calculator,
  Palette, Globe, Mail, Archive, Trash2, Edit, Star, Zap,
  Terminal, Coffee, Cloud, Music, Camera, Image,
  BookOpen, Folder, File
} from "lucide-react";

/* =========================================
   COMMAND PALETTE DEMO
   ========================================= */
export const CommandPaletteDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const items = [
    { id: "home", label: "Go Home", group: "Navigation", icon: <Home className="w-4 h-4" /> },
    { id: "settings", label: "Settings", group: "Navigation", icon: <Settings className="w-4 h-4" /> },
    { id: "profile", label: "My Profile", group: "Navigation", icon: <User className="w-4 h-4" /> },
    { id: "search", label: "Search Files", group: "Actions", icon: <Search className="w-4 h-4" />, shortcut: "⌘F" },
    { id: "new-file", label: "New File", group: "Actions", icon: <FileText className="w-4 h-4" />, shortcut: "⌘N" },
    { id: "layout", label: "Toggle Layout", group: "Actions", icon: <Layout className="w-4 h-4" /> },
    { id: "calc", label: "Calculator", group: "Tools", icon: <Calculator className="w-4 h-4" /> },
    { id: "palette", label: "Color Palette", group: "Tools", icon: <Palette className="w-4 h-4" /> },
    { id: "terminal", label: "Open Terminal", group: "Tools", icon: <Terminal className="w-4 h-4" />, shortcut: "⌘`" },
    { id: "globe", label: "Open Browser", group: "Tools", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Command Palette</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Press <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded text-xs font-mono">⌘K</kbd> or click below.</p>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Command Palette
      </button>
      {lastAction && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Last action: <strong>{lastAction}</strong></p>
      )}
      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onSelect={(item) => setLastAction(item.label)}
        placeholder="Type a command..."
      />
    </div>
  );
};

/* =========================================
   DATA TABLE DEMO
   ========================================= */
export const DataTableDemo = () => {
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", render: (val) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${val === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>{val}</span>
    )},
  ];
  const data = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "Inactive" },
    { id: 4, name: "Diana Ross", email: "diana@example.com", role: "Editor", status: "Active" },
    { id: 5, name: "Eve Wilson", email: "eve@example.com", role: "Admin", status: "Active" },
    { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Viewer", status: "Inactive" },
    { id: 7, name: "Grace Lee", email: "grace@example.com", role: "Editor", status: "Active" },
    { id: 8, name: "Hank Davis", email: "hank@example.com", role: "Viewer", status: "Active" },
    { id: 9, name: "Iris Chen", email: "iris@example.com", role: "Admin", status: "Active" },
    { id: 10, name: "Jack Thomas", email: "jack@example.com", role: "Editor", status: "Inactive" },
    { id: 11, name: "Kara Moore", email: "kara@example.com", role: "Viewer", status: "Active" },
    { id: 12, name: "Leo Brown", email: "leo@example.com", role: "Admin", status: "Active" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Data Table</h2>
      <DataTable
        columns={columns}
        data={data}
        searchable
        paginated
        pageSize={5}
        selectable
        onSelectionChange={(sel) => console.log("Selected:", sel)}
      />
    </div>
  );
};

/* =========================================
   DATE PICKER DEMO
   ========================================= */
export const DatePickerDemo = () => {
  const [date, setDate] = useState(null);
  const [range, setRange] = useState({ start: null, end: null });

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Date Picker</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-2">Single Date</p>
          <DatePicker value={date} onChange={setDate} />
          {date && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Selected: {date.toLocaleDateString()}</p>}
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Date Range</p>
          <DatePicker value={range} onChange={setRange} mode="range" />
          {range.start && range.end && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {range.start.toLocaleDateString()} → {range.end.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================
   DRAWER DEMO
   ========================================= */
export const DrawerDemo = () => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [bottom, setBottom] = useState(false);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Drawer</h2>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setLeft(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Left</button>
        <button onClick={() => setRight(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Right</button>
        <button onClick={() => setBottom(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Bottom</button>
      </div>
      <Drawer isOpen={left} onClose={() => setLeft(false)} position="left" header="Left Drawer">
        <div className="p-4 space-y-3">
          <p className="text-gray-700 dark:text-gray-300">This drawer slides in from the left. Swipe or click outside to close.</p>
          {["Dashboard", "Analytics", "Settings", "Help"].map((item) => (
            <div key={item} className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-300">{item}</div>
          ))}
        </div>
      </Drawer>
      <Drawer isOpen={right} onClose={() => setRight(false)} position="right" header="Notifications" size="sm">
        <div className="p-4 space-y-3">
          {["New message from Sarah", "Build completed", "Payment received"].map((n, i) => (
            <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300">{n}</div>
          ))}
        </div>
      </Drawer>
      <Drawer isOpen={bottom} onClose={() => setBottom(false)} position="bottom" header="Share">
        <div className="p-4 flex gap-4 justify-center">
          {["Twitter", "Facebook", "LinkedIn", "Email"].map((s) => (
            <button key={s} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">{s}</button>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

/* =========================================
   FILE UPLOADER DEMO
   ========================================= */
export const FileUploaderDemo = () => {
  const [files, setFiles] = useState([]);
  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">File Uploader</h2>
      <FileUploader
        onUpload={setFiles}
        accept="image/*,.pdf,.doc,.docx"
        maxSize={5}
        maxFiles={5}
        multiple
        showPreview
      />
      {files.length > 0 && (
        <p className="mt-4 text-sm text-gray-500">{files.length} file(s) ready</p>
      )}
    </div>
  );
};

/* =========================================
   INFINITE SCROLL DEMO
   ========================================= */
export const InfiniteScrollDemo = () => {
  const [items, setItems] = useState(() => Array.from({ length: 20 }, (_, i) => ({ id: i, text: `Item ${i + 1}` })));
  const [hasMore, setHasMore] = useState(true);
  const counter = useRef(20);

  const loadMore = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1500));
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: counter.current + i,
      text: `Item ${counter.current + i + 1}`,
    }));
    counter.current += 10;
    setItems((prev) => [...prev, ...newItems]);
    if (counter.current >= 80) setHasMore(false);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Infinite Scroll</h2>
      <InfiniteScroll
        items={items}
        height={384}
        className="border border-gray-200 dark:border-gray-700 rounded-xl"
        renderItem={(item) => (
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">{item.text}</div>
        )}
        loadMore={loadMore}
        hasMore={hasMore}
      />
    </div>
  );
};

/* =========================================
   IMAGE CROPPER DEMO
   ========================================= */
export const ImageCropperDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cropped, setCropped] = useState(null);
  const sampleImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800";

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Image Cropper</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Cropper
      </button>
      {cropped && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Cropped result:</p>
          <img src={cropped} alt="Cropped" className="rounded-lg border border-gray-200 dark:border-gray-700 max-w-full" />
        </div>
      )}
      <ImageCropper
        src={sampleImg}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCrop={(blob, dataUrl) => { setCropped(dataUrl); setIsOpen(false); }}
        aspectRatio={16 / 9}
      />
    </div>
  );
};

/* =========================================
   CONFIRM DIALOG DEMO
   ========================================= */
export const ConfirmDialogDemo = () => {
  const { dialog, confirm } = useConfirm();
  const [result, setResult] = useState(null);

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete project?",
      message: "This action cannot be undone. All files and settings will be permanently deleted.",
      variant: "danger",
      confirmLabel: "Delete",
    });
    setResult(ok ? "Deleted!" : "Cancelled");
  };

  const handleUpgrade = async () => {
    const ok = await confirm({
      title: "Upgrade to Pro?",
      message: "You'll be charged $29/month starting today. Cancel anytime.",
      variant: "info",
      confirmLabel: "Upgrade",
    });
    setResult(ok ? "Upgraded!" : "Cancelled");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Confirm Dialog</h2>
      <div className="flex gap-3 flex-wrap">
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Project</button>
        <button onClick={handleUpgrade} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Upgrade</button>
      </div>
      {result && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Result: {result}</p>}
      {dialog}
    </div>
  );
};

/* =========================================
   BREADCRUMBS DEMO
   ========================================= */
export const BreadcrumbsDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Breadcrumbs</h2>
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Default</p>
        <Breadcrumbs
          items={[
            { label: "Home", href: "#" },
            { label: "Products", href: "#" },
            { label: "Electronics", href: "#" },
            { label: "Phones" },
          ]}
        />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Auto-collapsed (maxVisible: 3)</p>
        <Breadcrumbs
          maxVisible={3}
          items={[
            { label: "Home", href: "#" },
            { label: "Workspace", href: "#" },
            { label: "Projects", href: "#" },
            { label: "ReadyUI", href: "#" },
            { label: "Components", href: "#" },
            { label: "Breadcrumbs" },
          ]}
        />
      </div>
    </div>
  </div>
);

/* =========================================
   SKELETON DEMO
   ========================================= */
export const SkeletonDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Skeleton</h2>
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-3">Text skeleton</p>
        <Skeleton variant="text" lines={4} />
      </div>
      <div className="flex gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-3">Circle</p>
          <Skeleton variant="circle" width={64} height={64} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-3">Rectangle</p>
          <Skeleton variant="rect" height={64} />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Card skeleton</p>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton variant="card" animation="pulse" />
          <Skeleton variant="card" animation="wave" />
        </div>
      </div>

      {/* ---- New variants ---- */}
      <div>
        <p className="text-sm text-gray-500 mb-3">Avatar (user row placeholder)</p>
        <div className="space-y-4">
          <Skeleton variant="avatar" />
          <Skeleton variant="avatar" height={56} animation="wave" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">List (icon + text rows)</p>
        <Skeleton variant="list" rows={5} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Table (data table placeholder)</p>
        <Skeleton variant="table" rows={4} cols={4} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Buttons</p>
        <div className="flex gap-3">
          <Skeleton variant="button" />
          <Skeleton variant="button" width={160} height={44} animation="wave" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Banner (hero placeholder)</p>
        <Skeleton variant="banner" height={160} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-3">Profile (centered user card)</p>
        <Skeleton variant="profile" animation="wave" />
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-3">SkeletonGroup (loading → content)</p>
        <SkeletonGroup loading={true}>
          <p>This content will show when loading is false</p>
        </SkeletonGroup>
      </div>
    </div>
  </div>
);

/* =========================================
   TABS DEMO
   ========================================= */
export const TabsDemo = () => {
  const [active, setActive] = useState("overview");
  const tabs = [
    { key: "overview", label: "Overview", content: <div className="p-4 text-gray-700 dark:text-gray-300">Overview content with project statistics and recent activity.</div> },
    { key: "analytics", label: "Analytics", badge: "New", content: <div className="p-4 text-gray-700 dark:text-gray-300">Charts and metrics would go here.</div> },
    { key: "settings", label: "Settings", content: <div className="p-4 text-gray-700 dark:text-gray-300">Configuration options for your project.</div> },
    { key: "billing", label: "Billing", content: <div className="p-4 text-gray-700 dark:text-gray-300">Payment methods and invoices.</div> },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Tabs</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-3">Underline (default)</p>
          <Tabs tabs={tabs} activeKey={active} onChange={setActive} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Pills variant</p>
          <Tabs tabs={tabs} activeKey={active} onChange={setActive} variant="pills" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Boxed variant</p>
          <Tabs tabs={tabs} activeKey={active} onChange={setActive} variant="boxed" />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   TOOLTIP DEMO
   ========================================= */
export const TooltipDemo = () => (
  <div className="max-w-md mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Tooltip</h2>
    <div className="flex flex-wrap gap-6 items-center justify-center py-16">
      <Tooltip content="Top tooltip" position="top">
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">Top</button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">Bottom</button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">Left</button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300">Right</button>
      </Tooltip>
      <Tooltip content="Click to see this!" trigger="click">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Click me</button>
      </Tooltip>
      <Tooltip content={<div><strong>Rich content</strong><p className="text-xs mt-1">With HTML inside!</p></div>}>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">Rich</button>
      </Tooltip>
    </div>
  </div>
);

/* =========================================
   OTP INPUT DEMO
   ========================================= */
export const OTPInputDemo = () => {
  const [otp, setOtp] = useState("");
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">OTP Input</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Enter a 6-digit verification code</p>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-3">Default</p>
          <OTPInput
            length={6}
            onChange={setOtp}
            onComplete={() => setCompleted(true)}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Masked (password style)</p>
          <OTPInput length={4} masked size="lg" />
        </div>
        {completed && <p className="text-green-600 font-medium">OTP entered: {otp}</p>}
      </div>
    </div>
  );
};

/* =========================================
   RATING INPUT DEMO
   ========================================= */
export const RatingInputDemo = () => {
  const [rating, setRating] = useState(3);
  const [halfRating, setHalfRating] = useState(3.5);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Rating Input</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-3">Default (5 stars)</p>
          <RatingInput value={rating} onChange={setRating} showValue />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Half-star precision with labels</p>
          <RatingInput
            value={halfRating}
            onChange={setHalfRating}
            allowHalf
            showValue
            labels={["Terrible", "Bad", "OK", "Good", "Excellent"]}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Large, read-only</p>
          <RatingInput value={4} readOnly size="xl" color="#ec4899" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Custom emoji icons</p>
          <RatingInput
            value={rating}
            onChange={setRating}
            renderIcon={(idx, { isFilled }) => (
              <span className="text-2xl">{isFilled ? "🔥" : "💤"}</span>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   COLOR PICKER DEMO
   ========================================= */
export const ColorPickerDemo = () => {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Color Picker</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-3">Popover (click to open)</p>
          <ColorPicker value={color} onChange={setColor} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Inline mode</p>
          <ColorPicker value={color} onChange={setColor} inline />
        </div>
        <div
          className="h-24 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-white font-bold text-lg transition-colors"
          style={{ background: color }}
        >
          {color}
        </div>
      </div>
    </div>
  );
};

/* =========================================
   TREE VIEW DEMO
   ========================================= */
export const TreeViewDemo = () => {
  const treeData = [
    {
      id: "src", label: "src", children: [
        {
          id: "components", label: "components", children: [
            { id: "Button.tsx", label: "Button.tsx" },
            { id: "Input.tsx", label: "Input.tsx" },
            { id: "Modal.tsx", label: "Modal.tsx" },
          ]
        },
        {
          id: "hooks", label: "hooks", children: [
            { id: "useAuth.ts", label: "useAuth.ts" },
            { id: "useTheme.ts", label: "useTheme.ts" },
          ]
        },
        { id: "App.tsx", label: "App.tsx" },
        { id: "index.tsx", label: "index.tsx" },
      ]
    },
    {
      id: "public", label: "public", children: [
        { id: "index.html", label: "index.html" },
        { id: "favicon.ico", label: "favicon.ico" },
      ]
    },
    { id: "package.json", label: "package.json" },
    { id: "tsconfig.json", label: "tsconfig.json" },
  ];

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Tree View</h2>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 mb-3">File explorer (single select)</p>
          <TreeView
            data={treeData}
            defaultExpanded={["src", "components"]}
            onSelect={(node) => console.log("Selected:", node.label)}
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Multi-select with checkboxes</p>
          <TreeView
            data={treeData}
            multiSelect
            defaultExpanded={["src"]}
            onSelect={(node, sel) => console.log("Selection:", [...sel])}
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   MARQUEE DEMO
   ========================================= */
export const MarqueeDemo = () => {
  const logos = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix", "Astro", "Solid", "Qwik"];
  const reviews = [
    { name: "Sarah", text: "Amazing library! Saved weeks of work.", stars: 5 },
    { name: "Mike", text: "Clean API, beautiful defaults.", stars: 5 },
    { name: "Emily", text: "Best React components I've used.", stars: 5 },
    { name: "Alex", text: "Highly customizable, great docs.", stars: 4 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Marquee</h2>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-500 mb-3">Tech logos</p>
          <Marquee speed={40} gradient>
            {logos.map((name) => (
              <div key={name} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
              </div>
            ))}
          </Marquee>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-3">Reviews (reverse direction)</p>
          <Marquee speed={30} reverse>
            {reviews.map((r, i) => (
              <div key={i} className="w-64 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex gap-0.5 mb-2">{Array.from({ length: r.stars }, (_, j) => <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{r.text}</p>
                <p className="text-xs text-gray-500 mt-2">— {r.name}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   SPOTLIGHT CARD DEMO
   ========================================= */
export const SpotlightCardDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Spotlight Card</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SpotlightCard>
        <div className="p-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Optimized for performance with minimal re-renders.</p>
        </div>
      </SpotlightCard>
      <SpotlightCard spotlightColor="rgba(168,85,247,0.15)" borderColor="rgba(168,85,247,0.3)">
        <div className="p-6">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
            <Palette className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Customizable</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Every aspect can be configured via props.</p>
        </div>
      </SpotlightCard>
      <SpotlightCard tilt spotlightColor="rgba(16,185,129,0.15)" borderColor="rgba(16,185,129,0.3)">
        <div className="p-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
            <Globe className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">3D Tilt Effect</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This card has tilt enabled for an interactive feel.</p>
        </div>
      </SpotlightCard>
      <SpotlightCard tilt spotlightColor="rgba(245,158,11,0.15)" borderColor="rgba(245,158,11,0.3)">
        <div className="p-6">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Accessible</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Built with accessibility best practices in mind.</p>
        </div>
      </SpotlightCard>
    </div>
  </div>
);

/* =========================================
   ANIMATED COUNTER DEMO
   ========================================= */
export const AnimatedCounterDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Animated Counter</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <AnimatedCounter end={1500} prefix="$" className="text-3xl font-bold text-gray-900 dark:text-white" />
        <p className="text-sm text-gray-500 mt-1">Revenue</p>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <AnimatedCounter end={99.9} decimals={1} suffix="%" className="text-3xl font-bold text-emerald-600" />
        <p className="text-sm text-gray-500 mt-1">Uptime</p>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <AnimatedCounter end={12450} duration={3000} className="text-3xl font-bold text-blue-600" />
        <p className="text-sm text-gray-500 mt-1">Users</p>
      </div>
      <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <AnimatedCounter end={42} suffix="ms" easing="spring" className="text-3xl font-bold text-purple-600" />
        <p className="text-sm text-gray-500 mt-1">Latency</p>
      </div>
    </div>
  </div>
);

/* =========================================
   COPY TO CLIPBOARD DEMO
   ========================================= */
export const CopyToClipboardDemo = () => (
  <div className="max-w-lg mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Copy to Clipboard</h2>
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Button variant</p>
        <CopyToClipboard text="npm install readyui-react" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Icon variant</p>
        <div className="flex items-center gap-2">
          <code className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">readyui-react@1.0.0</code>
          <CopyToClipboard text="readyui-react@1.0.0" variant="icon" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Code block variant</p>
        <CopyToClipboard
          variant="code"
          text={`import { Button, Tabs, Tooltip } from "readyui-react";\n\nfunction App() {\n  return <Button variant="primary">Click me</Button>;\n}`}
        />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Minimal link variant</p>
        <CopyToClipboard text="https://readyui.dev" variant="minimal" label="Copy link" />
      </div>
    </div>
  </div>
);
