import type { BadgeProps } from "@/types/badgeTypes";
import { useEffect, useState } from "react";
import { tuple } from "yup";
export default function Badge({
  size = 40,
  borderColor = "var(--primary)",
  borderWidth = 5,
  fillColor = "var(--neutral-gray)",
  imageUrl,
  ...props
}: BadgeProps) {
  const [isValidImg, setIsValidImg] = useState(true);
  useEffect(() => {
    if (!imageUrl) {
      setIsValidImg(false);
      return;
    }
    const img = new Image();
    img.onload = () => {
      setIsValidImg(true);
    };
    img.onerror = () => {
      setIsValidImg(false);
    };
    img.src = imageUrl;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //   className="drop-shadow-lg"
      {...props}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={fillColor} />
          <stop offset="100%" stopColor={fillColor} />
        </linearGradient>

        {imageUrl && isValidImg && (
          <pattern
            id="hexImage"
            x="0"
            y="0"
            width="1"
            height="1"
            patternContentUnits="objectBoundingBox"
          >
            <image
              href={imageUrl}
              x="0"
              y="0"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        )}
      </defs>

      <path
        d="M55 10 L90 31.34 L90 73.66 L55 95 L20 73.66 L20 31.34 Z"
        fill={isValidImg ? "url(#hexImage)" : "url(#hexGradient)"}
      />

      <path
        d="M55 10 L90 31.34 L90 73.66 L55 95 L20 73.66 L20 31.34 Z"
        fill="none"
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinejoin="miter"
      />
    </svg>
  );
}
