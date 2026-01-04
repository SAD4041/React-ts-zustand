// src/components/Sidebar/Sidebar.tsx
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { NavItem } from "@/types/sidebarTypes";

type SidebarProps = {
  items: NavItem[];
  className?: string;
};

export default function Sidebar({ items, className }: SidebarProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0 });
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const topItems = items.slice(0, -1);
  const bottomItem = items[items.length - 1];
  const activeKey = activeId ?? items[0]?.id ?? "";

  useEffect(() => {
    if (!activeId && items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [activeId, items]);

  useEffect(() => {
    const updatePosition = () => {
      const itemElement = itemRefs.current[activeKey];
      const navElement = navRef.current;

      if (itemElement && navElement) {
        const navRect = navElement.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();
        // Calculate center relative to the nav container
        const left = itemRect.left - navRect.left + itemRect.width / 2;
        setIndicatorStyle({ left });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeKey, items.length]);

  const handleClick = (item: NavItem) => {
    setActiveId(item.id);
    if (item.onClick) {
      item.onClick();
      return;
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const activeItem = items.find((item) => item.id === activeKey);

  // Generate the SVG path for the "dip"
  // The curve moves based on indicatorStyle.left
  const curvePath = useMemo(() => {
    const width = 2000; // Arbitrary large width to cover screen
    const height = 80; // height of the navbar
    const x = indicatorStyle.left;
    const curveWidth = 118; // The total width of the curve opening
    const curveDepth = 36; // How deep the dip goes

    if (x === 0) return "";

    return `
      M 0 0
      L ${x - curveWidth / 2} 0
      C ${x - curveWidth / 4} 0 ${x - curveWidth / 4} ${curveDepth} ${x} ${curveDepth}
      C ${x + curveWidth / 4} ${curveDepth} ${x + curveWidth / 4} 0 ${x + curveWidth / 2} 0
      L ${width} 0
      L ${width} ${height}
      L 0 ${height}
      Z
    `;
  }, [indicatorStyle.left]);

  return (
    <div
      className={`relative z-50 h-20 w-full md:h-full md:w-20 md:bg-sidebar md:shadow-lg transition-all duration-300 ease-in-out ${isHovered ? "md:w-72" : "md:w-20"} ${className ?? ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: "vazirmatn, sans-serif" }}
    >
      {/* Mobile Bottom Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 flex h-24 items-end justify-center md:hidden pointer-events-none"
      >
        <div ref={navRef} className="pointer-events-auto relative w-full h-[80px]">
          
          {/* SVG Background Shape */}
          <div className="absolute bottom-0 left-0 right-0 h-[80px] w-full overflow-hidden drop-shadow-md">
             <svg 
               className="h-full w-full text-gray-200 transition-all duration-300 ease-out" 
               preserveAspectRatio="none"
               viewBox={`0 0 ${navRef.current?.offsetWidth || 100} 80`}
             >
               <motion.path 
                 d={curvePath} 
                 fill="currentColor"
                 animate={{ d: curvePath }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
             </svg>
          </div>

          {/* Floating Action Bubble */}
          <motion.div
            className="absolute -top-6 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary shadow-lg text-gray-800"
            animate={{ left: indicatorStyle.left }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ zIndex: 20 }}
          >
            <div className="[&>svg]:h-7 [&>svg]:w-7">
              {activeItem?.icon}
            </div>
          </motion.div>

          {/* Navigation Items Row */}
          <div className="absolute inset-0 flex h-full items-center justify-around px-2 pb-2">
            {items.map((item) => {
              const isActive = item.id === activeKey;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  type="button"
                  onClick={() => handleClick(item)}
                  className="group relative flex min-w-[60px] flex-1 flex-col items-center justify-end pb-3 gap-1"
                >
                  {/* Icon Container */}
                  <div className={`relative flex h-8 w-8 items-center justify-center transition-all duration-300 
                    ${isActive ? "opacity-0 translate-y-4" : "opacity-100 text-gray-400"}`}>
                    <div className="[&>svg]:h-6 [&>svg]:w-6">
                      {item.icon}
                    </div>
                  </div>

                  {/* Text Label */}
                  <div className="h-5 overflow-hidden flex items-center justify-center">
                    {isActive && (
                        <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm font-medium text-gray-700"
                        >
                        {item.label}
                        </motion.span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden h-full flex-col justify-between overflow-y-auto py-4 md:flex bg-sidebar shadow-lg">
        <div>
          {topItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className={`relative flex cursor-pointer items-center justify-end px-9 py-6 transition-colors duration-200
                  ${isActive ? "bg-muted border-r-4 border-primary" : "hover:bg-muted-foreground"}
                `}
              >
                <span
                  className={`mr-14 whitespace-nowrap text-2xl text-foreground transition-all duration-300
                    ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
                    ${isActive ? "font-bold" : ""}
                  `}
                >
                  {item.label}
                </span>
                <div className="shrink-0 text-foreground [&>svg]:h-8 [&>svg]:w-8">
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>

        {bottomItem && (
          <div>
            {(() => {
              const isActive = bottomItem.id === activeId;
              return (
                <div
                  key={bottomItem.id}
                  onClick={() => handleClick(bottomItem)}
                  className={`relative flex cursor-pointer items-center justify-end px-9 py-4 transition-colors duration-200
                    ${isActive ? "bg-muted border-r-4 border-primary" : "hover:bg-muted-foreground"}
                  `}
                >
                  <span
                    className={`mr-14 whitespace-nowrap text-2xl text-foreground transition-all duration-300
                      ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
                      ${isActive ? "font-bold" : ""}
                    `}
                  >
                    {bottomItem.label}
                  </span>
                  <div className="shrink-0 text-foreground [&>svg]:h-8 [&>svg]:w-8">
                    {bottomItem.icon}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </nav>
    </div>
  );
}