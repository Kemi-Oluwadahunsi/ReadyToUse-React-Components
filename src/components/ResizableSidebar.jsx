"use client";

import { useState, useRef, useEffect } from "react";
import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Mail,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

export default function ResizableSidebar() {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isResizingRef = useRef(false);

  const minWidth = 200;
  const maxWidth = 400;
  const collapsedWidth = 64;

  // Navigation items
  const navItems = [
    { icon: Home, label: "Dashboard", href: "#", active: true },
    { icon: Users, label: "Users", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: FileText, label: "Documents", href: "#" },
    { icon: Mail, label: "Messages", href: "#", badge: "3" },
    { icon: Calendar, label: "Calendar", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  // Load saved width from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebarWidth");
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");

    if (savedWidth) setSidebarWidth(Number.parseInt(savedWidth));
    if (savedCollapsed) setIsCollapsed(savedCollapsed === "true");
  }, []);

  // Save width to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarWidth", sidebarWidth.toString());
    localStorage.setItem("sidebarCollapsed", isCollapsed.toString());
  }, [sidebarWidth, isCollapsed]);

  // Handle mouse down on resize handle
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  // Handle mouse move for resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;

      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      isResizingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth]);

  // Toggle collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle mobile menu
  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const currentWidth = isCollapsed ? collapsedWidth : sidebarWidth;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg sm:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div className="flex ">
        <div
          ref={sidebarRef}
          className={`fixed left-0 top-0 h-full bg-white :bg-zinc-800 border-r border-gray-200 transition-all duration-300 z-50 border-4 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:relative sm:z-auto`}
          style={{
            "--sidebar-width": `${currentWidth}px`,
            width: "var(--sidebar-width)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!isCollapsed && (
              <h1 className="text-lg font-semibold text-gray-900">
                Dashboard
              </h1>
            )}
            <button
              onClick={toggleCollapse}
              className="p-1.5 rounded-lg hover:bg-gray-100  transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
          {/* Search */}
          {!isCollapsed && (
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                    item.active
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </a>
              );
            })}
          </nav>
          {/* User profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    john@example.com
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Resize handle */}
          {!isCollapsed && (
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors group hidden sm:block"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Main content area */}
        <div
          className="flex-1 transition-all duration-300 sm:ml-0"
          style={{
            marginLeft: window.innerWidth >= 640 ? `${currentWidth}px` : "0",
          }}
        >
          <div className="p-8">
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold text-gray-900">
                Resizable Sidebar Demo
              </h1>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Features
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Drag the right edge to resize (desktop only)</li>
                  <li>• Click the arrow to collapse/expand</li>
                  <li>• Width is saved to localStorage</li>
                  <li>• Responsive: mobile menu on small screens</li>
                  <li>• Icons remain visible when collapsed</li>
                  <li>• Smooth transitions and hover effects</li>
                </ul>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Current sidebar width: <strong>{currentWidth}px</strong>
                    {isCollapsed && " (collapsed)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
