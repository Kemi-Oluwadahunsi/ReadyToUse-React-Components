import { TreeView } from "../components/TreeView";

const fileSystemData = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "Button.tsx", label: "Button.tsx" },
          { id: "Modal.tsx", label: "Modal.tsx" },
          { id: "Sidebar.tsx", label: "Sidebar.tsx" },
        ],
      },
      {
        id: "hooks",
        label: "hooks",
        children: [
          { id: "useAuth.ts", label: "useAuth.ts" },
          { id: "useTheme.ts", label: "useTheme.ts" },
        ],
      },
      {
        id: "utils",
        label: "utils",
        children: [
          { id: "helpers.ts", label: "helpers.ts" },
          { id: "constants.ts", label: "constants.ts" },
        ],
      },
      { id: "App.tsx", label: "App.tsx" },
      { id: "index.tsx", label: "index.tsx" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "favicon.ico", label: "favicon.ico" },
      { id: "index.html", label: "index.html" },
    ],
  },
  { id: "package.json", label: "package.json" },
  { id: "tsconfig.json", label: "tsconfig.json" },
  { id: "README.md", label: "README.md" },
];

const orgChartData = [
  {
    id: "ceo",
    label: "CEO — Jane Doe",
    children: [
      {
        id: "cto",
        label: "CTO — John Smith",
        children: [
          { id: "dev-lead", label: "Dev Lead — Amy Park" },
          { id: "qa-lead", label: "QA Lead — Sam Lee" },
        ],
      },
      {
        id: "cfo",
        label: "CFO — Carol White",
        children: [
          { id: "accounting", label: "Accounting — Mike Brown" },
        ],
      },
      {
        id: "cmo",
        label: "CMO — David Green",
        children: [
          { id: "marketing", label: "Marketing — Lisa Ray" },
          { id: "design", label: "Design — Tom Hill" },
        ],
      },
    ],
  },
];

export default {
  title: "Data Display/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  argTypes: {
    multiSelect: { control: "boolean" },
    showIcons: { control: "boolean" },
    showLines: { control: "boolean" },
    expandOnSelect: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export const Default = {
  args: {
    data: fileSystemData,
    defaultExpanded: ["src", "components"],
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeView
  data={[
    {
      id: "src",
      label: "src",
      children: [
        { id: "components", label: "components", children: [
          { id: "Button.tsx", label: "Button.tsx" },
          { id: "Modal.tsx", label: "Modal.tsx" },
        ]},
        { id: "App.tsx", label: "App.tsx" },
      ],
    },
  ]}
  defaultExpanded={["src", "components"]}
/>`,
      },
    },
  },
};

export const MultiSelect = {
  args: {
    data: fileSystemData,
    multiSelect: true,
    showCheckboxes: true,
    defaultExpanded: ["src", "components"],
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeView
  data={treeData}
  multiSelect
  showCheckboxes
  onSelect={(node, selectedIds) => console.log("Selected:", selectedIds)}
/>`,
      },
    },
  },
};

export const OrgChart = {
  args: {
    data: orgChartData,
    defaultExpanded: ["ceo", "cto", "cfo", "cmo"],
    showIcons: false,
    showLines: true,
    size: "lg",
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeView
  data={orgChartData}
  defaultExpanded={["ceo", "cto", "cfo", "cmo"]}
  showIcons={false}
  size="lg"
/>`,
      },
    },
  },
};

export const SmallSize = {
  args: {
    data: fileSystemData,
    size: "sm",
    defaultExpanded: ["src"],
  },
  parameters: {
    docs: {
      source: {
        code: `<TreeView data={treeData} size="sm" />`,
      },
    },
  },
};
