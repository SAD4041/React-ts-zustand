import MultiDatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { cva, type VariantProps } from "class-variance-authority";
import "./DatePicker.css";
import { useField } from "formik";
import { toTehranISOString } from "@/utils/toTehranISOString";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

const inputVariants = cva(
	"flex h-13 w-full !text-[15px] rounded-full border border-[1px] border-black/40 bg-white font-[Alibaba] font-bold px-6 pl-10 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			shadow: {
				false: "shadow-sm",
				true: "drop-shadow-lg",
			},
		},
		defaultVariants: {
			shadow: false,
		},
	},
);
export interface DatePickerProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	asChild?: boolean;
}
export default function DatePicker({
	shadow,
	name,
	className,
	...props
}: DatePickerProps) {
	const [field, , helpers] = useField(name || "");
	return (
		<div className="flex items-center relative w-full">
			<MultiDatePicker
				value={
					field.value
						? new DateObject({
								date: new Date(
									new Date(field.value).getFullYear(),
									new Date(field.value).getMonth(),
									new Date(field.value).getDate(),
								),
								calendar: persian,
								locale: persian_fa,
							})
						: ""
				}
				onChange={(value) => {
					helpers.setValue(toTehranISOString(value!.toDate()));
				}}
				calendar={persian}
				locale={persian_fa}
				inputClass={cn(inputVariants({ shadow }), className)}
				mapDays={({ date }) => {
					const props: Partial<{ className?: string }> = {};

					if (date.weekDay.index === 6) {
						props.className = "text-red-500";
					}

					return props;
				}}
			/>
			<Calendar className="absolute left-3.5" />
		</div>
	);
}
