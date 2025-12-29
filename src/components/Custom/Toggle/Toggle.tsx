import { Switch } from "../../ui/switch";
import { cn } from "@/lib/utils";
import type { ToggleProps } from "@/types/toggleTypes";

export default function Toggle({
  className,
  text,
  checked,
  onCheckedChange,
}: ToggleProps) {
  return (
    <div
      className={cn(
        "rounded-4xl h-15 bg-primary-200 w-70 flex items-center justify-between px-5",
        className
      )}
    >
      <p className="text-lg  ">{text}</p>
      <Switch
        dir="ltr"
        className="bg-primary"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
