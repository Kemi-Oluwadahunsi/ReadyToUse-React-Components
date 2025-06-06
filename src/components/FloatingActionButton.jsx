"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  X,
  MessageCircle,
  Phone,
  Mail,
  Share2,
  Edit,
} from "lucide-react";

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const fabRef = useRef(null);

  // Sub-actions for the FAB
  const actions = [
    {
      id: "message",
      icon: MessageCircle,
      label: "Send Message",
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => console.log("Send message"),
    },
    {
      id: "call",
      icon: Phone,
      label: "Make Call",
      color: "bg-green-500 hover:bg-green-600",
      action: () => console.log("Make call"),
    },
    {
      id: "email",
      icon: Mail,
      label: "Send Email",
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => console.log("Send email"),
    },
    {
      id: "share",
      icon: Share2,
      label: "Share",
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => console.log("Share"),
    },
    {
      id: "edit",
      icon: Edit,
      label: "Edit",
      color: "bg-indigo-500 hover:bg-indigo-600",
      action: () => console.log("Edit"),
    },
  ];

  // Hide/show FAB based on scroll direction
  useEffect(() => {
    const controlFAB = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlFAB);
    return () => window.removeEventListener("scroll", controlFAB);
  }, [lastScrollY]);

  // Close FAB when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle main FAB click
  const handleMainClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle action click
  const handleActionClick = (action) => {
    action.action();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Demo Content */}
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
        {/* Header */}
        <div className="bg-white dark:bg-zinc-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Floating Action Button Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Scroll down to see the FAB behavior. It hides when scrolling down
              and shows when scrolling up.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        {[1, 2, 3, 4, 5].map((section) => (
          <div
            key={section}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Section {section}
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Feature {section}.1
                    </h3>
                    <p className="text-sm">
                      Description of this amazing feature and its benefits.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Feature {section}.2
                    </h3>
                    <p className="text-sm">
                      Another great feature that users will love.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div
        ref={fabRef}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        {/* Sub-actions */}
        <div
          className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className="flex items-center gap-3"
                style={{
                  transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
                }}
              >
                {/* Label */}
                <div className="bg-gray-900 dark:bg-zinc-700 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  {action.label}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleActionClick(action)}
                  className={`w-12 h-12 rounded-full shadow-lg text-white transition-all duration-200 transform hover:scale-110 ${action.color}`}
                >
                  <Icon className="h-5 w-5 mx-auto" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Main FAB */}
        <button
          onClick={handleMainClick}
          className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isExpanded ? "rotate-45" : "rotate-0"
          }`}
        >
          {isExpanded ? (
            <X className="h-6 w-6 mx-auto" />
          ) : (
            <Plus className="h-6 w-6 mx-auto" />
          )}
        </button>

        {/* Backdrop */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>

      {/* Features Info */}
      <div className="fixed bottom-6 left-6 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          FAB Features:
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Scroll-aware visibility</li>
          <li>• Expandable sub-actions</li>
          <li>• Smooth animations</li>
          <li>• Click outside to close</li>
          <li>• Staggered reveal</li>
        </ul>
      </div>
    </>
  );
}
