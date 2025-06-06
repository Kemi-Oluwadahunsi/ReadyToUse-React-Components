// Use Case: Mobile-first dashboards, support apps, scroll-buttons, etc.

// Description: 
// A floating action button (FAB) is a prominent button that appears in the bottom-right corner of the screen. It is typically used to trigger a primary action, such as adding a new item or opening a menu.

// Steps:
// 1. Create a fixed-position button in the bottom-right.

// 2. Add group-hover to reveal tooltips.

// 3. Add icons using lucide-react or HeroIcons.

// 4. Animate with Tailwind transition-transform.

// 5. Ensure position scales for mobile with bottom-4 right-4 sm:bottom-8 sm:right-8.

import { PlusIcon } from 'lucide-react'
const FloatingActionButton = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 group">
      <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition">
        <PlusIcon className="w-5 h-5" />
      </button>
      <div className="opacity-0 group-hover:opacity-100 transition text-sm absolute -top-10 right-0 bg-black text-white px-2 py-1 rounded">
        Add New
      </div>
    </div>
  );
}

export default FloatingActionButton