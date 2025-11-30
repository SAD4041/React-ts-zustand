import { createContext, type ReactNode } from "react";

export type LocationContextType = {
	province: string;
	setProvince: (province: string) => void;
};

export const LocationContext = createContext<LocationContextType | undefined>(
	undefined,
);

export type LocationSelectorProps = {
	children: ReactNode;
};
