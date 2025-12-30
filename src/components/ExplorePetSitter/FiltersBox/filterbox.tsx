"use client";
import type { ChangeEvent } from "react";
import { useMemo } from "react";
import { Formik, Form } from "formik";
import { Clock3, PawPrint, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/Custom/Button/Button";
import { TimePickerRoller } from "@/components/Custom/TimePicker/TimeRoller";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { Input } from "@/components/Custom/Input/Input";
import { PriceRangeSlider } from "@/components/Custom/Slider/slider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/Custom/Dropdonw-Menu/DropdownMenu";
import {
  explorePetSitterInitialValues,
  explorePetSitterValidationSchema,
} from "@/schemas/ExplorePetSitterSchema";
import { PET_OPTIONS, CITY_OPTIONS } from "@/data/explorePetSitterData";
import { SERVICE_OPTIONS } from "@/types/services";
import type { PetType, ServiceType } from "@/types/PetSitter";

type FiltersBoxProps = {
  timeFrom: string;
  timeTo: string;
  date: string;
  serviceType: ServiceType | "";
  city: string;
  pets: PetType[];
  priceRange: [number, number];
  priceMin: number;
  priceMax: number;
  priceStep: number;
  showTimePicker: boolean;
  setShowTimePicker: (v: boolean | ((p: boolean) => boolean)) => void;
  openService: boolean;
  setOpenService: (v: boolean) => void;
  openCity: boolean;
  setOpenCity: (v: boolean) => void;
  setTimeFrom: (v: string) => void;
  setTimeTo: (v: string) => void;
  setDate: (v: string) => void;
  setServiceType: (v: ServiceType | "") => void;
  setCity: (v: string) => void;
  setPets: (updater: (prev: PetType[]) => PetType[]) => void;
  setPriceRange: (v: [number, number]) => void;
  onSearch: () => void;
  onClear: () => void;
  showFooter?: boolean;
  containerClassName?: string;
};

export default function FiltersBox({
  timeFrom,
  timeTo,
  date,
  serviceType,
  city,
  pets,
  priceRange,
  priceMin,
  priceMax,
  priceStep,
  showTimePicker,
  setShowTimePicker,
  openService,
  setOpenService,
  openCity,
  setOpenCity,
  setTimeFrom,
  setTimeTo,
  setDate,
  setServiceType,
  setCity,
  setPets,
  setPriceRange,
  onSearch,
  onClear,
  showFooter = true,
  containerClassName = "",
}: FiltersBoxProps) {
  const petsLabelFromArray = useMemo(
    () =>
      (arr: PetType[]): string =>
        arr.length === 0
          ? ""
          : arr
              .map(
                (p) =>
                  PET_OPTIONS.find((opt) => opt.value === p)?.label ??
                  (p as unknown as string)
              )
              .join("، "),
    []
  );

  // --- UI class helpers ---
  const labelClass = "block pr-5 text-sm font-medium text-charcoal-500";
  const fieldWrapClass = "space-y-1"; // کاهش فاصله
  const controlBase =
    "relative flex h-13 w-full items-center justify-between rounded-full border border-border bg-card px-6 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
  const iconLeftWrap =
    "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4";
  const menuContentClass =
    "min-w-[10rem] rounded-xl border border-border bg-card px-1 py-1 text-right shadow-lg";
  const menuItemClass =
    "cursor-pointer justify-end rounded-lg px-3 py-2 text-right";
  const petsInputTextClass = `!h-13 cursor-pointer !rounded-full !border !border-border !bg-card text-sm font-semibold ${
    pets.length ? "text-charcoal-800" : "text-charcoal-400"
  }`;

  const timeTextColor =
    timeFrom || timeTo ? "text-charcoal-800" : "text-charcoal-400";

  return (
    <div
      id="pet-sitter-filters"
      className={`rounded-xl border border-border bg-card px-6 py-6 shadow-lg ${containerClassName}`}
    >
      <h1 className="mb-2 text-center text-base font-bold text-charcoal-900 md:mb-1 md:text-section">
        پت‌سیتر مناسب خودت رو پیدا کن
      </h1>

      <p className="mx-auto mb-6 max-w-[360px] text-center text-xs leading-6 text-charcoal-500 md:max-w-none md:text-small md:leading-normal hidden md:block">
        نوع سرویس، موقعیت مکانی یا نوع پت خودت رو وارد کن تا بهترین گزینه‌ها رو
        برات بیاریم.
      </p>

      <Formik
        initialValues={{
          ...explorePetSitterInitialValues,
          date: date || "",
          pets: petsLabelFromArray(pets),
        }}
        enableReinitialize
        validationSchema={explorePetSitterValidationSchema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* ساعت */}
              <div className={`${fieldWrapClass} relative`}>
                <label className={labelClass}>ساعت</label>

                <button
                  type="button"
                  onClick={() => setShowTimePicker((prev) => !prev)}
                  className={`cursor-pointer relative flex h-13 w-full items-center rounded-full border border-border bg-card px-6 text-small font-bold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring${timeTextColor}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="opacity-70">از</span>
                    <span>{timeFrom || "--:--"}</span>
                    <span className="mx-2 opacity-70">تا</span>
                    <span>{timeTo || "--:--"}</span>
                  </div>

                  <span className={iconLeftWrap}>
                    <Clock3 className="h-4 w-4 text-charcoal-400" />
                  </span>
                </button>

                {showTimePicker && (
                  <div className="absolute inset-x-0 top-full z-[999] mt-2">
                    <TimePickerRoller
                      from={timeFrom}
                      to={timeTo}
                      onChangeFrom={setTimeFrom}
                      onChangeTo={setTimeTo}
                      onClose={() => setShowTimePicker(false)}
                    />
                  </div>
                )}
              </div>

              {/* تاریخ */}
              <div className={fieldWrapClass}>
                <label className={labelClass}>تاریخ</label>

                <DatePicker
                  name="date"
                  className="h-13 w-full cursor-pointer rounded-full border border-border bg-card px-6 text-sm font-semibold text-charcoal-800 placeholder:text-charcoal-400 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={values.date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const val = e.target.value;
                    setFieldValue("date", val);
                    setDate(val);
                  }}
                />
              </div>

              {/* نوع سرویس */}
              <div className={fieldWrapClass}>
                <label className={labelClass}>نوع سرویس</label>

                <DropdownMenu open={openService} onOpenChange={setOpenService}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`${controlBase} cursor-pointer ${
                        serviceType ? "text-charcoal-800" : "text-charcoal-400"
                      }`}
                    >
                      <span>
                        {serviceType
                          ? SERVICE_OPTIONS.find((o) => o.value === serviceType)
                              ?.label
                          : "همه سرویس‌ها"}
                      </span>

                      {openService ? (
                        <ChevronUp className="h-4 w-4 text-charcoal-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-charcoal-400" />
                      )}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className={menuContentClass}>
                    <DropdownMenuItem
                      onSelect={() => setServiceType("")}
                      className={menuItemClass}
                    >
                      همه سرویس‌ها
                    </DropdownMenuItem>

                    {SERVICE_OPTIONS.map((opt) => (
                      <DropdownMenuItem
                        key={opt.value}
                        onSelect={() =>
                          setServiceType(opt.value as ServiceType)
                        }
                        className={menuItemClass}
                      >
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* موقعیت مکانی */}
              <div className={fieldWrapClass}>
                <label className={labelClass}>موقعیت مکانی</label>

                <DropdownMenu open={openCity} onOpenChange={setOpenCity}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`${controlBase} cursor-pointer ${
                        city ? "text-charcoal-800" : "text-charcoal-400"
                      }`}
                    >
                      <span>{city || "انتخاب شهر..."}</span>

                      {openCity ? (
                        <ChevronUp className="h-4 w-4 text-charcoal-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-charcoal-400" />
                      )}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className={menuContentClass}>
                    <DropdownMenuItem
                      onSelect={() => setCity("همه شهرها")}
                      className={menuItemClass}
                    >
                      همه شهرها
                    </DropdownMenuItem>

                    {CITY_OPTIONS.map((cityOption) => (
                      <DropdownMenuItem
                        key={cityOption}
                        onSelect={() => setCity(cityOption)}
                        className={menuItemClass}
                      >
                        {cityOption}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* پت‌ها */}
              <div className={fieldWrapClass}>
                <label className={labelClass}>پت‌ها</label>

                <div className="relative">
                  <Input
                    readOnly
                    name="pets"
                    type="text"
                    placeholder="نوع پت را انتخاب کنید"
                    classes={{
                      className: "w-full cursor-pointer",
                      inputClassName: petsInputTextClass,
                    }}
                  />
                  <span className={iconLeftWrap}>
                    <PawPrint className="h-4 w-4 text-charcoal-400" />
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 pr-2">
                  {PET_OPTIONS.map((pet) => {
                    const value = pet.value as PetType;
                    const active = pets.includes(value);

                    return (
                      <button
                        key={pet.value}
                        type="button"
                        onClick={() => {
                          setPets((prevPets) => {
                            const exists = prevPets.includes(value);
                            const nextPets = exists
                              ? prevPets.filter((p) => p !== value)
                              : [...prevPets, value];

                            setFieldValue("pets", petsLabelFromArray(nextPets));
                            return nextPets;
                          });
                        }}
                        className={`cursor-pointer rounded-full border px-3 py-1 text-sm font-medium ${
                          active
                            ? "border-primary-400 text-primary-600"
                            : "border-charcoal-100 text-charcoal-500"
                        }`}
                      >
                        {pet.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* محدوده قیمت */}
              <div className={fieldWrapClass}>
                <label className={labelClass}>محدوده قیمت</label>

                <PriceRangeSlider
                  value={priceRange}
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  onChange={(range) => setPriceRange(range as [number, number])}
                />
              </div>
            </div>

            {/* Footer */}
            {showFooter && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onClear();
                    setFieldValue("date", "");
                    setFieldValue("pets", "");
                  }}
                  className="cursor-pointer rounded-full text-small text-charcoal-400 hover:text-charcoal-600"
                >
                  حذف همه فیلترها
                </button>

                <Button type="button" onClick={onSearch} className="h-11 px-12">
                  جستجو
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
