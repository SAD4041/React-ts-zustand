import { cn } from "@/lib/utils";
import { NumberRoller, type NumberRollerClasses } from "./NumberRoller";
import { useEffect, useState } from "react";
import {
	convertGregorianToJalaliDate,
	convertJalaliToGregorianDate,
} from "@/utils/convertJalaliToGeorgian";
import { useField } from "formik";
import { toTehranISOString } from "@/utils/toTehranISOString";

interface DatePickerProps {
	classes?: {
		className?: string;
		numberRollerClasses?: NumberRollerClasses;
		textClassName?: string;
		containerClassName?: string;
	};
	from: number;
	to: number;
	relative: boolean;
	smallFontWeight?: number;
	bigFontWeight?: number;
	smallFontSize?: string;
	bigFontSize?: string;
	name: string;
}
export function PetDatePicker({
	classes,
	from = 10,
	to = 8,
	relative = true,
	smallFontWeight,
	bigFontWeight,
	smallFontSize,
	bigFontSize,
	name,
}: DatePickerProps) {
	const currentPersianDate = convertGregorianToJalaliDate(new Date());
	const [year, setYear] = useState(currentPersianDate.jy);
	const [month, setMonth] = useState(currentPersianDate.jm);
	const [day, setDay] = useState(currentPersianDate.jd);
	const [field, , helper] = useField(name);
	const [initialized, setInitialized] = useState(false);
	useEffect(() => {
		if (initialized) return;
		setInitialized(true);
		if (field.value) {
			const persianDate = convertGregorianToJalaliDate(new Date(field.value));
			setYear(persianDate.jy);
			setMonth(persianDate.jm);
			setDay(persianDate.jd);
		}
	}, [field.value]);
	useEffect(() => {
		helper.setValue(
			toTehranISOString(
				convertJalaliToGregorianDate({
					jy: year,
					jm: month,
					jd: day,
				}),
			),
		);
	}, [year, month, day, helper]);
	return (
		<div className={cn("flex gap-4", classes?.className)} dir="rtl">
			<div
				className={cn(
					"flex flex-col items-center justify-center",
					classes?.containerClassName,
				)}
			>
				<div>
					<p className={cn("text-3xl", classes?.textClassName)}>روز</p>
				</div>
				<NumberRoller
					smallFontSize={smallFontSize}
					bigFontSize={bigFontSize}
					smallFontWeight={smallFontWeight}
					bigFontWeight={bigFontWeight}
					value={day}
					onChange={setDay}
					classes={classes?.numberRollerClasses}
					circular={true}
					min={1}
					max={month > 6 ? 30 : 31}
				/>
			</div>
			<div
				className={cn(
					"flex flex-col items-center justify-center",
					classes?.containerClassName,
				)}
			>
				<div>
					<p className={cn("text-3xl", classes?.textClassName)}>ماه</p>
				</div>
				<NumberRoller
					smallFontSize={smallFontSize}
					bigFontSize={bigFontSize}
					smallFontWeight={smallFontWeight}
					bigFontWeight={bigFontWeight}
					value={month}
					onChange={setMonth}
					classes={classes?.numberRollerClasses}
					circular={false}
					min={1}
					max={12}
				/>
			</div>
			<div
				className={cn(
					"flex flex-col items-center justify-center",
					classes?.containerClassName,
				)}
			>
				<div>
					<p className={cn("text-3xl", classes?.textClassName)}>سال</p>
				</div>
				<NumberRoller
					smallFontSize={smallFontSize}
					bigFontSize={bigFontSize}
					smallFontWeight={smallFontWeight}
					bigFontWeight={bigFontWeight}
					value={year}
					onChange={setYear}
					classes={classes?.numberRollerClasses}
					min={relative ? currentPersianDate.jy - from : from}
					max={relative ? currentPersianDate.jy + to : to}
					repeat={1}
					circular={false}
					startFromMiddle={true}
				/>
			</div>
		</div>
	);
}
