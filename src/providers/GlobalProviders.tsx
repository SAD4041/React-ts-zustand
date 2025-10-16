import { TooltipProvider } from "@radix-ui/react-tooltip";

interface GlobalProviersProps {
	children: React.ReactNode;
}
export const GlobalProviders = ({ children }: GlobalProviersProps) => {
	return (
		<TooltipProvider delayDuration={0} skipDelayDuration={0}>
			{children}
		</TooltipProvider>
	);
};
