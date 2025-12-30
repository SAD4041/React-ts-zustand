import React from "react";

import type { StepCardProps } from "@/types/stepCardTypes";

const StepCard: React.FC<StepCardProps> = ({
	step,
	icon,
	iconAlt = "",
	title,
	description,
	label,
}) => {
	const persianStep = step.toLocaleString("fa-IR");

	return (
		<div className="relative w-full max-w-80">

			{}
			<div className="absolute top-0 -right-2 -translate-y-1/2 transform
                            w-9 h-9 rounded-full bg-secondary-600 text-card
                            flex items-center justify-center text-lg font-bold z-10">
				{persianStep}
			</div>

			{}
			<div className="bg-card rounded-3xl shadow-md overflow-hidden">
				{}
				<div className="bg-secondary-100 flex flex-col items-center pt-10 pb-5 px-6">
					<img src={icon} alt={iconAlt} className="w-40 h-30 mb-3" />
				</div>

				{}
				<div className="bg-card px-6 pt-4 pb-6 text-center" dir="rtl">
					<p className="font-bold text-lg">{title}</p>
					<p className="mt-3 text-sm leading-relaxed">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};




export default StepCard;
