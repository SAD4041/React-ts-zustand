import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Input as ShadCnInput } from "@/components/ui/input";
import customStyles from "./Input.module.css";
import { Eye, EyeOff, OctagonAlert } from "lucide-react";
import { useField } from "formik";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDesktop, useTabletMobile } from "@/hooks/ResponsiveHooks";
import { useState } from "react";

const inputVariants = cva(
	"flex h-13 w-full !text-[15px] rounded-full border border-[1px] border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">,
		VariantProps<typeof inputVariants> {
	asChild?: boolean;
	width?: number;
	classes?: InputClass;
	onChangeWrappers?: ((
		handler: (event: React.ChangeEvent<HTMLInputElement>) => void,
	) => (event: React.ChangeEvent<HTMLInputElement>) => void)[];
}

export interface InputClass {
	className?: string;
	errorClassName?: string;
	onChangeWrapper?: (
		handler: (event: React.ChangeEvent<HTMLInputElement>) => void,
	) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
	classes,
	onChangeWrappers,
	type,
	name,
	shadow,
	...props
}: InputProps) {
	const isDesktop = useDesktop();
	const isTabletMobile = useTabletMobile();
	const [field, meta] = useField(name);
	const [showPassword, setShowPassword] = useState(false);
	const hasError = Boolean(meta.touched && meta.error);
	const value = field.value || "";

	function eyeOnClick() {
		setShowPassword(true);
	}
	function eyeOffOnClick() {
		setShowPassword(false);
	}
	function combineWrappers(
		wrappers: ((
			handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
		) => (e: React.ChangeEvent<HTMLInputElement>) => void)[],
	): (
		handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void {
		return (handler) =>
			wrappers.reduceRight((acc, wrapper) => wrapper(acc), handler);
	}

	return (
		<div
			className={cn(
				"relative flex gap-3 flex-col items-center justify-center w-full h-full",
			)}
		>
			<div
				className={cn(
					"relative flex gap-3 flex-col items-center justify-center w-full h-full",
					classes?.className,
				)}
			>
				<ShadCnInput
					{...field}
					value={value}
					type={showPassword ? "text" : type}
					onChange={
						onChangeWrappers?.length
							? combineWrappers(onChangeWrappers)(field.onChange)
							: field.onChange
					}
					dir="rtl"
					id={name}
					name={name}
					className={cn(
						inputVariants({ shadow }),
						"h-full",
						customStyles.input,
						hasError ? "border-red-500 text-red-500 drop-shadow-red-500" : "",
						hasError && isDesktop ? "pr-10.5" : "",
						type == "password" ? "pl-10.5" : "",
					)}
					{...props}
				/>

				{isDesktop && hasError && (
					<>
						<Tooltip>
							<TooltipTrigger asChild>
								<OctagonAlert className="absolute right-3.5 text-red-500" />
							</TooltipTrigger>
							<TooltipContent className="bg-red-500 font-[Alibaba]">
								<p>{meta.error}</p>
							</TooltipContent>
						</Tooltip>
					</>
				)}
				{type == "password" && !showPassword && (
					<Eye
						onClick={eyeOnClick}
						className={cn("absolute left-3.5", hasError ? "text-red-500" : "")}
					/>
				)}
				{type == "password" && showPassword && (
					<EyeOff
						onClick={eyeOffOnClick}
						className={cn("absolute left-3.5", hasError ? "text-red-500" : "")}
					/>
				)}
			</div>
			{isTabletMobile && hasError && (
				<p
					dir="rtl"
					className={cn(
						"font-[Alibaba] w-full text-red-500 break-words",
						classes?.errorClassName,
					)}
				>
					{meta.error}
				</p>
			)}
		</div>
	);
}

export { Input };
