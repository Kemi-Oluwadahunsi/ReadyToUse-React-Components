import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">UI Component Showcase</h1>
      <section className="flex flex-col md:flex-row items-center justify-around space-y-4 md:gap-20">
        <div className="flex flex-col space-y-4">
          <Link to="/fab">
            <button className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer">
              Floating Button
            </button>
          </Link>
          <Link to="/stepper">
            <button className="bg-blue-400 text-white px-6 py-2 rounded cursor-pointer">
              View Stepper
            </button>
          </Link>
          <Link to="/scroll-navbar">
            <button className="bg-green-600 text-white px-6 py-2 rounded cursor-pointer">
              Scroll Navbar
            </button>
          </Link>
          <Link to="/accordion">
            <button className="bg-teal-600 text-white px-6 py-2 rounded cursor-pointer">
              Accordion
            </button>
          </Link>
          <Link to="/hover-reveal">
            <button className="bg-yellow-600 text-white px-6 py-2 rounded cursor-pointer">
              Hover-Card
            </button>
          </Link>
          <Link to="/timeline">
            <button className="bg-gray-700 text-white px-6 py-2 rounded cursor-pointer">
              Time Line
            </button>
          </Link>
          <Link to="/multi-select">
            <button className="bg-gray-700 text-white px-6 py-2 rounded cursor-pointer">
              Multi-Select Tag
            </button>
          </Link>
          <Link to="/virtual-list">
            <button className="bg-cyan-700 text-white px-6 py-2 rounded cursor-pointer">
              Virtual List
            </button>
          </Link>
          <Link to="/carousel">
            <button className="bg-orange-700 text-white px-6 py-2 rounded cursor-pointer">
              Scroll Carousel
            </button>
          </Link>
          <Link to="/darkmode">
            <button className="bg-indigo-700 text-white px-6 py-2 rounded cursor-pointer">
              Dark Mode
            </button>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/notification">
            <button className="bg-violet-700 text-white px-6 py-2 rounded cursor-pointer">
              Notification Bell
            </button>
          </Link>
          <Link to="/sidebar">
            <button className="bg-green-800 text-white px-6 py-2 rounded cursor-pointer">
              Resizable Sidebar
            </button>
          </Link>
          <Link to="/kanban">
            <button className="bg-purple-500 text-white px-6 py-2 rounded cursor-pointer">
              Kanban Board
            </button>
          </Link>
          <Link to="/gallery">
            <button className="bg-red-500 text-white px-6 py-2 rounded cursor-pointer">
              Filterable Gallery
            </button>
          </Link>
          <Link to="/toggle">
            <button className="bg-yellow-800 text-white px-6 py-2 rounded cursor-pointer">
              Toggle Switch
            </button>
          </Link>
          <Link to="/progress-bar">
            <button className="bg-orange-500 text-white px-6 py-2 rounded cursor-pointer">
              Progress Bar 
            </button>
          </Link>
          <Link to="/pricing-cards">
            <button className="bg-purple-800 text-white px-6 py-2 rounded cursor-pointer">
              Pricing Cards 
            </button>
          </Link>
          <Link to="/toast">
            <button className="bg-indigo-800 text-white px-6 py-2 rounded cursor-pointer">
              Toast Notification 
            </button>
          </Link>
          <Link to="/search-bar">
            <button className="bg-violet-800 text-white px-6 py-2 rounded cursor-pointer">
              Search Bar Suggestions
            </button>
          </Link>
          <Link to="/filtering">
            <button className="bg-orange-800 text-white px-6 py-2 rounded cursor-pointer">
              Filtering
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
