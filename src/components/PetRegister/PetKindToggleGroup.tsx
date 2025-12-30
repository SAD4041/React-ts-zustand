import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { PetKindToggleGroupProps } from "@/types/PetRegister/toggleGroup";
import { useField } from "formik";

export default function PetKindToggleGroup({
  items,
  name,
  className,
  disable,
  onChange,
}: PetKindToggleGroupProps) {
  const [field, meta, helpers] = useField(name);

  return (
    <ToggleGroup
    disabled={disable}
      type="single"
      value={field.value}
      onValueChange={(val) => {
        helpers.setValue(val);
        onChange?.(val);
      }}
      className={cn("w-full rtl p-0 h-full", className)}
    >
      {items.map((item) => (
        <ToggleGroupItem
          key={item.name}
          value={item.name}
          className="group h-full w-[90%] p-0 flex justify-between gap-0 md:rounded-2xl cursor-pointer mx-3"
        >
          {/* Left vertical Label */}
          <div className="w-[20%] h-full bg-black/40 group-hover:bg-primary group-data-[state=on]:bg-primary text-white  px-1 md:px-5 rounded-tr-md rounded-br-md md:rounded-tr-2xl md:rounded-br-2xl flex justify-center items-center">
            <p className="text-sm font-bold rotate-90">{item.value}</p>
          </div>

          {/* Icon Box */}
          <div className="w-[80%] aspect-[5/4] h-full border-black/40 border-4 group-hover:border-primary group-data-[state=on]:border-primary rounded-tl-md rounded-bl-md md:rounded-tl-2xl md:rounded-bl-2xl flex justify-center items-center">
            <item.icon className="w-50 group-hover:text-primary group-data-[state=on]:text-primary" />
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
