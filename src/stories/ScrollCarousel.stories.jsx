import { ScrollCarousel } from "../components/ScrollCarousel";

export default {
  title: "Navigation/ScrollCarousel",
  component: ScrollCarousel,
  tags: ["autodocs"],
  argTypes: {
    autoScroll: { control: "boolean" },
    autoScrollInterval: { control: { type: "number", min: 1000, max: 10000 } },
    showDots: { control: "boolean" },
    showArrows: { control: "boolean" },
    showEdgeFade: { control: "boolean" },
    scaleActive: { control: "boolean" },
    gap: { control: { type: "number", min: 0, max: 48 } },
    itemsPerView: { control: { type: "number", min: 1, max: 4 } },
  },
};

const cardItems = [
  { id: 1, title: "Getting Started", description: "Learn the basics of ReadyUI and set up your first project in minutes.", subtitle: "Beginner" },
  { id: 2, title: "Components", description: "Explore beautifully crafted, ready-to-use React components with Tailwind CSS.", subtitle: "Reference" },
  { id: 3, title: "Customization", description: "Tailor every component to match your brand using Tailwind utility classes.", subtitle: "Guide" },
  { id: 4, title: "Dark Mode", description: "All components support dark mode out of the box with zero extra config.", subtitle: "Feature" },
  { id: 5, title: "Performance", description: "Lightweight components optimized for speed and minimal bundle size.", subtitle: "Advanced" },
  { id: 6, title: "Accessibility", description: "Built with ARIA best practices for an inclusive user experience.", subtitle: "Core" },
];

const imageItems = [
  { id: 1, title: "Mountain Vista", image: "https://picsum.photos/seed/mount/600/400", description: "A breathtaking view of the mountain range at sunrise." },
  { id: 2, title: "Ocean Breeze", image: "https://picsum.photos/seed/ocean/600/400", description: "Feel the calm of the deep blue ocean waves." },
  { id: 3, title: "Forest Path", image: "https://picsum.photos/seed/forest/600/400", description: "Walk through a serene forest trail in autumn." },
  { id: 4, title: "City Lights", image: "https://picsum.photos/seed/city/600/400", description: "The dazzling skyline of a modern city at night." },
  { id: 5, title: "Desert Dunes", image: "https://picsum.photos/seed/desert/600/400", description: "Golden sand dunes stretching to the horizon." },
];

export const Default = {
  args: {
    items: cardItems,
    autoScroll: true,
    showDots: true,
    showArrows: true,
    showEdgeFade: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<ScrollCarousel
  items={[
    { id: 1, title: "Getting Started", description: "Learn the basics...", subtitle: "Beginner" },
    { id: 2, title: "Components", description: "Explore components...", subtitle: "Reference" },
    { id: 3, title: "Customization", description: "Tailor every component...", subtitle: "Guide" },
  ]}
  autoScroll
  showDots
  showArrows
/>`,
      },
    },
  },
};

export const ImageCards = {
  args: {
    items: imageItems,
    autoScroll: true,
    autoScrollInterval: 5000,
    showDots: true,
    showArrows: true,
    showEdgeFade: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<ScrollCarousel
  items={[
    { id: 1, title: "Mountain Vista", image: "https://picsum.photos/600/400", description: "..." },
    { id: 2, title: "Ocean Breeze", image: "https://picsum.photos/600/400", description: "..." },
  ]}
  autoScroll
  autoScrollInterval={5000}
/>`,
      },
    },
  },
};

export const CustomRenderItem = {
  args: {
    items: cardItems,
    autoScroll: false,
    showDots: true,
    showArrows: true,
    showEdgeFade: false,
    renderItem: (item, index, isActive) => (
      <div
        className={`p-6 rounded-2xl border transition-all duration-300 ${
          isActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
            : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
        }`}
      >
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0{index + 1}</div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `<ScrollCarousel
  items={items}
  autoScroll={false}
  showEdgeFade={false}
  renderItem={(item, index, isActive) => (
    <div className={isActive ? "border-blue-500" : "border-gray-200"}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  )}
/>`,
      },
    },
  },
};

export const SingleViewNoAuto = {
  args: {
    items: cardItems.slice(0, 4),
    autoScroll: false,
    showDots: true,
    showArrows: true,
    itemsPerView: 1,
    gap: 16,
    showEdgeFade: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<ScrollCarousel
  items={items}
  autoScroll={false}
  itemsPerView={1}
  gap={16}
  showEdgeFade={false}
/>`,
      },
    },
  },
};
