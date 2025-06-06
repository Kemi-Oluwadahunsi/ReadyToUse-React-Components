// Use Case: Onboarding, checkout processes.
// Description: A horizontal stepper with circles and icons.

// Steps:

// 1. Create a flex container with horizontal layout.

// 2. Use circles with icons (e.g., check or edit).

// 3. Use 'stepIndex' to style current/active steps.

// 4. Make it scrollable on mobile: overflow-x-auto.

// 5. Animate transition between steps.

import { CheckIcon } from "lucide-react";
import { useState } from "react";

const InteractiveStepper = () => {
  const steps = ["Skin Type", "Concerns", "Preferences", "Review", "Result"];
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (index) => {
    if (index <= currentStep + 1) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="flex justify-between items-center overflow-x-auto gap-4 p-4">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={label}
            className="flex flex-col items-center text-xs sm:text-sm cursor-pointer"
            onClick={() => handleStepClick(index)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                        ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-black"
                        }
                      `}
            >
              {isCompleted ? <CheckIcon className="w-4 h-4" /> : index + 1}
            </div>
            <p className={`${isActive ? "text-blue-600 font-semibold" : ""}`}>
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default InteractiveStepper;
