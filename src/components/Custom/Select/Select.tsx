import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

import {
	SelectContent as ShadCnSelectContent,
	SelectItem as ShadCnSelectItem,
	SelectTrigger as ShadCnSelectTrigger,
} from "@/components/ui/select";
import { useField } from "formik";

type SelectContextType = {
	name: string;
	hasError: boolean;
};
const SelectContext = React.createContext<SelectContextType | undefined>(
	undefined,
);

const SelectRoot: React.FC<SelectPrimitive.SelectProps> = ({
	dir = "rtl",
	name,
	value,
	onValueChange,
	...props
}) => {
	const [field, meta, helpers] = useField(name || "");
	const [selfValue, setSelfValue] = React.useState(field.value);
	const hasError = meta.touched && !!meta.error;

	React.useEffect(() => {
		if (field.value === undefined) {
			helpers.setValue(value);
		}
	}, []);
	return (
		<SelectContext.Provider value={{ name: name || "", hasError }}>
			<SelectPrimitive.Root
				value={selfValue}
				onValueChange={(v) => {
					requestAnimationFrame(() => {
						helpers.setValue(v);
						setSelfValue(v);
						onValueChange?.(v);
					});
				}}
				dir={dir}
				{...props}
			></SelectPrimitive.Root>
		</SelectContext.Provider>
	);
};

const Select = SelectRoot;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, style, ...props }, ref) => {
	const context = React.useContext(SelectContext);
	const hasError = context?.hasError || false;

	return (
		<ShadCnSelectTrigger
			ref={ref}
			style={style}
			className={cn(
				"w-full flex h-13 !text-[15px] border rounded-full bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm drop-shadow-lg data-[state=open]:!rounded-b-none data-[state=open]:!rounded-t-2xl",
				hasError
					? "drop-shadow-red-500 border-red-500 text-red-600"
					: "border-black/40",
				className,
			)}
			{...props}
		>
			{children}
		</ShadCnSelectTrigger>
	);
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	>
		<ChevronUp className="h-4 w-4" />
	</SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}
	>
		<ChevronDown className="h-4 w-4" />
	</SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<ShadCnSelectContent
		side="bottom"
		sideOffset={-10}
		avoidCollisions={false}
		ref={ref}
		className={cn(
			"rounded-t-none rounded-b-2xl border-1 border-black/40 border-t-transparent max-h-60 ",
			className,
		)}
		{...props}
	>
		{children}
	</ShadCnSelectContent>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold", className)}
		{...props}
	/>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<ShadCnSelectItem
		ref={ref}
		className={cn(
			"hover:!bg-input-autocomplete focus:!bg-input-autocomplete",
			className,
		)}
		{...props}
	>
		{children}
	</ShadCnSelectItem>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
