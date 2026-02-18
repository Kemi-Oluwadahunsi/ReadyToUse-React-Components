import { useState } from "react";
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
import {
  ShoppingCart, Heart, TrendingUp, Users, DollarSign,
  Zap, Shield, Globe, Bell, Mail, CheckCircle, ArrowRight,
  Star, BarChart3, Layers,
} from "lucide-react";

/* tiny placeholder images (gradient data-uri so nothing external is needed) */
const img = (w, h, seed = 0) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const Section = ({ title, children }) => (
  <section className="mb-14">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 inline-block" />{title}
    </h3>
    {children}
  </section>
);

/* ─── DEMO ────────────────────────────────── */
export const CardsDemo = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-2">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Card Variants</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm">15 configurable card variants — dark-mode ready.</p>

      {/* ── 1. BasicCard ── */}
      <Section title="BasicCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BasicCard
            image={img(600, 400, 10)}
            title="Mountain Retreat"
            description="Escape to the mountains and enjoy breathtaking views with our exclusive getaway packages."
            footer={<button className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer">Learn more →</button>}
          />
          <BasicCard
            title="No Image Card"
            description="Cards work perfectly without images too. Clean and minimal."
            footer={
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg cursor-pointer">Accept</button>
                <button className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg cursor-pointer">Decline</button>
              </div>
            }
          />
          <BasicCard
            image={img(600, 400, 20)}
            title="Clickable Card"
            description="This entire card is clickable."
            onClick={() => alert("Card clicked!")}
          />
        </div>
      </Section>

      {/* ── 2. ProfileCard ── */}
      <Section title="ProfileCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <ProfileCard
            name="Alex Chen"
            role="Full-Stack Developer"
            bio="Open source enthusiast. TypeScript & Rust."
            stats={[
              { label: "Repos", value: "87" },
              { label: "Stars", value: "4.2K" },
            ]}
            socials={[
              { icon: <Globe className="h-4 w-4" />, href: "#" },
              { icon: <Mail className="h-4 w-4" />, href: "#" },
            ]}
            onAction={() => alert("Followed!")}
          />
          <ProfileCard
            coverImage={img(800, 200, 35)}
            avatar={img(200, 200, 36)}
            name="Jamie Rivera"
            role="Creative Director"
            onAction={() => alert("Followed!")}
            actionLabel="Connect"
          />
        </div>
      </Section>

      {/* ── 3. ProductCard ── */}
      <Section title="ProductCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <ProductCard
            image={img(600, 500, 42)}
            title="Ergonomic Mechanical Keyboard"
            price={149}
            rating={5}
            reviewCount={870}
            badge="New"
            badgeColor="bg-blue-500"
            onAddToCart={() => alert("Added!")}
            onWishlist={() => alert("Wishlisted!")}
          />
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
      </Section>

      {/* ── 4. TestimonialCard ── */}
      <Section title="TestimonialCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard
            quote="This component library saved us weeks of development time. The quality is outstanding."
            author="Emily Watson"
            role="CTO, TechStart"
            avatar={img(100, 100, 50)}
            rating={5}
          />
          <TestimonialCard
            quote="Beautiful, accessible components that just work. Our team loves it."
            author="Marcus Lee"
            role="Lead Developer, DesignCo"
            rating={4}
          />
          <TestimonialCard
            quote="The dark mode support and customization options are exactly what we needed."
            author="Priya Sharma"
            role="Product Manager"
            avatar={img(100, 100, 52)}
            rating={5}
          />
        </div>
      </Section>

      {/* ── 5. BlogCard ── */}
      <Section title="BlogCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard
            image={img(800, 400, 60)}
            category="Engineering"
            title="Building Scalable React Component Libraries"
            excerpt="Learn the patterns and best practices for creating production-ready React components used by thousands of developers."
            author={{ name: "Jane Cooper", avatar: img(60, 60, 61) }}
            date="Feb 15, 2026"
            readTime="8 min read"
            onClick={() => alert("Read article")}
          />
          <BlogCard
            image={img(800, 400, 62)}
            category="Design"
            categoryColor="text-purple-600 dark:text-purple-400"
            title="The Art of Dark Mode Design"
            excerpt="Dark mode isn't just inverting colors. Here's how to do it right."
            author={{ name: "Tom Harris" }}
            date="Feb 10, 2026"
            readTime="5 min read"
          />
          <BlogCard
            category="Tutorial"
            categoryColor="text-green-600 dark:text-green-400"
            title="Getting Started with ReadyUI React"
            excerpt="A step-by-step guide to integrating ReadyUI components into your next project."
            author={{ name: "Alex Kim", avatar: img(60, 60, 63) }}
            date="Feb 8, 2026"
            readTime="12 min read"
          />
        </div>
      </Section>

      {/* ── 6. StatsCard ── */}
      <Section title="StatsCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<DollarSign className="h-5 w-5" />}
            iconBg="bg-green-100 dark:bg-green-900/40"
            iconColor="text-green-600 dark:text-green-400"
            value="$48,290"
            label="Revenue"
            trend={12.5}
            trendLabel="vs last month"
          />
          <StatsCard
            icon={<Users className="h-5 w-5" />}
            iconBg="bg-blue-100 dark:bg-blue-900/40"
            iconColor="text-blue-600 dark:text-blue-400"
            value="2,420"
            label="Active Users"
            trend={8.1}
          />
          <StatsCard
            icon={<ShoppingCart className="h-5 w-5" />}
            iconBg="bg-purple-100 dark:bg-purple-900/40"
            iconColor="text-purple-600 dark:text-purple-400"
            value="1,210"
            label="Orders"
            trend={-3.2}
          />
          <StatsCard
            icon={<TrendingUp className="h-5 w-5" />}
            iconBg="bg-amber-100 dark:bg-amber-900/40"
            iconColor="text-amber-600 dark:text-amber-400"
            value="64.8%"
            label="Conversion"
          />
        </div>
      </Section>

      {/* ── 7. TeamCard ── */}
      <Section title="TeamCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <TeamCard
            photo={img(300, 300, 71)}
            name="James Wilson"
            role="Lead Engineer"
            socials={[{ icon: <Globe className="h-4 w-4" />, href: "#" }]}
          />
          <TeamCard
            name="Mia Rodriguez"
            role="Product Designer"
            bio="Passionate about inclusive design."
          />
          <TeamCard
            photo={img(300, 300, 73)}
            name="Liam Park"
            role="DevOps Architect"
          />
        </div>
      </Section>

      {/* ── 8. FeatureCard ── */}
      <Section title="FeatureCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Blazing Fast"
            description="Tree-shakeable ES module builds. Only ship the components you actually use."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            iconBg="bg-green-100 dark:bg-green-900/40"
            iconColor="text-green-600 dark:text-green-400"
            title="Accessible"
            description="ARIA roles, keyboard navigation, and focus traps built into every component."
          />
          <FeatureCard
            icon={<Layers className="h-6 w-6" />}
            iconBg="bg-purple-100 dark:bg-purple-900/40"
            iconColor="text-purple-600 dark:text-purple-400"
            title="Composable"
            description="Mix and match components freely. Each one is independently configurable."
            centered
          />
        </div>
      </Section>

      {/* ── 9. NotificationCard ── */}
      <Section title="NotificationCard">
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
            onClick={() => alert("View notification")}
          />
          <NotificationCard
            icon={<Star className="h-5 w-5 text-amber-500" />}
            iconBg="bg-amber-100 dark:bg-amber-900/40"
            title="Achievement Unlocked"
            message="You've published 10 components!"
            timestamp="Yesterday"
            onDismiss={() => {}}
          />
        </div>
      </Section>

      {/* ── 10. ImageOverlayCard ── */}
      <Section title="ImageOverlayCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ImageOverlayCard
            image={img(800, 600, 80)}
            title="Explore the Alps"
            subtitle="Adventure awaits in the Swiss mountains"
            badge="Featured"
            onClick={() => alert("Explore!")}
          />
          <ImageOverlayCard
            image={img(800, 600, 82)}
            title="City Lights"
            subtitle="Discover nightlife around the world"
            align="center"
            action={<button className="px-5 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-medium hover:bg-white/30 transition cursor-pointer">Discover</button>}
          />
          <ImageOverlayCard
            image={img(800, 600, 84)}
            title="Ocean Breeze"
            subtitle="Coastal escapes for every season"
          />
        </div>
      </Section>

      {/* ── 11. HorizontalCard ── */}
      <Section title="HorizontalCard">
        <div className="space-y-4 max-w-2xl">
          <HorizontalCard
            image={img(400, 300, 90)}
            title="Advanced React Patterns"
            description="Master compound components, render props, and custom hooks with real-world examples."
            meta={<span>Published Jan 2026 · 15 min read</span>}
            action={<button className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer flex items-center gap-1">Read <ArrowRight className="h-3 w-3" /></button>}
          />
          <HorizontalCard
            image={img(400, 300, 92)}
            title="Tailwind CSS v4 Deep Dive"
            description="Everything new in Tailwind v4: @layer, @source, lightning CSS engine, and more."
            imagePosition="right"
            onClick={() => alert("Clicked!")}
          />
        </div>
      </Section>

      {/* ── 12. PricingCardSingle ── */}
      <Section title="PricingCardSingle">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          <PricingCardSingle
            name="Starter"
            description="For side projects"
            price={0}
            period="/mo"
            features={["5 projects", "1 GB storage", "Community support"]}
            onSelect={() => alert("Starter selected")}
          />
          <PricingCardSingle
            name="Pro"
            description="For professionals"
            price={29}
            period="/mo"
            featured
            badge="Most Popular"
            accentColor="indigo"
            features={["Unlimited projects", "50 GB storage", "Priority support", "API access"]}
            onSelect={() => alert("Pro selected")}
          />
          <PricingCardSingle
            name="Enterprise"
            description="For large teams"
            price={99}
            period="/mo"
            features={["Everything in Pro", "500 GB storage", "24/7 support", "Custom integrations", "SLA guarantee"]}
            onSelect={() => alert("Enterprise selected")}
            accentColor="purple"
          />
        </div>
      </Section>

      {/* ── 13. MetricCard ── */}
      <Section title="MetricCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            label="Page Views"
            value="128,430"
            data={[30, 45, 28, 60, 55, 70, 65, 80, 75, 90, 85, 95]}
            barColor="bg-blue-500"
          />
          <MetricCard
            label="Signups"
            value="3,842"
            data={[10, 20, 15, 25, 30, 28, 40, 38, 45, 50, 48, 55]}
            barColor="bg-green-500"
          />
          <MetricCard
            label="Bounce Rate"
            value="24.3%"
            data={[60, 55, 50, 45, 40, 42, 38, 35, 30, 28, 25, 24]}
            barColor="bg-amber-500"
          />
        </div>
      </Section>

      {/* ── 14. InteractiveCard ── */}
      <Section title="InteractiveCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Perfect for flashcards, reveals, or before/after effects.</p>
              </div>
            }
          />
          <InteractiveCard
            interaction="expand"
            front={
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Click to Expand</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This card expands to reveal more content.</p>
              </div>
            }
            back={
              <div className="border-t border-gray-100 dark:border-zinc-700 pt-4 mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">Here's the expanded content! You can put any additional details, descriptions, or interactive elements here. The card smoothly transitions to accommodate the extra content.</p>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <li>• Smooth height animation</li>
                  <li>• Click again to collapse</li>
                  <li>• Works great for FAQs</li>
                </ul>
              </div>
            }
          />
        </div>
      </Section>

      {/* ── 15. GlassCard ── */}
      <Section title="GlassCard">
        <div className="relative rounded-2xl overflow-hidden p-8" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h4 className="font-bold text-white text-lg mb-2">Glassmorphism</h4>
              <p className="text-sm text-white/70">Frosted-glass effect with backdrop blur. Looks stunning on gradient backgrounds.</p>
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
              <p className="text-sm text-white/70">Pure CSS effect — no JavaScript animations needed.</p>
            </GlassCard>
            <GlassCard>
              <div className="text-center py-2">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-white/60">Uptime guaranteed</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </div>
  );
};
