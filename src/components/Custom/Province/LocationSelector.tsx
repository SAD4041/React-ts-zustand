import { useState } from "react";
import {
	LocationContext,
	type LocationSelectorProps,
} from "@/types/locationSelectorTypes";

export const LocationSelector = ({ children }: LocationSelectorProps) => {
	const [province, setProvince] = useState("");

	return (
		<LocationContext.Provider value={{ province, setProvince }}>
			{children}
		</LocationContext.Provider>
	);
};
