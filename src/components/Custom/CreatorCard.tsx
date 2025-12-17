import GoldMedal from "@/assets/Icon/GoldMedal.svg";
import SilverMedal from "@/assets/Icon/SilverMedal.svg";
import BronzeMedal from "@/assets/Icon/BronzeMedal.svg";

function Medal({ rank }) {
  const medals = {
    1: <img src={GoldMedal} alt="مدال طلا" className="h-5 w-5" />,
    2: <img src={SilverMedal} alt="مدال نقره" className="h-5 w-5" />,
    3: <img src={BronzeMedal} alt="مدال برنز" className="h-5 w-5" />,
  };

  return (
    <div className="relative flex items-end justify-center h-12 w-12">
      <div
        className={`absolute bottom-0 h-8 w-12 flex items-center justify-center text-xs font-bold`}
      >
        {medals[rank]}
      </div>
    </div>
  );
}

export function CreatorCard({ creator }) {
  return (
    <div className="relative w-[150px] shrink-0 rounded-2xl border-2 border-black bg-white overflow-hidden shadow-shadow-light">
      <div className="relative flex justify-center pt-4 pb-8">
        <div className="relative h-20 w-20 rounded-full border-2 border-black overflow-hidden bg-slate-200">
          <img
            src={creator.avatar}
            alt={creator.username}
            className="h-full w-full object-cover"
          />
        </div>
        {creator.rank && (
          <div className="absolute bottom-0 right-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <Medal rank={creator.rank} />
          </div>
        )}
      </div>

      <div
        className={`h-10 flex items-center justify-center font-bold text-sm border-t-2 border-black mt-4 pt-2
          ${creator.rank === 1 && "bg-yellow-400"}
          ${creator.rank === 2 && "bg-gray-200"}
          ${creator.rank === 3 && "bg-orange-300"}
        `}
      >
        {creator.username}
      </div>
    </div>
  );
}