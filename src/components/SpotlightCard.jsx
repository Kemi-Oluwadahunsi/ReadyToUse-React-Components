import { useRef, useState, useCallback } from "react";

/**
 * SpotlightCard - Card with mouse-following radial glow effect.
 */
/*
 * @param {ReactNode} children - Card content
 * @param {string} spotlightColor - Glow color (default "rgba(59,130,246,0.15)")
 * @param {number} spotlightSize - Glow radius in px (default 300)
 * @param {boolean} borderGlow - Apply glow to border too (default true)
 * @param {string} borderColor - Border glow color (default "rgba(59,130,246,0.3)")
 * @param {boolean} tilt - Enable 3D tilt effect (default false)
 * @param {number} maxTilt - Max tilt degrees (default 8)
 * @param {string} className - Extra CSS
 * @param {Function} onClick - Click handler
 */

const SpotlightCard = ({
  children,
  spotlightColor = "rgba(59,130,246,0.15)",
  spotlightSize = 300,
  borderGlow = true,
  borderColor = "rgba(59,130,246,0.3)",
  tilt = false,
  maxTilt = 8,
  className = "",
  onClick,
  ...rest
}) => {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPos({ x, y });

      if (tilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        const rotateX = -((y - centerY) / centerY) * maxTilt;
        setTiltStyle({
          transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
        });
      }
    },
    [tilt, maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPos({ x: -1000, y: -1000 });
    setTiltStyle({ transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)" });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      style={{
        ...tiltStyle,
        transition: isHovered
          ? "transform .1s ease-out"
          : "transform .4s ease-out",
      }}
      {...rest}
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Border glow */}
      {borderGlow && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: `inset 0 0 0 1px ${borderColor}`,
            background: `radial-gradient(${spotlightSize * 0.7}px circle at ${pos.x}px ${pos.y}px, ${borderColor}, transparent 70%)`,
            maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
            borderRadius: "inherit",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

SpotlightCard.displayName = "SpotlightCard";

export { SpotlightCard };
export default SpotlightCard;
