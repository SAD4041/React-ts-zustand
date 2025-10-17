// src/components/AboutUs/FeatureItemComponent.tsx
import type { Feature } from "@/types/aboutUs";
import { IconFromImageComponent } from "../Custom/IconFromImage/IconFromImageComponent";

export function FeatureItem({ item }: { item: Feature }) {
  return (
    <li className="py-4 sm:py-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <IconFromImageComponent src={item.icon} />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-small sm:text-subtitle text-foreground">
            {item.title}
          </p>
          <p className="text-muted-foreground leading-6 text-small sm:text-small">
            {item.text}
          </p>
        </div>
      </div>
    </li>
  );
}
