export interface ToggleGroupFieldProps {
	name?: string;
	values?: string[];
	titles?: string[];
	dir?: "ltr" | "rtl";
	classes?: ToggleGroupFieldClasses;
	variant?: "pet" | "service";
}

export interface ToggleGroupFieldClasses {
	className?: string;
	toggleClassName?: string;
	textClassName?: string;
}
