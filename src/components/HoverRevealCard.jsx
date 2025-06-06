// import about from '../assets/aboutImage.webp';
// const HoverRevealCard = () => {
//   return (
//     <div className="group relative rounded-lg overflow-hidden shadow-lg">
//       <img src={about} className="w-full h-48 object-cover" />
//       <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4 transform translate-y-full group-hover:translate-y-0 transition-all text-white">
//         <h3>Project Name</h3>
//         <button className="mt-2 underline">View More</button>
//       </div>
//     </div>
//   );
// }

// export default HoverRevealCard

import { useState } from "react"
import { ExternalLink, Eye, Heart, Share2, Star, Calendar, User, Tag } from "lucide-react"

// Sample project data
const sampleProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern shopping experience with React and Node.js",
    category: "Web Development",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "MongoDB"],
    author: "John Doe",
    date: "2024-01-15",
    likes: 24,
    views: 156,
    featured: true,
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure and intuitive banking solution for iOS and Android",
    category: "Mobile App",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React Native", "TypeScript", "Firebase"],
    author: "Jane Smith",
    date: "2024-01-10",
    likes: 18,
    views: 89,
    featured: false,
  },
  {
    id: 3,
    title: "AI Dashboard",
    description: "Analytics dashboard with machine learning insights",
    category: "Data Science",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Python", "TensorFlow", "D3.js"],
    author: "Mike Johnson",
    date: "2024-01-05",
    likes: 32,
    views: 203,
    featured: true,
  },
  {
    id: 4,
    title: "Design System",
    description: "Comprehensive component library for enterprise applications",
    category: "UI/UX Design",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Figma", "Storybook", "CSS"],
    author: "Sarah Wilson",
    date: "2023-12-28",
    likes: 45,
    views: 312,
    featured: false,
  },
  {
    id: 5,
    title: "Blockchain Wallet",
    description: "Secure cryptocurrency wallet with multi-chain support",
    category: "Blockchain",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Solidity", "Web3", "React"],
    author: "Alex Chen",
    date: "2023-12-20",
    likes: 67,
    views: 445,
    featured: true,
  },
  {
    id: 6,
    title: "Video Streaming",
    description: "Netflix-like streaming platform with real-time chat",
    category: "Entertainment",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "WebRTC", "AWS"],
    author: "Emily Davis",
    date: "2023-12-15",
    likes: 89,
    views: 567,
    featured: false,
  },
]

// Individual card component
function ProjectCard({ project, onLike, onShare, onView }) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    onLike?.(project.id)
  }

  const handleShare = (e) => {
    e.stopPropagation()
    onShare?.(project)
  }

  const handleView = () => {
    onView?.(project)
  }

  const getCategoryColor = (category) => {
    const colors = {
      "Web Development": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      "Mobile App": "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      "Data Science": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      "UI/UX Design": "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
      Blockchain: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      Entertainment: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    }
    return colors[category] || "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
  }

  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white dark:bg-zinc-800"
      onClick={handleView}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-zinc-700">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-700 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 dark:border-zinc-600 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/80 dark:bg-zinc-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-zinc-700"
            }`}
            aria-label="Like project"
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-zinc-700 transition-all duration-200 hover:scale-110"
            aria-label="Share project"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            <Heart className="h-3 w-3" />
            {project.likes}
          </div>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            <Eye className="h-3 w-3" />
            {project.views}
          </div>
        </div>
      </div>

      {/* Content Overlay - Slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}
          >
            <Tag className="h-3 w-3" />
            {project.category}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-2">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">+{project.tags.length - 3}</span>
          )}
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between text-xs text-gray-300 mb-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {project.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(project.date).toLocaleDateString()}
          </div>
        </div>

        {/* Action Button */}
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 w-full justify-center">
          <ExternalLink className="h-4 w-4" />
          View Project
        </button>
      </div>
    </div>
  )
}

// Main component
export default function HoverRevealCard() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [likedProjects, setLikedProjects] = useState(new Set())

  const categories = ["All", ...new Set(sampleProjects.map((project) => project.category))]

  const filteredProjects =
    selectedCategory === "All"
      ? sampleProjects
      : sampleProjects.filter((project) => project.category === selectedCategory)

  const handleLike = (projectId) => {
    setLikedProjects((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const handleShare = (project) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      console.log("Link copied to clipboard!")
    }
  }

  const handleView = (project) => {
    console.log("Viewing project:", project.title)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Hover Reveal Cards</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover amazing projects with smooth hover animations and detailed overlays
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onLike={handleLike}
            onShare={handleShare}
            onView={handleView}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
            <Tag className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try selecting a different category</p>
        </div>
      )}

      {/* Features Info */}
      <div className="mt-12 bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Card Features:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <ul className="space-y-1">
            <li>• Smooth hover reveal animations</li>
            <li>• Image zoom and overlay effects</li>
            <li>• Interactive like and share buttons</li>
            <li>• Category filtering system</li>
          </ul>
          <ul className="space-y-1">
            <li>• Featured project badges</li>
            <li>• Loading states and skeletons</li>
            <li>• Responsive grid layout</li>
            <li>• Dark mode compatibility</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
