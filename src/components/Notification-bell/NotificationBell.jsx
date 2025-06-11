import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New message received",
      description: "John Doe sent you a message",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Meeting reminder",
      description: "Team standup in 30 minutes",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 3,
      title: "Task completed",
      description: "Project X deployment successful",
      time: "1 hour ago",
      read: true,
    },
  ];

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell icon with notification dot */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
        aria-label={`${unreadCount} unread notifications`}
      >
        <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />

        {/* Live notification dot with pulse animation */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex">
            <span className="relative inline-flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500">
                {unreadCount > 1 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
            </span>
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 z-50 transition-all duration-200 ease-in-out">
          {/* Dropdown header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            <button
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              onClick={() => console.log("Mark all as read")}
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications list */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-200 ${
                      notification.read ? "opacity-70" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      {!notification.read && (
                        <div className="mt-1.5 mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                No notifications yet
              </div>
            )}
          </div>

          {/* Dropdown footer */}
          <div className="px-4 py-3 text-center border-t border-gray-200 dark:border-zinc-700">
            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              onClick={() => console.log("View all notifications")}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
