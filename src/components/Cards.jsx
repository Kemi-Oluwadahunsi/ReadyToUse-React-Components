import { useState } from "react";

/* ─────────────────────────────────────────────
   Shared helpers
   ───────────────────────────────────────────── */
const cls = (...parts) => parts.filter(Boolean).join(" ");

const Img = ({ src, alt, className }) =>
  src ? <img src={src} alt={alt || ""} loading="lazy" className={className} /> : null;

const StarIcon = ({ filled }) => (
  <svg
    viewBox="0 0 20 20"
    className={cls("h-4 w-4", filled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600")}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

const Stars = ({ rating = 0, max = 5 }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
    {Array.from({ length: max }, (_, i) => (
      <StarIcon key={i} filled={i < Math.round(rating)} />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   1) BasicCard
   Simple card with optional image header,
   title, description, and footer actions.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} image - Header image URL
 * @param {string} title
 * @param {string} description
 * @param {ReactNode} footer - Custom footer (buttons, links, etc.)
 * @param {ReactNode} children - Extra body content
 * @param {string} className
 * @param {Function} onClick
 */
const BasicCard = ({ image, title, description, footer, children, className, onClick, ...rest }) => (
  <div
    onClick={onClick}
    className={cls(
      "rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md",
      onClick && "cursor-pointer",
      className
    )}
    {...rest}
  >
    {image && <img src={image} alt={title || ""} loading="lazy" className="w-full h-36 sm:h-44 md:h-48 object-cover" />}
    <div className="p-3 sm:p-4 md:p-5">
      {title && <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>}
      {description && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>}
      {children}
    </div>
    {footer && <div className="px-3 sm:px-5 py-2.5 sm:py-3 border-t border-gray-100 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50">{footer}</div>}
  </div>
);
BasicCard.displayName = "BasicCard";

/* ─────────────────────────────────────────────
   2) ProfileCard
   User profile: avatar, name, role, bio, stats,
   social links, action button.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} avatar - Avatar image URL
 * @param {string} name
 * @param {string} role
 * @param {string} bio
 * @param {string} coverImage - Top banner image
 * @param {{ label: string, value: string|number }[]} stats - e.g. [{label:"Posts", value:120}]
 * @param {{ icon: ReactNode, href: string }[]} socials
 * @param {string} actionLabel - Primary CTA label
 * @param {Function} onAction - CTA click
 * @param {string} className
 */
const ProfileCard = ({ avatar, name, role, bio, coverImage, stats, socials, actionLabel = "Follow", onAction, className, ...rest }) => (
  <div className={cls("rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden", className)} {...rest}>
    {/* Cover */}
    <div className="h-20 sm:h-24 md:h-28 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
      {coverImage && <img src={coverImage} alt="" className="w-full h-full object-cover" />}
    </div>
    {/* Avatar */}
    <div className="flex justify-center -mt-10 sm:-mt-12">
      {avatar ? (
        <img src={avatar} alt={name || ""} className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-zinc-800 object-cover shadow" />
      ) : (
        <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-white dark:border-zinc-800 bg-gray-200 dark:bg-zinc-600 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-500 dark:text-gray-300 shadow">
          {name?.[0] || "?"}
        </div>
      )}
    </div>
    <div className="text-center px-3 sm:px-5 pb-4 sm:pb-5 pt-2 sm:pt-3">
      {name && <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{name}</h3>}
      {role && <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>}
      {bio && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{bio}</p>}
      {/* Stats */}
      {stats?.length > 0 && (
        <div className="flex justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-zinc-700">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      )}
      {/* Socials */}
      {socials?.length > 0 && (
        <div className="flex justify-center gap-3 mt-4">
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              {s.icon}
            </a>
          ))}
        </div>
      )}
      {/* CTA */}
      {onAction && (
        <button onClick={onAction} className="mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer">
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);
ProfileCard.displayName = "ProfileCard";

/* ─────────────────────────────────────────────
   3) ProductCard
   E-commerce: image, badge, title, price, rating,
   add-to-cart.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} image
 * @param {string} title
 * @param {string} description
 * @param {number|string} price
 * @param {number|string} originalPrice - Crossed-out price
 * @param {number} rating - 0–5
 * @param {number} reviewCount
 * @param {string} badge - e.g. "Sale", "New"
 * @param {string} badgeColor - Tailwind bg class (default "bg-red-500")
 * @param {string} currency - default "$"
 * @param {Function} onAddToCart
 * @param {Function} onWishlist
 * @param {string} addToCartLabel
 * @param {string} className
 */
const ProductCard = ({
  image, title, description, price, originalPrice, rating, reviewCount, badge, badgeColor = "bg-red-500",
  currency = "$", onAddToCart, onWishlist, addToCartLabel = "Add to Cart", className, ...rest
}) => (
  <div className={cls("group rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg", className)} {...rest}>
    {/* Image */}
    <div className="relative overflow-hidden">
      {image && <img src={image} alt={title || ""} loading="lazy" className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105" />}
      {badge && <span className={cls("absolute top-2 left-2 sm:top-3 sm:left-3 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full", badgeColor)}>{badge}</span>}
      {onWishlist && (
        <button onClick={onWishlist} aria-label="Add to wishlist" className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/80 dark:bg-zinc-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
        </button>
      )}
    </div>
    {/* Body */}
    <div className="p-3 sm:p-4">
      {title && <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 line-clamp-1">{title}</h3>}
      {description && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">{description}</p>}
      {rating != null && (
        <div className="flex items-center gap-2 mb-2">
          <Stars rating={rating} />
          {reviewCount != null && <span className="text-xs text-gray-400 dark:text-gray-500">({reviewCount})</span>}
        </div>
      )}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{currency}{price}</span>
          {originalPrice && <span className="text-xs sm:text-sm text-gray-400 line-through">{currency}{originalPrice}</span>}
        </div>
        {onAddToCart && (
          <button onClick={onAddToCart} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer">
            {addToCartLabel}
          </button>
        )}
      </div>
    </div>
  </div>
);
ProductCard.displayName = "ProductCard";

/* ─────────────────────────────────────────────
   4) TestimonialCard
   Customer review with quote, avatar, rating.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} quote
 * @param {string} author
 * @param {string} role
 * @param {string} avatar
 * @param {number} rating
 * @param {string} className
 */
const TestimonialCard = ({ quote, author, role, avatar, rating, className, ...rest }) => (
  <div className={cls("rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm p-4 sm:p-5 md:p-6 transition-all duration-200 hover:shadow-md", className)} {...rest}>
    {/* Quote icon */}
    <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500/30 mb-2 sm:mb-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
    </svg>
    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 italic leading-relaxed mb-3 sm:mb-4">"{quote}"</p>
    {rating != null && <div className="mb-3"><Stars rating={rating} /></div>}
    <div className="flex items-center gap-3">
      {avatar ? (
        <img src={avatar} alt={author || ""} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
          {author?.[0] || "?"}
        </div>
      )}
      <div>
        {author && <div className="font-semibold text-gray-900 dark:text-white text-sm">{author}</div>}
        {role && <div className="text-xs text-gray-500 dark:text-gray-400">{role}</div>}
      </div>
    </div>
  </div>
);
TestimonialCard.displayName = "TestimonialCard";

/* ─────────────────────────────────────────────
   5) BlogCard
   Post preview: image, category tag, title,
   excerpt, author, date, read time.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} image
 * @param {string} category
 * @param {string} categoryColor - Tailwind text class (default "text-blue-600")
 * @param {string} title
 * @param {string} excerpt
 * @param {{ name: string, avatar?: string }} author
 * @param {string} date
 * @param {string} readTime
 * @param {Function} onClick
 * @param {string} className
 */
const BlogCard = ({ image, category, categoryColor = "text-blue-600 dark:text-blue-400", title, excerpt, author, date, readTime, onClick, className, ...rest }) => (
  <div
    onClick={onClick}
    className={cls(
      "group rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md",
      onClick && "cursor-pointer",
      className
    )}
    {...rest}
  >
    {image && (
      <div className="overflow-hidden">
        <img src={image} alt={title || ""} loading="lazy" className="w-full h-36 sm:h-44 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
    )}
    <div className="p-3 sm:p-4 md:p-5">
      {category && <span className={cls("text-[10px] sm:text-xs font-semibold uppercase tracking-wider", categoryColor)}>{category}</span>}
      {title && <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-1 mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>}
      {excerpt && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3 sm:mb-4">{excerpt}</p>}
      <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        {author && (
          <div className="flex items-center gap-2">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-600 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-gray-300">{author.name?.[0]}</div>
            )}
            <span className="font-medium text-gray-600 dark:text-gray-300">{author.name}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {date && <span>{date}</span>}
          {readTime && <><span>·</span><span>{readTime}</span></>}
        </div>
      </div>
    </div>
  </div>
);
BlogCard.displayName = "BlogCard";

/* ─────────────────────────────────────────────
   6) StatsCard
   Dashboard metric: icon, value, label, trend.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {ReactNode} icon
 * @param {string} iconBg - Tailwind bg class (default "bg-blue-100 dark:bg-blue-900/40")
 * @param {string} iconColor - Tailwind text class (default "text-blue-600")
 * @param {string|number} value
 * @param {string} label
 * @param {number} trend - Percentage change (+/-)
 * @param {string} trendLabel - e.g. "vs last month"
 * @param {string} className
 */
const StatsCard = ({ icon, iconBg = "bg-blue-100 dark:bg-blue-900/40", iconColor = "text-blue-600 dark:text-blue-400", value, label, trend, trendLabel, className, ...rest }) => {
  const isPositive = trend > 0;
  const isNeutral = trend === 0 || trend == null;
  return (
    <div className={cls("rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm p-3 sm:p-4 md:p-5 transition-all duration-200 hover:shadow-md", className)} {...rest}>
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        {icon && <div className={cls("h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-xl flex items-center justify-center", iconBg, iconColor)}>{icon}</div>}
        {!isNeutral && (
          <span className={cls("flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full", isPositive ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400")}>
            <svg viewBox="0 0 12 12" className={cls("h-3 w-3", !isPositive && "rotate-180")} fill="currentColor"><path d="M6 2l4 5H2z" /></svg>
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
        {label}
        {trendLabel && <span className="ml-1 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">{trendLabel}</span>}
      </div>
    </div>
  );
};
StatsCard.displayName = "StatsCard";

/* ─────────────────────────────────────────────
   7) TeamCard
   Team member: photo, name, role, bio, socials.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} photo
 * @param {string} name
 * @param {string} role
 * @param {string} bio
 * @param {{ icon: ReactNode, href: string }[]} socials
 * @param {string} className
 */
const TeamCard = ({ photo, name, role, bio, socials, className, ...rest }) => (
  <div className={cls("rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden text-center transition-all duration-200 hover:shadow-md group", className)} {...rest}>
    <div className="pt-6 px-6">
      {photo ? (
        <img src={photo} alt={name || ""} className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto ring-4 ring-gray-100 dark:ring-zinc-700 transition-transform duration-200 group-hover:scale-105" />
      ) : (
        <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center text-2xl sm:text-3xl font-bold text-white ring-4 ring-gray-100 dark:ring-zinc-700">{name?.[0] || "?"}</div>
      )}
    </div>
    <div className="p-3 sm:p-4 md:p-5">
      {name && <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{name}</h3>}
      {role && <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">{role}</p>}
      {bio && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{bio}</p>}
      {socials?.length > 0 && (
        <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-700">
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {s.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);
TeamCard.displayName = "TeamCard";

/* ─────────────────────────────────────────────
   8) FeatureCard
   Marketing/feature showcase: icon, title, desc.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {ReactNode} icon
 * @param {string} iconBg - Tailwind bg class
 * @param {string} iconColor - Tailwind text class
 * @param {string} title
 * @param {string} description
 * @param {ReactNode} action - CTA element
 * @param {boolean} centered - Center content (default false)
 * @param {string} className
 */
const FeatureCard = ({ icon, iconBg = "bg-blue-100 dark:bg-blue-900/40", iconColor = "text-blue-600 dark:text-blue-400", title, description, action, centered = false, className, ...rest }) => (
  <div className={cls("rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm p-4 sm:p-5 md:p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5", centered && "text-center", className)} {...rest}>
    {icon && (
      <div className={cls("h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4", iconBg, iconColor, centered && "mx-auto")}>{icon}</div>
    )}
    {title && <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1.5 sm:mb-2">{title}</h3>}
    {description && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>}
    {action && <div className="mt-3 sm:mt-4">{action}</div>}
  </div>
);
FeatureCard.displayName = "FeatureCard";

/* ─────────────────────────────────────────────
   9) NotificationCard
   Alert/notification: icon, message, timestamp,
   read state, action.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {ReactNode} icon
 * @param {string} iconBg
 * @param {string} title
 * @param {string} message
 * @param {string} timestamp
 * @param {boolean} unread
 * @param {Function} onDismiss
 * @param {Function} onClick
 * @param {string} className
 */
const NotificationCard = ({ icon, iconBg = "bg-blue-100 dark:bg-blue-900/40", title, message, timestamp, unread = false, onDismiss, onClick, className, ...rest }) => (
  <div
    onClick={onClick}
    className={cls(
      "flex items-start gap-3 rounded-xl p-4 transition-all duration-200",
      unread
        ? "bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50"
        : "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700",
      onClick && "cursor-pointer hover:shadow-sm",
      className
    )}
    {...rest}
  >
    {icon && <div className={cls("h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0", iconBg)}>{icon}</div>}
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div>
          {title && <p className={cls("text-sm font-semibold", unread ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300")}>{title}</p>}
          {message && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{message}</p>}
        </div>
        {onDismiss && (
          <button onClick={(e) => { e.stopPropagation(); onDismiss(); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0 cursor-pointer" aria-label="Dismiss">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      {timestamp && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{timestamp}</p>}
    </div>
    {unread && <span className="h-2.5 w-2.5 rounded-full bg-blue-500 flex-shrink-0 mt-1" />}
  </div>
);
NotificationCard.displayName = "NotificationCard";

/* ─────────────────────────────────────────────
   10) ImageOverlayCard
   Full-bleed image with gradient overlay text.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} image
 * @param {string} title
 * @param {string} subtitle
 * @param {string} badge
 * @param {ReactNode} action
 * @param {"bottom"|"center"} align - Text alignment (default "bottom")
 * @param {string} height - Tailwind height class (default "h-72")
 * @param {Function} onClick
 * @param {string} className
 */
const ImageOverlayCard = ({ image, title, subtitle, badge, action, align = "bottom", height = "h-72", onClick, className, ...rest }) => (
  <div
    onClick={onClick}
    className={cls("relative rounded-2xl overflow-hidden group", height || "h-48 sm:h-60 md:h-72", onClick && "cursor-pointer", className)}
    {...rest}
  >
    {image && <img src={image} alt={title || ""} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
    <div className={cls(
      "absolute inset-0 flex flex-col p-4 sm:p-5 md:p-6 text-white",
      align === "center" ? "items-center justify-center text-center bg-black/40" : "justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent"
    )}>
      {badge && <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">{badge}</span>}
      {title && <h3 className="text-base sm:text-lg md:text-xl font-bold drop-shadow-lg">{title}</h3>}
      {subtitle && <p className="text-sm text-white/80 mt-1 drop-shadow">{subtitle}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  </div>
);
ImageOverlayCard.displayName = "ImageOverlayCard";

/* ─────────────────────────────────────────────
   11) HorizontalCard
   Side-by-side: image left, content right.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} image
 * @param {string} title
 * @param {string} description
 * @param {ReactNode} meta - Metadata line (tags, date, etc.)
 * @param {ReactNode} action - CTA element
 * @param {"left"|"right"} imagePosition - default "left"
 * @param {string} imageWidth - Tailwind width class (default "w-48")
 * @param {Function} onClick
 * @param {string} className
 */
const HorizontalCard = ({ image, title, description, meta, action, imagePosition = "left", imageWidth = "w-48", onClick, className, ...rest }) => (
  <div
    onClick={onClick}
    className={cls(
      "flex flex-col sm:flex-row rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md",
      imagePosition === "right" && "sm:flex-row-reverse",
      onClick && "cursor-pointer",
      className
    )}
    {...rest}
  >
    {image && <img src={image} alt={title || ""} loading="lazy" className={cls("object-cover flex-shrink-0 w-full h-36 sm:h-auto sm:w-40 md:w-48", imageWidth && `sm:${imageWidth}`)} />}
    <div className="flex flex-col justify-center p-3 sm:p-4 md:p-5 flex-1 min-w-0">
      {title && <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 line-clamp-2">{title}</h3>}
      {description && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-2">{description}</p>}
      {meta && <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">{meta}</div>}
      {action && <div className="mt-auto">{action}</div>}
    </div>
  </div>
);
HorizontalCard.displayName = "HorizontalCard";

/* ─────────────────────────────────────────────
   12) PricingCardSingle
   Standalone pricing card (simpler than the
   PricingCards grid component).
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} name
 * @param {string} description
 * @param {number|string} price
 * @param {string} period - e.g. "/month"
 * @param {string[]} features
 * @param {string} ctaLabel
 * @param {Function} onSelect
 * @param {boolean} featured
 * @param {string} badge
 * @param {string} accentColor - Tailwind color name (default "blue")
 * @param {string} className
 */
const accentMap = {
  blue:   { bg: "bg-blue-600",   hover: "hover:bg-blue-700",   border: "border-blue-500", badgeBg: "bg-blue-500",   ring: "ring-blue-200 dark:ring-blue-800" },
  indigo: { bg: "bg-indigo-600", hover: "hover:bg-indigo-700", border: "border-indigo-500", badgeBg: "bg-indigo-500", ring: "ring-indigo-200 dark:ring-indigo-800" },
  purple: { bg: "bg-purple-600", hover: "hover:bg-purple-700", border: "border-purple-500", badgeBg: "bg-purple-500", ring: "ring-purple-200 dark:ring-purple-800" },
  green:  { bg: "bg-green-600",  hover: "hover:bg-green-700",  border: "border-green-500", badgeBg: "bg-green-500",  ring: "ring-green-200 dark:ring-green-800" },
  red:    { bg: "bg-red-600",    hover: "hover:bg-red-700",    border: "border-red-500",   badgeBg: "bg-red-500",    ring: "ring-red-200 dark:ring-red-800" },
  amber:  { bg: "bg-amber-600",  hover: "hover:bg-amber-700",  border: "border-amber-500", badgeBg: "bg-amber-500",  ring: "ring-amber-200 dark:ring-amber-800" },
  teal:   { bg: "bg-teal-600",   hover: "hover:bg-teal-700",   border: "border-teal-500",  badgeBg: "bg-teal-500",   ring: "ring-teal-200 dark:ring-teal-800" },
  pink:   { bg: "bg-pink-600",   hover: "hover:bg-pink-700",   border: "border-pink-500",  badgeBg: "bg-pink-500",   ring: "ring-pink-200 dark:ring-pink-800" },
};

const PricingCardSingle = ({ name, description, price, period = "/mo", features = [], ctaLabel = "Get Started", onSelect, featured = false, badge, accentColor = "blue", className, ...rest }) => {
  const a = accentMap[accentColor] || accentMap.blue;
  return (
    <div
      className={cls(
        "rounded-2xl bg-white dark:bg-zinc-800 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg relative",
        featured ? `border-2 ${a.border} ring-4 ${a.ring}` : "border border-gray-200 dark:border-zinc-700",
        className
      )}
      {...rest}
    >
      {badge && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className={cls("text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg", a.badgeBg)}>{badge}</span>
        </div>
      )}
      <div className="p-4 sm:p-5 md:p-6 text-center">
        {name && <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">{name}</h3>}
        {description && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-5">{description}</p>}
        <div className="mb-4 sm:mb-5">
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">${price}</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{period}</span>
        </div>
        {onSelect && (
          <button onClick={onSelect} className={cls("w-full py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer", featured ? `${a.bg} ${a.hover} text-white` : "bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600")}>
            {ctaLabel}
          </button>
        )}
      </div>
      {features.length > 0 && (
        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
          <div className="border-t border-gray-100 dark:border-zinc-700 pt-3 sm:pt-4">
            <ul className="space-y-2.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
PricingCardSingle.displayName = "PricingCardSingle";

/* ─────────────────────────────────────────────
   13) MetricCard
   Compact metric with sparkline-style bar chart.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {string} label
 * @param {string|number} value
 * @param {number[]} data - Array of values for mini bar chart
 * @param {string} barColor - Tailwind bg class (default "bg-blue-500")
 * @param {string} className
 */
const MetricCard = ({ label, value, data = [], barColor = "bg-blue-500", className, ...rest }) => {
  const max = Math.max(...data, 1);
  return (
    <div className={cls("rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm p-3 sm:p-4 md:p-5 transition-all duration-200 hover:shadow-md", className)} {...rest}>
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{value}</div>
      {data.length > 0 && (
        <div className="flex items-end gap-1 h-10">
          {data.map((v, i) => (
            <div key={i} className={cls("flex-1 rounded-sm transition-all duration-300", barColor)} style={{ height: `${(v / max) * 100}%`, opacity: 0.4 + (v / max) * 0.6 }} />
          ))}
        </div>
      )}
    </div>
  );
};
MetricCard.displayName = "MetricCard";

/* ─────────────────────────────────────────────
   14) InteractiveCard
   Card with flip/expand interaction.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {ReactNode} front - Front face content
 * @param {ReactNode} back - Back face content
 * @param {"flip"|"expand"} interaction - default "flip"
 * @param {string} height - Tailwind height class (default "h-64")
 * @param {string} className
 */
const InteractiveCard = ({ front, back, interaction = "flip", height = "h-64", className, ...rest }) => {
  const [active, setActive] = useState(false);

  if (interaction === "expand") {
    return (
      <div
        className={cls(
          "rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm overflow-hidden transition-all duration-500 cursor-pointer",
          active ? "max-h-[600px]" : "max-h-48",
          className
        )}
        onClick={() => setActive(!active)}
        {...rest}
      >
        <div className="p-5">{front}</div>
        <div className={cls("px-5 pb-5 transition-opacity duration-300", active ? "opacity-100" : "opacity-0")}>{back}</div>
      </div>
    );
  }

  // Flip
  return (
    <div className={cls("perspective-[1000px]", height, className)} onClick={() => setActive(!active)} {...rest}>
      <div className={cls("relative w-full h-full transition-transform duration-500 cursor-pointer", active && "[transform:rotateY(180deg)]")} style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm p-5 overflow-auto" style={{ backfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div className="absolute inset-0 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm p-5 overflow-auto [transform:rotateY(180deg)]" style={{ backfaceVisibility: "hidden" }}>
          {back}
        </div>
      </div>
    </div>
  );
};
InteractiveCard.displayName = "InteractiveCard";

/* ─────────────────────────────────────────────
   15) GlassCard
   Frosted glass / glassmorphism effect.
   ───────────────────────────────────────────── */
/**
 */
/*
 * @param {ReactNode} children
 * @param {string} className
 */
const GlassCard = ({ children, className, ...rest }) => (
  <div
    className={cls(
      "rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg p-4 sm:p-5 md:p-6",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);
GlassCard.displayName = "GlassCard";

/* ─────────────────────────────────────────────
   Exports
   ───────────────────────────────────────────── */
export {
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
};
