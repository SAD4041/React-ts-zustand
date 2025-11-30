import type { ToggleGroupFieldProps } from "@/types/toggleGroupFieldTypes";
import ToggleGroupField from "./ToggleGroupField";

export default function PetToggleGroup(
	props: Omit<ToggleGroupFieldProps, "variant">,
) {
	return <ToggleGroupField {...props} variant="pet" />;
}
