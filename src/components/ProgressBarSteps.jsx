import { useCallback } from "react";
import { Check } from "lucide-react";

/**
 * ProgressBarSteps - A step progress bar with visual indicators and navigation.
 */
/*
 * @param {Object[]} steps - Array of { id, label, description? }
 * @param {number} currentStep - Current step (1-based)
 * @param {Function} onStepChange - Callback: (stepId: number) => void
 * @param {boolean} clickable - Enable click-to-navigate
 * @param {string} activeColor - Tailwind gradient/bg classes for active state
 * @param {string} className - Additional CSS classes
 * @param {boolean} showProgress - Show percentage bar below steps
 * @param {boolean} showNavButtons - Show prev/next buttons
 */
const ProgressBarSteps = ({
  steps = [],
  currentStep = 1,
  onStepChange,
  clickable = true,
  activeColor = "bg-blue-600 border-blue-600",
  className = "",
  showProgress = true,
  showNavButtons = true,
}) => {
  // Ensure currentStep is always a valid number
  const step = typeof currentStep === "number" && !isNaN(currentStep)
    ? Math.max(1, Math.min(currentStep, steps.length || 1))
    : 1;

  const progress = steps.length > 1 ? ((step - 1) / (steps.length - 1)) * 100 : 0;

  const handleStepClick = useCallback(
    (stepNumber) => {
      if (clickable) onStepChange?.(stepNumber);
    },
    [clickable, onStepChange]
  );

  return (
    <div className={className}>
      {/* Step Indicators */}
      <div className="relative mb-4 sm:mb-6">
        <div className="flex">
          {steps.map((s, idx) => {
            const stepNum = idx + 1;
            return (
            <div key={s.id || idx} className="flex-1 relative">
              <div className="flex items-center">
                <button
                  type="button"
                  className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    clickable ? "cursor-pointer hover:scale-105" : "cursor-default"
                  } ${
                    step >= stepNum
                      ? `${activeColor} text-white`
                      : "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-400 dark:text-gray-500"
                  }`}
                  onClick={() => handleStepClick(stepNum)}
                  disabled={!clickable}
                >
                  {step > stepNum ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <span className="text-xs sm:text-sm font-bold">{stepNum}</span>
                  )}
                </button>

                {idx < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-1 sm:mx-2 bg-gray-200 dark:bg-zinc-700 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                      style={{
                        width: step > stepNum ? "100%" : step === stepNum ? "50%" : "0%",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {/* Labels */}
        <div className="flex mt-3">
          {steps.map((s, idx) => (
            <div key={s.id || idx} className="flex-1 text-center">
              <div className={`text-[10px] sm:text-xs font-semibold ${step >= idx + 1 ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                {s.label}
              </div>
              {s.description && (
                <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{s.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <span>Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      {showNavButtons && (
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => step > 1 && onStepChange?.(step - 1)}
            disabled={step === 1}
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors text-xs sm:text-sm font-medium"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => step < steps.length && onStepChange?.(step + 1)}
            disabled={step === steps.length}
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
          >
            {step === steps.length ? "Complete" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

ProgressBarSteps.displayName = "ProgressBarSteps";

export { ProgressBarSteps };
export default ProgressBarSteps;
