import type { InputVariants } from "@/components/Custom/Input/Input";

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">,
		InputVariants {
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
	inputClassName?: string;
	onChangeWrapper?: (
		handler: (event: React.ChangeEvent<HTMLInputElement>) => void,
	) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
