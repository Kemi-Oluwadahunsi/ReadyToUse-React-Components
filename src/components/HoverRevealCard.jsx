// Use Case: Portfolio/project cards.

// Steps:

// 1. Set card to relative and overflow-hidden.

// 2. Add CTA overlay with absolute bottom-0.

// 3. Reveal CTA on group-hover.

// 4. Add transition for smooth appearance.

// 5. Make responsive grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3.

import about from '../assets/aboutImage.webp';
const HoverRevealCard = () => {
  return (
    <div className="group relative rounded-lg overflow-hidden shadow-lg">
      <img src={about} className="w-full h-48 object-cover" />
      <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4 transform translate-y-full group-hover:translate-y-0 transition-all text-white">
        <h3>Project Name</h3>
        <button className="mt-2 underline">View More</button>
      </div>
    </div>
  );
}

export default HoverRevealCard