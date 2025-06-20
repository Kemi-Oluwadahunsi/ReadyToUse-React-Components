import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Sample FAQ data
const faqData = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all items. Items must be in original condition with tags attached. Digital products and personalized items are not eligible for returns. Please contact our customer service team to initiate a return.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and overnight shipping options are available at checkout. International shipping times vary by destination, typically 7-14 business days.",
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. International customers are responsible for any customs duties or taxes that may apply. Some restrictions may apply to certain products.",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or the carrier's website. You can also log into your account to view order status and tracking information.",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For large orders, we also offer payment plans through Klarna and Afterpay.",
  },
  {
    id: 6,
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be cancelled or modified within 1 hour of placement. After this time, orders enter our fulfillment process and cannot be changed. If you need to make changes, please contact customer service immediately.",
  },
  {
    id: 7,
    question: "Do you offer customer support?",
    answer:
      "Yes! Our customer support team is available Monday-Friday 9AM-6PM EST via email, phone, and live chat. We also have a comprehensive help center with articles and tutorials available 24/7.",
  },
  {
    id: 8,
    question: "Are your products covered by warranty?",
    answer:
      "Most of our products come with a manufacturer's warranty. Warranty terms vary by product and manufacturer. Extended warranty options are available for many items at checkout. Please check individual product pages for specific warranty information.",
  },
];

const Accordion = ({ data = faqData, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);

      if (allowMultiple) {
        // Multiple items can be open
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      } else {
        // Only one item can be open
        if (newSet.has(id)) {
          newSet.clear();
        } else {
          newSet.clear();
          newSet.add(id);
        }
      }

      return newSet;
    });
  };

  const isOpen = (id) => openItems.has(id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions about our products and services
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm overflow-hidden"
          >
            {/* Question Button */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset cursor-pointer"
              aria-expanded={isOpen(item.id)}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0">
                {isOpen(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                )}
              </div>
            </button>

            {/* Answer */}
            <div
              id={`faq-answer-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-4">
                <div className="border-t border-gray-200 dark:border-zinc-700 pt-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Mode Button */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Current mode:{" "}
          {allowMultiple ? "Multiple items can be open" : "Single item open"}
        </p>
      </div>

      {/* Additional Help */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find the answer you're looking for? Please chat with our
            friendly team.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
