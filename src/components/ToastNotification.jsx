import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

const ToastNotificationDemo = () => {
  const [message, setMessage] = useState("");

  // Custom toast styles
  const toastStyles = {
    success: {
      style: {
        background: "#10B981",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#10B981",
      },
    },
    error: {
      style: {
        background: "#EF4444",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#EF4444",
      },
    },
    loading: {
      style: {
        background: "#3B82F6",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#3B82F6",
      },
    },
  };

  const showSuccessToast = () => {
    toast.success(
      message || "Operation completed successfully!",
      toastStyles.success
    );
  };

  const showErrorToast = () => {
    toast.error(message || "Something went wrong!", toastStyles.error);
  };

  const showInfoToast = () => {
    toast(message || "Here is some information for you.", {
      icon: <Info className="h-5 w-5" />,
      style: {
        background: "#3B82F6",
        color: "#fff",
      },
    });
  };

  const showWarningToast = () => {
    toast(message || "Please be careful with this action.", {
      icon: <AlertCircle className="h-5 w-5" />,
      style: {
        background: "#F59E0B",
        color: "#fff",
      },
    });
  };

  const showLoadingToast = () => {
    const loadingToast = toast.loading("Processing...", toastStyles.loading);

    // Simulate async operation
    setTimeout(() => {
      toast.success("Process completed!", {
        id: loadingToast,
        ...toastStyles.success,
      });
    }, 2000);
  };

  const showCustomToast = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white dark:bg-zinc-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Custom Toast
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {message || "This is a custom styled toast notification!"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-zinc-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Toast Notifications
        </h2>

        {/* Message Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Message (optional)
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your custom message..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Toast Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={showSuccessToast}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            Success
          </button>

          <button
            onClick={showErrorToast}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            Error
          </button>

          <button
            onClick={showInfoToast}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Info className="h-4 w-4" />
            Info
          </button>

          <button
            onClick={showWarningToast}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <AlertCircle className="h-4 w-4" />
            Warning
          </button>

          <button
            onClick={showLoadingToast}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Loading
          </button>

          <button
            onClick={showCustomToast}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Custom
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-zinc-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Features:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Multiple toast types (success, error, info, warning)</li>
            <li>• Loading states with automatic transitions</li>
            <li>• Custom styling with Tailwind classes</li>
            <li>• Dark mode support</li>
            <li>• Dismissible notifications</li>
          </ul>
        </div>
      </div>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default ToastNotificationDemo;