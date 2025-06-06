import { Star, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

export default function DemoContent() {
  return (
    <div className="space-y-8">
      

      {/* Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg dark:shadow-zinc-900/20 p-6 border border-gray-100 dark:border-zinc-700 transition-colors duration-500 hover:shadow-xl dark:hover:shadow-zinc-900/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center transition-colors duration-500">
                <Star className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-500">
                  Feature {item}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                  Description
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-500">
              This is a sample card demonstrating how content looks in both
              light and dark modes with smooth transitions.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 transition-colors duration-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                  24
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-500" />
                <Share2 className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-500" />
                <Bookmark className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-500" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Navigation Bar Demo */}
      <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg dark:shadow-zinc-900/20 border border-gray-100 dark:border-zinc-700 transition-colors duration-500">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500">
            Navigation Demo
          </h2>
          <nav className="flex space-x-6">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-500 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Form Demo */}
      <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg dark:shadow-zinc-900/20 p-6 border border-gray-100 dark:border-zinc-700 transition-colors duration-500">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500">
          Form Elements
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
              Message
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-500"
              placeholder="Your message here..."
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-500 font-medium">
            Submit
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Users", value: "10,234", change: "+12%" },
          { label: "Revenue", value: "$45,678", change: "+8%" },
          { label: "Orders", value: "1,234", change: "+23%" },
          { label: "Growth", value: "89%", change: "+5%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-zinc-800 rounded-lg shadow dark:shadow-zinc-900/20 p-4 border border-gray-100 dark:border-zinc-700 transition-colors duration-500"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500">
              {stat.label}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 transition-colors duration-500">
              {stat.change}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
