"use client";

import { PawPrint, MapPin, Dog, Cat, Bird, Rat, House } from "lucide-react";

import { Button } from "@/components/Custom/Button/Button";
import { SERVICE_OPTIONS } from "@/types/services";
import type { SitterCardProps } from "@/types/ExplorePetSitter";

// 🔽 مسیر رو با مسیر واقعی کامپوننت خودت عوض کن
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function SitterCard({ sitter }: SitterCardProps) {
  const fullStars = Math.round(sitter.rating);
  const stars = "★".repeat(fullStars).padEnd(5, "☆");

  // اگر بعداً فیلد عکس به PetSitter اضافه کردی (مثلاً avatarUrl)،
  // اینجا می‌تونی ازش استفاده کنی:
  // const avatarSrc = sitter.avatarUrl ?? undefined;

  return (
    <div className="card-shell flex flex-col justify-between px-6 py-5">
      {/* بالا */}
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* آواتار سیتِر */}
          <Avatar className="h-20 w-20">
            {/* اگر فیلد عکس داشتی اینو آن‌کامنت کن و src رو ست کن */}
            {/* <AvatarImage src={avatarSrc} alt={sitter.name} /> */}
            <AvatarFallback className="bg-secondary-50">
              <PawPrint className="h-8 w-8 text-primary-500" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1 text-right">
            <h3 className="text-subtitle font-semibold text-charcoal-900 text-base md:text-lg">
              {sitter.name}
            </h3>

            {/* امتیاز */}
            <div className="flex items-center justify-start gap-1 text-small text-charcoal-500">
              <span className="text-primary-400">{stars}</span>
              <span>({sitter.reviewsCount} نظر)</span>
            </div>

            {/* شهر */}
            <div className="mt-1 flex items-center gap-1 text-small text-charcoal-400">
              <MapPin className="h-4 w-4" />
              <span>{sitter.city}</span>
            </div>
          </div>
        </div>

        {/* قیمت */}
        <div className="mt-6 text-small text-charcoal-700 text-right">
          شروع قیمت از{" "}
          <span className="font-semibold text-primary-600">
            {sitter.pricePerNight.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* خدمات + پت‌ها */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {/* خدمات */}
          <div className="flex flex-wrap gap-2">
            {sitter.services.map((service) => {
              const label =
                SERVICE_OPTIONS.find((s) => s.value === service)?.label ??
                "سرویس";

              return (
                <div
                  key={service}
                  className="
                    flex items-center gap-1 rounded-full
                    bg-gradient-to-b from-primary-400 to-primary-500
                    px-4 py-1 text-xs font-medium
                    text-primary-foreground shadow-lg
                  "
                >
                  <House className="h-3 w-3" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          {/* پت‌ها */}
          <div className="flex items-center gap-2 text-primary-500">
            {sitter.pets.includes("cat") && <Cat className="h-5 w-5" />}
            {sitter.pets.includes("dog") && <Dog className="h-5 w-5" />}
            {sitter.pets.includes("bird") && <Bird className="h-5 w-5" />}
            {sitter.pets.includes("rodent") && <Rat className="h-5 w-5" />}
          </div>
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="mt-5 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 rounded-full px-4 py-2.5 text-xs font-semibold text-charcoal-700"
        >
          مشاهده پروفایل
        </Button>

        <Button className="flex-1 rounded-full px-4 py-2.5 text-xs font-semibold">
          رزرو فوری
        </Button>
      </div>
    </div>
  );
}
