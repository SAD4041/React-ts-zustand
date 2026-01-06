import { Textarea as ShadCnTextarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDesktop } from "@/hooks/ResponsiveHooks";
import { cn } from "@/lib/utils";
import type { InputClass } from "@/types/inputTypes";
import { useField } from "formik";
import { OctagonAlert } from "lucide-react";
import React from "react";

interface TextareaProps extends React.ComponentProps<"textarea"> {
	scrollbarBorderRadius?: string;
	classes?: InputClass;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			className,
			classes,
			scrollbarBorderRadius = "10px",
			name,
			dir = "rtl",
			...props
		},
		ref,
	) => {
		const [field, meta] = useField(name || "");
		const hasError = Boolean(meta.touched && meta.error);

		const scrollbarStyles = `
      .custom-scroll-${scrollbarBorderRadius}::-webkit-scrollbar {
          width: 12px;
          height: 12px;
      }

      .custom-scroll-${scrollbarBorderRadius}::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-bottom-left-radius: ${scrollbarBorderRadius};
          border-top-left-radius: ${scrollbarBorderRadius};
      }

      .custom-scroll-${scrollbarBorderRadius}::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: ${scrollbarBorderRadius};
          border: 3px solid #f1f1f1;
      }

      .custom-scroll-${scrollbarBorderRadius}::-webkit-scrollbar-thumb:hover {
          background-color: #555;
      }
    `;

		const dynamicClassName = `custom-scroll-${scrollbarBorderRadius}`;
		const isDesktop = useDesktop();

		return (
			<div
				className={cn(
					"relative flex gap-3 flex-col items-center justify-center w-full h-full",
				)}
			>
				<style>{scrollbarStyles}</style>

				<div
					className={cn(
						"relative flex gap-3 flex-col items-center justify-center w-full h-full",
						classes?.className,
					)}
				>
					<ShadCnTextarea
						ref={ref}
						{...field}
						value={field.value}
						onChange={field.onChange}
						dir="rtl"
						id={name}
						name={name}
						className={cn(
							"h-full custom-scroll resize-none w-full h-full !text-[15px] rounded-2xl border border-black/40 bg-white font-[Alibaba] font-bold px-3 py-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
							classes?.inputClassName,
							dynamicClassName,
							hasError ? "border-red-500 text-red-500 drop-shadow-red-500" : "",
							hasError && isDesktop ? "pr-10.5" : "",
						)}
						{...props}
					/>

					{isDesktop && hasError && (
						<Tooltip>
							<TooltipTrigger asChild>
								<OctagonAlert className="absolute right-3.5 text-red-500" />
							</TooltipTrigger>
							<TooltipContent className="bg-red-500 font-[Alibaba]">
								<p>{meta.error}</p>
							</TooltipContent>
						</Tooltip>
					)}
				</div>
				{!isDesktop && hasError && (
					<p
						dir="rtl"
						className={cn(
							"font-[Alibaba] w-full text-right text-red-500 break-words",
							classes?.errorClassName,
						)}
					>
						{meta.error}
					</p>
				)}
			</div>
		);
	},
);
