// Use Case: Onboarding, checkout processes.
// Description: A horizontal stepper with circles and icons.

// Steps:

// 1. Create a flex container with horizontal layout.

// 2. Use circles with icons (e.g., check or edit).

// 3. Use 'stepIndex' to style current/active steps.

// 4. Make it scrollable on mobile: overflow-x-auto.

// 5. Animate transition between steps.


import React from "react";

import { useState } from "react";
import {
  User,
  CreditCard,
  Package,
  CheckCircle,
  Circle,
  Edit3,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Star,
} from "lucide-react";

// Step configuration
const checkoutSteps = [
  {
    id: 1,
    title: "Account",
    description: "Create your account",
    icon: User,
    status: "completed", // completed, active, pending
  },
  {
    id: 2,
    title: "Shipping",
    description: "Delivery information",
    icon: MapPin,
    status: "completed",
  },
  {
    id: 3,
    title: "Payment",
    description: "Payment details",
    icon: CreditCard,
    status: "active",
  },
  {
    id: 4,
    title: "Review",
    description: "Order summary",
    icon: Package,
    status: "pending",
  },
  {
    id: 5,
    title: "Confirmation",
    description: "Order complete",
    icon: CheckCircle,
    status: "pending",
  },
];

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome",
    description: "Getting started",
    icon: Star,
    status: "completed",
  },
  {
    id: 2,
    title: "Profile",
    description: "Personal info",
    icon: User,
    status: "completed",
  },
  {
    id: 3,
    title: "Preferences",
    description: "Your settings",
    icon: Edit3,
    status: "active",
  },
  {
    id: 4,
    title: "Complete",
    description: "All done!",
    icon: CheckCircle,
    status: "pending",
  },
];

export default function InteractiveStepper() {
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // 0-based index
  const [stepperType, setStepperType] = useState("checkout"); // checkout or onboarding
  const [animationDirection, setAnimationDirection] = useState("forward");

  const steps = stepperType === "checkout" ? checkoutSteps : onboardingSteps;

  // Update step status based on current index
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStepIndex) return "completed";
    if (stepIndex === currentStepIndex) return "active";
    return "pending";
  };

  // Handle step navigation
  const goToStep = (stepIndex) => {
    if (stepIndex === currentStepIndex) return;

    setAnimationDirection(
      stepIndex > currentStepIndex ? "forward" : "backward"
    );
    setCurrentStepIndex(stepIndex);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setAnimationDirection("forward");
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setAnimationDirection("backward");
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Get step icon based on status
  const getStepIcon = (step, stepIndex) => {
    const status = getStepStatus(stepIndex);
    const IconComponent = step.icon;

    if (status === "completed") {
      return <CheckCircle className="h-5 w-5" />;
    } else if (status === "active") {
      return <IconComponent className="h-5 w-5" />;
    } else {
      return <Circle className="h-5 w-5" />;
    }
  };

  // Get step styles based on status
  const getStepStyles = (stepIndex) => {
    const status = getStepStatus(stepIndex);

    switch (status) {
      case "completed":
        return {
          circle: "bg-green-500 text-white border-green-500",
          title: "text-green-600 dark:text-green-400",
          description: "text-green-500 dark:text-green-400",
          connector: "bg-green-500",
        };
      case "active":
        return {
          circle:
            "bg-blue-500 text-white border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30",
          title: "text-blue-600 dark:text-blue-400 font-semibold",
          description: "text-blue-500 dark:text-blue-400",
          connector: "bg-gray-300 dark:bg-zinc-600",
        };
      default:
        return {
          circle:
            "bg-gray-100 dark:bg-zinc-700 text-gray-400 dark:text-zinc-500 border-gray-300 dark:border-zinc-600",
          title: "text-gray-400 dark:text-zinc-500",
          description: "text-gray-400 dark:text-zinc-500",
          connector: "bg-gray-300 dark:bg-zinc-600",
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Interactive Stepper
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setStepperType("checkout")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  stepperType === "checkout"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Checkout Flow
              </button>
              <button
                onClick={() => setStepperType("onboarding")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  stepperType === "onboarding"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Onboarding Flow
              </button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Step {currentStepIndex + 1} of {steps.length}:{" "}
            {steps[currentStepIndex]?.title}
          </p>
        </div>

        {/* Stepper Container - Horizontal Layout */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between min-w-max px-4">
              {steps.map((step, index) => {
                const styles = getStepStyles(index);
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="flex items-center">
                    {/* Step Circle and Content */}
                    <div className="flex flex-col items-center relative">
                      {/* Step Circle */}
                      <button
                        onClick={() => goToStep(index)}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${styles.circle}`}
                        disabled={
                          getStepStatus(index) === "pending" &&
                          index > currentStepIndex + 1
                        }
                      >
                        {getStepIcon(step, index)}
                      </button>

                      {/* Step Labels */}
                      <div className="mt-3 text-center min-w-[100px]">
                        <div
                          className={`text-sm font-medium transition-colors duration-300 ${styles.title}`}
                        >
                          {step.title}
                        </div>
                        <div
                          className={`text-xs mt-1 transition-colors duration-300 ${styles.description}`}
                        >
                          {step.description}
                        </div>
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 dark:bg-zinc-700 border-2 border-white dark:border-zinc-800 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Connector Line */}
                    {!isLast && (
                      <div className="flex-1 mx-4 relative">
                        <div className="h-0.5 bg-gray-300 dark:bg-zinc-600 relative overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ease-in-out ${
                              getStepStatus(index) === "completed"
                                ? "bg-green-500"
                                : "bg-gray-300 dark:bg-zinc-600"
                            }`}
                            style={{
                              width:
                                getStepStatus(index) === "completed"
                                  ? "100%"
                                  : "0%",
                            }}
                          />
                        </div>
                        {/* Animated Progress Dot */}
                        {getStepStatus(index) === "completed" && (
                          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content Area */}
        <div className="p-6 border-t border-gray-200 dark:border-zinc-700">
          <div
            className={`transition-all duration-300 ${
              animationDirection === "forward"
                ? "animate-slide-in-right"
                : "animate-slide-in-left"
            }`}
          >
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                {React.createElement(steps[currentStepIndex]?.icon, {
                  className: "h-8 w-8 text-blue-600 dark:text-blue-400",
                })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {steps[currentStepIndex]?.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {steps[currentStepIndex]?.description}
              </p>

              {/* Demo Content Based on Step */}
              <div className="max-w-md mx-auto">
                {stepperType === "checkout" && currentStepIndex === 2 && (
                  <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Payment Information
                    </h4>
                    <div className="space-y-3 text-left">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {stepperType === "onboarding" && currentStepIndex === 2 && (
                  <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Set Your Preferences
                    </h4>
                    <div className="space-y-3 text-left">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Email notifications
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          SMS updates
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Marketing emails
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="p-6 bg-gray-50 dark:bg-zinc-700 border-t border-gray-200 dark:border-zinc-600">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {/* Progress Dots */}
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStepIndex
                      ? "bg-blue-500 w-6"
                      : index < currentStepIndex
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-zinc-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              disabled={currentStepIndex === steps.length - 1}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentStepIndex === steps.length - 1 ? "Complete" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="sm:hidden p-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ← Scroll horizontally to see all steps →
          </p>
        </div>
      </div>

      {/* Features Info */}
      <div className="mt-6 bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Stepper Features:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <ul className="space-y-1">
            <li>• Horizontal flex layout with overflow scroll</li>
            <li>• Dynamic icons based on step status</li>
            <li>• Animated transitions between steps</li>
            <li>• Mobile-responsive with horizontal scroll</li>
          </ul>
          <ul className="space-y-1">
            <li>• Click any completed/current step to navigate</li>
            <li>• Visual progress indicators and connectors</li>
            <li>• Smooth animations with direction awareness</li>
            <li>• Customizable step content and validation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
