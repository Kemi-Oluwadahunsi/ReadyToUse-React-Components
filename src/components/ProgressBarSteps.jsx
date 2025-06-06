import { useState, useEffect } from "react";

const steps = [
  { id: 1, label: "Account", description: "Create your account" },
  { id: 2, label: "Profile", description: "Complete your profile" },
  { id: 3, label: "Preferences", description: "Set your preferences" },
  { id: 4, label: "Verification", description: "Verify your email" },
  { id: 5, label: "Complete", description: "Setup complete" },
];

export default function ProgressBarSteps({ currentStep = 1, onStepChange }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;
    setProgress(percentage);
  }, [currentStep]);

  const handleStepClick = (stepId) => {
    onStepChange?.(stepId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Setup Progress
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete all steps to finish your setup
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="relative mb-8">
        {/* Background Track */}
        <div className="flex">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 relative">
              <div className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  {currentStep > step.id ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-200 dark:bg-zinc-700 relative">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                      style={{
                        width:
                          currentStep > step.id
                            ? "100%"
                            : currentStep === step.id
                            ? "50%"
                            : "0%",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex mt-4">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 text-center">
              <div className="text-xs font-medium text-gray-900 dark:text-white mt-2">
                {step.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Progress: {Math.round(progress)}%
        </div>
        <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => currentStep > 1 && handleStepClick(currentStep - 1)}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() =>
            currentStep < steps.length && handleStepClick(currentStep + 1)
          }
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {currentStep === steps.length ? "Complete" : "Next"}
        </button>
      </div>
    </div>
  );
}
