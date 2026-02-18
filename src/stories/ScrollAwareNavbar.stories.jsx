import { ScrollAwareNavbar } from "../components/ScrollAwareNavbar";
import { Home, Info, Mail, BookOpen } from "lucide-react";

export default {
  title: "Navigation/ScrollAwareNavbar",
  component: ScrollAwareNavbar,
  tags: ["autodocs"],
  argTypes: {
    behavior: {
      control: "select",
      options: ["auto-hide", "sticky", "scroll-shadow"],
    },
    transparent: { control: "boolean" },
    blur: { control: "boolean" },
    activeItem: { control: "text" },
    height: { control: { type: "number", min: 48, max: 96 } },
    scrollThreshold: { control: { type: "number", min: 0, max: 200 } },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200vh", paddingTop: 80 }}>
        <Story />
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scroll down to see navbar behavior</h2>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} className="text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
};

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export const Default = {
  args: {
    items: navItems,
    logo: "ReadyUI",
    behavior: "sticky",
    activeItem: "Home",
  },
  parameters: {
    docs: {
      source: {
        code: `<ScrollAwareNavbar
  items={[
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]}
  logo="ReadyUI"
  behavior="sticky"
  activeItem="Home"
/>`,
      },
    },
  },
};

export const AutoHide = {
  args: {
    items: navItems,
    logo: "ReadyUI",
    behavior: "auto-hide",
    activeItem: "Home",
    cta: { label: "Get Started", onClick: () => alert("CTA clicked!") },
  },
  parameters: {
    docs: {
      source: {
        code: `<ScrollAwareNavbar
  items={navItems}
  logo="ReadyUI"
  behavior="auto-hide"
  cta={{ label: "Get Started", onClick: () => {} }}
/>`,
      },
    },
  },
};

export const TransparentWithBlur = {
  args: {
    items: navItems,
    logo: "ReadyUI",
    behavior: "scroll-shadow",
    transparent: true,
    blur: true,
    activeItem: "Blog",
    scrollThreshold: 30,
  },
  parameters: {
    docs: {
      source: {
        code: `<ScrollAwareNavbar
  items={navItems}
  logo="ReadyUI"
  behavior="scroll-shadow"
  transparent
  blur
  activeItem="Blog"
  scrollThreshold={30}
/>`,
      },
    },
  },
};

export const WithIconItems = {
  args: {
    items: [
      { name: "Home", href: "#", icon: Home },
      { name: "Docs", href: "#docs", icon: BookOpen },
      { name: "About", href: "#about", icon: Info },
      { name: "Contact", href: "#contact", icon: Mail },
    ],
    logo: "ReadyUI",
    behavior: "sticky",
    activeItem: "Home",
    cta: { label: "Sign Up", onClick: () => {} },
  },
  parameters: {
    docs: {
      source: {
        code: `import { Home, BookOpen, Info, Mail } from "lucide-react";

<ScrollAwareNavbar
  items={[
    { name: "Home", href: "#", icon: Home },
    { name: "Docs", href: "#docs", icon: BookOpen },
    { name: "About", href: "#about", icon: Info },
    { name: "Contact", href: "#contact", icon: Mail },
  ]}
  logo="ReadyUI"
  behavior="sticky"
  cta={{ label: "Sign Up", onClick: () => {} }}
/>`,
      },
    },
  },
};
