import { FileUploader } from "../components/FileUploader";

export default {
  title: "Inputs/FileUploader",
  component: FileUploader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { FileUploader } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    multiple: { control: "boolean", description: "Allow multiple files" },
    showPreview: { control: "boolean", description: "Show file previews" },
    maxFiles: { control: "number", description: "Maximum number of files" },
    maxSize: { control: "number", description: "Max file size in bytes" },
    label: { control: "text", description: "Main label text" },
    hint: { control: "text", description: "Secondary hint text" },
    onUpload: { action: "uploaded" },
    onError: { action: "error" },
  },
};

/* ── Default ── */
export const Default = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<FileUploader
  onUpload={(files) => console.log("Files:", files)}
/>`,
      },
    },
  },
};

/* ── Images Only ── */
export const ImagesOnly = {
  args: {
    accept: ["image/*"],
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    label: "Upload images",
    hint: "PNG, JPG, GIF up to 5MB — max 5 files",
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUploader
  accept={["image/*"]}
  maxFiles={5}
  maxSize={5 * 1024 * 1024}
  label="Upload images"
  hint="PNG, JPG, GIF up to 5MB — max 5 files"
  onUpload={(files) => console.log(files)}
/>`,
      },
    },
  },
};

/* ── Single PDF Upload ── */
export const SinglePDF = {
  args: {
    accept: [".pdf"],
    multiple: false,
    maxSize: 20 * 1024 * 1024,
    label: "Upload your resume",
    hint: "PDF only — up to 20MB",
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUploader
  accept={[".pdf"]}
  multiple={false}
  maxSize={20 * 1024 * 1024}
  label="Upload your resume"
  hint="PDF only — up to 20MB"
  onUpload={(files) => console.log(files)}
/>`,
      },
    },
  },
};

/* ── No Preview ── */
export const NoPreview = {
  args: {
    showPreview: false,
    label: "Attach files",
    hint: "Files won't be previewed",
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUploader showPreview={false} label="Attach files" onUpload={handleUpload} />`,
      },
    },
  },
};
