import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { IsAdultToggleGroupProps } from "@/types/PetRegister/toggleGroup";
import { useField } from "formik";

export default function IsAdultToggleGroup({
	items,
	name,
}: IsAdultToggleGroupProps) {
	const [field, , helpers] = useField(name);

	return (
		<ToggleGroup
			type="single"
			value={field.value}
			onValueChange={(val: string) => helpers.setValue(val)}
			className="w-full rtl mb-10 p-0"
		>
			{items.map((item) => (
				<ToggleGroupItem
					key={item.name}
					value={item.name}
					className="group h-30 w-40 md:h-50 md:w-80 p-0 flex justify-between rounded-2xl cursor-pointer mx-3 flex-col gap-2 bg-transparent
              hover:bg-transparent
              data-[state=on]:bg-transparent
              text-inherit
              hover:text-inherit
              data-[state=on]:text-inherit
              focus-visible:ring-0"
				>
					<div className="group-hover:bg-white group-data-[state=on]:bg-white w-full h-[70%] border-black/40 border-2 md:border-4 group-hover:border-primary group-data-[state=on]:border-primary rounded-lg md:rounded-2xl flex justify-center items-center">
						<item.icon className="w-50 group-hover:text-primary group-data-[state=on]:text-primary" />
					</div>

					<div className="group-hover:bg-white group-data-[state=on]:bg-white w-full h-[30%] border-black/40 border-2 md:border-4 group-hover:border-primary group-data-[state=on]:border-primary text-black/40 px-1 md:px-5 rounded-lg md:rounded-2xl flex justify-center items-center">
						<p className="text-xs md:text-xl font-bold group-hover:text-primary group-data-[state=on]:text-primary">
							{item.value}
						</p>
					</div>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
