import * as React from "react";
import customStyles from "./input.module.css";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
	"flex h-12 w-full rounded-full border border-[1px] border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			shadow: {
				false: "shadow-sm",
				true: "drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
			},
		},
		defaultVariants: {
			shadow: false,
		},
	},
);

const persianRegex = /^[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C]/;

const onChangeExtra = (e: React.ChangeEvent<HTMLInputElement>) => {
	let value = e.currentTarget.value;
	if (value.match(persianRegex) || value === "") {
		e.currentTarget.dir = "rtl";
	} else {
		e.currentTarget.dir = "ltr";
	}
};

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	asChild?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, onChange, type, shadow, ...props }, ref) => {
		return (
			<input
				dir="rtl"
				type={type}
				className={cn(inputVariants({ shadow, className }), customStyles.input)}
				onChange={(e) => {
					onChangeExtra(e);
					onChange?.(e);
				}}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
