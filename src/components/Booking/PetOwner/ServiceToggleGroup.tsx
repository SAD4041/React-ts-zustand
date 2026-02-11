import type { ToggleGroupFieldProps } from "@/types/toggleGroupFieldTypes";
import ToggleGroupField from "./ToggleGroupField";

export default function ServiceToggleGroup(
	props: Omit<ToggleGroupFieldProps, "variant">,
) {
	return <ToggleGroupField {...props} variant="service" />;
}
