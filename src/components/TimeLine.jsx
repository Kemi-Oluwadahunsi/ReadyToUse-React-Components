// const timelineData = [
//   {
//     title: "Started Learning",
//     description: "Began learning frontend development in 2021.",
//   },
//   {
//     title: "First Internship",
//     description: "Worked as a junior frontend dev in 2022.",
//   },
//   {
//     title: "Full-Time Job",
//     description: "Got my first full-time dev job in 2023.",
//   },
//   {
//     title: "Built Product",
//     description: "Launched my own SaaS product in 2024.",
//   },
// ];

// const TimeLine = () => {
//   return (
//     <div className="relative border-l border-gray-300 ml-4 mt-10 space-y-12">
//       {timelineData.map((item, index) => (
//         <div
//           key={index}
//           className={`relative flex flex-col md:flex-row ${
//             index % 2 === 0 ? "" : "md:flex-row-reverse"
//           } md:items-center`}
//         >
//           <div className="absolute left-[-26px] md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white z-10 shadow-md"></div>

//           <div className="hidden md:block absolute top-6 left-1/2 w-0.5 h-full bg-gray-300 transform -translate-x-1/2 z-0" />

//           {/* Timeline content */}
//           <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2">
//             <h3 className="font-semibold text-lg">{item.title}</h3>
//             <p className="text-gray-600 text-sm">{item.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TimeLine;


"use client"

const timelineData = [
  {
    title: "Started Learning",
    description: "Began learning frontend development in 2021.",
  },
  {
    title: "First Internship",
    description: "Worked as a junior frontend dev in 2022.",
  },
  {
    title: "Full-Time Job",
    description: "Got my first full-time dev job in 2023.",
  },
  {
    title: "Built Product",
    description: "Launched my own SaaS product in 2024.",
  },
]

const Timeline = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Journey</h2>
        <p className="text-gray-600 dark:text-gray-400">A timeline of my development career</p>
      </div>

      <div className="relative border-l border-gray-300 dark:border-zinc-600 ml-4 mt-10 space-y-12">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            } md:items-center`}
          >
            {/* Timeline dot */}
            <div className="absolute left-[-26px] md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-zinc-900 z-10 shadow-md dark:shadow-zinc-900/50"></div>

            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute top-6 left-1/2 w-0.5 h-full bg-gray-300 dark:bg-zinc-600 transform -translate-x-1/2 z-0" />

            {/* Timeline content */}
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md dark:shadow-zinc-900/20 w-full md:w-1/2 border border-gray-100 dark:border-zinc-700 transition-colors duration-300 hover:shadow-lg dark:hover:shadow-zinc-900/40">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
