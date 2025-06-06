// Use Case: Blogs, portfolio, docs.

// Description: Navbar that hides/shows based on scroll direction.

// Steps:

// 1. Track scroll with useEffect + window.scrollY.

// 2. Add hidden/show class based on scroll direction.

// 3. Add Tailwind transition: duration-300.

// 4. Make mobile-first: hamburger menu with md:flex hidden.

// 5. Add backdrop blur: backdrop-blur bg-white/70.

import { useEffect, useState } from "react";

const ScrollAwareNavbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="backdrop-blur bg-white/70 flex justify-between p-4 shadow-md">
        <span className="font-bold">Logo</span>
        <button className="md:hidden text-xl">☰</button>
      </div>
    </nav>
  );
};

export default ScrollAwareNavbar;
