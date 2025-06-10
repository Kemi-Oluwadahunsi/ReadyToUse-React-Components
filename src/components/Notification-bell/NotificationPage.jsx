import NotificationBell from "./NotificationBell";

const NotificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Header with Notification Bell */}
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-800 shadow-sm border-b border-gray-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-700"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-zinc-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notification Bell Demo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The notification bell component is displayed in the header above. It
            features:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>A pulsing red dot indicator for unread notifications</li>
            <li>Dropdown menu with notification list</li>
            <li>Accessibility support with aria-label</li>
            <li>Dark mode compatibility</li>
            <li>Click outside to close functionality</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default NotificationPage;
