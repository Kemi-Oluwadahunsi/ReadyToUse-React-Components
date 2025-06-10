
import { useState } from "react";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for individuals getting started",
    monthlyPrice: 9,
    yearlyPrice: 90,
    features: [
      "Up to 5 projects",
      "10GB storage",
      "Email support",
      "Basic analytics",
      "Mobile app access",
    ],
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for growing teams and businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "Team collaboration",
      "API access",
      "Custom integrations",
    ],
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 phone support",
      "Custom reporting",
      "SSO integration",
      "Advanced security",
      "Dedicated account manager",
    ],
    featured: false,
  },
];

const PricingCards = () => {
  const [isYearly, setIsYearly] = useState(false);

  const handleBillingToggle = () => {
    setIsYearly(!isYearly);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Select the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span
            className={`text-sm font-medium ${
              !isYearly
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={handleBillingToggle}
            className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isYearly ? "bg-blue-600" : "bg-gray-300 dark:bg-zinc-600"
            }`}
          >
            <span
              className={`inline-block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 mt-0.5 ${
                isYearly ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              isYearly
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Yearly
            <span className="ml-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
              Save 17%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white dark:bg-zinc-800 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
              plan.featured
                ? "border-4 border-indigo-500 scale-105"
                : "border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600"
            }`}
          >
            {/* Featured Badge */}
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="px-4 py-8 text-lg">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-[0.95em] text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    /{isYearly ? "year" : "month"}
                  </span>
                  {isYearly && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} per year
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
                    plan.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600"
                  }`}
                >
                  Get Started
                </button>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Need a custom plan? We'd love to help you find the perfect solution.
        </p>
        <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default PricingCards;