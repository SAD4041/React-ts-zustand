import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { ToggleGroupFieldProps } from "@/types/toggleGroupFieldTypes";
import { useField } from "formik";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

export default function ToggleGroupField({
	name,
	values,
	titles,
	dir = "rtl",
	classes,
	variant = "pet",
}: ToggleGroupFieldProps) {
	const [, , helpers] = useField<string[]>(name || "");
	const [, setSelectedValues] = useState<string[]>([]);

	const isPet = variant === "pet";

	const containerClassName = isPet
		? "flex flex-wrap"
		: "flex flex-col items-start";

	const toggleClassName = isPet
		? "bg-transparent data-[state=on]:bg-transparent data-[state=on]:border-primary data-[state=on]:text-primary hover:data-[state=on]:bg-primary hover:data-[state=on]:text-white rounded-[27px] text-gray-600 hover:text-white hover:border-primary border-1 border-gray-600 hover:bg-primary disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground active:bg-primary-press active:border-transparent cursor-pointer gap-1"
		: "group bg-transparent data-[state=on]:bg-transparent data-[state=on]:text-primary hover:data-[state=on]:bg-transparent hover:data-[state=on]:text-primary hover:bg-transparent rounded-[27px] text-gray-600 border-0 hover:text-primary disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground cursor-pointer gap-1 shadow-none";

	const textClassName = !isPet
		? "text-gray-600 transition-all duration-100 group-hover:text-primary"
		: "";

	return (
		<div>
			<ToggleGroup
				dir={dir}
				type="multiple"
				variant="outline"
				size="sm"
				className={cn(containerClassName, classes?.className)}
			>
				{values?.map((value, index) => (
					<ToggleGroupItem
						key={value}
						value={value}
						aria-label="Toggle star"
						onClick={() => {
							setSelectedValues((prevSelected) => {
								if (!prevSelected.includes(value)) {
									const newValues = [...prevSelected, value];
									helpers.setValue(newValues);
									return newValues;
								} else {
									const newValues = prevSelected.filter((v) => v !== value);
									helpers.setValue(newValues);
									return newValues;
								}
							});
						}}
						className={cn(toggleClassName, classes?.toggleClassName)}
					>
						<CircleCheck size={"auto"} />
						<p className={cn(textClassName, classes?.textClassName)}>
							{titles?.[index] || ""}
						</p>
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}
