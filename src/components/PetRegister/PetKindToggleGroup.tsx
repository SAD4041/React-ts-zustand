import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { PetKindToggleGroupProps } from "@/types/PetRegister/toggleGroup";
import { useField } from "formik";

export default function PetKindToggleGroup({
	items,
	name,
}: PetKindToggleGroupProps) {
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
					className="group h-20 w-40 md:h-50 md:w-100 p-0 flex justify-between gap-0 md:rounded-2xl cursor-pointer mx-3"
				>
					{/* Left vertical Label */}
					<div className="bg-black/40 group-hover:bg-primary group-data-[state=on]:bg-primary text-white h-full px-1 md:px-5 rounded-tr-md rounded-br-md md:rounded-tr-2xl md:rounded-br-2xl flex justify-center items-center">
						<p className="text-xs md:text-xl font-bold rotate-90">
							{item.value}
						</p>
					</div>

					{/* Icon Box */}
					<div className="w-full h-full border-black/40 border-4 group-hover:border-primary group-data-[state=on]:border-primary rounded-tl-md rounded-bl-md md:rounded-tl-2xl md:rounded-bl-2xl flex justify-center items-center">
						<item.icon className="w-50 group-hover:text-primary group-data-[state=on]:text-primary" />
					</div>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
