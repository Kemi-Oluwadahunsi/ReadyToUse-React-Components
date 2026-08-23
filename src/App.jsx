import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import { DemoLayout } from "./demo/DemoLayout";
import {
  AccordionDemo,
  ToggleSwitchDemo,
  FilterableGalleryDemo,
  FilterPanelDemo,
  FABDemo,
  HoverRevealCardDemo,
  StepperDemo,
  KanbanDemo,
  MultiSelectDemo,
  ProgressBarStepsDemo,
  ResizableSidebarDemo,
  ScrollNavbarDemo,
  ScrollCarouselDemo,
  SearchBarDemo,
  TimeLineDemo,
  ToastDemo,
  VirtualListDemo,
  DarkModeDemo,
  NotificationBellDemo,
} from "./demo/DemoPages";
import {
  CommandPaletteDemo,
  DataTableDemo,
  DatePickerDemo,
  DrawerDemo,
  FileUploaderDemo,
  InfiniteScrollDemo,
  ImageCropperDemo,
  ConfirmDialogDemo,
  BreadcrumbsDemo,
  SkeletonDemo,
  TabsDemo,
  TooltipDemo,
  OTPInputDemo,
  RatingInputDemo,
  ColorPickerDemo,
  TreeViewDemo,
  MarqueeDemo,
  SpotlightCardDemo,
  AnimatedCounterDemo,
  CopyToClipboardDemo,
} from "./demo/NewDemoPages";
import {
  AvatarGroupDemo,
  ModalDemo,
  PopoverDemo,
  SelectDemo,
  RangeSliderDemo,
  PasswordStrengthDemo,
  PaginationDemo,
  SpinnerDemo,
  SortableListDemo,
  BadgeDemo,
} from "./demo/BatchThreeDemos";
import { CardsDemo } from "./demo/CardsDemoPage";
import {
  AIPromptDemo,
  BarChartDemo,
  KPICardDemo,
  QRCodeDemo,
  PricingTableDemo,
  AuthFormDemo,
  LiveCursorsDemo,
  CodeBlockDemo,
} from "./demo/SaasAIDemos";

function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-50 transition-colors">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accordion" element={<DemoLayout componentName="Accordion"><AccordionDemo /></DemoLayout>} />
        <Route path="/toggle" element={<DemoLayout componentName="ToggleSwitch"><ToggleSwitchDemo /></DemoLayout>} />
        <Route path="/gallery" element={<DemoLayout componentName="FilterableGallery"><FilterableGalleryDemo /></DemoLayout>} />
        <Route path="/filtering" element={<DemoLayout componentName="FilterPanel"><FilterPanelDemo /></DemoLayout>} />
        <Route path="/fab" element={<DemoLayout componentName="FloatingActionButton"><FABDemo /></DemoLayout>} />
        <Route path="/hover-reveal" element={<DemoLayout componentName="HoverRevealCard"><HoverRevealCardDemo /></DemoLayout>} />
        <Route path="/stepper" element={<DemoLayout componentName="Stepper"><StepperDemo /></DemoLayout>} />
        <Route path="/kanban" element={<DemoLayout componentName="KanbanBoard"><KanbanDemo /></DemoLayout>} />
        <Route path="/multi-select" element={<DemoLayout componentName="MultiSelectTagInput"><MultiSelectDemo /></DemoLayout>} />
        <Route path="/progress-bar" element={<DemoLayout componentName="ProgressBarSteps"><ProgressBarStepsDemo /></DemoLayout>} />
        <Route path="/sidebar" element={<DemoLayout componentName="ResizableSidebar"><ResizableSidebarDemo /></DemoLayout>} />
        <Route path="/scroll-navbar" element={<DemoLayout componentName="ScrollAwareNavbar"><ScrollNavbarDemo /></DemoLayout>} />
        <Route path="/carousel" element={<DemoLayout componentName="ScrollCarousel"><ScrollCarouselDemo /></DemoLayout>} />
        <Route path="/search-bar" element={<DemoLayout componentName="SearchBar"><SearchBarDemo /></DemoLayout>} />
        <Route path="/timeline" element={<DemoLayout componentName="TimeLine"><TimeLineDemo /></DemoLayout>} />
        <Route path="/toast" element={<DemoLayout componentName="ToastNotification"><ToastDemo /></DemoLayout>} />
        <Route path="/virtual-list" element={<DemoLayout componentName="VirtualList"><VirtualListDemo /></DemoLayout>} />
        <Route path="/darkmode" element={<DemoLayout componentName="DarkModeToggle"><DarkModeDemo /></DemoLayout>} />
        <Route path="/notification" element={<DemoLayout componentName="NotificationBell"><NotificationBellDemo /></DemoLayout>} />
        <Route path="/command-palette" element={<DemoLayout componentName="CommandPalette"><CommandPaletteDemo /></DemoLayout>} />
        <Route path="/data-table" element={<DemoLayout componentName="DataTable"><DataTableDemo /></DemoLayout>} />
        <Route path="/date-picker" element={<DemoLayout componentName="DatePicker"><DatePickerDemo /></DemoLayout>} />
        <Route path="/drawer" element={<DemoLayout componentName="Drawer"><DrawerDemo /></DemoLayout>} />
        <Route path="/file-uploader" element={<DemoLayout componentName="FileUploader"><FileUploaderDemo /></DemoLayout>} />
        <Route path="/infinite-scroll" element={<DemoLayout componentName="InfiniteScroll"><InfiniteScrollDemo /></DemoLayout>} />
        <Route path="/image-cropper" element={<DemoLayout componentName="ImageCropper"><ImageCropperDemo /></DemoLayout>} />
        <Route path="/confirm-dialog" element={<DemoLayout componentName="ConfirmDialog"><ConfirmDialogDemo /></DemoLayout>} />
        <Route path="/breadcrumbs" element={<DemoLayout componentName="Breadcrumbs"><BreadcrumbsDemo /></DemoLayout>} />
        <Route path="/skeleton" element={<DemoLayout componentName="Skeleton"><SkeletonDemo /></DemoLayout>} />
        <Route path="/tabs" element={<DemoLayout componentName="Tabs"><TabsDemo /></DemoLayout>} />
        <Route path="/tooltip" element={<DemoLayout componentName="Tooltip"><TooltipDemo /></DemoLayout>} />
        <Route path="/otp-input" element={<DemoLayout componentName="OTPInput"><OTPInputDemo /></DemoLayout>} />
        <Route path="/rating" element={<DemoLayout componentName="RatingInput"><RatingInputDemo /></DemoLayout>} />
        <Route path="/color-picker" element={<DemoLayout componentName="ColorPicker"><ColorPickerDemo /></DemoLayout>} />
        <Route path="/tree-view" element={<DemoLayout componentName="TreeView"><TreeViewDemo /></DemoLayout>} />
        <Route path="/marquee" element={<DemoLayout componentName="Marquee"><MarqueeDemo /></DemoLayout>} />
        <Route path="/spotlight-card" element={<DemoLayout componentName="SpotlightCard"><SpotlightCardDemo /></DemoLayout>} />
        <Route path="/animated-counter" element={<DemoLayout componentName="AnimatedCounter"><AnimatedCounterDemo /></DemoLayout>} />
        <Route path="/copy-to-clipboard" element={<DemoLayout componentName="CopyToClipboard"><CopyToClipboardDemo /></DemoLayout>} />
        <Route path="/avatar-group" element={<DemoLayout componentName="AvatarGroup"><AvatarGroupDemo /></DemoLayout>} />
        <Route path="/modal" element={<DemoLayout componentName="Modal"><ModalDemo /></DemoLayout>} />
        <Route path="/popover" element={<DemoLayout componentName="Popover"><PopoverDemo /></DemoLayout>} />
        <Route path="/select" element={<DemoLayout componentName="Select"><SelectDemo /></DemoLayout>} />
        <Route path="/range-slider" element={<DemoLayout componentName="RangeSlider"><RangeSliderDemo /></DemoLayout>} />
        <Route path="/password-strength" element={<DemoLayout componentName="PasswordStrength"><PasswordStrengthDemo /></DemoLayout>} />
        <Route path="/pagination" element={<DemoLayout componentName="Pagination"><PaginationDemo /></DemoLayout>} />
        <Route path="/spinner" element={<DemoLayout componentName="Spinner"><SpinnerDemo /></DemoLayout>} />
        <Route path="/sortable-list" element={<DemoLayout componentName="SortableList"><SortableListDemo /></DemoLayout>} />
        <Route path="/badge" element={<DemoLayout componentName="Badge"><BadgeDemo /></DemoLayout>} />
        <Route path="/cards" element={<DemoLayout componentName="Cards"><CardsDemo /></DemoLayout>} />
        <Route path="/ai-prompt" element={<DemoLayout componentName="AIPromptInput"><AIPromptDemo /></DemoLayout>} />
        <Route path="/charts" element={<DemoLayout componentName="ContributionBarChart"><BarChartDemo /></DemoLayout>} />
        <Route path="/kpi-card" element={<DemoLayout componentName="SavingsTargetCard"><KPICardDemo /></DemoLayout>} />
        <Route path="/qr-code" element={<DemoLayout componentName="QRCodeCard"><QRCodeDemo /></DemoLayout>} />
        <Route path="/pricing" element={<DemoLayout componentName="PricingTable"><PricingTableDemo /></DemoLayout>} />
        <Route path="/auth-form" element={<DemoLayout componentName="AuthForm"><AuthFormDemo /></DemoLayout>} />
        <Route path="/live-cursors" element={<DemoLayout componentName="LiveCursors"><LiveCursorsDemo /></DemoLayout>} />
        <Route path="/code-block" element={<DemoLayout componentName="CodeBlock"><CodeBlockDemo /></DemoLayout>} />
      </Routes>
    </div>
  );
}

export default App;
