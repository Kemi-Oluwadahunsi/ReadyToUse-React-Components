import { DataTable } from "../components/DataTable";

const sampleColumns = [
  { key: "id", label: "ID", width: "60px", align: "center" },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (val) => (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          val === "Active"
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300"
        }`}
      >
        {val}
      </span>
    ),
  },
];

const sampleData = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: [
    "Alice Johnson", "Bob Smith", "Carol Lee", "Dan Brown", "Eva Garcia",
    "Frank Miller", "Grace Kim", "Hank Wilson", "Ivy Chen", "Jake Martinez",
  ][i % 10],
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Editor", "Viewer", "Admin", "Editor"][i % 5],
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

export default {
  title: "Data Display/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { DataTable } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    searchable: { control: "boolean" },
    paginated: { control: "boolean" },
    selectable: { control: "boolean" },
    striped: { control: "boolean" },
    hoverable: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    pageSize: { control: { type: "select" }, options: [5, 10, 20, 50] },
    emptyMessage: { control: "text" },
  },
};

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    pageSize: 10,
  },
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  columns={[
    { key: "id", label: "ID", width: "60px", align: "center" },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ]}
  data={[
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
    // ...more rows
  ]}
  pageSize={10}
/>`,
      },
    },
  },
};

export const WithSelection = {
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 15),
    selectable: true,
    pageSize: 10,
  },
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  columns={columns}
  data={data}
  selectable
  onSelectionChange={(rows) => console.log("Selected:", rows)}
/>`,
      },
    },
  },
};

export const NoPagination = {
  args: {
    columns: sampleColumns.slice(0, 3),
    data: sampleData.slice(0, 8),
    paginated: false,
    searchable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  columns={columns}
  data={data}
  paginated={false}
  searchable
/>`,
      },
    },
  },
};

export const EmptyState = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: "No users found. Try adjusting your filters.",
  },
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  columns={columns}
  data={[]}
  emptyMessage="No users found. Try adjusting your filters."
/>`,
      },
    },
  },
};
