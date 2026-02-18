import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
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

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accordion" element={<AccordionDemo />} />
        <Route path="/toggle" element={<ToggleSwitchDemo />} />
        <Route path="/gallery" element={<FilterableGalleryDemo />} />
        <Route path="/filtering" element={<FilterPanelDemo />} />
        <Route path="/fab" element={<FABDemo />} />
        <Route path="/hover-reveal" element={<HoverRevealCardDemo />} />
        <Route path="/stepper" element={<StepperDemo />} />
        <Route path="/kanban" element={<KanbanDemo />} />
        <Route path="/multi-select" element={<MultiSelectDemo />} />
        <Route path="/progress-bar" element={<ProgressBarStepsDemo />} />
        <Route path="/sidebar" element={<ResizableSidebarDemo />} />
        <Route path="/scroll-navbar" element={<ScrollNavbarDemo />} />
        <Route path="/carousel" element={<ScrollCarouselDemo />} />
        <Route path="/search-bar" element={<SearchBarDemo />} />
        <Route path="/timeline" element={<TimeLineDemo />} />
        <Route path="/toast" element={<ToastDemo />} />
        <Route path="/virtual-list" element={<VirtualListDemo />} />
        <Route path="/darkmode" element={<DarkModeDemo />} />
        <Route path="/notification" element={<NotificationBellDemo />} />
        <Route path="/command-palette" element={<CommandPaletteDemo />} />
        <Route path="/data-table" element={<DataTableDemo />} />
        <Route path="/date-picker" element={<DatePickerDemo />} />
        <Route path="/drawer" element={<DrawerDemo />} />
        <Route path="/file-uploader" element={<FileUploaderDemo />} />
        <Route path="/infinite-scroll" element={<InfiniteScrollDemo />} />
        <Route path="/image-cropper" element={<ImageCropperDemo />} />
        <Route path="/confirm-dialog" element={<ConfirmDialogDemo />} />
        <Route path="/breadcrumbs" element={<BreadcrumbsDemo />} />
        <Route path="/skeleton" element={<SkeletonDemo />} />
        <Route path="/tabs" element={<TabsDemo />} />
        <Route path="/tooltip" element={<TooltipDemo />} />
        <Route path="/otp-input" element={<OTPInputDemo />} />
        <Route path="/rating" element={<RatingInputDemo />} />
        <Route path="/color-picker" element={<ColorPickerDemo />} />
        <Route path="/tree-view" element={<TreeViewDemo />} />
        <Route path="/marquee" element={<MarqueeDemo />} />
        <Route path="/spotlight-card" element={<SpotlightCardDemo />} />
        <Route path="/animated-counter" element={<AnimatedCounterDemo />} />
        <Route path="/copy-to-clipboard" element={<CopyToClipboardDemo />} />
        <Route path="/avatar-group" element={<AvatarGroupDemo />} />
        <Route path="/modal" element={<ModalDemo />} />
        <Route path="/popover" element={<PopoverDemo />} />
        <Route path="/select" element={<SelectDemo />} />
        <Route path="/range-slider" element={<RangeSliderDemo />} />
        <Route path="/password-strength" element={<PasswordStrengthDemo />} />
        <Route path="/pagination" element={<PaginationDemo />} />
        <Route path="/spinner" element={<SpinnerDemo />} />
        <Route path="/sortable-list" element={<SortableListDemo />} />
        <Route path="/badge" element={<BadgeDemo />} />
        <Route path="/cards" element={<CardsDemo />} />
      </Routes>
    </div>
  );
}

export default App;
