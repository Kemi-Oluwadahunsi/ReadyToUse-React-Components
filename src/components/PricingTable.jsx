import { useState } from "react";
import { Check, Zap, Sparkles, Shield, ArrowRight } from "lucide-react";

export const PricingTable = ({ className = "" }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      desc: "Perfect for side projects and indie hackers.",
      monthlyPrice: 0,
      annualPrice: 0,
      badge: null,
      features: [
        "Up to 3 active projects",
        "50+ UI components",
        "Community Discord support",
        "MIT open source license",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      desc: "For fast-moving teams building production SaaS.",
      monthlyPrice: 29,
      annualPrice: 19,
      badge: "Most Popular",
      features: [
        "Unlimited commercial projects",
        "All 65+ UI components & blocks",
        "AI & Chart component suite",
        "Figma design system files",
        "Priority 24/7 technical support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "Custom solutions, SSO, and dedicated SLA.",
      monthlyPrice: 99,
      annualPrice: 79,
      badge: "Custom SLA",
      features: [
        "Everything in Pro plan",
        "Dedicated design engineer",
        "Custom component development",
        "SOC2 compliance docs",
        "Custom billing & invoicing",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className={`w-full space-y-8 ${className}`}>
      {/* Billing Cycle Toggle */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="inline-flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              !isAnnual
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              isAnnual
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <span>Annual billing</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 relative ${
                plan.popular
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xl ring-2 ring-zinc-900 dark:ring-white scale-[1.02]"
                  : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    plan.popular
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg">{plan.name}</h4>
                  {plan.popular && <Sparkles className="w-4 h-4 text-amber-400" />}
                </div>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    plan.popular
                      ? "text-zinc-300 dark:text-zinc-600"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {plan.desc}
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-mono">${price}</span>
                    <span
                      className={`text-xs ${
                        plan.popular ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500"
                      }`}
                    >
                      / user / month
                    </span>
                  </div>
                  {isAnnual && price > 0 && (
                    <div
                      className={`text-[11px] mt-1 ${
                        plan.popular
                          ? "text-emerald-400 dark:text-emerald-600 font-medium"
                          : "text-emerald-600 dark:text-emerald-400 font-medium"
                      }`}
                    >
                      Billed annually ($ {price * 12}/yr)
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 pt-2 border-t border-zinc-200/20 dark:border-zinc-800">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 ${
                          plan.popular
                            ? "text-blue-400 dark:text-blue-600"
                            : "text-emerald-500"
                        }`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`mt-8 w-full py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  plan.popular
                    ? "bg-white text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 shadow-md"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
