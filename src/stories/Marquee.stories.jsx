import { Marquee } from "../components/Marquee";

const LogoItem = ({ name, color }) => (
  <div
    className={`flex items-center justify-center px-8 py-4 rounded-xl ${color} text-white font-semibold text-sm whitespace-nowrap`}
  >
    {name}
  </div>
);

const logos = [
  { name: "Acme Corp", color: "bg-blue-500" },
  { name: "Globex", color: "bg-purple-500" },
  { name: "Initech", color: "bg-green-500" },
  { name: "Umbrella", color: "bg-red-500" },
  { name: "Stark Industries", color: "bg-amber-500" },
  { name: "Wayne Enterprises", color: "bg-indigo-500" },
  { name: "Cyberdyne", color: "bg-pink-500" },
  { name: "Oscorp", color: "bg-teal-500" },
];

const testimonials = [
  { quote: "Absolutely love this product!", author: "Sarah K." },
  { quote: "Best purchase I've made this year.", author: "Tom R." },
  { quote: "The quality is outstanding.", author: "Maria L." },
  { quote: "Exceeded all expectations.", author: "James W." },
  { quote: "Can't imagine working without it.", author: "Priya S." },
];

export default {
  title: "Data Display/Marquee",
  component: Marquee,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "## 📦 Installation\n\n```bash\nnpm install readyui-react\n```\n\n## 📥 Import\n\n```jsx\nimport { Marquee } from \"readyui-react\";\n```",
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["left", "right", "up", "down"],
    },
    speed: { control: { type: "number", min: 10, max: 200 } },
    pauseOnHover: { control: "boolean" },
    gap: { control: { type: "number", min: 0, max: 100 } },
    reverse: { control: "boolean" },
    gradient: { control: "boolean" },
    gradientWidth: { control: { type: "number", min: 0, max: 200 } },
  },
};

export const Default = {
  args: {
    speed: 50,
    gap: 40,
    pauseOnHover: true,
    gradient: true,
  },
  render: (args) => (
    <Marquee {...args}>
      {logos.map((logo) => (
        <LogoItem key={logo.name} {...logo} />
      ))}
    </Marquee>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Marquee speed={50} pauseOnHover>
  <div className="px-8 py-4 bg-blue-500 text-white rounded-xl">Acme Corp</div>
  <div className="px-8 py-4 bg-purple-500 text-white rounded-xl">Globex</div>
  <div className="px-8 py-4 bg-green-500 text-white rounded-xl">Initech</div>
</Marquee>`,
      },
    },
  },
};

export const ReverseDirection = {
  args: {
    speed: 40,
    direction: "right",
    gap: 30,
    gradient: true,
  },
  render: (args) => (
    <Marquee {...args}>
      {logos.map((logo) => (
        <LogoItem key={logo.name} {...logo} />
      ))}
    </Marquee>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Marquee direction="right" speed={40}>
  {logos.map(logo => <LogoCard key={logo.name} {...logo} />)}
</Marquee>`,
      },
    },
  },
};

export const Testimonials = {
  args: {
    speed: 35,
    gap: 24,
    gradient: true,
    pauseOnHover: true,
  },
  render: (args) => (
    <Marquee {...args}>
      {testimonials.map((t) => (
        <div
          key={t.author}
          className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-5 w-72 flex-shrink-0 shadow-sm"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-2">"{t.quote}"</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">— {t.author}</p>
        </div>
      ))}
    </Marquee>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Marquee speed={35} pauseOnHover>
  {testimonials.map(t => (
    <div key={t.author} className="bg-white rounded-xl p-5 w-72 shadow-sm">
      <p className="italic">"{t.quote}"</p>
      <p className="text-xs">— {t.author}</p>
    </div>
  ))}
</Marquee>`,
      },
    },
  },
};

export const VerticalScroll = {
  args: {
    direction: "up",
    speed: 30,
    gap: 20,
    gradient: true,
  },
  render: (args) => (
    <div style={{ height: 250, overflow: "hidden" }}>
      <Marquee {...args}>
        {logos.map((logo) => (
          <LogoItem key={logo.name} {...logo} />
        ))}
      </Marquee>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div style={{ height: 250 }}>
  <Marquee direction="up" speed={30}>
    {items.map(item => <Card key={item.name} {...item} />)}
  </Marquee>
</div>`,
      },
    },
  },
};
