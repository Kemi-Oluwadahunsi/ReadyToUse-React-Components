import { useState, useCallback } from "react";
import { Sun, Moon, Check, X, Volume2, VolumeX } from "lucide-react";

/**
 * ToggleSwitch - A polished, accessible toggle switch with multiple design variants.
 */
/*
 * @param {boolean} checked - Controlled checked state
 * @param {boolean} defaultChecked - Initial checked state (uncontrolled)
 * @param {Function} onChange - Callback: (checked: boolean) => void
 * @param {string} label - Label text displayed beside the toggle
 * @param {boolean} disabled - Disable the toggle
 * @param {"sm"|"md"|"lg"} size - Toggle size
 * @param {"default"|"ios"|"material"|"pill"|"icon"|"labeled"|"outline"|"slim"} variant - Design variant
 * @param {string} onColor - Tailwind bg class when on (e.g. "bg-blue-600")
 * @param {string} offColor - Tailwind bg class when off
 * @param {string} className - Additional CSS classes
 * @param {string} labelPosition - "left" | "right"
 * @param {string} onLabel - Text/icon inside track when on (for "labeled" variant)
 * @param {string} offLabel - Text/icon inside track when off (for "labeled" variant)
 * @param {React.ReactNode} onIcon - Icon when on (for "icon" variant)
 * @param {React.ReactNode} offIcon - Icon when off (for "icon" variant)
 * @param {string} description - Helper text below the label
 */
const ToggleSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  variant = "default",
  onColor = "",
  offColor = "",
  className = "",
  labelPosition = "right",
  onLabel = "",
  offLabel = "",
  onIcon,
  offIcon,
  description,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, isControlled, onChange]);

  /* ── Size maps per variant ── */
  const defaultSizes = {
    sm: { track: "w-9 h-5", thumb: "w-4 h-4", translate: "translate-x-4", offset: "translate-x-0.5" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5", offset: "translate-x-0.5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7", offset: "translate-x-0.5" },
  };

  const iosSizes = {
    sm: { track: "w-10 h-[22px]", thumb: "w-[18px] h-[18px]", translate: "translate-x-[18px]", offset: "translate-x-[2px]" },
    md: { track: "w-[51px] h-[31px]", thumb: "w-[27px] h-[27px]", translate: "translate-x-[22px]", offset: "translate-x-[2px]" },
    lg: { track: "w-16 h-9", thumb: "w-8 h-8", translate: "translate-x-[28px]", offset: "translate-x-[2px]" },
  };

  const materialSizes = {
    sm: { track: "w-8 h-3.5", thumb: "w-5 h-5", translate: "translate-x-3.5", offset: "-translate-x-0.5" },
    md: { track: "w-10 h-4", thumb: "w-6 h-6", translate: "translate-x-5", offset: "-translate-x-0.5" },
    lg: { track: "w-12 h-5", thumb: "w-7 h-7", translate: "translate-x-6", offset: "-translate-x-0.5" },
  };

  const pillSizes = {
    sm: { track: "w-16 h-7", thumb: "w-7 h-5", translate: "translate-x-[30px]", offset: "translate-x-1" },
    md: { track: "w-20 h-9", thumb: "w-9 h-7", translate: "translate-x-[38px]", offset: "translate-x-1" },
    lg: { track: "w-24 h-10", thumb: "w-10 h-8", translate: "translate-x-[50px]", offset: "translate-x-1" },
  };

  const labeledSizes = {
    sm: { track: "w-14 h-7", thumb: "w-6 h-5", translate: "translate-x-[26px]", offset: "translate-x-1" },
    md: { track: "w-18 h-9", thumb: "w-8 h-7", translate: "translate-x-[34px]", offset: "translate-x-1" },
    lg: { track: "w-22 h-10", thumb: "w-9 h-8", translate: "translate-x-[44px]", offset: "translate-x-1" },
  };

  const slimSizes = {
    sm: { track: "w-8 h-2", thumb: "w-3.5 h-3.5", translate: "translate-x-[18px]", offset: "translate-x-0" },
    md: { track: "w-10 h-2.5", thumb: "w-4 h-4", translate: "translate-x-[24px]", offset: "translate-x-0" },
    lg: { track: "w-12 h-3", thumb: "w-5 h-5", translate: "translate-x-[28px]", offset: "translate-x-0" },
  };

  const sizeMap = {
    default: defaultSizes,
    ios: iosSizes,
    material: materialSizes,
    pill: pillSizes,
    icon: defaultSizes,
    labeled: labeledSizes,
    outline: defaultSizes,
    slim: slimSizes,
  };

  const s = (sizeMap[variant] || defaultSizes)[size] || (sizeMap[variant] || defaultSizes).md;

  /* ── Default colors per variant ── */
  const defaultOnColors = {
    default: "bg-blue-600",
    ios: "bg-green-500",
    material: "bg-blue-500/40",
    pill: "bg-blue-600",
    icon: "bg-indigo-600",
    labeled: "bg-green-500",
    outline: "bg-transparent",
    slim: "bg-blue-600",
  };

  const defaultOffColors = {
    default: "bg-gray-300 dark:bg-zinc-600",
    ios: "bg-gray-300 dark:bg-zinc-600",
    material: "bg-gray-300 dark:bg-zinc-600",
    pill: "bg-gray-300 dark:bg-zinc-600",
    icon: "bg-gray-300 dark:bg-zinc-600",
    labeled: "bg-red-400 dark:bg-red-500/60",
    outline: "bg-transparent",
    slim: "bg-gray-300 dark:bg-zinc-600",
  };

  const resolvedOnColor = onColor || defaultOnColors[variant] || defaultOnColors.default;
  const resolvedOffColor = offColor || defaultOffColors[variant] || defaultOffColors.default;

  /* ── Material variant thumb colors ── */
  const materialThumbOn = "bg-blue-600 dark:bg-blue-400";
  const materialThumbOff = "bg-white dark:bg-gray-300";

  /* ── Icon size for icon variant ── */
  const iconSize = { sm: "h-3 w-3", md: "h-3.5 w-3.5", lg: "h-4 w-4" }[size] || "h-3.5 w-3.5";

  /* ── Render the toggle per variant ── */
  const renderToggle = () => {
    const disabledCls = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    const focus = "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900";

    /* ── Default ── */
    if (variant === "default") {
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-300 ${focus} ${isChecked ? resolvedOnColor : resolvedOffColor} ${disabledCls}`}>
          <span className={`inline-block ${s.thumb} bg-white rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? s.translate : s.offset}`} />
        </button>
      );
    }

    /* ── iOS ── */
    if (variant === "ios") {
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-300 ease-in-out ${focus} ${isChecked ? resolvedOnColor : resolvedOffColor} ${disabledCls}`}>
          <span className={`inline-block ${s.thumb} bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out ${isChecked ? s.translate : s.offset}`}
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
        </button>
      );
    }

    /* ── Material ── */
    if (variant === "material") {
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-200 ${focus} ${isChecked ? resolvedOnColor : resolvedOffColor} ${disabledCls}`}>
          <span className={`inline-block ${s.thumb} rounded-full shadow-md transform transition-all duration-200 ${isChecked ? `${s.translate} ${materialThumbOn}` : `${s.offset} ${materialThumbOff}`}`} />
        </button>
      );
    }

    /* ── Pill ── */
    if (variant === "pill") {
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-300 ${focus} ${isChecked ? resolvedOnColor : resolvedOffColor} ${disabledCls}`}>
          <span className={`inline-block ${s.thumb} bg-white rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? s.translate : s.offset}`} />
        </button>
      );
    }

    /* ── Icon ── */
    if (variant === "icon") {
      const OnIc = onIcon || Sun;
      const OffIc = offIcon || Moon;
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-300 ${focus} ${isChecked ? resolvedOnColor : resolvedOffColor} ${disabledCls}`}>
          <span className={`flex items-center justify-center ${s.thumb} bg-white rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? s.translate : s.offset}`}>
            {isChecked ? <OnIc className={`${iconSize} text-amber-500`} /> : <OffIc className={`${iconSize} text-gray-500`} />}
          </span>
        </button>
      );
    }

    /* ── Labeled ── */
    if (variant === "labeled") {
      const onLbl = onLabel || "ON";
      const offLbl = offLabel || "OFF";
      const labelSz = { sm: "text-[9px]", md: "text-[10px]", lg: "text-xs" }[size] || "text-[10px]";
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-300 ${focus} ${isChecked ? resolvedOnColor : resolvedOffColor} ${disabledCls}`}>
          {/* Track labels */}
          <span className={`absolute left-1.5 ${labelSz} font-bold text-white transition-opacity duration-200 ${isChecked ? "opacity-100" : "opacity-0"}`}>{onLbl}</span>
          <span className={`absolute right-1.5 ${labelSz} font-bold text-white transition-opacity duration-200 ${isChecked ? "opacity-0" : "opacity-100"}`}>{offLbl}</span>
          <span className={`inline-block ${s.thumb} bg-white rounded-full shadow-md transform transition-transform duration-300 ${isChecked ? s.translate : s.offset}`} />
        </button>
      );
    }

    /* ── Outline ── */
    if (variant === "outline") {
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-all duration-300 ${focus} border-2 ${
            isChecked ? "border-blue-600 dark:border-blue-400" : "border-gray-400 dark:border-zinc-500"
          } ${disabledCls}`}>
          <span className={`inline-block ${s.thumb} rounded-full shadow-sm transform transition-all duration-300 ${
            isChecked ? `${s.translate} bg-blue-600 dark:bg-blue-400` : `${s.offset} bg-gray-400 dark:bg-zinc-500`
          }`} />
        </button>
      );
    }

    /* ── Slim ── */
    if (variant === "slim") {
      return (
        <button type="button" role="switch" aria-checked={isChecked} aria-label={label || "Toggle"} onClick={handleToggle} disabled={disabled}
          className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-300 ${focus} ${isChecked ? resolvedOnColor : resolvedOffColor} ${disabledCls}`}>
          <span className={`inline-block ${s.thumb} bg-white rounded-full shadow-md ring-1 ring-gray-200 dark:ring-zinc-600 transform transition-transform duration-300 ${isChecked ? s.translate : s.offset}`} />
        </button>
      );
    }

    return null;
  };

  const toggle = renderToggle();

  if (!label && !description) return <div className={className}>{toggle}</div>;

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {labelPosition === "left" && (
        <div className="flex flex-col mt-0.5">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">{label}</span>
          {description && <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</span>}
        </div>
      )}
      <div className="mt-0.5">{toggle}</div>
      {labelPosition === "right" && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">{label}</span>
          {description && <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</span>}
        </div>
      )}
    </div>
  );
};

ToggleSwitch.displayName = "ToggleSwitch";

export { ToggleSwitch };
export default ToggleSwitch;
