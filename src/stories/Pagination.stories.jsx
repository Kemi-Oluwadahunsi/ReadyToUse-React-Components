import { useState } from "react";
import { Pagination } from "../components/Pagination";

export default {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline", "minimal"] },
    showFirstLast: { control: "boolean" },
    showPrevNext: { control: "boolean" },
    showPageSize: { control: "boolean" },
    showJumpTo: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Default = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`,
      },
    },
  },
};

export const OutlineVariant = {
  args: {
    totalPages: 20,
    currentPage: 5,
    variant: "outline",
    siblingCount: 2,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<Pagination
  currentPage={page}
  totalPages={20}
  variant="outline"
  siblingCount={2}
  onPageChange={setPage}
/>`,
      },
    },
  },
};

export const WithPageSizeAndJumpTo = {
  args: {
    totalPages: 50,
    currentPage: 1,
    showPageSize: true,
    showJumpTo: true,
    pageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    const [pageSize, setPageSize] = useState(args.pageSize);
    return (
      <Pagination
        {...args}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Pagination
  currentPage={page}
  totalPages={50}
  showPageSize
  showJumpTo
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>`,
      },
    },
  },
};

export const SmallMinimal = {
  args: {
    totalPages: 8,
    currentPage: 3,
    size: "sm",
    variant: "minimal",
    showFirstLast: false,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<Pagination
  currentPage={page}
  totalPages={8}
  size="sm"
  variant="minimal"
  showFirstLast={false}
  onPageChange={setPage}
/>`,
      },
    },
  },
};
