import { Breadcrumbs } from "../components/Breadcrumbs";
import { Home, Settings, FileText, Folder } from "lucide-react";

export default {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {
    maxVisible: {
      control: { type: "number", min: 2, max: 10 },
      description: "Max items before collapsing middle items into a dropdown",
    },
    showHomeIcon: {
      control: "boolean",
      description: "Show home icon on the first breadcrumb item",
    },
    className: { control: "text" },
    itemClassName: { control: "text" },
    activeClassName: { control: "text" },
  },
};

const basicItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones" },
];

export const Default = {
  args: {
    items: basicItems,
    showHomeIcon: true,
    maxVisible: 4,
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Smartphones" },
  ]}
  showHomeIcon
/>`,
      },
    },
  },
};

export const WithIcons = {
  args: {
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Documents", href: "/settings/docs", icon: Folder },
      { label: "Privacy Policy", icon: FileText },
    ],
    showHomeIcon: false,
  },
  parameters: {
    docs: {
      source: {
        code: `import { Home, Settings, Folder, FileText } from "lucide-react";

<Breadcrumbs
  items={[
    { label: "Home", href: "/", icon: Home },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Documents", href: "/settings/docs", icon: Folder },
    { label: "Privacy Policy", icon: FileText },
  ]}
  showHomeIcon={false}
/>`,
      },
    },
  },
};

export const CollapsedOverflow = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Sub-category", href: "/category/sub" },
      { label: "Brand", href: "/category/sub/brand" },
      { label: "Product Line", href: "/category/sub/brand/line" },
      { label: "Model", href: "/category/sub/brand/line/model" },
      { label: "Details" },
    ],
    maxVisible: 3,
    showHomeIcon: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Category", href: "/category" },
    { label: "Sub-category", href: "/category/sub" },
    { label: "Brand", href: "/category/sub/brand" },
    { label: "Product Line", href: "/category/sub/brand/line" },
    { label: "Model", href: "/category/sub/brand/line/model" },
    { label: "Details" },
  ]}
  maxVisible={3}
/>`,
      },
    },
  },
};

export const CustomSeparator = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "2024", href: "/blog/2024" },
      { label: "My Post" },
    ],
    separator: "/",
    showHomeIcon: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "2024", href: "/blog/2024" },
    { label: "My Post" },
  ]}
  separator="/"
/>`,
      },
    },
  },
};
