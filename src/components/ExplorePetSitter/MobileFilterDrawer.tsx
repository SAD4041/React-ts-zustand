import FiltersBox from "@/components/ExplorePetSitter/FiltersBox/filterbox";
import { Button } from "@/components/Custom/Button/Button";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

import type { PetType, ServiceType } from "@/types/PetSitter";

type FiltersDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  // values
  timeFrom: string;
  timeTo: string;
  date: string;
  serviceType: ServiceType | "";
  city: string;
  pets: PetType[];
  priceRange: [number, number];

  // constants
  priceMin: number;
  priceMax: number;
  priceStep: number;

  // UI state
  showTimePicker: boolean;
  setShowTimePicker: (v: boolean | ((p: boolean) => boolean)) => void;
  openService: boolean;
  setOpenService: (v: boolean) => void;
  openCity: boolean;
  setOpenCity: (v: boolean) => void;

  // setters
  setTimeFrom: (v: string) => void;
  setTimeTo: (v: string) => void;
  setDate: (v: string) => void;
  setServiceType: (v: ServiceType | "") => void;
  setCity: (v: string) => void;
  setPets: (updater: (prev: PetType[]) => PetType[]) => void;
  setPriceRange: (v: [number, number]) => void;

  // actions
  onSearch: () => void;
  onClear: () => void;

  triggerLabel?: string;
  title?: string;
};

export default function FiltersDrawer({
  open,
  onOpenChange,
  onSearch,
  onClear,
  triggerLabel = "فیلترها و جستجو",
  title = "فیلترها",
  ...filtersProps
}: FiltersDrawerProps) {
  const handleSearch = () => {
    onSearch();
    onOpenChange(false);
  };

  const handleClear = () => {
    onClear();
  };

  //  وقتی یکی از dropdown ها بازه، overflow رو موقتاً visible می‌کنیم
  const anyDropdownOpen = filtersProps.openService || filtersProps.openCity;

  
  const safeShowTimePicker = !anyDropdownOpen && filtersProps.showTimePicker;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button type="button" className="w-full rounded-full">
          {triggerLabel}
        </Button>
      </DrawerTrigger>

      {/* Drawer Content که کل صفحه رو می‌گیره */}
      <DrawerContent className="h-screen flex flex-col rounded-none">
        <div dir="rtl" className="flex flex-col h-full">
          {/* Header */}
          <DrawerHeader className="text-right">
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>

          <div
            className={`flex-1 px-4 pb-4 ${
              anyDropdownOpen ? "overflow-visible" : "overflow-hidden"
            }`}
          >
            <div className="rounded-xl border border-border bg-card shadow-lg">
              <FiltersBox
                {...filtersProps}
                showTimePicker={safeShowTimePicker}
                showFooter={false}
                containerClassName="border-0 shadow-none bg-transparent px-6 py-6"
                onSearch={handleSearch}
                onClear={handleClear}
              />
            </div>
          </div>

          {/* Footer (دکمه‌ها) */}
          <div className="border-t border-border bg-card px-4 py-6">
            <div className="flex items-center justify-between">
              <p
                onClick={handleClear}
                className="cursor-pointer rounded-full text-small text-charcoal-400 hover:text-charcoal-600"
              >
                حذف همه فیلترها
              </p>

              <div className="flex items-center gap-2">
                <DrawerClose asChild>
                  <Button type="button" variant="outline" className="px-6">
                    بستن
                  </Button>
                </DrawerClose>

                <Button type="button" onClick={handleSearch} className="px-10">
                  جستجو
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
