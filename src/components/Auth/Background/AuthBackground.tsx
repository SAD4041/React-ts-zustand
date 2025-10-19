import { useDesktopTablet } from "@/hooks/ResponsiveHooks";
import bottomRightImage from "@/assets/images/Vector53.svg";
import topLeftImage from "@/assets/images/Vector56.svg";
import mobileBackgroundImage from "@/assets/images/login-signup-mobile-background.png";
import { cn } from "@/lib/utils";

interface AuthBackgroundProps {
	loginPage?: boolean;
}

export default function AuthBackground({
	loginPage = false,
}: AuthBackgroundProps) {
	const isDesktopOrTablet = useDesktopTablet();
	return (
		<>
			{isDesktopOrTablet ? (
				<>
					<img
						src={topLeftImage}
						alt="Paw icon top left"
						className={cn(
							"fixed top-0 left-0 sm:h-[40vh] md:h-[50vh] lg:h-[60vh] pointer-events-none z-0 object-cover",
							loginPage ? "" : "lg:h-[55vh] md:h-[40vh] sm:h-[35vh]",
						)}
					/>
					<img
						src={bottomRightImage}
						alt="Bone icon bottom right"
						className={cn(
							"fixed bottom-0 right-0 sm:h-[40vh] md:h-[50vh] lg:h-[60vh] pointer-events-none z-0 object-cover",
							loginPage ? "" : "md:h-[40vh] sm:h-[35vh]",
						)}
					/>
				</>
			) : (
				<img
					src={mobileBackgroundImage}
					alt="background image"
					className="fixed h-screen w-screen object-cover object-bottom z-0"
				/>
			)}
		</>
	);
}
