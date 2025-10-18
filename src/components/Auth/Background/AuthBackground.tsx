import { useDesktopTablet } from "@/hooks/ResponsiveHooks";
import bottomRightImage from "@/assets/images/Vector53.svg";
import topLeftImage from "@/assets/images/Vector56.svg";
import mobileBackgroundImage from "@/assets/images/login-signup-mobile-background.png"



export default function AuthBackground() {
  const isDesktopOrTablet = useDesktopTablet();
  return (
    <>
      {isDesktopOrTablet ? (
        <>
          <img
            src={topLeftImage}
            alt="Paw icon top left"
            className="fixed top-0 left-0 sm:h-[40vh] md:h-[50vh] lg:h-[60vh] pointer-events-none z-0 object-cover"
          />
          <img
            src={bottomRightImage}
            alt="Bone icon bottom right"
            className="fixed bottom-0 right-0 sm:h-[40vh] md:h-[50vh] lg:h-[60vh] pointer-events-none z-0 object-cover"
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
