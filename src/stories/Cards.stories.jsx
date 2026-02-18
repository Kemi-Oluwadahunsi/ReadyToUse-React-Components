import {
  BasicCard,
  ProfileCard,
  ProductCard,
  TestimonialCard,
  BlogCard,
  StatsCard,
  TeamCard,
  FeatureCard,
  NotificationCard,
  ImageOverlayCard,
  HorizontalCard,
  PricingCardSingle,
  MetricCard,
  InteractiveCard,
  GlassCard,
} from "../components/Cards";
import { Zap, Shield, DollarSign, Users, Bell, CheckCircle, Globe, Mail, Star, BarChart3, ArrowRight } from "lucide-react";

const img = (w, h, seed = 0) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ═══════════════════════════════════════════
   1) BasicCard
   ═══════════════════════════════════════════ */
export default {
  title: "Cards/BasicCard",
  component: BasicCard,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    image:       { control: "text" },
    title:       { control: "text" },
    description: { control: "text" },
    className:   { control: "text" },
  },
};

export const Default = {
  args: {
    image: img(600, 400, 10),
    title: "Mountain Retreat",
    description: "Escape to the mountains and enjoy breathtaking views with our exclusive getaway packages.",
  },
  parameters: { docs: { source: { code: `<BasicCard\n  image="https://picsum.photos/600/400"\n  title="Mountain Retreat"\n  description="Escape to the mountains..."\n/>` } } },
};

export const WithoutImage = {
  args: {
    title: "No Image Card",
    description: "Cards work perfectly without images too. Clean and minimal.",
  },
};

export const WithFooter = {
  args: {
    image: img(600, 400, 12),
    title: "Card with Footer",
    description: "This card has custom footer actions.",
  },
  render: (args) => (
    <BasicCard {...args} footer={
      <div className="flex gap-2">
        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg">Accept</button>
        <button className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg">Decline</button>
      </div>
    } />
  ),
  parameters: {
    docs: { source: { code: `<BasicCard\n  image="..."\n  title="Card with Footer"\n  description="..."\n  footer={\n    <div className="flex gap-2">\n      <button>Accept</button>\n      <button>Decline</button>\n    </div>\n  }\n/>` } },
  },
};

export const Clickable = {
  args: {
    image: img(600, 400, 14),
    title: "Clickable Card",
    description: "This entire card is clickable.",
    onClick: () => alert("Card clicked!"),
  },
};

/* ═══════════════════════════════════════════
   2) ProfileCard
   ═══════════════════════════════════════════ */
export const Profile_Default = {
  render: () => (
    <div className="max-w-sm">
      <ProfileCard
        avatar={img(200, 200, 30)}
        name="Sarah Johnson"
        role="Senior Product Designer"
        bio="Crafting delightful user experiences for 8+ years."
        stats={[
          { label: "Posts", value: "142" },
          { label: "Followers", value: "12.8K" },
          { label: "Following", value: "380" },
        ]}
        onAction={() => alert("Followed!")}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<ProfileCard\n  avatar="..."\n  name="Sarah Johnson"\n  role="Senior Product Designer"\n  bio="Crafting delightful user experiences..."\n  stats={[{ label: "Posts", value: "142" }, ...]}\n  onAction={() => {}}\n/>` } },
  },
};

export const Profile_WithSocials = {
  render: () => (
    <div className="max-w-sm">
      <ProfileCard
        name="Alex Chen"
        role="Full-Stack Developer"
        bio="Open source enthusiast. TypeScript & Rust."
        stats={[{ label: "Repos", value: "87" }, { label: "Stars", value: "4.2K" }]}
        socials={[
          { icon: <Globe className="h-4 w-4" />, href: "#" },
          { icon: <Mail className="h-4 w-4" />, href: "#" },
        ]}
        onAction={() => alert("Followed!")}
      />
    </div>
  ),
};

export const Profile_WithCover = {
  render: () => (
    <div className="max-w-sm">
      <ProfileCard
        coverImage={img(800, 200, 35)}
        avatar={img(200, 200, 36)}
        name="Jamie Rivera"
        role="Creative Director"
        onAction={() => alert("Connected!")}
        actionLabel="Connect"
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   3) ProductCard
   ═══════════════════════════════════════════ */
export const Product_Default = {
  render: () => (
    <div className="max-w-xs">
      <ProductCard
        image={img(600, 500, 40)}
        title="Wireless Noise-Cancelling Headphones"
        description="Premium audio with 30-hour battery life."
        price={199}
        originalPrice={249}
        rating={4.5}
        reviewCount={2340}
        badge="Sale"
        onAddToCart={() => alert("Added!")}
        onWishlist={() => alert("Wishlisted!")}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<ProductCard\n  image="..."\n  title="Wireless Headphones"\n  price={199}\n  originalPrice={249}\n  rating={4.5}\n  reviewCount={2340}\n  badge="Sale"\n  onAddToCart={() => {}}\n  onWishlist={() => {}}\n/>` } },
  },
};

export const Product_NoBadge = {
  render: () => (
    <div className="max-w-xs">
      <ProductCard
        image={img(600, 500, 44)}
        title="Smart Home Hub"
        description="Control all your devices from one place."
        price={89}
        rating={4}
        reviewCount={1560}
        onAddToCart={() => alert("Added!")}
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   4) TestimonialCard
   ═══════════════════════════════════════════ */
export const Testimonial_Default = {
  render: () => (
    <div className="max-w-md">
      <TestimonialCard
        quote="This component library saved us weeks of development time. The quality is outstanding."
        author="Emily Watson"
        role="CTO, TechStart"
        avatar={img(100, 100, 50)}
        rating={5}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<TestimonialCard\n  quote="This component library saved us weeks..."\n  author="Emily Watson"\n  role="CTO, TechStart"\n  avatar="..."\n  rating={5}\n/>` } },
  },
};

export const Testimonial_NoAvatar = {
  render: () => (
    <div className="max-w-md">
      <TestimonialCard
        quote="Beautiful, accessible components that just work."
        author="Marcus Lee"
        role="Lead Developer"
        rating={4}
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   5) BlogCard
   ═══════════════════════════════════════════ */
export const Blog_Default = {
  render: () => (
    <div className="max-w-sm">
      <BlogCard
        image={img(800, 400, 60)}
        category="Engineering"
        title="Building Scalable React Component Libraries"
        excerpt="Learn the patterns and best practices for creating production-ready React components."
        author={{ name: "Jane Cooper", avatar: img(60, 60, 61) }}
        date="Feb 15, 2026"
        readTime="8 min read"
        onClick={() => alert("Read article")}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<BlogCard\n  image="..."\n  category="Engineering"\n  title="Building Scalable React Component Libraries"\n  excerpt="..."\n  author={{ name: "Jane Cooper", avatar: "..." }}\n  date="Feb 15, 2026"\n  readTime="8 min read"\n  onClick={() => {}}\n/>` } },
  },
};

export const Blog_NoImage = {
  render: () => (
    <div className="max-w-sm">
      <BlogCard
        category="Tutorial"
        categoryColor="text-green-600 dark:text-green-400"
        title="Getting Started with ReadyUI React"
        excerpt="A step-by-step guide to integrating ReadyUI components."
        author={{ name: "Alex Kim" }}
        date="Feb 8, 2026"
        readTime="12 min read"
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   6) StatsCard
   ═══════════════════════════════════════════ */
export const Stats_Default = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      <StatsCard icon={<DollarSign className="h-5 w-5" />} iconBg="bg-green-100 dark:bg-green-900/40" iconColor="text-green-600 dark:text-green-400" value="$48,290" label="Revenue" trend={12.5} trendLabel="vs last month" />
      <StatsCard icon={<Users className="h-5 w-5" />} value="2,420" label="Active Users" trend={-3.2} />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<StatsCard\n  icon={<DollarSign />}\n  value="$48,290"\n  label="Revenue"\n  trend={12.5}\n  trendLabel="vs last month"\n/>` } },
  },
};

/* ═══════════════════════════════════════════
   7) TeamCard
   ═══════════════════════════════════════════ */
export const Team_Default = {
  render: () => (
    <div className="max-w-xs">
      <TeamCard
        photo={img(300, 300, 70)}
        name="Olivia Chen"
        role="CEO & Founder"
        bio="Visionary leader with 15 years in tech."
        socials={[
          { icon: <Globe className="h-4 w-4" />, href: "#" },
          { icon: <Mail className="h-4 w-4" />, href: "#" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<TeamCard\n  photo="..."\n  name="Olivia Chen"\n  role="CEO & Founder"\n  bio="..."\n  socials={[{ icon: <Globe />, href: "#" }]}\n/>` } },
  },
};

export const Team_NoPhoto = {
  render: () => (
    <div className="max-w-xs">
      <TeamCard name="Mia Rodriguez" role="Product Designer" bio="Passionate about inclusive design." />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   8) FeatureCard
   ═══════════════════════════════════════════ */
export const Feature_Default = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-3xl">
      <FeatureCard icon={<Zap className="h-6 w-6" />} title="Blazing Fast" description="Tree-shakeable ES module builds." />
      <FeatureCard icon={<Shield className="h-6 w-6" />} iconBg="bg-green-100 dark:bg-green-900/40" iconColor="text-green-600 dark:text-green-400" title="Accessible" description="ARIA roles, keyboard nav, focus traps." />
      <FeatureCard icon={<BarChart3 className="h-6 w-6" />} iconBg="bg-purple-100 dark:bg-purple-900/40" iconColor="text-purple-600 dark:text-purple-400" title="Composable" description="Mix and match freely." centered />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<FeatureCard\n  icon={<Zap />}\n  title="Blazing Fast"\n  description="Tree-shakeable ES module builds."\n/>` } },
  },
};

/* ═══════════════════════════════════════════
   9) NotificationCard
   ═══════════════════════════════════════════ */
export const Notification_Default = {
  render: () => (
    <div className="max-w-lg space-y-3">
      <NotificationCard
        icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        iconBg="bg-green-100 dark:bg-green-900/40"
        title="Deployment Successful"
        message="Your app v2.4.1 was deployed to production."
        timestamp="2 minutes ago"
        unread
        onDismiss={() => {}}
      />
      <NotificationCard
        icon={<Bell className="h-5 w-5 text-blue-500" />}
        iconBg="bg-blue-100 dark:bg-blue-900/40"
        title="New Comment"
        message="Sarah left a comment on your pull request."
        timestamp="1 hour ago"
        onClick={() => alert("View")}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<NotificationCard\n  icon={<CheckCircle />}\n  title="Deployment Successful"\n  message="Your app was deployed."\n  timestamp="2 min ago"\n  unread\n  onDismiss={() => {}}\n/>` } },
  },
};

/* ═══════════════════════════════════════════
   10) ImageOverlayCard
   ═══════════════════════════════════════════ */
export const ImageOverlay_Bottom = {
  render: () => (
    <div className="max-w-sm">
      <ImageOverlayCard
        image={img(800, 600, 80)}
        title="Explore the Alps"
        subtitle="Adventure awaits in the Swiss mountains"
        badge="Featured"
        onClick={() => alert("Explore!")}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<ImageOverlayCard\n  image="..."\n  title="Explore the Alps"\n  subtitle="Adventure awaits"\n  badge="Featured"\n  onClick={() => {}}\n/>` } },
  },
};

export const ImageOverlay_Center = {
  render: () => (
    <div className="max-w-sm">
      <ImageOverlayCard
        image={img(800, 600, 82)}
        title="City Lights"
        subtitle="Discover nightlife around the world"
        align="center"
        action={<button className="px-5 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium hover:bg-white/30 transition">Discover</button>}
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   11) HorizontalCard
   ═══════════════════════════════════════════ */
export const Horizontal_Default = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <HorizontalCard
        image={img(400, 300, 90)}
        title="Advanced React Patterns"
        description="Master compound components, render props, and custom hooks."
        meta={<span>Published Jan 2026 · 15 min read</span>}
        action={<button className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">Read <ArrowRight className="h-3 w-3" /></button>}
      />
      <HorizontalCard
        image={img(400, 300, 92)}
        title="Tailwind CSS v4 Deep Dive"
        description="Everything new in Tailwind v4."
        imagePosition="right"
        onClick={() => alert("Clicked!")}
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<HorizontalCard\n  image="..."\n  title="Advanced React Patterns"\n  description="..."\n  meta={<span>Published Jan 2026</span>}\n  action={<button>Read →</button>}\n/>` } },
  },
};

/* ═══════════════════════════════════════════
   12) PricingCardSingle
   ═══════════════════════════════════════════ */
export const Pricing_Default = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-4xl">
      <PricingCardSingle name="Starter" description="For side projects" price={0} features={["5 projects", "1 GB storage", "Community support"]} onSelect={() => alert("Starter")} />
      <PricingCardSingle name="Pro" description="For professionals" price={29} featured badge="Most Popular" accentColor="indigo" features={["Unlimited projects", "50 GB storage", "Priority support", "API access"]} onSelect={() => alert("Pro")} />
      <PricingCardSingle name="Enterprise" description="For large teams" price={99} accentColor="purple" features={["Everything in Pro", "500 GB storage", "24/7 support", "Custom integrations", "SLA guarantee"]} onSelect={() => alert("Enterprise")} />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<PricingCardSingle\n  name="Pro"\n  description="For professionals"\n  price={29}\n  featured\n  badge="Most Popular"\n  accentColor="indigo"\n  features={["Unlimited projects", "Priority support"]}\n  onSelect={() => {}}\n/>` } },
  },
};

/* ═══════════════════════════════════════════
   13) MetricCard
   ═══════════════════════════════════════════ */
export const Metric_Default = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-3xl">
      <MetricCard label="Page Views" value="128,430" data={[30, 45, 28, 60, 55, 70, 65, 80, 75, 90, 85, 95]} barColor="bg-blue-500" />
      <MetricCard label="Signups" value="3,842" data={[10, 20, 15, 25, 30, 28, 40, 38, 45, 50, 48, 55]} barColor="bg-green-500" />
      <MetricCard label="Bounce Rate" value="24.3%" data={[60, 55, 50, 45, 40, 42, 38, 35, 30, 28, 25, 24]} barColor="bg-amber-500" />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<MetricCard\n  label="Page Views"\n  value="128,430"\n  data={[30, 45, 28, 60, 55, 70, 65, 80, 75, 90, 85, 95]}\n  barColor="bg-blue-500"\n/>` } },
  },
};

/* ═══════════════════════════════════════════
   14) InteractiveCard
   ═══════════════════════════════════════════ */
export const Interactive_Flip = {
  render: () => (
    <div className="max-w-xs">
      <InteractiveCard
        interaction="flip"
        height="h-56"
        front={
          <div className="flex flex-col items-center justify-center h-full text-center">
            <BarChart3 className="h-10 w-10 text-blue-500 mb-3" />
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Click to Flip</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">See the other side →</p>
          </div>
        }
        back={
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Back Side!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Perfect for flashcards or reveals.</p>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    docs: { source: { code: `<InteractiveCard\n  interaction="flip"\n  height="h-56"\n  front={<div>Click to Flip</div>}\n  back={<div>Back Side!</div>}\n/>` } },
  },
};

export const Interactive_Expand = {
  render: () => (
    <div className="max-w-sm">
      <InteractiveCard
        interaction="expand"
        front={
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">Click to Expand</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This card expands to show more.</p>
          </div>
        }
        back={
          <div className="border-t border-gray-100 dark:border-zinc-700 pt-4 mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">Here's the expanded content!</p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
              <li>• Smooth height animation</li>
              <li>• Click again to collapse</li>
            </ul>
          </div>
        }
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   15) GlassCard
   ═══════════════════════════════════════════ */
export const Glass_Default = {
  render: () => (
    <div className="rounded-2xl overflow-hidden p-8" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="grid grid-cols-3 gap-6">
        <GlassCard>
          <h4 className="font-bold text-white text-lg mb-2">Glassmorphism</h4>
          <p className="text-sm text-white/70">Frosted-glass effect with backdrop blur.</p>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">Lightning Fast</div>
              <div className="text-xs text-white/60">Zero runtime overhead</div>
            </div>
          </div>
          <p className="text-sm text-white/70">Pure CSS effect.</p>
        </GlassCard>
        <GlassCard>
          <div className="text-center py-2">
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-sm text-white/60">Uptime guaranteed</div>
          </div>
        </GlassCard>
      </div>
    </div>
  ),
  parameters: {
    docs: { source: { code: `<GlassCard>\n  <h4 className="font-bold text-white text-lg">Glassmorphism</h4>\n  <p className="text-sm text-white/70">Frosted-glass effect.</p>\n</GlassCard>` } },
  },
};
