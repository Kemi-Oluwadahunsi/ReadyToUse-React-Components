import { useCallback } from "react";
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from "lucide-react";

/**
 * Stepper - An interactive, configurable step progress component.
 */
/*
 * @param {Object[]} steps - Array of { id, title, description, icon?: LucideIcon }
 * @param {number} currentStep - Current active step index (0-based)
 * @param {Function} onStepChange - Callback: (stepIndex: number) => void
 * @param {boolean} allowClickNavigation - Allow clicking steps to navigate
 * @param {boolean} showNavButtons - Show prev/next navigation buttons
 * @param {"horizontal"|"vertical"} orientation - Layout direction
 * @param {string} className - Additional CSS classes
 * @param {string} completedColor - Tailwind color for completed steps
 * @param {string} activeColor - Tailwind color for active step
 * @param {Function} renderStepContent - Custom content renderer: (step, index) => JSX
 */
const Stepper = ({
  steps = [],
  currentStep = 0,
  onStepChange,
  allowClickNavigation = true,
  showNavButtons = true,
  orientation = "horizontal",
  className = "",
  completedColor = "bg-green-500 border-green-500 text-white",
  activeColor = "bg-blue-500 border-blue-500 text-white",
  renderStepContent,
}) => {
  const getStepStatus = (idx) => {
    if (idx < currentStep) return "completed";
    if (idx === currentStep) return "active";
    return "pending";
  };

  const goToStep = useCallback(
    (idx) => {
      if (!allowClickNavigation || idx === currentStep) return;
      onStepChange?.(idx);
    },
    [allowClickNavigation, currentStep, onStepChange]
  );

  const nextStep = () => currentStep < steps.length - 1 && onStepChange?.(currentStep + 1);
  const prevStep = () => currentStep > 0 && onStepChange?.(currentStep - 1);

  const getStepIcon = (step, idx) => {
    const status = getStepStatus(idx);
    if (status === "completed") return <CheckCircle className="h-5 w-5" />;
    if (step.icon) {
      const Icon = step.icon;
      return <Icon className="h-5 w-5" />;
    }
    return <span className="text-sm font-bold">{idx + 1}</span>;
  };

  const getStyles = (idx) => {
    const status = getStepStatus(idx);
    switch (status) {
      case "completed":
        return {
          circle: completedColor,
          title: "text-green-600 dark:text-green-400",
          desc: "text-green-500/70 dark:text-green-400/70",
          connector: "bg-green-500",
        };
      case "active":
        return {
          circle: `${activeColor} ring-4 ring-blue-100 dark:ring-blue-900/40`,
          title: "text-blue-600 dark:text-blue-400 font-semibold",
          desc: "text-blue-500/70 dark:text-blue-400/70",
          connector: "bg-gray-300 dark:bg-zinc-600",
        };
      default:
        return {
          circle: "bg-gray-100 dark:bg-zinc-700 text-gray-400 dark:text-zinc-500 border-gray-300 dark:border-zinc-600",
          title: "text-gray-400 dark:text-zinc-500",
          desc: "text-gray-400/70 dark:text-zinc-500/70",
          connector: "bg-gray-200 dark:bg-zinc-700",
        };
    }
  };

  const isVertical = orientation === "vertical";

  return (
    <div className={className}>
      {/* Stepper Track */}
      <div className={`${isVertical ? "flex flex-col space-y-0" : "flex items-start justify-center"} overflow-x-auto`}>
        {steps.map((step, idx) => {
          const styles = getStyles(idx);
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.id || idx} className={`flex ${isVertical ? "flex-row" : "flex-col items-center flex-1"}`}>
              <div className={`flex ${isVertical ? "flex-col items-center" : "flex-row items-center w-full"}`}>
                {/* Circle */}
                <button
                  onClick={() => goToStep(idx)}
                  disabled={!allowClickNavigation}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    allowClickNavigation ? "cursor-pointer hover:scale-105" : "cursor-default"
                  } ${styles.circle}`}
                >
                  {getStepIcon(step, idx)}
                </button>

                {/* Connector */}
                {!isLast && (
                  <div className={`${isVertical ? "w-0.5 h-12 my-1" : "flex-1 h-0.5 mx-1 sm:mx-3"} relative overflow-hidden ${styles.connector}`}>
                    <div
                      className={`${isVertical ? "w-full" : "h-full"} bg-green-500 transition-all duration-500`}
                      style={{
                        [isVertical ? "height" : "width"]: getStepStatus(idx) === "completed" ? "100%" : "0%",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Labels */}
              <div className={`${isVertical ? "ml-4 pb-8" : "mt-2 sm:mt-3 text-center"}`}>
                <div className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${styles.title}`}>{step.title}</div>
                {step.description && (
                  <div className={`text-xs mt-0.5 transition-colors duration-300 ${styles.desc}`}>{step.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {renderStepContent && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
          {renderStepContent(steps[currentStep], currentStep)}
        </div>
      )}

      {/* Navigation */}
      {showNavButtons && (
        <div className="flex justify-between items-center mt-4 sm:mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors font-medium text-xs sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors font-medium text-xs sm:text-sm"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

Stepper.displayName = "Stepper";

export { Stepper };
export default Stepper;
