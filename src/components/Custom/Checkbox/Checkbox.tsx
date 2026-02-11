import * as React from "react";
import { cn } from "@/lib/utils";

import customStyles from "./Checkbox.module.css";
import { useField } from "formik";

export interface InputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "size"
	> {
	text?: string;
	checkboxSize?: string;
	classes?: CheckboxClass;
	size?: string;
}

export interface CheckboxClass {
	className?: string;
	textClassName?: string;
	backGroundClassName?: string;
	checkboxClassName?: string;
}
function Checkbox({ classes, name, size, text, ...props }: InputProps) {
	const [field] = useField(name || "");
	return (
		<div className={cn("flex gap-1 items-center", classes?.className)}>
			<label className={cn("font-[Alibaba] h-auto", classes?.textClassName)}>
				{text}
			</label>
			<label className={cn(customStyles["ios-checkbox"], customStyles.red)}>
				<input {...field} type="checkbox" data-slot="input" {...props} />
				<div
					className={cn(
						customStyles["checkbox-wrapper"],
						classes?.checkboxClassName,
					)}
					style={{ width: size, height: size }}
				>
					<div
						className={cn(
							customStyles["checkbox-bg"],
							classes?.backGroundClassName,
						)}
					></div>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						className={customStyles["checkbox-icon"]}
					>
						<path
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="3"
							stroke="currentColor"
							d="M4 12L10 18L20 6"
							className={customStyles["check-path"]}
						></path>
					</svg>
				</div>
			</label>
		</div>
	);
}

export { Checkbox };
