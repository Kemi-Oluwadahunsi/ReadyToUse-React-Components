// ReadyUI React - TypeScript Declarations
// https://github.com/readyui/react

import { ComponentType, ReactNode, CSSProperties } from "react";

// ─── Accordion ────────────────────────────────────────────────────────────────

export interface AccordionItem {
  id: string | number;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  variant?: "default" | "bordered" | "separated";
  size?: "sm" | "md" | "lg";
  onToggle?: (id: string | number, isOpen: boolean) => void;
  defaultOpen?: (string | number)[];
  iconPosition?: "left" | "right";
  maxWidth?: string;
}

export declare const Accordion: ComponentType<AccordionProps>;

// ─── ToggleSwitch ─────────────────────────────────────────────────────────────

export interface ToggleSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ios" | "material" | "pill" | "icon" | "labeled" | "outline" | "slim";
  onColor?: string;
  offColor?: string;
  className?: string;
  labelPosition?: "left" | "right";
  onLabel?: string;
  offLabel?: string;
  onIcon?: ReactNode;
  offIcon?: ReactNode;
  description?: string;
}

export declare const ToggleSwitch: ComponentType<ToggleSwitchProps>;

// ─── FilterableGallery ────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string | number;
  src: string;
  alt?: string;
  title?: string;
  categories: string[];
}

export interface FilterableGalleryProps {
  items?: GalleryItem[];
  categories?: string[];
  columns?: number;
  showLightbox?: boolean;
  className?: string;
  onFilter?: (activeFilter: string) => void;
  onItemClick?: (item: GalleryItem) => void;
  allLabel?: string;
}

export declare const FilterableGallery: ComponentType<FilterableGalleryProps>;

// ─── FilterPanel ──────────────────────────────────────────────────────────────

export interface FilterConfig {
  type: string;
  options?: string[];
  label?: string;
}

export interface FilterPanelProps {
  filters: Record<string, FilterConfig>;
  onFilterChange: (key: string, value: any) => void;
  currentFilters: Record<string, any>;
  clearFilter: (key: string) => void;
  isSelected: (key: string, option: string) => boolean;
  handleFilterChange: (key: string, value: any) => void;
  showDropdown: Record<string, boolean>;
  toggleDropdown: (key: string) => void;
  colors?: Record<string, string>;
}

export declare const FilterPanel: ComponentType<FilterPanelProps>;

// ─── FloatingActionButton ─────────────────────────────────────────────────────

export interface FABAction {
  id: string;
  icon: ComponentType<any>;
  label: string;
  color?: string;
  onClick?: () => void;
}

export interface FloatingActionButtonProps {
  actions?: FABAction[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  mainColor?: string;
  hideOnScroll?: boolean;
  showBackdrop?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export declare const FloatingActionButton: ComponentType<FloatingActionButtonProps>;

// ─── HoverRevealCard ──────────────────────────────────────────────────────────

export interface HoverRevealCardProps {
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  tags?: string[];
  author?: string;
  date?: string;
  likes?: number;
  views?: number;
  featured?: boolean;
  onLike?: () => void;
  onShare?: () => void;
  onClick?: () => void;
  actionLabel?: string;
  className?: string;
  categoryColor?: string;
  children?: ReactNode;
}

export declare const HoverRevealCard: ComponentType<HoverRevealCardProps>;

// ─── Stepper ──────────────────────────────────────────────────────────────────

export interface StepperStep {
  id: string | number;
  title: string;
  description?: string;
  icon?: ComponentType<any>;
}

export interface StepperProps {
  steps?: StepperStep[];
  currentStep?: number;
  onStepChange?: (stepIndex: number) => void;
  allowClickNavigation?: boolean;
  showNavButtons?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  completedColor?: string;
  activeColor?: string;
  renderStepContent?: (step: StepperStep, index: number) => ReactNode;
}

export declare const Stepper: ComponentType<StepperProps>;

// ─── KanbanBoard ──────────────────────────────────────────────────────────────

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  tags?: string[];
  [key: string]: any;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  taskIds: string[];
}

export interface KanbanData {
  columns: Record<string, KanbanColumn>;
  tasks: Record<string, KanbanTask>;
  columnOrder: string[];
}

export interface KanbanBoardProps {
  data: KanbanData;
  onDataChange?: (data: KanbanData) => void;
  renderCard?: (task: KanbanTask) => ReactNode;
  onAddTask?: (columnId: string) => void;
  className?: string;
}

export interface TaskCardProps {
  task: KanbanTask;
  renderCard?: (task: KanbanTask) => ReactNode;
}

export declare const KanbanBoard: ComponentType<KanbanBoardProps>;
export declare const TaskCard: ComponentType<TaskCardProps>;

// ─── MultiSelectTagInput ──────────────────────────────────────────────────────

export interface MultiSelectTagInputProps {
  options?: string[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  allowCustom?: boolean;
  maxItems?: number;
  className?: string;
  disabled?: boolean;
  tagColor?: string;
}

export declare const MultiSelectTagInput: ComponentType<MultiSelectTagInputProps>;

// ─── Cards ────────────────────────────────────────────────────────────────────

export interface BasicCardProps {
  image?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface ProfileCardProps {
  avatar?: string;
  name?: string;
  role?: string;
  bio?: string;
  coverImage?: string;
  stats?: { label: string; value: string | number }[];
  socials?: { icon: ReactNode; href: string }[];
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export interface ProductCardProps {
  image: string;
  title?: string;
  description?: string;
  price?: number | string;
  originalPrice?: number | string;
  rating?: number;
  badge?: string;
  badgeColor?: string;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  className?: string;
}

export interface TestimonialCardProps {
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
  rating?: number;
  className?: string;
}

export interface BlogCardProps {
  image?: string;
  category?: string;
  categoryColor?: string;
  title?: string;
  excerpt?: string;
  author?: { name: string; avatar?: string };
  date?: string;
  readTime?: string;
  onClick?: () => void;
  className?: string;
}

export interface StatsCardProps {
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
  value?: string | number;
  label?: string;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export interface TeamCardProps {
  photo?: string;
  name?: string;
  role?: string;
  bio?: string;
  socials?: { icon: ReactNode; href: string }[];
  className?: string;
}

export interface FeatureCardProps {
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
  className?: string;
}

export interface NotificationCardProps {
  icon?: ReactNode;
  iconBg?: string;
  title?: string;
  message?: string;
  timestamp?: string;
  unread?: boolean;
  onDismiss?: () => void;
  onClick?: () => void;
  className?: string;
}

export interface ImageOverlayCardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
  align?: "bottom" | "center";
  height?: string;
  onClick?: () => void;
  className?: string;
}

export interface HorizontalCardProps {
  image?: string;
  title?: string;
  description?: string;
  meta?: ReactNode;
  action?: ReactNode;
  imagePosition?: "left" | "right";
  imageWidth?: string;
  onClick?: () => void;
  className?: string;
}

export interface PricingCardSingleProps {
  name?: string;
  description?: string;
  price?: number | string;
  period?: string;
  features?: string[];
  ctaLabel?: string;
  onSelect?: () => void;
  featured?: boolean;
  badge?: string;
  accentColor?: "blue" | "indigo" | "purple" | "green" | "red" | "amber" | "teal" | "pink";
  className?: string;
}

export interface MetricCardProps {
  label?: string;
  value?: string | number;
  data?: number[];
  barColor?: string;
  className?: string;
}

export interface InteractiveCardProps {
  front?: ReactNode;
  back?: ReactNode;
  interaction?: "flip" | "expand";
  height?: string;
  className?: string;
}

export interface GlassCardProps {
  children?: ReactNode;
  className?: string;
}

export declare const BasicCard: ComponentType<BasicCardProps>;
export declare const ProfileCard: ComponentType<ProfileCardProps>;
export declare const ProductCard: ComponentType<ProductCardProps>;
export declare const TestimonialCard: ComponentType<TestimonialCardProps>;
export declare const BlogCard: ComponentType<BlogCardProps>;
export declare const StatsCard: ComponentType<StatsCardProps>;
export declare const TeamCard: ComponentType<TeamCardProps>;
export declare const FeatureCard: ComponentType<FeatureCardProps>;
export declare const NotificationCard: ComponentType<NotificationCardProps>;
export declare const ImageOverlayCard: ComponentType<ImageOverlayCardProps>;
export declare const HorizontalCard: ComponentType<HorizontalCardProps>;
export declare const PricingCardSingle: ComponentType<PricingCardSingleProps>;
export declare const MetricCard: ComponentType<MetricCardProps>;
export declare const InteractiveCard: ComponentType<InteractiveCardProps>;
export declare const GlassCard: ComponentType<GlassCardProps>;

// ─── ProgressBarSteps ─────────────────────────────────────────────────────────

export interface ProgressStep {
  id: string | number;
  label: string;
  description?: string;
}

export interface ProgressBarStepsProps {
  steps?: ProgressStep[];
  currentStep?: number;
  onStepChange?: (stepId: number) => void;
  clickable?: boolean;
  activeColor?: string;
  className?: string;
  showProgress?: boolean;
  showNavButtons?: boolean;
}

export declare const ProgressBarSteps: ComponentType<ProgressBarStepsProps>;

// ─── ResizableSidebar ─────────────────────────────────────────────────────────

export interface SidebarItem {
  icon?: ComponentType<any>;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export interface ResizableSidebarProps {
  items?: SidebarItem[];
  header?: string;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultCollapsed?: boolean;
  showSearch?: boolean;
  resizable?: boolean;
  className?: string;
  onCollapse?: (isCollapsed: boolean) => void;
  onResize?: (width: number) => void;
  footer?: ReactNode;
  children?: ReactNode;
}

export declare const ResizableSidebar: ComponentType<ResizableSidebarProps>;

// ─── ScrollAwareNavbar ────────────────────────────────────────────────────────

export interface NavItem {
  name?: string;
  label?: string;
  href?: string;
  icon?: ReactNode | ComponentType<any>;
  active?: boolean;
}

export interface ScrollAwareNavbarProps {
  items?: NavItem[];
  logo?: ReactNode | string;
  cta?: ReactNode | { label: string; onClick?: () => void; variant?: string };
  behavior?: "auto-hide" | "sticky" | "scroll-shadow";
  scrollThreshold?: number;
  transparent?: boolean;
  blur?: boolean;
  activeItem?: string;
  className?: string;
  onNavigate?: (item: NavItem) => void;
  height?: number;
}

export declare const ScrollAwareNavbar: ComponentType<ScrollAwareNavbarProps>;

// ─── ScrollCarousel ───────────────────────────────────────────────────────────

export interface ScrollCarouselProps {
  items?: any[];
  renderItem?: (item: any, index: number, isActive: boolean) => ReactNode;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  pauseOnInteract?: number;
  itemsPerView?: number;
  gap?: number;
  scaleActive?: boolean;
  showEdgeFade?: boolean;
  cardClassName?: string;
  mode?: "snap" | "continuous";
  continuousSpeed?: number;
}

export declare const ScrollCarousel: ComponentType<ScrollCarouselProps>;

// ─── SearchBar ────────────────────────────────────────────────────────────────

export interface SearchBarProps {
  suggestions?: string[];
  onSearch?: (query: string) => void;
  onSuggestionSelect?: (suggestion: string) => void;
  placeholder?: string;
  debounceMs?: number;
  maxSuggestions?: number;
  recentSearches?: string[];
  trendingSearches?: string[];
  className?: string;
  value?: string;
  showIcon?: boolean;
}

export declare const SearchBar: ComponentType<SearchBarProps>;

// ─── TimeLine ─────────────────────────────────────────────────────────────────

export interface TimelineItem {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  icon?: ReactNode;
  color?: string;
  tag?: string;
  tagColor?: string;
}

export interface TimeLineProps {
  items?: TimelineItem[];
  variant?: "default" | "alternating" | "compact";
  lineColor?: string;
  className?: string;
  renderItem?: (item: TimelineItem, index: number) => ReactNode;
  animate?: boolean;
}

export interface TimelineCardProps {
  item: TimelineItem;
  colorMap?: Record<string, string>;
  tagColorMap?: Record<string, string>;
  align?: "left" | "right";
}

export declare const TimeLine: ComponentType<TimeLineProps>;
export declare const TimelineCard: ComponentType<TimelineCardProps>;

// ─── ToastNotification ────────────────────────────────────────────────────────

export interface ToastOptions {
  title?: string;
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  className?: string;
  style?: CSSProperties;
  titleClassName?: string;
  messageClassName?: string;
}

export interface ToastProviderProps {
  variant?: "minimal" | "modern" | "alert";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  maxToasts?: number;
  defaultDuration?: number;
  backdrop?: boolean;
  children: ReactNode;
}

export interface UseToastReturn {
  addToast: (options: ToastOptions) => void;
}

export declare const ToastProvider: ComponentType<ToastProviderProps>;
export declare function useToast(): UseToastReturn;

// ─── VirtualList ──────────────────────────────────────────────────────────────

export interface VirtualListProps {
  items?: any[];
  itemHeight?: number;
  height?: number;
  overscan?: number;
  renderItem?: (item: any, index: number, style: CSSProperties) => ReactNode;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  showScrollbar?: boolean;
}

export declare const VirtualList: ComponentType<VirtualListProps>;

// ─── DarkModeToggle ───────────────────────────────────────────────────────────

export interface DarkModeToggleProps {
  mode?: "light" | "dark" | "system";
  onChange?: (mode: "light" | "dark" | "system") => void;
  variant?: "icon" | "switch" | "segmented";
  size?: "sm" | "md" | "lg";
  className?: string;
  showSystem?: boolean;
}

export declare const DarkModeToggle: ComponentType<DarkModeToggleProps>;

// ─── NotificationBell ─────────────────────────────────────────────────────────

export interface Notification {
  id: string | number;
  title: string;
  message?: string;
  time?: string;
  read?: boolean;
  avatar?: string;
  type?: string;
  body?: string;
}

export interface NotificationBellProps {
  notifications?: Notification[];
  onRead?: (id: string | number) => void;
  onReadAll?: () => void;
  onClear?: () => void;
  onNotificationClick?: (notification: Notification) => void;
  renderDetail?: (notification: Notification, actions: { close: () => void }) => ReactNode;
  onDelete?: (id: string | number) => void;
  className?: string;
  maxVisible?: number;
  emptyMessage?: string;
  bellColor?: string;
  panelClassName?: string;
  modalClassName?: string;
  modalOverlayClassName?: string;
  modalStyle?: CSSProperties;
  panelStyle?: CSSProperties;
}

export declare const NotificationBell: ComponentType<NotificationBellProps>;

// ─── CommandPalette ───────────────────────────────────────────────────────────

export interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: ReactNode | ComponentType<any>;
  group?: string;
  shortcut?: string;
  description?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CommandPaletteItem[];
  onSelect?: (item: CommandPaletteItem) => void;
  placeholder?: string;
  recentItems?: string[];
  maxResults?: number;
  className?: string;
  enableHotkey?: boolean;
  onQueryChange?: (query: string) => void;
}

export declare const CommandPalette: ComponentType<CommandPaletteProps>;

// ─── DataTable ────────────────────────────────────────────────────────────────

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
}

export interface DataTableProps {
  columns?: DataTableColumn[];
  data?: any[];
  searchable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  selectable?: boolean;
  onSelectionChange?: (selectedRows: any[]) => void;
  onRowClick?: (row: any) => void;
  className?: string;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  rowKey?: (row: any, index: number) => string | number;
}

export declare const DataTable: ComponentType<DataTableProps>;

// ─── DatePicker ───────────────────────────────────────────────────────────────

export interface DateRange {
  start: Date;
  end: Date;
}

export interface DatePickerPreset {
  label: string;
  value: Date | Date[] | DateRange;
}

export interface DatePickerProps {
  value?: Date | Date[] | DateRange;
  onChange?: (value: Date | Date[] | DateRange) => void;
  mode?: "single" | "multiple" | "range";
  min?: Date;
  max?: Date;
  unavailableDates?: Date[];
  placeholder?: string;
  format?: string;
  disableDate?: (date: Date) => boolean;
  showToday?: boolean;
  rtl?: boolean;
  weekStart?: number;
  dayLabels?: string[];
  monthLabels?: string[];
  presets?: DatePickerPreset[];
  maxSelected?: number;
  className?: string;
  inputClassName?: string;
  calendarClassName?: string;
}

export declare const DatePicker: ComponentType<DatePickerProps>;

// ─── Drawer ───────────────────────────────────────────────────────────────────

export interface DrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: string | number;
  showOverlay?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  overlayClassName?: string;
  style?: CSSProperties;
}

export declare const Drawer: ComponentType<DrawerProps>;

// ─── FileUploader ─────────────────────────────────────────────────────────────

export interface FileUploaderProps {
  onUpload?: (files: File[]) => void;
  accept?: string[];
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  showPreview?: boolean;
  className?: string;
  dropzoneClassName?: string;
  label?: string;
  hint?: string;
  onError?: (error: { file: File; reason: string }) => void;
  renderFile?: (file: File, actions: { remove: () => void; progress?: number }) => ReactNode;
}

export declare const FileUploader: ComponentType<FileUploaderProps>;

// ─── InfiniteScroll ───────────────────────────────────────────────────────────

export interface InfiniteScrollProps {
  items?: any[];
  renderItem?: (item: any, index: number) => ReactNode;
  loadMore?: () => Promise<void> | void;
  hasMore?: boolean;
  loading?: boolean;
  threshold?: number;
  loader?: ReactNode;
  endMessage?: ReactNode;
  errorMessage?: ReactNode;
  showScrollTop?: boolean;
  scrollTopAt?: number;
  className?: string;
  itemClassName?: string;
  height?: string | number;
  width?: string | number;
  style?: CSSProperties;
  skeletonCount?: number;
  renderSkeleton?: (index: number) => ReactNode;
  itemKey?: (item: any, index: number) => string | number;
}

export declare const InfiniteScroll: ComponentType<InfiniteScrollProps>;

// ─── ImageCropper ─────────────────────────────────────────────────────────────

export interface CropResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
}

export interface ImageCropperProps {
  src: string;
  isOpen?: boolean;
  onClose?: () => void;
  onCrop?: (result: CropResult) => void;
  aspectRatio?: number | null;
  quality?: number;
  outputType?: string;
  minZoom?: number;
  maxZoom?: number;
  showGrid?: boolean;
  circular?: boolean;
  showPreview?: boolean;
  className?: string;
}

export declare const ImageCropper: ComponentType<ImageCropperProps>;

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

export interface ConfirmDialogProps {
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger" | "warning" | "info" | "success";
  icon?: ComponentType<any>;
  className?: string;
  overlayClassName?: string;
  showIcon?: boolean;
  closeOnOverlay?: boolean;
  showButtons?: boolean;
  iconColor?: string;
  iconBgColor?: string;
  titleColor?: string;
  messageColor?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  children?: ReactNode;
}

export interface ConfirmOptions {
  title?: string;
  message?: string;
  variant?: "default" | "danger" | "warning" | "info" | "success";
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface UseConfirmReturn {
  confirm: (options?: ConfirmOptions) => Promise<boolean>;
  ConfirmDialogPortal: ComponentType;
}

export declare const ConfirmDialog: ComponentType<ConfirmDialogProps>;
export declare function useConfirm(): UseConfirmReturn;

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode | ComponentType<any>;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  maxVisible?: number;
  separator?: ReactNode;
  showHomeIcon?: boolean;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => ReactNode;
}

export declare const Breadcrumbs: ComponentType<BreadcrumbsProps>;

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export interface SkeletonProps {
  variant?: "text" | "circle" | "rect" | "card" | "avatar" | "list" | "table" | "button" | "banner" | "profile";
  width?: string | number;
  height?: string | number;
  lines?: number;
  rows?: number;
  cols?: number;
  animation?: "pulse" | "wave" | "none";
  borderRadius?: number | string;
  className?: string;
  loading?: boolean;
  children?: ReactNode;
}

export interface SkeletonGroupProps extends SkeletonProps {}

export declare const Skeleton: ComponentType<SkeletonProps>;
export declare const SkeletonGroup: ComponentType<SkeletonGroupProps>;

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export interface Tab {
  key: string;
  label: string;
  icon?: ReactNode | ComponentType<any>;
  badge?: string | number;
  disabled?: boolean;
  content?: ReactNode;
}

export interface TabsProps {
  tabs?: Tab[];
  activeKey?: string;
  onChange?: (key: string) => void;
  defaultKey?: string;
  variant?: "underline" | "pills" | "boxed";
  orientation?: "horizontal" | "vertical";
  lazy?: boolean;
  animated?: boolean;
  className?: string;
  tabsClassName?: string;
  panelClassName?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  tabWidth?: "auto" | "equal" | string;
  fontSize?: string;
}

export declare const Tabs: ComponentType<TabsProps>;

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  hideDelay?: number;
  arrow?: boolean;
  className?: string;
  trigger?: "hover" | "click" | "focus";
  disabled?: boolean;
  offset?: number;
  maxWidth?: number;
}

export declare const Tooltip: ComponentType<TooltipProps>;

// ─── OTPInput ─────────────────────────────────────────────────────────────────

export interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  autoFocus?: boolean;
  masked?: boolean;
  type?: "number" | "text";
  disabled?: boolean;
  error?: boolean;
  className?: string;
  inputClassName?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  wrapAfter?: number;
}

export declare const OTPInput: ComponentType<OTPInputProps>;

// ─── RatingInput ──────────────────────────────────────────────────────────────

export interface RatingInputProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  allowHalf?: boolean;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  emptyColor?: string;
  showValue?: boolean;
  labels?: string[];
  renderIcon?: (index: number, state: { isFilled: boolean; isHalf: boolean; isHovered: boolean; size: string }) => ReactNode;
  allowClear?: boolean;
  className?: string;
  defaultValue?: number;
}

export declare const RatingInput: ComponentType<RatingInputProps>;

// ─── ColorPicker ──────────────────────────────────────────────────────────────

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  defaultValue?: string;
  presets?: string[];
  showInput?: boolean;
  showPresets?: boolean;
  showAlpha?: boolean;
  triggerClassName?: string;
  popoverClassName?: string;
  inline?: boolean;
  className?: string;
}

export declare const ColorPicker: ComponentType<ColorPickerProps>;

// ─── TreeView ─────────────────────────────────────────────────────────────────

export interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  icon?: ReactNode | ComponentType<any>;
  disabled?: boolean;
}

export interface TreeViewProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode, selectedIds: Set<string | number>) => void;
  multiSelect?: boolean;
  showCheckboxes?: boolean;
  defaultExpanded?: Set<string | number> | (string | number)[];
  defaultSelected?: Set<string | number> | (string | number)[];
  expandOnSelect?: boolean;
  renderLabel?: (node: TreeNode, state: { isExpanded: boolean; isSelected: boolean; depth: number }) => ReactNode;
  showIcons?: boolean;
  showLines?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export declare const TreeView: ComponentType<TreeViewProps>;

// ─── Marquee ──────────────────────────────────────────────────────────────────

export interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  speed?: number;
  pauseOnHover?: boolean;
  gap?: number;
  reverse?: boolean;
  gradient?: boolean;
  gradientWidth?: number;
  className?: string;
}

export declare const Marquee: ComponentType<MarqueeProps>;

// ─── SpotlightCard ────────────────────────────────────────────────────────────

export interface SpotlightCardProps {
  children: ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  borderGlow?: boolean;
  borderColor?: string;
  tilt?: boolean;
  maxTilt?: number;
  className?: string;
  onClick?: () => void;
}

export declare const SpotlightCard: ComponentType<SpotlightCardProps>;

// ─── AnimatedCounter ──────────────────────────────────────────────────────────

export interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  easing?: "linear" | "easeOut" | "easeInOut" | "spring";
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  triggerOnView?: boolean;
  delay?: number;
  formatValue?: (value: number) => string;
  className?: string;
  onComplete?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export declare const AnimatedCounter: ComponentType<AnimatedCounterProps>;

// ─── CopyToClipboard ──────────────────────────────────────────────────────────

export interface CopyToClipboardProps {
  text: string;
  children?: ReactNode;
  onCopy?: (text: string, success: boolean) => void;
  resetDelay?: number;
  label?: string;
  successLabel?: string;
  variant?: "button" | "icon" | "minimal" | "code";
  size?: "sm" | "md" | "lg";
  className?: string;
  showTooltip?: boolean;
}

export declare const CopyToClipboard: ComponentType<CopyToClipboardProps>;

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

export interface Avatar {
  src?: string;
  name: string;
  status?: "online" | "offline" | "busy" | "away";
}

export interface AvatarGroupProps {
  avatars?: Avatar[];
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "stack" | "grid";
  spacing?: number;
  bordered?: boolean;
  onAvatarClick?: (avatar: Avatar, index: number) => void;
  onOverflowClick?: (hiddenAvatars: Avatar[]) => void;
  className?: string;
  showStatus?: boolean;
}

export declare const AvatarGroup: ComponentType<AvatarGroupProps>;

// ─── Modal ────────────────────────────────────────────────────────────────────

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  animation?: "scale" | "slide-up" | "slide-down" | "fade" | "none";
  centered?: boolean;
  className?: string;
  overlayClassName?: string;
  overlayOpacity?: number;
  overlayColor?: string;
}

export declare const Modal: ComponentType<ModalProps>;

// ─── Popover ──────────────────────────────────────────────────────────────────

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  triggerMode?: "click" | "hover";
  hoverDelay?: number;
  hoverCloseDelay?: number;
  placement?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  showArrow?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  offset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export declare const Popover: ComponentType<PopoverProps>;

// ─── Select ───────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string | number;
  label: string;
  group?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options?: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  grouped?: boolean;
  maxSelected?: number;
  renderOption?: (option: SelectOption, isSelected: boolean) => ReactNode;
  className?: string;
}

export declare const Select: ComponentType<SelectProps>;

// ─── RangeSlider ──────────────────────────────────────────────────────────────

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  range?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  showValue?: boolean;
  minGap?: number;
  disabled?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
  formatValue?: (value: number) => string;
  className?: string;
}

export declare const RangeSlider: ComponentType<RangeSliderProps>;

// ─── PasswordStrength ─────────────────────────────────────────────────────────

export interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

export type PasswordStrengthLevel = "empty" | "weak" | "fair" | "strong" | "very-strong";

export interface PasswordStrengthProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  showRules?: boolean;
  showMeter?: boolean;
  showToggle?: boolean;
  minLength?: number;
  customRules?: PasswordRule[];
  onStrengthChange?: (strength: PasswordStrengthLevel) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export declare const PasswordStrength: ComponentType<PasswordStrengthProps>;

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  showJumpTo?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "minimal";
  disabled?: boolean;
  className?: string;
}

export declare const Pagination: ComponentType<PaginationProps>;

// ─── Spinner ──────────────────────────────────────────────────────────────────

export interface SpinnerProps {
  variant?: "ring" | "dots" | "bars" | "orbit" | "pulse" | "dual-ring" | "ripple" | "square-spin" | "gradient" | "chase" | "bounce" | "wave" | "fold";
  size?: number | string;
  color?: string;
  speed?: number;
  label?: string;
  overlay?: boolean;
  className?: string;
}

export declare const Spinner: ComponentType<SpinnerProps>;

// ─── SortableList ─────────────────────────────────────────────────────────────

export interface SortableItem {
  id: string | number;
  [key: string]: any;
}

export interface SortableListProps {
  items?: SortableItem[];
  onReorder?: (newItems: SortableItem[]) => void;
  renderItem?: (item: SortableItem, index: number, options: { handleProps: Record<string, any> }) => ReactNode;
  showHandle?: boolean;
  direction?: "vertical" | "horizontal";
  disabled?: boolean;
  animationDuration?: number;
  className?: string;
  itemClassName?: string;
}

export declare const SortableList: ComponentType<SortableListProps>;

// ─── Badge ────────────────────────────────────────────────────────────────────

export interface BadgeProps {
  children?: ReactNode;
  content?: number | string;
  variant?: "default" | "dot" | "outline";
  color?: "red" | "blue" | "green" | "yellow" | "gray" | "purple";
  max?: number;
  pulse?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  show?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export declare const Badge: ComponentType<BadgeProps>;

// ─── DarkModeProvider & useDarkMode ───────────────────────────────────────────

export interface DarkModeProviderProps {
  children: ReactNode;
  defaultMode?: "light" | "dark" | "system";
  storageKey?: string;
}

export interface UseDarkModeReturn {
  mode: "light" | "dark" | "system";
  setMode: (mode: "light" | "dark" | "system") => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

export declare const DarkModeProvider: ComponentType<DarkModeProviderProps>;
export declare function useDarkMode(): UseDarkModeReturn;

// ─── Animation Utilities ──────────────────────────────────────────────────────

export interface AnimateOptions {
  duration?: number;
  easing?: string;
}

export interface UseAnimateReturn {
  value: number;
  start: (to: number, options?: AnimateOptions) => Promise<void>;
  stop: () => void;
}

export interface UseTransitionOptions {
  duration?: number;
}

export interface UseTransitionReturn {
  mounted: boolean;
  stage: "enter" | "leave" | "idle";
  isEntering: boolean;
  isVisible: boolean;
}

export interface UseAnimatedListOptions {
  key?: string;
  duration?: number;
}

export interface UseScrollStateOptions {
  threshold?: number;
}

export interface ScrollState {
  scrollY: number;
  scrollX: number;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  velocity: number;
}

export declare function useAnimate(initialValue?: number): UseAnimateReturn;
export declare function useTransition(isOpen: boolean, options?: UseTransitionOptions): UseTransitionReturn;
export declare function useAnimatedList<T>(items: T[], options?: UseAnimatedListOptions): (T & { _animState: "entering" | "present" | "exiting" })[];
export declare function useScrollState(options?: UseScrollStateOptions): ScrollState;
export declare const animStyles: Record<string, any>;
