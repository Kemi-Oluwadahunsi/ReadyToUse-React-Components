import DarkModeToggle from "./DarkModeToggle";
import DemoContent from "./DemoContent";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-500">
      {/* Header with Dark Mode Toggle */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-500">
                Dark Mode Demo
              </h1>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DemoContent />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 transition-colors duration-500 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400 transition-colors duration-500">
            <p>
              © 2024 Dark Mode Demo. Built with Next.js and Tailwind CSS v4.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
