
import { useState, useRef, useMemo } from "react";
import { Search, User, Mail, Phone, MapPin } from "lucide-react";

// Generate large dataset
const generateUsers = (count) => {
  const firstNames = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Emily",
    "Chris",
    "Lisa",
    "Tom",
    "Anna",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ];
  const domains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "company.com",
    "email.com",
  ];
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${i + 1}@${
      domains[Math.floor(Math.random() * domains.length)]
    }`,
    phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${
      Math.floor(Math.random() * 900) + 100
    }-${Math.floor(Math.random() * 9000) + 1000}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    avatar: `/placeholder.svg?height=40&width=40&text=${i + 1}`,
  }));
};

const ITEM_HEIGHT = 80;
const CONTAINER_HEIGHT = 400;
const BUFFER_SIZE = 5;

export default function VirtualList() {
  const [users] = useState(() => generateUsers(10000));
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    return users.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Calculate visible items
  const visibleItems = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE
    );
    const endIndex = Math.min(
      filteredUsers.length - 1,
      Math.floor((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + BUFFER_SIZE
    );

    return {
      startIndex,
      endIndex,
      items: filteredUsers.slice(startIndex, endIndex + 1),
    };
  }, [filteredUsers, scrollTop]);

  // Handle scroll
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  // Total height for scrollbar
  const totalHeight = filteredUsers.length * ITEM_HEIGHT;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Virtual List Demo
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Efficiently rendering {users.length.toLocaleString()} items using
            virtualization
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredUsers.length.toLocaleString()} of{" "}
            {users.length.toLocaleString()} users
          </div>
        </div>

        {/* Virtual List Container */}
        <div
          ref={containerRef}
          className="relative overflow-auto"
          style={{ height: CONTAINER_HEIGHT }}
          onScroll={handleScroll}
        >
          {/* Total height spacer */}
          <div style={{ height: totalHeight, position: "relative" }}>
            {/* Visible items */}
            <div
              style={{
                position: "absolute",
                top: visibleItems.startIndex * ITEM_HEIGHT,
                width: "100%",
              }}
            >
              {visibleItems.items.map((user, index) => {
                const actualIndex = visibleItems.startIndex + index;

                return (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                    style={{ height: ITEM_HEIGHT }}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          #{actualIndex + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{user.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0">
                      <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 bg-gray-50 dark:bg-zinc-700 border-t border-gray-200 dark:border-zinc-600">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              Rendering items {visibleItems.startIndex + 1}-
              {Math.min(visibleItems.endIndex + 1, filteredUsers.length)}
              of {filteredUsers.length.toLocaleString()}
            </span>
            <span>Performance: Only {visibleItems.items.length} DOM nodes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
