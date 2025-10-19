import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { CustomBtnProps } from "@/types/btnTypes";
export default function CustomBtn({
  color = "#fff",
  loading = false,
  children,
  ...props
}: CustomBtnProps) {
  return (
    <div>
      <Button
        {...props}
        className="
        h-[40px] border-[2px] border-[#000] rounded-[15px] shadow-button active:shadow-button-active
        font-bold cursor-pointer transition-all duration-30 active:translate-y-[3px]
        w-full bg-[#3871DD] mb-[20px] py-[3px] px-[39px] text-[20px]
        hover:bg-[#3871DD]
        disabled:opacity-50 disabled:cursor-not-allowed 
      "
        style={{ color }}
        disabled={loading || props.disabled}
      >
        {loading && <Spinner />}
        {children}
      </Button>
    </div>
  );
}
