import sad from "../../assets/Img/Icon/emoji-sad.svg";
import happy from "../../assets/Img/Icon/emoji-happy.svg";
const FeelingOverview = () => {
  return (
    <div className="relative border border-black py-2 mt-10 bg-light-blue-challengestats shadow-card rounded-md">
      <img
        className="absolute"
        style={{ left: 5, bottom: "15%" }}
        src={sad}
        alt=""
      />
      <img
        className="absolute"
        style={{ right: 5, bottom: "15%" }}
        src={happy}
        alt=""
      />
      <div className="flex-1 relative h-6 mt-5 mx-10 ">
        {/* Background track */}
        <div className="absolute inset-0 bg-light-blue-challengestats rounded-full border-2 bg-light-blue-challengestats" />

        {/* Red fill (left from center) */}
        <div
          className=" absolute top-0 bottom-0 bg-leftFeeling rounded-l-full border-2 border-leftFeeling transition-all duration-200"
          style={{
            left: `${50 - 20}%`,
            right: "50%",
          }}
        />

        {/* Green fill (right from center) */}
        <div
          className="absolute top-0 bottom-0 bg-rightFeeling rounded-r-full border-2 border-rightFeeling transition-all duration-200"
          style={{
            left: "50%",
            right: `${50 - 10}%`,
          }}
        />

        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-main z-10" />
      </div>
    </div>
  );
};

export default FeelingOverview;
