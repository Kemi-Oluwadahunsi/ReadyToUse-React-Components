import { useState } from "react";
import { Accordion } from "../components/Accordion";
import { ToggleSwitch } from "../components/CustomToggleSwitch";
import { FilterableGallery } from "../components/FilterableGallery";
import { FilterPanel } from "../components/FilterComponent";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { HoverRevealCard } from "../components/HoverRevealCard";
import { Stepper } from "../components/InteractiveStepper";
import { KanbanBoard } from "../components/KanbanBoard";
import { MultiSelectTagInput } from "../components/MultiSelectTagInput";
import { ProgressBarSteps } from "../components/ProgressBarSteps";
import { ResizableSidebar } from "../components/ResizableSidebar";
import { ScrollAwareNavbar } from "../components/ScrollAwareNavbar";
import { ScrollCarousel } from "../components/ScrollCarousel";
import { SearchBar } from "../components/SearchBar";
import { TimeLine } from "../components/TimeLine";
import { ToastProvider, useToast } from "../components/ToastNotification";
import { VirtualList } from "../components/VirtualList";
import { DarkModeToggle } from "../components/darkMode/DarkModeToggle";
import { NotificationBell } from "../components/Notification-bell/NotificationBell";
import { useDarkMode } from "../contexts/DarkmodeContext";
import {
  Home, Plus, Edit, Share2, Trash2, MessageSquare, Heart,
  Settings, User, Bell, Search, Layout, BarChart3,
  Briefcase, GraduationCap, Award, Rocket, Star, Zap
} from "lucide-react";

/* =========================================
   ACCORDION DEMO
   ========================================= */
export const AccordionDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Accordion</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3">Default</h3>
        <Accordion
          items={[
            { id: "1", title: "What is ReadyUI?", content: "ReadyUI is a collection of beautiful, configurable React components built with Tailwind CSS." },
            { id: "2", title: "Is it free to use?", content: "Yes! ReadyUI is open source and free to use in personal and commercial projects." },
            { id: "3", title: "Can I customize components?", content: "Every component is fully configurable through props. Change colors, sizes, variants, and behavior." },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3">Separated + Multiple</h3>
        <Accordion
          variant="separated"
          allowMultiple
          items={[
            { id: "a", title: "Getting Started", content: "Install with npm install readyui-react and import the components you need." },
            { id: "b", title: "Tailwind Setup", content: "Make sure Tailwind CSS is configured in your project. All components use Tailwind utility classes." },
            { id: "c", title: "Dark Mode", content: "Wrap your app in DarkModeProvider to enable dark mode across all ReadyUI components." },
          ]}
        />
      </div>
    </div>
  </div>
);

/* =========================================
   TOGGLE SWITCH DEMO
   ========================================= */
export const ToggleSwitchDemo = () => {
  const [checked, setChecked] = useState(false);
  const [ios1, setIos1] = useState(true);
  const [ios2, setIos2] = useState(false);
  const [mat, setMat] = useState(true);
  const [pill, setPill] = useState(false);
  const [icon1, setIcon1] = useState(false);
  const [icon2, setIcon2] = useState(true);
  const [labeled1, setLabeled1] = useState(true);
  const [labeled2, setLabeled2] = useState(false);
  const [outline, setOutline] = useState(true);
  const [slim, setSlim] = useState(false);
  return (
    <div className="max-w-lg mx-auto p-6 space-y-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Toggle Switch</h2>

      {/* Default */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Default</h3>
        <div className="space-y-3">
          <ToggleSwitch size="sm" label="Small" />
          <ToggleSwitch checked={checked} onChange={setChecked} label="Medium (controlled)" onColor="bg-indigo-600" />
          <ToggleSwitch size="lg" label="Large" defaultChecked onColor="bg-emerald-500" />
        </div>
      </section>

      {/* iOS */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">iOS Style</h3>
        <div className="space-y-3">
          <ToggleSwitch variant="ios" label="Wi-Fi" checked={ios1} onChange={setIos1} />
          <ToggleSwitch variant="ios" label="Airplane Mode" checked={ios2} onChange={setIos2} onColor="bg-orange-500" />
        </div>
      </section>

      {/* Material */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Material Design</h3>
        <div className="space-y-4">
          <ToggleSwitch variant="material" label="Dark mode" checked={mat} onChange={setMat} />
        </div>
      </section>

      {/* Pill */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Pill</h3>
        <div className="space-y-3">
          <ToggleSwitch variant="pill" label="Auto-save" checked={pill} onChange={setPill} onColor="bg-purple-600" />
        </div>
      </section>

      {/* Icon */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Icon Toggle</h3>
        <div className="space-y-3">
          <ToggleSwitch variant="icon" label="Theme" checked={icon1} onChange={setIcon1} onColor="bg-amber-500" />
          <ToggleSwitch variant="icon" label="Sound" checked={icon2} onChange={setIcon2} onColor="bg-green-600" />
        </div>
      </section>

      {/* Labeled */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Labeled</h3>
        <div className="space-y-3">
          <ToggleSwitch variant="labeled" label="Status" checked={labeled1} onChange={setLabeled1} />
          <ToggleSwitch variant="labeled" label="Power" checked={labeled2} onChange={setLabeled2} onLabel="I" offLabel="O" onColor="bg-emerald-600" offColor="bg-red-500" />
        </div>
      </section>

      {/* Outline */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Outline</h3>
        <div className="space-y-3">
          <ToggleSwitch variant="outline" label="Minimal mode" checked={outline} onChange={setOutline} />
        </div>
      </section>

      {/* Slim */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Slim</h3>
        <div className="space-y-4">
          <ToggleSwitch variant="slim" label="Compact toggle" checked={slim} onChange={setSlim} onColor="bg-teal-500" />
        </div>
      </section>

      {/* With Description */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">With Description</h3>
        <div className="space-y-4">
          <ToggleSwitch variant="ios" label="Email notifications" description="Receive email updates about your account activity" defaultChecked />
          <ToggleSwitch variant="outline" label="Location services" description="Allow apps to access your location" />
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Disabled</h3>
        <ToggleSwitch disabled label="Locked" defaultChecked />
      </section>
    </div>
  );
};

/* =========================================
   FILTERABLE GALLERY DEMO
   ========================================= */
export const FilterableGalleryDemo = () => (
  <div className="max-w-6xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Filterable Gallery</h2>
    <FilterableGallery
      categories={["Nature", "Architecture", "People"]}
      columns={3}
      items={[
        { id: 1, src: "https://picsum.photos/seed/n1/600/400", title: "Mountain View", categories: ["Nature"] },
        { id: 2, src: "https://picsum.photos/seed/a1/600/400", title: "Modern Building", categories: ["Architecture"] },
        { id: 3, src: "https://picsum.photos/seed/p1/600/400", title: "Portrait", categories: ["People"] },
        { id: 4, src: "https://picsum.photos/seed/n2/600/400", title: "Ocean Waves", categories: ["Nature"] },
        { id: 5, src: "https://picsum.photos/seed/a2/600/400", title: "Skyscraper", categories: ["Architecture"] },
        { id: 6, src: "https://picsum.photos/seed/p2/600/400", title: "Street Photo", categories: ["People"] },
      ]}
    />
  </div>
);

/* =========================================
   FILTER PANEL DEMO
   ========================================= */
export const FilterPanelDemo = () => {
  const [filters1, setFilters1] = useState({});
  const [filters2, setFilters2] = useState({});
  const [filters3, setFilters3] = useState({});
  const [filters4, setFilters4] = useState({});
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filter Panel</h2>

      {/* Default Dropdowns */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Dropdown (default)</h3>
        <FilterPanel
          filters={[
            { id: "category", label: "Category", type: "select", options: ["Electronics", "Clothing", "Books", "Home & Garden"] },
            { id: "price", label: "Price Range", type: "select", options: ["Under $25", "$25–$50", "$50–$100", "Over $100"] },
            { id: "inStock", label: "In Stock Only", type: "toggle" },
          ]}
          value={filters1}
          onChange={setFilters1}
          showActiveCount
        />
      </section>

      {/* Chips + Segmented */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Chips &amp; Segmented</h3>
        <FilterPanel
          filters={{
            period: { label: "Period", type: "single", variant: "segmented", options: ["Day", "Week", "Month", "Year"] },
            size: { label: "Size", type: "single", variant: "chips", options: ["XS", "S", "M", "L", "XL", "XXL"] },
            color: { label: "Color", type: "multiple", variant: "chips", options: ["Red", "Blue", "Green", "Black", "White"] },
          }}
          value={filters2}
          onChange={setFilters2}
        />
      </section>

      {/* Vertical Sidebar Layout */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Vertical Layout (sidebar style)</h3>
        <div className="max-w-xs bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-gray-200 dark:border-zinc-700">
          <FilterPanel
            filters={{
              sort: { label: "Sort By", type: "single", variant: "radio", options: ["Newest", "Price: Low → High", "Price: High → Low", "Most Popular"] },
              features: { label: "Features", type: "multiple", variant: "checkbox", options: ["Wireless", "Waterproof", "Fast Charging", "Noise Cancelling"] },
              inStock: { label: "In Stock Only", type: "toggle" },
            }}
            layout="vertical"
            title="Refine"
            value={filters3}
            onChange={setFilters3}
          />
        </div>
      </section>

      {/* Inline Layout */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Inline Layout (toolbar)</h3>
        <FilterPanel
          filters={{
            status: { label: "Status", type: "single", variant: "inline", options: ["All", "Active", "Pending", "Completed"] },
            priority: { label: "Priority", type: "single", variant: "segmented", options: ["Low", "Medium", "High"] },
            mine: { label: "Assigned to Me", type: "toggle" },
          }}
          layout="inline"
          title="Tasks"
          value={filters4}
          onChange={setFilters4}
        />
      </section>

      {/* Live output */}
      <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl text-sm text-gray-600 dark:text-gray-300 font-mono space-y-1">
        <div><strong>Dropdown:</strong> {JSON.stringify(filters1)}</div>
        <div><strong>Chips/Seg:</strong> {JSON.stringify(filters2)}</div>
        <div><strong>Vertical:</strong> {JSON.stringify(filters3)}</div>
        <div><strong>Inline:</strong> {JSON.stringify(filters4)}</div>
      </div>
    </div>
  );
};

/* =========================================
   FAB DEMO
   ========================================= */
export const FABDemo = () => (
  <div className="min-h-[80vh] p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Floating Action Button</h2>
    <p className="text-gray-500 mt-2">Check the bottom-right corner.</p>
    <FloatingActionButton
      actions={[
        { id: "edit", icon: <Edit className="h-5 w-5" />, label: "Edit", onClick: () => alert("Edit!") },
        { id: "share", icon: <Share2 className="h-5 w-5" />, label: "Share", color: "bg-blue-500", onClick: () => alert("Share!") },
        { id: "delete", icon: <Trash2 className="h-5 w-5" />, label: "Delete", color: "bg-red-500", onClick: () => alert("Delete!") },
      ]}
    />
  </div>
);

/* =========================================
   HOVER REVEAL CARD DEMO
   ========================================= */
export const HoverRevealCardDemo = () => (
  <div className="max-w-6xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Hover Reveal Cards</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Mountain Adventure", description: "Explore breathtaking mountain trails.", image: "https://picsum.photos/seed/h1/600/400", category: "Travel", tags: ["Adventure", "Nature"], likes: 234 },
        { title: "Urban Photography", description: "Capture the beauty of city life.", image: "https://picsum.photos/seed/h2/600/400", category: "Photography", tags: ["Urban", "Art"], featured: true, likes: 567 },
        { title: "Culinary Delights", description: "Discover world-class recipes.", image: "https://picsum.photos/seed/h3/600/400", category: "Food", tags: ["Cooking", "Gourmet"], likes: 189 },
      ].map((card, i) => (
        <HoverRevealCard key={i} {...card} author={{ name: "Demo Author", avatar: `https://i.pravatar.cc/40?img=${i + 1}` }} />
      ))}
    </div>
  </div>
);

/* =========================================
   STEPPER DEMO
   ========================================= */
export const StepperDemo = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { id: "account", label: "Account", description: "Create your account" },
    { id: "profile", label: "Profile", description: "Set up your profile" },
    { id: "settings", label: "Settings", description: "Configure preferences" },
    { id: "done", label: "Complete", description: "All set!" },
  ];
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Stepper</h2>
      <Stepper steps={steps} currentStep={step} onStepChange={setStep} />
    </div>
  );
};

/* =========================================
   KANBAN DEMO
   ========================================= */
export const KanbanDemo = () => {
  const initialData = {
    columnOrder: ["todo", "progress", "done"],
    columns: {
      todo: { id: "todo", title: "To Do", color: "blue", taskIds: ["t1", "t2"] },
      progress: { id: "progress", title: "In Progress", color: "amber", taskIds: ["t3"] },
      done: { id: "done", title: "Done", color: "emerald", taskIds: ["t4"] },
    },
    tasks: {
      t1: { id: "t1", title: "Design homepage", priority: "high", tags: ["UI"] },
      t2: { id: "t2", title: "Write API docs", priority: "medium", tags: ["Docs"] },
      t3: { id: "t3", title: "Fix login bug", priority: "high", tags: ["Bug"] },
      t4: { id: "t4", title: "Deploy v2", priority: "low", tags: ["DevOps"] },
    },
  };
  const [data, setData] = useState(initialData);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Kanban Board</h2>
      <KanbanBoard data={data} onDataChange={setData} />
    </div>
  );
};

/* =========================================
   MULTI-SELECT TAG INPUT DEMO
   ========================================= */
export const MultiSelectDemo = () => (
  <div className="max-w-md mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Multi-Select Tag Input</h2>
    <MultiSelectTagInput
      options={["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix", "Astro", "SolidJS"]}
      placeholder="Select frameworks..."
      allowCustom
      maxItems={5}
    />
  </div>
);

/* =========================================
   PROGRESS BAR STEPS DEMO
   ========================================= */
export const ProgressBarStepsDemo = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Progress Bar Steps</h2>
      <ProgressBarSteps
        steps={[
          { id: "cart", label: "Cart", description: "Review items" },
          { id: "shipping", label: "Shipping", description: "Enter address" },
          { id: "payment", label: "Payment", description: "Add payment" },
          { id: "confirm", label: "Confirm", description: "Place order" },
        ]}
        currentStep={step}
        onStepChange={setStep}
        clickable
        showProgress
        showNavButtons
      />
    </div>
  );
};

/* =========================================
   RESIZABLE SIDEBAR DEMO
   ========================================= */
export const ResizableSidebarDemo = () => (
  <div className="h-[80vh] flex">
    <ResizableSidebar
      header="ReadyUI"
      items={[
        { id: "home", label: "Home", icon: <Home className="h-5 w-5" />, active: true },
        { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
        { id: "users", label: "Users", icon: <User className="h-5 w-5" />, badge: 3 },
        { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
      ]}
      showSearch
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Main Content</h2>
        <p className="text-gray-500 mt-2">Drag the sidebar edge to resize. Click the arrow to collapse.</p>
      </div>
    </ResizableSidebar>
  </div>
);

/* =========================================
   SCROLL-AWARE NAVBAR DEMO
   ========================================= */
export const ScrollNavbarDemo = () => (
  <div className="min-h-[200vh]">
    <ScrollAwareNavbar
      logo="ReadyUI"
      items={[
        { label: "Home", href: "#", active: true },
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Docs", href: "#docs" },
      ]}
      cta={{ label: "Get Started", onClick: () => alert("Get Started!") }}
      behavior="sticky"
      transparent
      blur
    />
    <div className="pt-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scroll Navbar Demo</h2>
      <p className="text-gray-500 mt-2 mb-8">Scroll down — the navbar stays visible and gains a shadow. Try <code className="bg-gray-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded text-sm">behavior=&quot;auto-hide&quot;</code> to hide on scroll down.</p>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum.</p>
      ))}
    </div>
  </div>
);

/* =========================================
   SCROLL CAROUSEL DEMO
   ========================================= */
export const ScrollCarouselDemo = () => (
  <div className="max-w-5xl mx-auto p-6 space-y-16">
    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Scroll Carousel</h2>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">A generic carousel — works with images, cards, testimonials, or any content. Drag, use arrows, or dots to navigate.</p>

    {/* ── Image + text carousel (default card) ── */}
    <section>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Image Cards</h3>
      <ScrollCarousel
        items={[
          { id: 1, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop", title: "Mountain Lake", description: "Serene alpine lake surrounded by towering peaks." },
          { id: 2, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop", title: "Forest Trail", description: "A winding path through ancient redwood trees." },
          { id: 3, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", title: "Tropical Beach", description: "White sands and crystal-clear turquoise water." },
          { id: 4, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop", title: "Starry Night", description: "The Milky Way stretching across a mountain sky." },
          { id: 5, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", title: "Sunlit Forest", description: "Golden sunlight filtering through a lush canopy." },
        ]}
        autoScroll
        showDots
        showArrows
        scaleActive
      />
    </section>

    {/* ── Testimonial carousel (custom renderItem) ── */}
    <section>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Testimonials (custom renderItem)</h3>
      <ScrollCarousel
        items={[
          { id: 1, quote: "ReadyUI has saved us hundreds of hours. The components just work.", name: "Sarah Chen", role: "CTO, TechCorp", avatar: "https://i.pravatar.cc/80?img=1", rating: 5 },
          { id: 2, quote: "Beautiful out of the box. Perfect for rapid prototyping.", name: "Marcus Johnson", role: "Lead Developer", avatar: "https://i.pravatar.cc/80?img=2", rating: 5 },
          { id: 3, quote: "Best React component library I've ever used.", name: "Emily Zhang", role: "Freelance Developer", avatar: "https://i.pravatar.cc/80?img=3", rating: 4 },
          { id: 4, quote: "Incredibly easy to customize and integrate.", name: "David Kim", role: "Product Manager", avatar: "https://i.pravatar.cc/80?img=4", rating: 5 },
          { id: 5, quote: "Productivity went through the roof.", name: "Lisa Park", role: "Engineering Lead", avatar: "https://i.pravatar.cc/80?img=5", rating: 5 },
        ]}
        autoScroll={false}
        showDots
        showArrows
        showEdgeFade={false}
        renderItem={(item) => (
          <div className="h-full rounded-2xl border border-gray-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-800 p-7 flex flex-col justify-between">
            <div>
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= item.rating ? '#f59e0b' : '#d1d5db' }}>{s <= item.rating ? '★' : '☆'}</span>)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">&ldquo;{item.quote}&rdquo;</p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100 dark:border-zinc-700/50">
              <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.role}</div>
              </div>
            </div>
          </div>
        )}
      />
    </section>
  </div>
);

/* =========================================
   SEARCH BAR DEMO
   ========================================= */
export const SearchBarDemo = () => (
  <div className="max-w-xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Search Bar</h2>
    <SearchBar
      suggestions={["React", "React Native", "Redux", "Remix", "Recoil", "Vue.js", "Angular", "Svelte", "Next.js", "Nuxt.js", "Astro", "SolidJS"]}
      recentSearches={["React hooks", "Tailwind CSS", "TypeScript"]}
      trendingSearches={["AI components", "Dark mode", "Accessibility"]}
      onSearch={(q) => alert(`Searching: ${q}`)}
      placeholder="Search components..."
    />
  </div>
);

/* =========================================
   TIMELINE DEMO
   ========================================= */
export const TimeLineDemo = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Timeline</h2>
    <TimeLine
      items={[
        { id: 1, title: "Project Started", description: "Initial project setup and planning phase completed.", date: "Jan 2024", color: "blue", tag: "Milestone", tagColor: "blue", icon: <Rocket className="h-4 w-4" /> },
        { id: 2, title: "Alpha Release", description: "First alpha version released to internal testers.", date: "Mar 2024", color: "purple", tag: "Release", tagColor: "purple", icon: <Star className="h-4 w-4" /> },
        { id: 3, title: "Beta Launch", description: "Public beta with full feature set available.", date: "Jun 2024", color: "green", tag: "Launch", tagColor: "green", icon: <Zap className="h-4 w-4" /> },
        { id: 4, title: "v1.0 Release", description: "Stable release with comprehensive documentation.", date: "Sep 2024", color: "orange", tag: "Stable", tagColor: "orange", icon: <Award className="h-4 w-4" /> },
      ]}
    />
  </div>
);

/* =========================================
   TOAST DEMO
   ========================================= */
const ToastDemoInner = () => {
  const { addToast } = useToast();
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Toast Notifications</h2>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => addToast({ title: "Saved!", message: "Your changes have been saved.", type: "success" })} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">Success</button>
        <button onClick={() => addToast({ title: "Error", message: "Something went wrong.", type: "error" })} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">Error</button>
        <button onClick={() => addToast({ title: "Warning", message: "Please check your input.", type: "warning" })} className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">Warning</button>
        <button onClick={() => addToast({ title: "Info", message: "New version available.", type: "info", action: { label: "Update now", onClick: () => alert("Updating!") } })} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Info + Action</button>
      </div>
    </div>
  );
};

export const ToastDemo = () => (
  <ToastProvider position="top-right">
    <ToastDemoInner />
  </ToastProvider>
);

/* =========================================
   VIRTUAL LIST DEMO
   ========================================= */
export const VirtualListDemo = () => (
  <div className="max-w-2xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Virtual List</h2>
    <p className="text-gray-500 text-sm mb-4">Rendering 10,000 items with virtualization.</p>
    <VirtualList
      items={Array.from({ length: 10000 }, (_, i) => ({ label: `Item #${i + 1}`, id: i }))}
      itemHeight={56}
      height={400}
    />
  </div>
);

/* =========================================
   DARK MODE TOGGLE DEMO
   ========================================= */
export const DarkModeDemo = () => {
  const { mode, setMode } = useDarkMode();
  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dark Mode Toggle</h2>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 mb-2">Segmented (default)</p>
          <DarkModeToggle mode={mode} onChange={setMode} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Icon button</p>
          <DarkModeToggle mode={mode} onChange={setMode} variant="icon" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Switch</p>
          <DarkModeToggle mode={mode} onChange={setMode} variant="switch" />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   NOTIFICATION BELL DEMO
   ========================================= */
export const NotificationBellDemo = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New comment", message: "John commented on your post.", body: "John left a detailed comment on your blog post \"Getting Started with React\":\n\n\"This is a fantastic guide! I especially loved the section on hooks. Could you also cover custom hooks in a follow-up article?\"\n\nReply to continue the conversation.", time: "2 min ago", type: "info", read: false, avatar: "https://i.pravatar.cc/80?img=11" },
    { id: 2, title: "Deployment complete", message: "Production deploy finished successfully.", body: "Your deployment to production has completed.\n\n• Branch: main\n• Commit: a3f9c21\n• Duration: 2m 14s\n• Status: All health checks passed \u2705\n\nNo action required.", time: "10 min ago", type: "success", read: false },
    { id: 3, title: "Storage warning", message: "Storage usage above 80%.", body: "Your project storage has reached 82% capacity (8.2 GB of 10 GB).\n\nConsider:\n• Deleting old build artifacts\n• Moving large assets to external storage\n• Upgrading your storage plan\n\nYou'll receive another alert at 90%.", time: "1 hour ago", type: "warning", read: true },
    { id: 4, title: "New follower", message: "Sarah started following you.", body: "Sarah Chen (@sarahchen) is now following your profile. She's a frontend developer at TechCorp with interests in React and design systems.", time: "3 hours ago", type: "info", read: true, avatar: "https://i.pravatar.cc/80?img=1" },
    { id: 5, title: "Build failed", message: "CI pipeline failed on branch feature/auth.", body: "Build #847 failed on branch feature/auth.\n\nError: TypeScript compilation error in src/auth/login.ts:42\n  TS2345: Argument of type 'string' is not assignable to parameter of type 'AuthConfig'.\n\nFix the type error and push again to re-trigger the pipeline.", time: "5 hours ago", type: "error", read: false },
  ]);
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Notification Bell</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Click a notification to read it in a detail modal. The modal is optional &mdash; pass <code className="bg-gray-100 dark:bg-zinc-700 px-1 rounded text-xs">onNotificationClick</code> to handle it yourself.</p>
      <div className="flex justify-center">
        <NotificationBell
          notifications={notifications}
          onRead={(id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))}
          onReadAll={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
          onClear={() => setNotifications([])}
          onDelete={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
        />
      </div>
    </div>
  );
};
