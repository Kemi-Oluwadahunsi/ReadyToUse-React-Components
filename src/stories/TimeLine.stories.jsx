import { TimeLine } from "../components/TimeLine";
import { Rocket, Star, CheckCircle, Zap, Award } from "lucide-react";

const defaultItems = [
  {
    id: 1,
    title: "Project Kickoff",
    description: "Initial planning meeting with stakeholders to define project scope and objectives.",
    date: "Jan 15, 2025",
    color: "blue",
    tag: "Planning",
    tagColor: "blue",
    location: "Conference Room A",
  },
  {
    id: 2,
    title: "Design Phase Complete",
    description: "All wireframes and UI mockups approved by the design review board.",
    date: "Feb 20, 2025",
    color: "purple",
    tag: "Design",
    tagColor: "purple",
  },
  {
    id: 3,
    title: "Development Sprint 1",
    description: "Core features implemented including authentication, dashboard, and API integration.",
    date: "Mar 10, 2025",
    color: "green",
    tag: "Development",
    tagColor: "green",
  },
  {
    id: 4,
    title: "Beta Release",
    description: "First beta version deployed to staging environment for internal testing.",
    date: "Apr 5, 2025",
    color: "orange",
    tag: "Release",
    tagColor: "orange",
  },
  {
    id: 5,
    title: "Public Launch",
    description: "Product officially launched to the public with marketing campaign.",
    date: "May 1, 2025",
    color: "red",
    tag: "Launch",
    tagColor: "red",
  },
];

const iconItems = [
  { id: 1, title: "Idea Born", description: "The concept was first discussed.", date: "Dec 2024", color: "blue", icon: <Star className="h-4 w-4" /> },
  { id: 2, title: "Prototype Built", description: "Working prototype completed.", date: "Jan 2025", color: "purple", icon: <Rocket className="h-4 w-4" /> },
  { id: 3, title: "Testing Complete", description: "All tests passing with 95% coverage.", date: "Feb 2025", color: "green", icon: <CheckCircle className="h-4 w-4" /> },
  { id: 4, title: "Performance Optimised", description: "Load times reduced by 60%.", date: "Mar 2025", color: "orange", icon: <Zap className="h-4 w-4" /> },
  { id: 5, title: "Award Won", description: "Received Best New Product award.", date: "Apr 2025", color: "red", icon: <Award className="h-4 w-4" /> },
];

export default {
  title: "Data Display/Timeline",
  component: TimeLine,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { TimeLine } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "alternating", "compact"],
    },
    animate: { control: "boolean" },
    lineColor: { control: "text" },
  },
};

export const Default = {
  args: {
    items: defaultItems,
    variant: "default",
    animate: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<TimeLine
  items={[
    { id: 1, title: "Project Kickoff", description: "Planning meeting.", date: "Jan 15, 2025", color: "blue", tag: "Planning", tagColor: "blue" },
    { id: 2, title: "Design Phase Complete", description: "Mockups approved.", date: "Feb 20, 2025", color: "purple", tag: "Design", tagColor: "purple" },
    { id: 3, title: "Development Sprint 1", description: "Core features built.", date: "Mar 10, 2025", color: "green" },
  ]}
/>`,
      },
    },
  },
};

export const Alternating = {
  args: {
    items: defaultItems,
    variant: "alternating",
    animate: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<TimeLine items={items} variant="alternating" />`,
      },
    },
  },
};

export const Compact = {
  args: {
    items: defaultItems,
    variant: "compact",
    animate: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<TimeLine items={items} variant="compact" />`,
      },
    },
  },
};

export const WithCustomIcons = {
  args: {
    items: iconItems,
    variant: "default",
    animate: true,
  },
  parameters: {
    docs: {
      source: {
        code: `import { Star, Rocket, CheckCircle, Zap, Award } from "lucide-react";

<TimeLine
  items={[
    { id: 1, title: "Idea Born", date: "Dec 2024", color: "blue", icon: <Star className="h-4 w-4" /> },
    { id: 2, title: "Prototype Built", date: "Jan 2025", color: "purple", icon: <Rocket className="h-4 w-4" /> },
    { id: 3, title: "Testing Complete", date: "Feb 2025", color: "green", icon: <CheckCircle className="h-4 w-4" /> },
  ]}
/>`,
      },
    },
  },
};
