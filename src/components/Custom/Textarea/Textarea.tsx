import { Textarea as ShadCnTextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useField } from "formik";
import React from "react";
//import "./Textarea.css";

interface TextareaProps extends React.ComponentProps<"textarea"> {
	scrollbarBorderRadius?: string;
}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{ className, scrollbarBorderRadius = "10px", name, dir = "rtl", ...props },
		ref,
	) => {
		const [field] = useField(name || "");
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
		return (
			<>
				<style>{scrollbarStyles}</style>

				<ShadCnTextarea
					dir={dir}
					className={cn(
						"custom-scroll resize-none w-full !text-[15px] rounded-2xl border border-black/40 bg-white font-[Alibaba] font-bold px-3 py-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						dynamicClassName,
						className,
					)}
					ref={ref}
					{...props}
					{...field}
				/>
			</>
		);
	},
);
