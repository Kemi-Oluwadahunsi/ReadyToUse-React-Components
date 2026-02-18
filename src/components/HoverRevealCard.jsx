import { useState, useCallback } from "react";
import { ExternalLink, Heart, Share2, Star, Eye } from "lucide-react";

/**
 * HoverRevealCard - A card with hover-activated overlay revealing details.
 */
/*
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} image - Image URL
 * @param {string} category - Category badge text
 * @param {string[]} tags - Array of tag strings
 * @param {string} author - Author name
 * @param {string} date - Date string
 * @param {number} likes - Like count
 * @param {number} views - View count
 * @param {boolean} featured - Show featured badge
 * @param {Function} onLike - Like callback
 * @param {Function} onShare - Share callback
 * @param {Function} onClick - Click callback
 * @param {string} actionLabel - CTA button label
 * @param {string} className - Additional CSS classes
 * @param {string} categoryColor - Tailwind classes for category badge
 */
const HoverRevealCard = ({
  title,
  description,
  image,
  category,
  tags = [],
  author,
  date,
  likes,
  views,
  featured = false,
  onLike,
  onShare,
  onClick,
  actionLabel = "View Details",
  className = "",
  categoryColor = "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  children,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = useCallback(
    (e) => {
      e.stopPropagation();
      setIsLiked((prev) => {
        const next = !prev;
        onLike?.(next);
        return next;
      });
    },
    [onLike]
  );

  const handleShare = useCallback(
    (e) => {
      e.stopPropagation();
      onShare?.({ title, description, image });
    },
    [onShare, title, description, image]
  );

  return (
    <div
      className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white dark:bg-zinc-800 ${className}`}
      onClick={onClick}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-40 sm:h-52 overflow-hidden bg-gray-100 dark:bg-zinc-700">
        {image && (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        )}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-700 animate-pulse" />
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
          {onLike && (
            <button
              onClick={handleLike}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                isLiked ? "bg-red-500 text-white" : "bg-white/80 dark:bg-zinc-800/80 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          )}
          {onShare && (
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:scale-110 transition-all duration-200"
            >
              <Share2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Stats */}
        {(likes !== undefined || views !== undefined) && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            {likes !== undefined && (
              <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                <Heart className="h-3 w-3" /> {likes}
              </span>
            )}
            {views !== undefined && (
              <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                <Eye className="h-3 w-3" /> {views}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Overlay Content */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 sm:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out">
        {category && (
          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-2 sm:mb-3 ${categoryColor}`}>
            {category}
          </span>
        )}
        <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-1">{title}</h3>
        {description && <p className="text-sm text-gray-200 mb-3 line-clamp-2">{description}</p>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs">{tag}</span>
            ))}
            {tags.length > 3 && <span className="px-2 py-0.5 bg-white/20 rounded text-xs">+{tags.length - 3}</span>}
          </div>
        )}

        {(author || date) && (
          <div className="flex items-center justify-between text-xs text-gray-300 mb-3">
            {author && (
              <span className="flex items-center gap-1.5">
                {typeof author === "object" && author.avatar && (
                  <img src={author.avatar} alt="" className="h-5 w-5 rounded-full object-cover" />
                )}
                {typeof author === "string" ? author : author?.name}
              </span>
            )}
            {date && <span>{date}</span>}
          </div>
        )}

        {children || (
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all w-full justify-center">
            <ExternalLink className="h-4 w-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

HoverRevealCard.displayName = "HoverRevealCard";

export { HoverRevealCard };
export default HoverRevealCard;
