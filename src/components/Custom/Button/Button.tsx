import * as React from "react";
import { cn } from "@/lib/utils";
import { Button as ShadCnButton } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva("font-[Alibaba]", {
	variants: {
		variant: {
			default:
				"bg-primary rounded-[27px] text-primary-foreground border-[3.5px] border-transparent hover:bg-primary-hover disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground active:bg-primary-press active:border-transparent focus:border-primary-focus-outline cursor-pointer",
			link: "bg-transparent shadow-none hover:bg-transparent border-[0px] text-primary underline-offset-6 hover:underline active:text-primary-press active:underline",
			outline:
				"border-2 border-primary text-primary rounded-[27px] bg-transparent hover:text-white active:bg-primary-press active:border-transparent",
		},
		shadow: {
			true: "drop-shadow-lg",
		},
		boxShadow: {
			true: "shadow-lg",
		},
		bold: {
			true: "font-bold",
		},
		size: {
			default: "h-9 text-[15px] px-4 py-2",
			giant: "h-15 w-50 text-[25px] px-4 py-2",
		},
	},
	defaultVariants: {
		shadow: true,
		boxShadow: false,
		size: "default",
		variant: "default",
	},
});
export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
	loadingClassName?: string;
}
function Button({
	className,
	size,
	shadow,
	boxShadow,
	bold,
	variant,
	loadingClassName,
	isLoading = false,
	children,
	...props
}: ButtonProps) {
	return (
		<ShadCnButton
			disabled={isLoading}
			className={cn(
				buttonVariants({ variant, size, shadow, boxShadow, bold, className }),
			)}
			{...props}
		>
			{isLoading && (
				<Spinner
					className={cn("text-primary-disabled-foreground", loadingClassName)}
				/>
			)}
			{children}
		</ShadCnButton>
	);
}

export { Button, buttonVariants };
