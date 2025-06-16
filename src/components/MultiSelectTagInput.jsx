import { useState } from "react";

const options = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
];

const MultiSelectTagInput = () => {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter(
    (opt) =>
      opt.toLowerCase().includes(query.toLowerCase()) && !selected.includes(opt)
  );

  const handleSelect = (tag) => {
    setSelected([...selected, tag]);
    setQuery("");
    setShowDropdown(false);
  };

  const handleRemove = (tag) => {
    setSelected(selected.filter((t) => t !== tag));
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-gray-200 dark:bg-zinc-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200"
          >
            {tag}
            <button
              onClick={() => handleRemove(tag)}
              className="ml-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Input field */}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Start typing..."
        className="w-full border border-gray-300 dark:border-zinc-600 rounded-md px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown options */}
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white dark:bg-zinc-800 w-full border border-gray-300 dark:border-zinc-600 mt-1 rounded-md shadow-md max-h-48 overflow-auto">
          {filteredOptions.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 cursor-pointer text-gray-900 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectTagInput;
