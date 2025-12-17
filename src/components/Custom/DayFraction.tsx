import convertToPersianDigits from "@/utils/convertToPersianDigits";
interface DatFractionProps {
  up: number;
  down: number;
}
const DayFraction = ({ up, down }: DatFractionProps) => {
  return (
    <div className="mt-5 bg-primary mx-auto border-2 border-black  w-[150px] text-xl text-white rounded-xl">
      <div className="flex justify-center px-2 py-0.5 ">
        <div className=" mr-2 text-2xl">
          {convertToPersianDigits(String(up))}
        </div>
        <div className="mt-2 mr-2">
          {"/  " + convertToPersianDigits(String(down))}
        </div>
        <div className="mt-3">روز</div>
      </div>
    </div>
  );
};
export default DayFraction;
