export function OverlappingCards() {
  return (
    <div className="relative h-24 w-32">
      {/* Card 3 - Back */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white border-2 border-black rounded-lg shadow-lg transform rotate-[-8deg] translate-x-2 translate-y-2">
        <div className="w-full h-12 bg-gradient-to-br from-blue-100 to-blue-200 border-b-2 border-black rounded-t-md"></div>
        <div className="p-2 space-y-1">
          <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>

      {/* Card 2 - Middle */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white border-2 border-black rounded-lg shadow-lg transform rotate-[4deg] translate-x-1 translate-y-1">
        <div className="w-full h-12 bg-gradient-to-br from-purple-100 to-purple-200 border-b-2 border-black rounded-t-md"></div>
        <div className="p-2 space-y-1">
          <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>

      {/* Card 1 - Front */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white border-2 border-black rounded-lg shadow-xl transform rotate-0 hover:rotate-[2deg] transition-transform duration-300">
        <div className="w-full h-12 bg-gradient-to-br from-orange-100 to-orange-200 border-b-2 border-black rounded-t-md"></div>
        <div className="p-2 space-y-1">
          <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}