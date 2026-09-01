import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "./contexts/DarkmodeContext";
import { DarkModeToggle } from "./components/darkMode/DarkModeToggle";
import { ComponentPreview } from "./components/landing/ComponentPreview";
import { HeroShowcase } from "./components/landing/HeroShowcase";
import {
  InstallationModal,
  DocumentationModal,
  ThemesModal,
  CommandPaletteModal,
} from "./components/landing/LandingModals";
import {
  Layers,
  ToggleLeft,
  Image,
  Filter,
  Disc,
  CreditCard,
  GitBranch,
  Layout,
  Tags,
  BarChart3,
  PanelLeft,
  Navigation,
  GalleryHorizontal,
  Search,
  Clock,
  Bell as BellIcon,
  List,
  Moon,
  MessageSquare,
  Terminal,
  Table2,
  CalendarDays,
  PanelRightOpen,
  Upload,
  ArrowDownToLine,
  Crop,
  AlertTriangle,
  ChevronRight,
  Bone,
  LayoutDashboard,
  MessageCircle,
  KeyRound,
  Star,
  Palette,
  FolderTree,
  ArrowRight,
  Sparkles,
  Hash,
  Clipboard,
  Users,
  PanelTop,
  MousePointerClick,
  ListFilter,
  SlidersHorizontal,
  ShieldCheck,
  ChevronsLeftRight,
  Loader,
  GripVertical,
  CircleDot,
  LayoutGrid,
  Bot,
  QrCode,
  DollarSign,
  Lock,
  Code2,
  BarChart2,
  Check,
  Copy,
  Github,
  Menu,
  X,
} from "lucide-react";

const allComponents = [
  // AI & Chat
  {
    path: "/ai-prompt",
    label: "AI Prompt Input",
    category: "AI & Chat",
    desc: "AI prompt bar with model selection, file attachment, and voice input.",
    icon: Bot,
  },
  {
    path: "/code-block",
    label: "Code Block",
    category: "AI & Chat",
    desc: "Syntax-styled code viewer with filename, language badge, and copy.",
    icon: Code2,
  },

  // Charts & Data
  {
    path: "/charts",
    label: "Bar & Metric Charts",
    category: "Charts & Data",
    desc: "Activity contribution bars, sparklines, and metric trend charts.",
    icon: BarChart2,
  },
  {
    path: "/kpi-card",
    label: "KPI & Savings Target",
    category: "Charts & Data",
    desc: "Target progress bars, portfolio milestone setters, and stat cards.",
    icon: DollarSign,
  },
  {
    path: "/qr-code",
    label: "QR Code Generator",
    category: "Charts & Data",
    desc: "Interactive QR code card for instant mobile syncing and auth.",
    icon: QrCode,
  },
  {
    path: "/data-table",
    label: "Data Table",
    category: "Charts & Data",
    desc: "Tabular view with column sorting, search filtering, and pagination.",
    icon: Table2,
  },
  {
    path: "/gallery",
    label: "Filterable Gallery",
    category: "Charts & Data",
    desc: "A responsive grid for displaying images or items with filters.",
    icon: Image,
  },
  {
    path: "/avatar-group",
    label: "Avatar Group",
    category: "Charts & Data",
    desc: "Overlapping user profile avatars with count badge and popovers.",
    icon: Users,
  },
  {
    path: "/kanban",
    label: "Dashboard Layouts",
    category: "Charts & Data",
    desc: "Pre-built shell layouts and Kanban boards for complex apps.",
    icon: Layout,
  },
  {
    path: "/timeline",
    label: "Timeline",
    category: "Charts & Data",
    desc: "Chronological activity feed with status badges and connectors.",
    icon: Clock,
  },
  {
    path: "/virtual-list",
    label: "Virtual List",
    category: "Charts & Data",
    desc: "High-performance windowed virtualized list for massive datasets.",
    icon: List,
  },
  {
    path: "/tree-view",
    label: "Tree View",
    category: "Charts & Data",
    desc: "Hierarchical collapsible folder and file directory explorer.",
    icon: FolderTree,
  },
  {
    path: "/sortable-list",
    label: "Sortable List",
    category: "Charts & Data",
    desc: "Interactive drag-and-drop reorderable list with smooth animations.",
    icon: GripVertical,
  },
  {
    path: "/image-cropper",
    label: "Image Cropper",
    category: "Charts & Data",
    desc: "Interactive canvas for cropping, zooming, and rotating images.",
    icon: Crop,
  },
  {
    path: "/infinite-scroll",
    label: "Infinite Scroll",
    category: "Charts & Data",
    desc: "Dynamic list that continuously loads more items as the user scrolls.",
    icon: ArrowDownToLine,
  },

  // Billing & SaaS
  {
    path: "/pricing",
    label: "Pricing Table",
    category: "Billing & SaaS",
    desc: "Configurable pricing tiers with annual/monthly discount toggle.",
    icon: DollarSign,
  },
  {
    path: "/auth-form",
    label: "Account Access / Auth",
    category: "Billing & SaaS",
    desc: "Credential management, password security, and danger zone actions.",
    icon: Lock,
  },
  {
    path: "/live-cursors",
    label: "Live Presence Cursors",
    category: "Billing & SaaS",
    desc: "Real-time collaborative multi-user presence indicators.",
    icon: Users,
  },
  {
    path: "/spotlight-card",
    label: "Spotlight Card",
    category: "Billing & SaaS",
    desc: "Dynamic radial gradient card tracking cursor coordinates.",
    icon: Sparkles,
  },
  {
    path: "/marquee",
    label: "Marquee",
    category: "Billing & SaaS",
    desc: "Infinite smooth scrolling ticker banner for logos and text.",
    icon: ArrowRight,
  },
  {
    path: "/hover-reveal",
    label: "Hover Reveal Card",
    category: "Billing & SaaS",
    desc: "Interactive card revealing deep actions and details on hover.",
    icon: CreditCard,
  },
  {
    path: "/cards",
    label: "Card Variants",
    category: "Billing & SaaS",
    desc: "Modern SaaS cards with glassmorphism, gradients, and borders.",
    icon: LayoutGrid,
  },
  {
    path: "/animated-counter",
    label: "Animated Counter",
    category: "Billing & SaaS",
    desc: "Smooth number ticker rolling up from 0 to targets.",
    icon: Hash,
  },
  {
    path: "/copy-to-clipboard",
    label: "Copy to Clipboard",
    category: "Billing & SaaS",
    desc: "One-click button with feedback checkmark and toast.",
    icon: Clipboard,
  },
  {
    path: "/darkmode",
    label: "Dark Mode Toggle",
    category: "Billing & SaaS",
    desc: "Theme switcher supporting Light, Dark, and System preferences.",
    icon: Moon,
  },

  // Layout & Nav
  {
    path: "/accordion",
    label: "Accordion",
    category: "Layout & Nav",
    desc: "A vertically stacked set of interactive headings.",
    icon: Layers,
  },
  {
    path: "/stepper",
    label: "Stepper",
    category: "Layout & Nav",
    desc: "Step-by-step progress indicator and multi-stage workflow guide.",
    icon: GitBranch,
  },
  {
    path: "/sidebar",
    label: "Resizable Sidebar",
    category: "Layout & Nav",
    desc: "Collapsible and draggable sidebar navigation pane.",
    icon: PanelLeft,
  },
  {
    path: "/scroll-navbar",
    label: "Scroll Navbar",
    category: "Layout & Nav",
    desc: "Dynamic navigation bar that adapts blur and elevation on scroll.",
    icon: Navigation,
  },
  {
    path: "/carousel",
    label: "Scroll Carousel",
    category: "Layout & Nav",
    desc: "Smooth swipeable horizontal card carousel.",
    icon: GalleryHorizontal,
  },
  {
    path: "/breadcrumbs",
    label: "Breadcrumbs",
    category: "Layout & Nav",
    desc: "Hierarchical trail navigation path with custom separators.",
    icon: ChevronRight,
  },
  {
    path: "/tabs",
    label: "Tabs",
    category: "Layout & Nav",
    desc: "Segmented tab switcher with animated active pill indicator.",
    icon: LayoutDashboard,
  },
  {
    path: "/pagination",
    label: "Pagination",
    category: "Layout & Nav",
    desc: "Page navigation controls with jump-to-page and ellipses.",
    icon: ChevronsLeftRight,
  },
  {
    path: "/fab",
    label: "Floating Action Button",
    category: "Layout & Nav",
    desc: "Expandable circular speed-dial action button.",
    icon: Disc,
  },

  // Forms & Inputs
  {
    path: "/toggle",
    label: "Toggle Switch",
    category: "Forms & Inputs",
    desc: "A two-state button that can be either on or off.",
    icon: ToggleLeft,
  },
  {
    path: "/search-bar",
    label: "Search Bar",
    category: "Forms & Inputs",
    desc: "Expanded search input with shortcut badges and suggestions.",
    icon: Search,
  },
  {
    path: "/multi-select",
    label: "Multi-Select Tags",
    category: "Forms & Inputs",
    desc: "Tag selector with badge pills, live filtering, and keyboard control.",
    icon: Tags,
  },
  {
    path: "/filtering",
    label: "Filter Panel",
    category: "Forms & Inputs",
    desc: "Multi-faceted filter panel with search, categories, and tags.",
    icon: Filter,
  },
  {
    path: "/date-picker",
    label: "Date Picker",
    category: "Forms & Inputs",
    desc: "A date field component that allows users to enter and edit dates.",
    icon: CalendarDays,
  },
  {
    path: "/file-uploader",
    label: "File Uploader",
    category: "Forms & Inputs",
    desc: "Drag-and-drop file upload zone with format validation.",
    icon: Upload,
  },
  {
    path: "/otp-input",
    label: "OTP Input",
    category: "Forms & Inputs",
    desc: "Segmented one-time-password code verification input.",
    icon: KeyRound,
  },
  {
    path: "/rating",
    label: "Rating Input",
    category: "Forms & Inputs",
    desc: "Interactive 5-star rating input with hover precision.",
    icon: Star,
  },
  {
    path: "/color-picker",
    label: "Color Picker",
    category: "Forms & Inputs",
    desc: "Color selection tool with presets, RGB/HEX, and eyedropper.",
    icon: Palette,
  },
  {
    path: "/select",
    label: "Select",
    category: "Forms & Inputs",
    desc: "Customizable dropdown menu select input with option search.",
    icon: ListFilter,
  },
  {
    path: "/range-slider",
    label: "Range Slider",
    category: "Forms & Inputs",
    desc: "Single or dual thumb slider with custom tracks and value tags.",
    icon: SlidersHorizontal,
  },
  {
    path: "/password-strength",
    label: "Password Strength",
    category: "Forms & Inputs",
    desc: "Live security meter analyzing password entropy and rules.",
    icon: ShieldCheck,
  },

  // Feedback & Status
  {
    path: "/toast",
    label: "Toast Notifications",
    category: "Feedback",
    desc: "Floating alert notifications with stacking and timers.",
    icon: MessageSquare,
  },
  {
    path: "/notification",
    label: "Notification Bell",
    category: "Feedback",
    desc: "Interactive bell icon with badge counters and dropdown.",
    icon: BellIcon,
  },
  {
    path: "/progress-bar",
    label: "Progress Steps",
    category: "Feedback",
    desc: "Configurable progress bar and multi-step completion tracker.",
    icon: BarChart3,
  },
  {
    path: "/skeleton",
    label: "Skeleton",
    category: "Feedback",
    desc: "Animated shimmer placeholder skeletons for high performance.",
    icon: Bone,
  },
  {
    path: "/spinner",
    label: "Spinner",
    category: "Feedback",
    desc: "Modern CSS & SVG loading animation spinners in multiple styles.",
    icon: Loader,
  },
  {
    path: "/badge",
    label: "Badge",
    category: "Feedback",
    desc: "Status pill labels with colors, glowing dots, and outline variants.",
    icon: CircleDot,
  },

  // Overlays
  {
    path: "/command-palette",
    label: "Command Palette",
    category: "Overlays",
    desc: "Fast ⌘K spotlight search dialog for app-wide actions.",
    icon: Terminal,
  },
  {
    path: "/modal",
    label: "Modal",
    category: "Overlays",
    desc: "Accessible focused dialog overlay with backdrop blur.",
    icon: PanelTop,
  },
  {
    path: "/drawer",
    label: "Drawer",
    category: "Overlays",
    desc: "Slide-out sheet panel from screen edges with spring animations.",
    icon: PanelRightOpen,
  },
  {
    path: "/popover",
    label: "Popover",
    category: "Overlays",
    desc: "Floating contextual content card triggered by clicks or anchors.",
    icon: MousePointerClick,
  },
  {
    path: "/tooltip",
    label: "Tooltip",
    category: "Overlays",
    desc: "Contextual micro-popover on hover or focus with auto-positioning.",
    icon: MessageCircle,
  },
  {
    path: "/confirm-dialog",
    label: "Confirm Dialog",
    category: "Overlays",
    desc: "Accessible confirmation modal dialog for critical actions.",
    icon: AlertTriangle,
  },
];

const categories = [
  "All",
  "AI & Chat",
  "Charts & Data",
  "Billing & SaaS",
  "Layout & Nav",
  "Forms & Inputs",
  "Feedback",
  "Overlays",
];

const Home = () => {
  const { mode, setMode } = useDarkMode();
  const [_copiedInstall, setCopiedInstall] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showThemesModal, setShowThemesModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const _copyInstallCommand = () => {
    navigator.clipboard.writeText("npm install readyui-react");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const filteredComponents = useMemo(() => {
    return allComponents.filter((comp) => {
      const matchesCategory =
        selectedCategory === "All" || comp.category === selectedCategory;
      const matchesSearch =
        comp.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-50 transition-colors selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900 relative">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center">
                Ready
                <span className="text-zinc-400 dark:text-zinc-400 font-semibold group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  UI
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#components"
                className="relative text-zinc-900 dark:text-white py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-zinc-900 dark:after:bg-white after:rounded-full"
              >
                Components
              </a>
              <button
                onClick={() => setShowInstallModal(true)}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1 cursor-pointer"
              >
                Installation
              </button>
              <button
                onClick={() => setShowDocsModal(true)}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1 cursor-pointer"
              >
                Documentation
              </button>
              <button
                onClick={() => setShowThemesModal(true)}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1 cursor-pointer"
              >
                Themes
              </button>
            </nav>
          </div>

          {/* Right: Actions & Theme & Search */}
          <div className="flex items-center gap-2.5">
            {/* Quick ⌘K Search Trigger Button */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search components...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="sm:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Switcher */}
            <DarkModeToggle mode={mode} onChange={setMode} size="sm" />

            {/* GitHub Stars Link */}
            <a
              href="https://github.com/Kemi-Oluwadahunsi/ReadyToUse-React-Components"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3 animate-fadeIn">
            <a
              href="#components"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-900 dark:text-white py-1"
            >
              Components
            </a>
            <button
              onClick={() => {
                setShowInstallModal(true);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
            >
              Installation
            </button>
            <button
              onClick={() => {
                setShowDocsModal(true);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
            >
              Documentation
            </button>
            <button
              onClick={() => {
                setShowThemesModal(true);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
            >
              Themes
            </button>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12 bg-grid-pattern">
        {/* Subtle Ambient Radial Light Cone */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-zinc-200/50 to-transparent dark:from-white/[0.04] dark:to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-5">
          {/* Announcement Pill Badge */}
          <div className="inline-flex items-center justify-center">
            <button
              onClick={() => setShowDocsModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm group cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>New AI & Chart components available</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
            The Foundation for your Design System
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A set of beautifully designed components that you can customize,
            extend, and build on. Start here then make it your own. Open Source.
            Open Code.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#components"
              className="px-6 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-medium text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Build Your Own</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowInstallModal(true)}
              className="px-5 py-2.5 rounded-xl bg-transparent text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium text-sm transition-all cursor-pointer"
            >
              Installation Guide
            </button>
          </div>
        </div>
      </section>

      <HeroShowcase />

      <div className="relative w-full border-t border-zinc-200 dark:border-zinc-800/80 overflow-hidden">
        <div className="absolute inset-x-0 -top-[1px] h-[2px] bg-gradient-to-r from-transparent via-blue-500/80 dark:via-white/80 to-transparent w-1/3 animate-line-beam" />
      </div>

      <section
        id="components"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-zinc-200 dark:border-zinc-800/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Building Blocks
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Carefully crafted components for modern applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 group cursor-pointer"
            >
              <span>View all components ({allComponents.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Filter Toolbar & Search */}
        <div className="py-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-transparent hover:border-zinc-300 dark:hover:border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter components..."
              className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {filteredComponents.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 overflow-hidden hover:shadow-sm card-spotlight"
            >
              {/* Top Recessed Micro-Preview Area */}
              <div className="p-6 min-h-[150px] bg-zinc-50 dark:bg-[#070709] border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center relative overflow-hidden group-hover:bg-zinc-100/60 dark:group-hover:bg-zinc-900/40 transition-colors">
                <ComponentPreview type={item.path} />
              </div>

              {/* Bottom Card Content Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-zinc-200 transition-colors">
                      {item.label}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white font-medium transition-colors">
                  <span>Explore component</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              No components matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-zinc-900 dark:text-white underline font-medium cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      <div className="pointer-events-none sticky bottom-0 h-16 w-full bg-gradient-to-t from-white/90 dark:from-[#09090b]/90 to-transparent backdrop-blur-[2px] z-30" />

      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#09090b] relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white">
              ReadyUI
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Built for high-performance SaaS & modern AI applications.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <a
              href="https://github.com/Kemi-Oluwadahunsi/ReadyToUse-React-Components"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={() => setShowDocsModal(true)}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Documentation
            </button>
            <button
              onClick={() => setShowInstallModal(true)}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Installation
            </button>
          </div>
        </div>
      </footer>

      <InstallationModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
      <DocumentationModal
        isOpen={showDocsModal}
        onClose={() => setShowDocsModal(false)}
      />
      <ThemesModal
        isOpen={showThemesModal}
        onClose={() => setShowThemesModal(false)}
      />
      <CommandPaletteModal
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        components={allComponents}
      />
    </div>
  );
};

export default Home;
