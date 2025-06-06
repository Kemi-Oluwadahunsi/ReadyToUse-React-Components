
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content:
      "This product has completely transformed how we handle our daily operations. The team's support has been exceptional throughout our journey.",
    rating: 5,
    avatar: "/1.png?height=60&width=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    content:
      "Outstanding quality and attention to detail. We've seen a 40% increase in productivity since implementing this solution.",
    rating: 5,
    avatar: "/3.png?height=60&width=60",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, GrowthLab",
    content:
      "The user experience is intuitive and the results speak for themselves. Our team adopted it seamlessly within days.",
    rating: 5,
    avatar: "/1.png?height=60&width=60",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO, DataFlow",
    content:
      "Robust, scalable, and reliable. This is exactly what we needed to take our operations to the next level.",
    rating: 5,
    avatar: "/3.png?height=60&width=60",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Founder, CreativeStudio",
    content:
      "The integration was smooth and the impact was immediate. Highly recommend to any growing business.",
    rating: 5,
    avatar: "/1.png?height=60&width=60",
  },
];

const ScrollCarousel = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3); // lg: 3 items
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2); // md: 2 items
      } else {
        setItemsPerPage(1); // sm: 1 item
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate total pages based on items per page
  const totalPages = Math.max(1, testimonials.length - itemsPerPage + 1);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentPage((prevPage) => {
        const nextPage = (prevPage + 1) % totalPages;
        scrollToPage(nextPage);
        return nextPage;
      });
    }, 3000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, totalPages]);

  // Scroll to specific page
  const scrollToPage = (pageIndex) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 16; 
      const scrollPosition = pageIndex * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle manual navigation
  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    scrollToPage(pageIndex);
    pauseAutoScroll();
  };

  const goToPrevious = () => {
    const newPage = currentPage === 0 ? totalPages - 1 : currentPage - 1;
    goToPage(newPage);
  };

  const goToNext = () => {
    const newPage = (currentPage + 1) % totalPages;
    goToPage(newPage);
  };

  // Pause auto-scroll temporarily when user interacts
  const pauseAutoScroll = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  // Handle scroll events to update current page
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 16;
    const scrollLeft = container.scrollLeft;
    const newPage = Math.round(scrollLeft / (cardWidth + gap));

    if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What Our Clients Say
        </h2>
        <p className="text-gray-600">
          Trusted by thousands of businesses worldwide
        </p>
      </div>

      <div className="relative">
        {/* Desktop Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-none w-full md:w-96 snap-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-100">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-scroll indicator */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isAutoScrolling ? "Pause auto-scroll" : "Resume auto-scroll"}
        </button>
      </div>
    </div>
  );
}

export default ScrollCarousel;