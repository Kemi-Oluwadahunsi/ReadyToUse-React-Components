import { HoverRevealCard } from "../components/HoverRevealCard";

export default {
  title: "Utilities/HoverRevealCard",
  component: HoverRevealCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { HoverRevealCard } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card title" },
    description: { control: "text", description: "Card description" },
    image: { control: "text", description: "Image URL" },
    category: { control: "text", description: "Category badge text" },
    actionLabel: { control: "text", description: "Call-to-action button label" },
    featured: { control: "boolean", description: "Show featured badge" },
    likes: { control: "number", description: "Like count" },
    views: { control: "number", description: "View count" },
  },
  decorators: [
    (Story) => (
      <div className="p-8" style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    title: "Mountain Sunrise",
    description: "A breathtaking view of golden light spilling over misty peaks at dawn.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    category: "Nature",
    tags: ["landscape", "mountains", "sunrise"],
    author: "Alex Turner",
    date: "Jan 15, 2026",
    likes: 234,
    views: 1820,
    actionLabel: "View Details",
  },
  parameters: {
    docs: {
      source: {
        code: `<HoverRevealCard
  title="Mountain Sunrise"
  description="A breathtaking view of golden light over misty peaks."
  image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
  category="Nature"
  tags={["landscape", "mountains", "sunrise"]}
  author="Alex Turner"
  date="Jan 15, 2026"
  likes={234}
  views={1820}
  actionLabel="View Details"
  onLike={(liked) => console.log(liked)}
  onShare={(data) => console.log(data)}
/>`,
      },
    },
  },
};

export const FeaturedCard = {
  args: {
    title: "Design Systems at Scale",
    description: "How top companies build and maintain component libraries for hundreds of engineers.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
    category: "Engineering",
    tags: ["design-systems", "frontend", "react"],
    featured: true,
    author: "Sarah Chen",
    date: "Feb 3, 2026",
    likes: 412,
    views: 5600,
    actionLabel: "Read Article",
    onLike: (liked) => console.log("liked:", liked),
    onShare: (data) => console.log("share:", data),
  },
  parameters: {
    docs: {
      source: {
        code: `<HoverRevealCard
  title="Design Systems at Scale"
  description="How top companies build and maintain component libraries."
  image="https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop"
  category="Engineering"
  featured
  author="Sarah Chen"
  actionLabel="Read Article"
  onLike={(liked) => console.log(liked)}
  onShare={(data) => console.log(data)}
/>`,
      },
    },
  },
};

export const WithInteractions = {
  args: {
    title: "Urban Architecture",
    description: "Exploring the geometry and light of modern city buildings.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop",
    category: "Architecture",
    tags: ["urban", "buildings", "design", "photography", "city"],
    author: "Marcus Reid",
    date: "Dec 20, 2025",
    likes: 89,
    views: 720,
    onLike: (liked) => console.log("liked:", liked),
    onShare: (data) => console.log("share:", data),
    onClick: () => console.log("Card clicked"),
  },
  parameters: {
    docs: {
      source: {
        code: `<HoverRevealCard
  title="Urban Architecture"
  description="Exploring the geometry and light of modern city buildings."
  image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop"
  category="Architecture"
  tags={["urban", "buildings", "design", "photography", "city"]}
  onLike={(liked) => console.log(liked)}
  onShare={(data) => console.log(data)}
  onClick={() => console.log("Card clicked")}
/>`,
      },
    },
  },
};

export const MinimalCard = {
  args: {
    title: "Simple Gallery Item",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
    actionLabel: "Open",
    onClick: () => console.log("Opened"),
  },
  parameters: {
    docs: {
      source: {
        code: `<HoverRevealCard
  title="Simple Gallery Item"
  image="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop"
  actionLabel="Open"
  onClick={() => console.log("Opened")}
/>`,
      },
    },
  },
};
