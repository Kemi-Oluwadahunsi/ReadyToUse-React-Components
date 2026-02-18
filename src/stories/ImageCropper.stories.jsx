import { useState } from "react";
import { ImageCropper } from "../components/ImageCropper";

const ImageCropperDemo = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [croppedUrl, setCroppedUrl] = useState(null);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
      >
        Open Image Cropper
      </button>

      {croppedUrl && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">Cropped result:</p>
          <img
            src={croppedUrl}
            alt="Cropped"
            className="max-w-xs rounded-lg border border-gray-200 dark:border-zinc-700"
          />
        </div>
      )}

      <ImageCropper
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCrop={({ dataUrl }) => {
          setCroppedUrl(dataUrl);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default {
  title: "Data Display/ImageCropper",
  component: ImageCropper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { ImageCropper } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    aspectRatio: { control: { type: "number", min: 0, max: 3, step: 0.1 } },
    circular: { control: "boolean" },
    showGrid: { control: "boolean" },
    quality: { control: { type: "number", min: 0.1, max: 1, step: 0.05 } },
    minZoom: { control: { type: "number", min: 0.5, max: 2 } },
    maxZoom: { control: { type: "number", min: 2, max: 10 } },
  },
};

export const Default = {
  render: ImageCropperDemo,
  args: {
    src: "https://picsum.photos/800/600",
    aspectRatio: 1,
    showGrid: true,
    circular: false,
    quality: 0.92,
  },
  parameters: {
    docs: {
      source: {
        code: `const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>Crop Image</button>

<ImageCropper
  src="https://picsum.photos/800/600"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onCrop={({ blob, dataUrl }) => {
    console.log("Cropped!", dataUrl);
    setIsOpen(false);
  }}
  aspectRatio={1}
/>`,
      },
    },
  },
};

export const CircularCrop = {
  render: ImageCropperDemo,
  args: {
    src: "https://picsum.photos/800/600",
    aspectRatio: 1,
    circular: true,
    showGrid: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<ImageCropper
  src="https://picsum.photos/800/600"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onCrop={onCrop}
  aspectRatio={1}
  circular
/>`,
      },
    },
  },
};

export const WideAspectRatio = {
  render: ImageCropperDemo,
  args: {
    src: "https://picsum.photos/800/600",
    aspectRatio: 16 / 9,
    showGrid: true,
    circular: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<ImageCropper
  src="https://picsum.photos/800/600"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onCrop={onCrop}
  aspectRatio={16 / 9}
/>`,
      },
    },
  },
};

export const FreeCrop = {
  render: ImageCropperDemo,
  args: {
    src: "https://picsum.photos/800/600",
    aspectRatio: null,
    showGrid: true,
    circular: false,
    maxZoom: 5,
  },
  parameters: {
    docs: {
      source: {
        code: `<ImageCropper
  src="https://picsum.photos/800/600"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onCrop={onCrop}
  aspectRatio={null}
  maxZoom={5}
/>`,
      },
    },
  },
};
