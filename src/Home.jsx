import { Link } from "react-router-dom";
import { useDarkMode } from "./contexts/DarkmodeContext";
import { DarkModeToggle } from "./components/darkMode/DarkModeToggle";
import {
  Layers, ToggleLeft, Image, Filter, Disc, CreditCard,
  GitBranch, Layout, Tags, BarChart3,
  PanelLeft, Navigation, GalleryHorizontal, Search,
  Clock, Bell as BellIcon, List, Moon, MessageSquare,
  Terminal, Table2, CalendarDays, PanelRightOpen, Upload,
  ArrowDownToLine, Crop, AlertTriangle, ChevronRight, Bone,
  LayoutDashboard, MessageCircle, KeyRound, Star,
  Palette, FolderTree, ArrowRight, Sparkles, Hash, Clipboard,
  Users, PanelTop, MousePointerClick, ListFilter, SlidersHorizontal,
  ShieldCheck, ChevronsLeftRight, Loader, GripVertical, CircleDot, LayoutGrid
} from "lucide-react";

const components = [
  { path: "/accordion", label: "Accordion", icon: Layers, color: "from-teal-500 to-emerald-500" },
  { path: "/toggle", label: "Toggle Switch", icon: ToggleLeft, color: "from-amber-500 to-orange-500" },
  { path: "/gallery", label: "Filterable Gallery", icon: Image, color: "from-rose-500 to-pink-500" },
  { path: "/filtering", label: "Filter Panel", icon: Filter, color: "from-orange-500 to-red-500" },
  { path: "/fab", label: "Floating Action Button", icon: Disc, color: "from-violet-500 to-purple-500" },
  { path: "/hover-reveal", label: "Hover Reveal Card", icon: CreditCard, color: "from-yellow-500 to-amber-500" },
  { path: "/stepper", label: "Stepper", icon: GitBranch, color: "from-blue-500 to-indigo-500" },
  { path: "/kanban", label: "Kanban Board", icon: Layout, color: "from-purple-500 to-violet-500" },
  { path: "/multi-select", label: "Multi-Select Tags", icon: Tags, color: "from-cyan-500 to-blue-500" },
  { path: "/progress-bar", label: "Progress Steps", icon: BarChart3, color: "from-orange-500 to-amber-500" },
  { path: "/sidebar", label: "Resizable Sidebar", icon: PanelLeft, color: "from-green-500 to-emerald-500" },
  { path: "/scroll-navbar", label: "Scroll Navbar", icon: Navigation, color: "from-sky-500 to-blue-500" },
  { path: "/carousel", label: "Scroll Carousel", icon: GalleryHorizontal, color: "from-pink-500 to-rose-500" },
  { path: "/search-bar", label: "Search Bar", icon: Search, color: "from-indigo-500 to-blue-500" },
  { path: "/timeline", label: "Timeline", icon: Clock, color: "from-gray-500 to-zinc-600" },
  { path: "/toast", label: "Toast Notifications", icon: MessageSquare, color: "from-red-500 to-orange-500" },
  { path: "/virtual-list", label: "Virtual List", icon: List, color: "from-cyan-500 to-teal-500" },
  { path: "/darkmode", label: "Dark Mode Toggle", icon: Moon, color: "from-slate-600 to-gray-800" },
  { path: "/notification", label: "Notification Bell", icon: BellIcon, color: "from-violet-500 to-indigo-500" },
  // New components
  { path: "/command-palette", label: "Command Palette", icon: Terminal, color: "from-gray-700 to-gray-900" },
  { path: "/data-table", label: "Data Table", icon: Table2, color: "from-blue-500 to-cyan-500" },
  { path: "/date-picker", label: "Date Picker", icon: CalendarDays, color: "from-rose-500 to-red-500" },
  { path: "/drawer", label: "Drawer", icon: PanelRightOpen, color: "from-indigo-500 to-purple-500" },
  { path: "/file-uploader", label: "File Uploader", icon: Upload, color: "from-teal-500 to-green-500" },
  { path: "/infinite-scroll", label: "Infinite Scroll", icon: ArrowDownToLine, color: "from-sky-500 to-indigo-500" },
  { path: "/image-cropper", label: "Image Cropper", icon: Crop, color: "from-pink-500 to-fuchsia-500" },
  { path: "/confirm-dialog", label: "Confirm Dialog", icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
  { path: "/breadcrumbs", label: "Breadcrumbs", icon: ChevronRight, color: "from-slate-500 to-gray-600" },
  { path: "/skeleton", label: "Skeleton", icon: Bone, color: "from-gray-400 to-gray-500" },
  { path: "/tabs", label: "Tabs", icon: LayoutDashboard, color: "from-violet-500 to-blue-500" },
  { path: "/tooltip", label: "Tooltip", icon: MessageCircle, color: "from-cyan-500 to-teal-500" },
  { path: "/otp-input", label: "OTP Input", icon: KeyRound, color: "from-emerald-500 to-green-500" },
  { path: "/rating", label: "Rating Input", icon: Star, color: "from-yellow-500 to-amber-500" },
  { path: "/color-picker", label: "Color Picker", icon: Palette, color: "from-fuchsia-500 to-pink-500" },
  { path: "/tree-view", label: "Tree View", icon: FolderTree, color: "from-lime-500 to-emerald-500" },
  { path: "/marquee", label: "Marquee", icon: ArrowRight, color: "from-blue-600 to-indigo-600" },
  { path: "/spotlight-card", label: "Spotlight Card", icon: Sparkles, color: "from-purple-600 to-violet-600" },
  { path: "/animated-counter", label: "Animated Counter", icon: Hash, color: "from-orange-500 to-red-500" },
  { path: "/copy-to-clipboard", label: "Copy to Clipboard", icon: Clipboard, color: "from-green-500 to-teal-500" },
  // Batch 3
  { path: "/avatar-group", label: "Avatar Group", icon: Users, color: "from-pink-500 to-rose-500" },
  { path: "/modal", label: "Modal", icon: PanelTop, color: "from-blue-600 to-indigo-600" },
  { path: "/popover", label: "Popover", icon: MousePointerClick, color: "from-teal-500 to-cyan-500" },
  { path: "/select", label: "Select", icon: ListFilter, color: "from-violet-500 to-purple-500" },
  { path: "/range-slider", label: "Range Slider", icon: SlidersHorizontal, color: "from-amber-500 to-yellow-500" },
  { path: "/password-strength", label: "Password Strength", icon: ShieldCheck, color: "from-emerald-500 to-green-500" },
  { path: "/pagination", label: "Pagination", icon: ChevronsLeftRight, color: "from-sky-500 to-blue-500" },
  { path: "/spinner", label: "Spinner", icon: Loader, color: "from-indigo-500 to-violet-500" },
  { path: "/sortable-list", label: "Sortable List", icon: GripVertical, color: "from-orange-500 to-red-500" },
  { path: "/badge", label: "Badge", icon: CircleDot, color: "from-red-500 to-pink-500" },
  { path: "/cards", label: "Card Variants", icon: LayoutGrid, color: "from-emerald-500 to-cyan-500" },
];

const Home = () => {
  const { mode, setMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Ready<span className="text-blue-600">UI</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              65+ beautiful, configurable React components
            </p>
          </div>
          <DarkModeToggle mode={mode} onChange={setMode} size="sm" />
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {components.map(({ path, label, icon: Icon, color }) => ( // eslint-disable-line no-unused-vars
            <Link
              key={path}
              to={path}
              className="group flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl hover:shadow-lg hover:border-gray-300 dark:hover:border-zinc-700 transition-all"
            >
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600">
          Install: <code className="bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400">npm install readyui-react</code>
        </div>
      </main>
    </div>
  );
};

export default Home;
