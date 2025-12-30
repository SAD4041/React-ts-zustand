import { useEffect, useState, useRef, useCallback } from "react";

import FiltersBox from "@/components/ExplorePetSitter/FiltersBox/filterbox";
import FiltersDrawer from "@/components/ExplorePetSitter/MobileFilterDrawer";

import { Button } from "@/components/Custom/Button/Button";
import SitterCard from "@/components/ExplorePetSitter/SitterCard/SitterCard";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/Custom/Dropdonw-Menu/DropdownMenu";

import { SORT_FIELDS } from "@/data/explorePetSitterData";

import type { PetSitter, PetType, ServiceType } from "@/types/PetSitter";
import type { SortField, SortDirection } from "@/types/explorePetSitter";

import { ChevronDown, ArrowUp } from "lucide-react";

import { searchPetSittersService } from "@/services/petSitterService";
import { buildPetSitterSearchPayload } from "@/utils/buildPetSitterSearchPayload";

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

export default function ExplorePetSitter() {
  const pageSize = 6;
  const PRICE_STEP = 10000;
  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 100000;

  // Drawer (mobile)
  const [filtersOpen, setFiltersOpen] = useState(false);

  // ✅ UI state - Desktop (برای FiltersBox دسکتاپ)
  const [showTimePickerDesktop, setShowTimePickerDesktop] = useState(false);
  const [openServiceDesktop, setOpenServiceDesktop] = useState(false);
  const [openCityDesktop, setOpenCityDesktop] = useState(false);

  // ✅ UI state - Mobile (برای Drawer)
  const [showTimePickerMobile, setShowTimePickerMobile] = useState(false);
  const [openServiceMobile, setOpenServiceMobile] = useState(false);
  const [openCityMobile, setOpenCityMobile] = useState(false);

  // فیلترها
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [pets, setPets] = useState<PetType[]>([]);
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    DEFAULT_MIN_PRICE,
    DEFAULT_MAX_PRICE,
  ]);

  // سورت / صفحه
  const [sortField, setSortField] = useState<SortField>("price");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  // برای فهمیدن سرچ جدید
  const [searchToken, setSearchToken] = useState(0);

  // دیتا
  const [data, setData] = useState<PetSitter[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  // دکمه اسکرول به بالا
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollButtonBottom, setScrollButtonBottom] = useState(20);

  // کنترل اینفینیت اسکرول / نمایش بیشتر
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(true);
  const [autoLimit, setAutoLimit] = useState(18);

  const infiniteObserverRef = useRef<IntersectionObserver | null>(null);
  const cardsBottomRef = useRef<HTMLDivElement | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  /* ✅ وقتی Drawer باز/بسته میشه، UI state های نسخه دیگر رو خاموش کن */
  useEffect(() => {
    if (filtersOpen) {
      // Drawer باز شد => state های دسکتاپ رو ببند
      setShowTimePickerDesktop(false);
      setOpenServiceDesktop(false);
      setOpenCityDesktop(false);
    } else {
      // Drawer بسته شد => state های موبایل رو جمع کن
      setShowTimePickerMobile(false);
      setOpenServiceMobile(false);
      setOpenCityMobile(false);
    }
  }, [filtersOpen]);

  /* ------------ fetch دیتا ------------ */

  useEffect(() => {
    if (!hasSearched) return;

    const fetchData = async () => {
      setIsLoading(true);

      const payload = buildPetSitterSearchPayload({
        filters: {
          searchQuery,
          serviceType,
          pets,
          city,
          date,
          timeFrom,
          timeTo,
          priceRange,
        },
        page,
        pageSize,
        sortField,
        sortDirection,
      });
      try {
        console.log("[ExplorePetSitter] search payload", payload);
        console.log("[ExplorePetSitter] search filters", payload.filters);
        const res = await searchPetSittersService(payload);
        console.log("[ExplorePetSitter] search response", res);

        setData((prev) => (page === 1 ? res.items : [...prev, ...res.items]));
        setTotalItems(res.total);
        setHasMore(page * pageSize < res.total);
      } catch (error) {
        console.error("[ExplorePetSitter] search error", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    hasSearched,
    searchToken,
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
    if (!hasSearched || isLoading || !hasMore || !autoLoadEnabled) return;
    setPage((prev) => prev + 1);
  }, [hasSearched, isLoading, hasMore, autoLoadEnabled]);

  const lastSitterRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasSearched) return;

      if (infiniteObserverRef.current) infiniteObserverRef.current.disconnect();

      infiniteObserverRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadMoreSitters();
        }
      });

      if (node) infiniteObserverRef.current.observe(node);
    },
    [isLoading, hasMore, hasSearched, loadMoreSitters]
  );

  const setLastCardNode = useCallback(
    (node: HTMLDivElement | null) => {
      lastCardRef.current = node;
      lastSitterRef(node);
    },
    [lastSitterRef]
  );

  useEffect(() => {
    return () => {
      if (infiniteObserverRef.current) infiniteObserverRef.current.disconnect();
    };
  }, []);

  /* --------- کنترل حد اینفینیت --------- */

  useEffect(() => {
    if (!hasSearched) {
      setAutoLoadEnabled(true);
      setAutoLimit(18);
      return;
    }

    if (!hasMore) {
      setAutoLoadEnabled(false);
      return;
    }

    setAutoLoadEnabled(data.length < autoLimit);
  }, [data.length, autoLimit, hasSearched, hasMore]);

  /* --------- اسکرول: دکمه بالا + محدودیت تا انتهای کارت‌ها --------- */

  useEffect(() => {
    const DEFAULT_BOTTOM = 20;
    const GAP_FROM_CARDS = 16;
    const BUTTON_SIZE = 44;
    const NAVBAR_OFFSET = 72;

    const handleScroll = () => {
      if (!hasSearched || data.length === 0) {
        setShowScrollTop(false);
        return;
      }

      setShowScrollTop(window.scrollY > 400);

      if (!hasSearched || totalItems === 0) {
        setScrollButtonBottom(DEFAULT_BOTTOM);
        return;
      }

      const sentinel = lastCardRef.current ?? cardsBottomRef.current;
      if (!sentinel) {
        setScrollButtonBottom(DEFAULT_BOTTOM);
        return;
      }

      const rect = sentinel.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom >= viewportHeight) {
        setScrollButtonBottom(DEFAULT_BOTTOM);
        return;
      }

      const minBottom = viewportHeight - rect.bottom + GAP_FROM_CARDS;
      const maxBottom = Math.max(
        DEFAULT_BOTTOM,
        viewportHeight - NAVBAR_OFFSET - BUTTON_SIZE
      );
      const nextBottom = Math.min(
        Math.max(DEFAULT_BOTTOM, minBottom),
        maxBottom
      );
      setScrollButtonBottom(nextBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasSearched, totalItems, data.length]);

  /* --------- handlers --------- */

  const handleSearchClick = () => {
    setHasSearched(true);
    setData([]);
    setHasMore(true);
    setPage(1);
    setSearchToken((prev) => prev + 1);

    setAutoLimit(18);
    setAutoLoadEnabled(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setServiceType("");
    setPets([]);
    setCity("");
    setDate("");
    setTimeFrom("");
    setTimeTo("");
    setPriceRange([DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE]);

    setSortField("price");
    setSortDirection("asc");
    setPage(1);

    setData([]);
    setTotalItems(0);
    setHasMore(false);
    setHasSearched(false);

    setAutoLimit(18);
    setAutoLoadEnabled(true);

    // ✅ UI ها هم بسته بشن
    setShowTimePickerDesktop(false);
    setOpenServiceDesktop(false);
    setOpenCityDesktop(false);
    setShowTimePickerMobile(false);
    setOpenServiceMobile(false);
    setOpenCityMobile(false);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => {
      const next: SortDirection = prev === "asc" ? "desc" : "asc";
      setData([]);
      setHasMore(true);
      if (hasSearched) setPage(1);
      return next;
    });
  };

  const handleScrollTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleManualLoadMore = () => {
    if (!hasMore || isLoading) return;
    setAutoLimit((prev) => prev + 18);
    setPage((prev) => prev + 1);
  };

  /* ----------------- UI ------------------ */

  return (
    <div className="min-h-screen bg-second-background px-4 py-6" dir="rtl">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {/* Desktop Filters */}
        <div className="hidden md:block">
          <FiltersBox
            timeFrom={timeFrom}
            timeTo={timeTo}
            date={date}
            serviceType={serviceType}
            city={city}
            pets={pets}
            priceRange={priceRange}
            priceMin={DEFAULT_MIN_PRICE}
            priceMax={DEFAULT_MAX_PRICE}
            priceStep={PRICE_STEP}
            showTimePicker={showTimePickerDesktop}
            setShowTimePicker={setShowTimePickerDesktop}
            openService={openServiceDesktop}
            setOpenService={setOpenServiceDesktop}
            openCity={openCityDesktop}
            setOpenCity={setOpenCityDesktop}
            setTimeFrom={setTimeFrom}
            setTimeTo={setTimeTo}
            setDate={setDate}
            setServiceType={setServiceType}
            setCity={setCity}
            setPets={setPets}
            setPriceRange={setPriceRange}
            onSearch={handleSearchClick}
            onClear={handleClearFilters}
          />
        </div>

        {/* Mobile Filters Drawer */}
        <div className="md:hidden">
          <FiltersDrawer
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
            timeFrom={timeFrom}
            timeTo={timeTo}
            date={date}
            serviceType={serviceType}
            city={city}
            pets={pets}
            priceRange={priceRange}
            priceMin={DEFAULT_MIN_PRICE}
            priceMax={DEFAULT_MAX_PRICE}
            priceStep={PRICE_STEP}
            showTimePicker={showTimePickerMobile}
            setShowTimePicker={setShowTimePickerMobile}
            openService={openServiceMobile}
            setOpenService={setOpenServiceMobile}
            openCity={openCityMobile}
            setOpenCity={setOpenCityMobile}
            setTimeFrom={setTimeFrom}
            setTimeTo={setTimeTo}
            setDate={setDate}
            setServiceType={setServiceType}
            setCity={setCity}
            setPets={setPets}
            setPriceRange={setPriceRange}
            onSearch={handleSearchClick}
            onClear={handleClearFilters}
          />
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
                  className="flex items-center cursor-pointer gap-1 rounded-full border border-border px-3 py-1 text-small text-charcoal-800"
                >
                  <span>
                    {SORT_FIELDS.find((opt) => opt.value === sortField)?.label}
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
                  min-w-[7rem] cursor-pointer
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
                      if (hasSearched) setPage(1);
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
                items-center gap-1 rounded-full border border-border cursor-pointer
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

        {/* لیست سیتِرها */}
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
                key={`${sitter.id}-${index}`}
                ref={index === data.length - 1 ? setLastCardNode : undefined}
              >
                <SitterCard sitter={sitter} />
              </div>
            ))
          )}

          <div ref={cardsBottomRef} className="col-span-full h-0" />
        </div>

        {/* اسکلت پایین */}
        {hasSearched && isLoading && data.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SitterCardSkeleton key={`more-${index}`} />
            ))}
          </div>
        )}

        {/* نمایش بیشتر */}
        {hasSearched && hasMore && data.length >= autoLimit && !isLoading && (
          <div className="mt-4 flex justify-center ">
            <Button
              type="button"
              variant="outline"
              onClick={handleManualLoadMore}
              className="px-10 cursor-pointer"
            >
              نمایش بیشتر
            </Button>
          </div>
        )}

        {/* اطلاعات */}
        <div className="mt-2 flex items-center justify-between text-small md:text-small">
          <div className="flex items-center gap-3 text-charcoal-500">
            <span>
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
            </span>
          </div>

          <div className="text-charcoal-500">
            {hasSearched &&
              !hasMore &&
              totalItems > 0 &&
              "همه نتایج بارگذاری شدند."}
          </div>
        </div>
      </div>

      {/* دکمه برگشت به بالا */}
      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollTopClick}
          style={{ bottom: `${scrollButtonBottom}px` }}
          className="
            fixed right-5 z-40
            flex h-11 w-11 items-center justify-center
            rounded-full bg-primary text-white cursor-pointer
            shadow-lg hover:bg-primary/90
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
          "
          aria-label="بازگشت به بالای صفحه"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
