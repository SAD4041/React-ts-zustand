import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

export default function FaqItem({
	text,
	answer,
	open,
	setOpen,
	index,
	otherSetStates = [],
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	text: string;
	answer: string;
	index: number;
	otherSetStates?: Array<Dispatch<SetStateAction<boolean>>>;
}) {
	function onClick() {
		setOpen(!open);
		otherSetStates.forEach((setstate, ind) => {
			if (ind != index) {
				setstate(false);
			}
		});
	}
	return (
		<div
			onClick={onClick}
			className="flex flex-col w-full lg:w-100 h-min bg-white/80 p-2 rounded-2xl cursor-pointer"
		>
			<div className="flex items-center gap-2">
				{open ? <Minus /> : <Plus />}
				<span>{text}</span>
			</div>

			<motion.div
				animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
				initial={{ height: 0, opacity: 0 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
				className="overflow-hidden"
			>
				<p className="mt-2">{answer}</p>
			</motion.div>
		</div>
	);
}
