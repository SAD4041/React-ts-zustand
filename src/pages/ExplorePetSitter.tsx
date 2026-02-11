import { useEffect, useState, useRef, useCallback } from "react";

import { PriceRangeSlider } from "@/components/Custom/Slider/slider";
import { Button } from "@/components/Custom/Button/Button";
import { NonFormikInput } from "@/components/Custom/Input/NonFormikInput";
import { TimePickerRoller } from "@/components/Custom/TimePicker/TimeRoller";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";

import {
  MOCK_SITTERS,
  GLOBAL_MIN_PRICE,
  GLOBAL_MAX_PRICE,
  PET_OPTIONS,
  SORT_FIELDS,
  CITY_OPTIONS,
} from "@/data/explorePetSitterData";

import type { PetSitter, PetType, ServiceType } from "@/types/PetSitter";
import type {
  FilterState,
  SortField,
  SortDirection,
  SearchParams,
  SitterWithTimeAndDate,
} from "@/types/explorePetSitter";

import { SERVICE_OPTIONS } from "@/types/services";
import SitterCard from "@/components/ExplorePetSitter/SitterCard/SitterCard";

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

import { Formik, Form } from "formik";
// import * as Yup from "yup";

import { Clock3, PawPrint, ChevronDown, ChevronUp } from "lucide-react";

/* ---------------- mock API (سمت فرانت) ------------- */

function mockFetchSitters(params: SearchParams): {
  items: PetSitter[];
  total: number;
} {
  let result: SitterWithTimeAndDate[] = [...MOCK_SITTERS];

  if (params.searchQuery.trim()) {
    const q = params.searchQuery.trim().toLowerCase();
    result = result.filter((s) => s.name.toLowerCase().includes(q));
  }

  if (params.serviceType) {
    result = result.filter((s) =>
      s.services.includes(params.serviceType as ServiceType)
    );
  }

  if (params.pets && params.pets.length > 0) {
    result = result.filter((s) =>
      s.pets.some((pet) => params.pets.includes(pet))
    );
  }

  if (params.city && params.city !== "همه شهرها") {
    result = result.filter((s) => s.city === params.city);
  }

  const [minPrice, maxPrice] = params.priceRange;
  result = result.filter(
    (s) => s.pricePerNight >= minPrice && s.pricePerNight <= maxPrice
  );

  if (params.timeFrom || params.timeTo) {
    const reqFrom = params.timeFrom || "";
    const reqTo = params.timeTo || "";

    result = result.filter((s) => {
      const sitterFrom = s.availableFrom;
      const sitterTo = s.availableTo;

      if (!sitterFrom || !sitterTo) return false;

      if (reqFrom && sitterFrom < reqFrom) return false;
      if (reqTo && sitterTo > reqTo) return false;

      return true;
    });
  }

  if (params.date) {
    const reqDate = params.date;

    result = result.filter((s) =>
      Array.isArray(s.availableDates)
        ? s.availableDates.includes(reqDate)
        : false
    );
  }

  result.sort((a, b) => {
    let av: number;
    let bv: number;

    switch (params.sortField) {
      case "rating":
        av = a.rating;
        bv = b.rating;
        break;
      case "experience":
        av = a.experienceYears;
        bv = b.experienceYears;
        break;
      case "price":
      default:
        av = a.pricePerNight;
        bv = b.pricePerNight;
        break;
    }

    const base = av - bv;
    return params.sortDirection === "asc" ? base : -base;
  });

  const total = result.length;
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const items = result.slice(start, end);

  return { items, total };
}

/* ---------------- Skeleton Card ---------------- */

function SitterCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-lg animate-pulse">
      <div className="mb-4 h-28 w-full rounded-lg bg-charcoal-50" />
      <div className="mb-2 h-4 w-1/2 rounded-full bg-charcoal-50" />
      <div className="mb-4 space-y-2">
        <div className="h-3 w-1/3 rounded-full bg-charcoal-50" />
        <div className="h-3 w-1/4 rounded-full bg-charcoal-50" />
      </div>
      <div className="mb-4 h-4 w-2/3 rounded-full bg-charcoal-50" />
      <div className="mt-auto flex flex-col gap-2">
        <div className="h-9 w-full rounded-full bg-charcoal-50" />
        <div className="h-9 w-full rounded-full bg-charcoal-50" />
      </div>
    </div>
  );
}

/* ------------------ صفحه اصلی --------------------- */

export default function PetSitterSearchPage() {
  const pageSize = 6;
  const PRICE_STEP = 10000;

  const [showTimePicker, setShowTimePicker] = useState(false);

  // فیلترها به استیت‌های کوچک شکسته شده‌اند
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [pets, setPets] = useState<PetType[]>([]);
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    GLOBAL_MIN_PRICE,
    GLOBAL_MAX_PRICE,
  ]);

  

  const [sortField, setSortField] = useState<SortField>("price");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  // برای اینکه هر بار سرچ می‌زنیم، effect بفهمه سرچ جدید شروع شده
  const [searchToken, setSearchToken] = useState(0);

  const [data, setData] = useState<PetSitter[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const [openService, setOpenService] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  /* ------------ fetch دیتا بر اساس stateها ------------ */

  useEffect(() => {
    if (!hasSearched) return;

    setIsLoading(true);

    // اینجا از stateهای خرد شده یک SearchParams می‌سازیم
    const params: SearchParams = {
      searchQuery,
      serviceType,
      pets,
      city,
      date,
      timeFrom,
      timeTo,
      priceRange,
      sortField,
      sortDirection,
      page,
      pageSize,
    };

    const timer = setTimeout(() => {
      const { items, total } = mockFetchSitters(params);

      setData((prev) => (page === 1 ? items : [...prev, ...items]));
      setTotalItems(total);

      const loadedSoFar = page * pageSize;
      setHasMore(loadedSoFar < total);

      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [
    hasSearched,
    searchToken, // هر بار سرچ جدید می‌زنیم این عوض می‌شود
    page,
    sortField,
    sortDirection,
    searchQuery,
    serviceType,
    pets,
    city,
    date,
    timeFrom,
    timeTo,
    priceRange,
    pageSize,
  ]);

  /* --------- اینفینیت‌اسکرول --------- */

  const loadMoreSitters = useCallback(() => {
    if (!hasSearched || isLoading || !hasMore) return;

    setPage((prev) => prev + 1);
  }, [hasSearched, isLoading, hasMore]);

  const lastSitterRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasSearched) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreSitters();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, hasSearched, loadMoreSitters]
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  /* --------- handlers --------- */

  const handleTogglePet = (petValue: PetType) => {
    setPets((prevPets) => {
      const exists = prevPets.includes(petValue);
      const nextPets: PetType[] = exists
        ? prevPets.filter((p) => p !== petValue)
        : [...prevPets, petValue];

      return nextPets;
    });
  };

  const handleSearchClick = () => {
    setHasSearched(true);
    setData([]);
    setHasMore(true);
    setPage(1);
    // باعث می‌شود useEffect بفهمد یک سرچ جدید آغاز شده
    setSearchToken((prev) => prev + 1);
  };

  const handleClearFilters = () => {
    const resetFilters: FilterState = {
      searchQuery: "",
      serviceType: "",
      pets: [],
      city: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      priceRange: [GLOBAL_MIN_PRICE, GLOBAL_MAX_PRICE],
    };

    // ریست stateهای خرد شده
    setSearchQuery(resetFilters.searchQuery);
    setServiceType(resetFilters.serviceType as ServiceType | "");
    setPets(resetFilters.pets);
    setCity(resetFilters.city);
    setDate(resetFilters.date);
    setTimeFrom(resetFilters.timeFrom);
    setTimeTo(resetFilters.timeTo);
    setPriceRange(resetFilters.priceRange);

    setSortField("price");
    setSortDirection("asc");
    setPage(1);
    setData([]);
    setTotalItems(0);
    setHasMore(false);
    setHasSearched(false);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => {
      const next: SortDirection = prev === "asc" ? "desc" : "asc";

      setData([]);
      setHasMore(true);
      setPage(1);

      return next;
    });
  };

  /* ----------------- UI ------------------ */

  return (
    <div className="min-h-screen bg-second-background px-4 py-6" dir="rtl">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {/* باکس فیلتر بالا */}
        <div className="rounded-xl border border-border bg-card px-6 py-6 shadow-lg">
          <h1 className="mb-1 text-center text-subtitle font-bold text-charcoal-900 md:text-section">
            پت‌سیتر مناسب خودت رو پیدا کن
          </h1>
          <p className="mb-6 text-center text-small text-charcoal-500 md:text-small">
            نوع سرویس، موقعیت مکانی یا نوع پت خودت رو وارد کن تا بهترین گزینه‌ها
            رو برات بیاریم.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* ساعت */}
            <div className="relative space-y-1 text-small">
              <label className="text-small text-charcoal-500 pr-5">ساعت</label>

              <button
                type="button"
                onClick={() => setShowTimePicker((prev) => !prev)}
                className={`relative flex h-13 w-full items-center rounded-full border border-border bg-card px-6 text-small font-bold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                  timeFrom || timeTo ? "text-charcoal-800" : "text-charcoal-400"
                }`}
              >
                <span className="text-small opacity-70">از&nbsp;</span>
                <span className="text-small">{timeFrom || "--:--"}</span>

                <span className="mx-3 text-small opacity-70">تا&nbsp;</span>

                <span className="text-small">{timeTo || "--:--"}</span>

                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Clock3 className="h-4 w-4 text-charcoal-400" />
                </span>
              </button>

              {showTimePicker && (
                <div className="absolute inset-x-0 top-full z-20 mt-2">
                  <TimePickerRoller
                    from={timeFrom}
                    to={timeTo}
                    onChangeFrom={(val) => setTimeFrom(val)}
                    onChangeTo={(val) => setTimeTo(val)}
                    onClose={() => setShowTimePicker(false)}
                  />
                </div>
              )}
            </div>

            {/* تاریخ */}
            <div className="space-y-1 text-small">
              <label className="text-small text-charcoal-500 pr-5">تاریخ</label>
              <div className="relative">
                <Formik
  initialValues={{
    ...explorePetSitterInitialValues,
    date: date || "",
  }}
  enableReinitialize
  validationSchema={explorePetSitterValidationSchema}
  onSubmit={() => {}}
>

                  {({ values, setFieldValue }) => (
                    <Form>
                      <div>
                        <DatePicker
                          name="date"
                          className="
    h-13 w-full rounded-full
    border border-border bg-card px-6
    text-small font-bold
    text-charcoal-800 placeholder:text-charcoal-400
    shadow-sm"
                          value={values.date}
                          onChange={(e) => {
                            const val = (e.target as HTMLInputElement).value;
                            setFieldValue("date", val);
                            setDate(val);
                          }}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* نوع سرویس */}
            <div className="space-y-1 text-small">
              <label className="text-small text-charcoal-500 pr-5">
                نوع سرویس
              </label>

              <DropdownMenu open={openService} onOpenChange={setOpenService}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`flex h-13 w-full items-center justify-between rounded-full border border-border bg-card px-6 text-small font-bold shadow-sm ${
                      serviceType ? "text-charcoal-800" : "text-charcoal-400"
                    }`}
                  >
                    <span>
                      {serviceType
                        ? SERVICE_OPTIONS.find(
                            (o) => o.value === serviceType
                          )?.label
                        : "همه سرویس‌ها"}
                    </span>

                    {openService ? (
                      <ChevronUp className="h-4 w-4 text-charcoal-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-charcoal-400" />
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-[10rem] rounded-xl border border-border bg-card px-1 py-1 text-right shadow-lg"
                >
                  <DropdownMenuItem
                    onSelect={() => setServiceType("")}
                    className="rounded-lg px-3 py-2 justify-end text-right"
                  >
                    همه سرویس‌ها
                  </DropdownMenuItem>

                  {SERVICE_OPTIONS.map((opt) => (
                    <DropdownMenuItem
                      key={opt.value}
                      onSelect={() => setServiceType(opt.value as ServiceType)}
                      className="rounded-lg px-3 py-2 justify-end text-right"
                    >
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* موقعیت مکانی */}
            <div className="space-y-1 text-small">
              <label className="text-small text-charcoal-500 pr-5">
                موقعیت مکانی
              </label>

              <DropdownMenu open={openCity} onOpenChange={setOpenCity}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`flex h-13 w-full items-center justify-between rounded-full border border-border bg-card px-6 font-bold shadow-sm ${
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

                <DropdownMenuContent
                  align="end"
                  className="min-w-[10rem] rounded-xl border border-border bg-card px-1 py-1 text-right shadow-lg"
                >
                  <DropdownMenuItem
                    onSelect={() => setCity("همه شهرها")}
                    className="rounded-lg px-3 py-2 justify-end text-right"
                  >
                    همه شهرها
                  </DropdownMenuItem>

                  {CITY_OPTIONS.map((cityOption) => (
                    <DropdownMenuItem
                      key={cityOption}
                      onSelect={() => setCity(cityOption)}
                      className="rounded-lg px-3 py-2 justify-end text-right"
                    >
                      {cityOption}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* پت‌ها */}
            <div className="space-y-1 text-small">
              <label className="text-small text-charcoal-500 pr-5">پت‌ها</label>
              <div className="relative">
                <NonFormikInput
                  readOnly
                  name="pets"
                  type="text"
                  value={
                    pets.length === 0
                      ? "نوع پت را انتخاب کنید"
                      : pets
                          .map(
                            (p) =>
                              PET_OPTIONS.find((opt) => opt.value === p)
                                ?.label ?? p
                          )
                          .join("، ")
                  }
                  classes={{
                    className: `!h-13 cursor-pointer
                              !rounded-full !border !border-border !bg-card
                                text-small font-bold ${
                      pets.length ? "text-charcoal-800" : "text-charcoal-400"
                    }`,
                  }}
                />
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <PawPrint className="h-4 w-4 text-charcoal-400" />
                </span>
              </div>

              <div className="mt-1 flex flex-wrap gap-1 text-small pr-2">
                {PET_OPTIONS.map((pet) => {
                  const value = pet.value as PetType;
                  const active = pets.includes(value);
                  return (
                    <button
                      key={pet.value}
                      type="button"
                      onClick={() => handleTogglePet(value)}
                      className={`rounded-full border px-2 py-0.5 ${
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
            <div className="space-y-1 text-small">
              <label className="text-small text-charcoal-500 pr-5">
                محدوده قیمت
              </label>
              <PriceRangeSlider
                value={priceRange}
                min={GLOBAL_MIN_PRICE}
                max={GLOBAL_MAX_PRICE}
                step={PRICE_STEP}
                onChange={(range) =>
                  setPriceRange(range as [number, number])
                }
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p
              onClick={handleClearFilters}
              className="rounded-full text-small cursor-pointer text-charcoal-400 hover:text-charcoal-600 md:text-small"
            >
              حذف همه فیلترها
            </p>

            <Button type="button" onClick={handleSearchClick} className="px-13">
              جستجو
            </Button>
          </div>
        </div>

        {/* نوار نتایج + سورت */}
        <div className="flex items-center justify-between">
          <h2 className="text-normal font-bold text-charcoal-900 md:text-subtitle">
            نتایج جستجو
          </h2>

          <div className="flex items-center gap-2 rounded-full bg-card px-3 py-2 text-small shadow-sm md:text-small">
            <span className="text-charcoal-500">مرتب‌سازی بر اساس</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-small text-charcoal-800"
                >
                  <span>
                    {
                      SORT_FIELDS.find((opt) => opt.value === sortField)
                        ?.label
                    }
                  </span>
                  <ChevronDown className="h-4 w-4 text-charcoal-400" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="bottom"
                align="center"
                sideOffset={6}
                avoidCollisions={false}
                className="
                  min-w-[7rem]
                  rounded-3xl border border-border
                  px-4 py-2
                  text-small text-charcoal-900
                  shadow-lg
                  overflow-visible max-h-none
                "
              >
                {SORT_FIELDS.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => {
                      setSortField(opt.value);
                      setData([]);
                      setHasMore(true);
                      if (hasSearched) {
                        setPage(1);
                      }
                    }}
                    className={`cursor-pointer rounded-2xl px-2 py-1.5 text-right ${
                      sortField === opt.value
                        ? "text-primary-500"
                        : "text-charcoal-800"
                    }`}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              type="button"
              variant="outline"
              onClick={toggleSortDirection}
              className="
                items-center gap-1 rounded-full border border-border
                text-small text-charcoal-600
                hover:text-charcoal-900 transition
              "
            >
              {sortDirection === "asc" ? (
                <>
                  <span>صعودی</span>
                  <span>↑</span>
                </>
              ) : (
                <>
                  <span>نزولی</span>
                  <span>↓</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* لیست سیتِرها + اسکلت + اینفینیت‌اسکرول */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!hasSearched ? (
            <div className="col-span-full flex items-center justify-center py-16 text-small text-charcoal-500">
              برای مشاهده نتایج، فیلترها را تنظیم کرده و روی «جستجو» کلیک کن.
            </div>
          ) : data.length === 0 && isLoading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <SitterCardSkeleton key={index} />
            ))
          ) : data.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-16 text-small text-charcoal-500">
              موردی مطابق با جستجوی شما یافت نشد.
            </div>
          ) : (
            data.map((sitter, index) => (
              <div
                key={sitter.id}
                ref={index === data.length - 1 ? lastSitterRef : undefined}
              >
                <SitterCard sitter={sitter} />
              </div>
            ))
          )}
        </div>

        {/* لود بیشتر در اینفینیت اسکرول: اسکلت پایین لیست */}
        {hasSearched && isLoading && data.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SitterCardSkeleton key={`more-${index}`} />
            ))}
          </div>
        )}

        {/* اطلاعات پیجینیشن کلی */}
        <div className="mt-2 flex items-center justify-between text-small md:text-small">
          <div className="text-charcoal-500">
            {!hasSearched || totalItems === 0 ? (
              hasSearched ? (
                "هیچ آیتمی وجود ندارد."
              ) : (
                ""
              )
            ) : (
              <>
                نمایش{" "}
                <span className="font-semibold text-charcoal-900">
                  {data.length === 0 ? 0 : 1}
                </span>{" "}
                تا{" "}
                <span className="font-semibold text-charcoal-900">
                  {data.length}
                </span>{" "}
                از{" "}
                <span className="font-semibold text-charcoal-900">
                  {totalItems}
                </span>{" "}
                پت‌سیتر
              </>
            )}
          </div>

          <div className="text-charcoal-500">
            {hasSearched &&
              !hasMore &&
              totalItems > 0 &&
              "همه نتایج بارگذاری شدند."}
          </div>
        </div>
      </div>
    </div>
  );
}
