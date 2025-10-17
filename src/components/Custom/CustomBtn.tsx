import { Button } from "@/components/ui/button";
export default function CustomBtn(props: any) {
  return (
    <>
      <Button
        disabled={props.disabled}
        className={`h-[40px] border-[2px] border-[#000] rounded-[15px] text-[${props.color}]  font-bold cursor-pointer active:translate-y-[3px] active:shadow-(--shadow-button-active) transition-all duration-200 w-full bg-[#ff7700] shadow-(--shadow-button) mb-[20px] py-[3px] px-[39px] text-[20px] hover:bg-[#ff7700]`}
      >
        {props.children}
      </Button>
    </>
  );
}
