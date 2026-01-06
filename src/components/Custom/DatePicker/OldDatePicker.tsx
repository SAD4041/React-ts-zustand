import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DatePickerProps {
	from?: number;
	to?: number;
	relative?: boolean;
}

export default function OldDatePicker({
	from = 10,
	to = 8,
	relative = true,
}: DatePickerProps) {
	const [openDay, setOpenDay] = React.useState(false);
	const [openMonth, setOpenMonth] = React.useState(false);
	const [openYear, setOpenYear] = React.useState(false);
	const [month, setMonth] = React.useState("");

	const currentPersianYear = parseInt(
		new Intl.DateTimeFormat("fa-IR", {
			year: "numeric",
			numberingSystem: "latn",
		}).format(new Date()),
	);

	return (
		<div className="flex items-center justify-center gap-2">
			<Select onOpenChange={setOpenDay} dir="rtl">
				<SelectTrigger
					className={cn(
						"w-25 flex h-13 !text-[15px] border rounded-full border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm drop-shadow-lg",
						openDay ? "rounded-b-none rounded-t-2xl" : "",
					)}
				>
					<SelectValue placeholder="روز" />
				</SelectTrigger>
				<SelectContent className="rounded-t-none rounded-b-2xl border border-black/40 border-t-transparent !-translate-y-2 !w-25 min-w-0 max-h-60 overflow-y-auto">
					<SelectGroup>
						{(parseInt(month) <= 6 || !month) &&
							Array.from({ length: 31 }, (_, i) => (
								<SelectItem key={i + 1} value={(i + 1).toString()}>
									{i + 1}
								</SelectItem>
							))}
						{parseInt(month) > 6 &&
							Array.from({ length: 30 }, (_, i) => (
								<SelectItem key={i + 1} value={(i + 1).toString()}>
									{i + 1}
								</SelectItem>
							))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select
				onOpenChange={setOpenMonth}
				onValueChange={setMonth}
				value={month}
				dir="rtl"
			>
				<SelectTrigger
					className={cn(
						"w-35 flex h-13 !text-[15px] border rounded-full border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm drop-shadow-lg",
						openMonth ? "rounded-b-none rounded-t-2xl" : "",
					)}
				>
					<SelectValue placeholder="ماه" />
				</SelectTrigger>
				<SelectContent className="rounded-t-none rounded-b-2xl border border-black/40 border-t-transparent !-translate-y-2 !w-35 min-w-0 max-h-60 overflow-y-auto">
					<SelectItem value="1">فروردین</SelectItem>
					<SelectItem value="2">اردیبهشت</SelectItem>
					<SelectItem value="3">خرداد</SelectItem>
					<SelectItem value="4">تیر</SelectItem>
					<SelectItem value="5">مرداد</SelectItem>
					<SelectItem value="6">شهریور</SelectItem>
					<SelectItem value="7">مهر</SelectItem>
					<SelectItem value="8">آبان</SelectItem>
					<SelectItem value="9">آذر</SelectItem>
					<SelectItem value="10">دی</SelectItem>
					<SelectItem value="11">بهمن</SelectItem>
					<SelectItem value="12">اسفند</SelectItem>
				</SelectContent>
			</Select>
			<Select onOpenChange={setOpenYear} dir="rtl">
				<SelectTrigger
					className={cn(
						"w-35 flex h-13 !text-[15px] border rounded-full border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm drop-shadow-lg",
						openYear ? "rounded-b-none rounded-t-2xl" : "",
					)}
				>
					<SelectValue placeholder="سال" />
				</SelectTrigger>
				<SelectContent className="rounded-t-none rounded-b-2xl border border-black/40 border-t-transparent !-translate-y-2 !w-35 min-w-0 max-h-60 overflow-y-auto">
					{Array.from(
						{ length: relative ? from + to + 1 : to - from + 1 },
						(_, i) => (
							<SelectItem
								key={relative ? currentPersianYear - from + i : from + i}
								value={(relative
									? currentPersianYear - from + i
									: from + i
								).toString()}
							>
								{relative ? currentPersianYear - from + i : from + i}
							</SelectItem>
						),
					)}
				</SelectContent>
			</Select>
		</div>
	);
}
