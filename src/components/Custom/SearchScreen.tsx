import { Formik } from "formik";
import { Search, ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import ChallengeCard from "@/components/Custom/ChallangeCard";
import CustomInput from "@/components/Custom/CustomInput";
import { searchChallengesService } from "@/services/userService";
import { convertToJalali } from "./ConvertToJalali";
import { useNavigate } from "react-router-dom";

interface ActiveFilters {
  selectedCategory: string | null;
  sortBy: string;
}

interface Challenge {
  id: number;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  profiles?: any[];
  initialLikes?: number;
  initialComments?: number;
  coverImage?: string;
  isJoined?: boolean;
  isPrivate?: boolean;
  creator?: { name: string };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenges: Challenge[];
  onFilterClick: () => void;
  activeFilters?: ActiveFilters | null;
  onClearFilter?: (key: keyof ActiveFilters) => void;
  categoryTitleById?: Record<string, string>;
  onChallengeSelect?: (challenge: Challenge) => void;
}

function SearchTopBar({
  onBack,
  onFilter,
}: {
  onBack: () => void;
  onFilter: () => void;
}) {
  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 pt-4 pb-2 shadow-sm"
      dir="rtl"
    >
      <button
        type="button"
        onClick={onFilter}
        className="grid h-10 w-10 place-items-center rounded-xl border-2 border-orange-600 bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
        aria-label="فیلتر"
      >
        <SlidersHorizontal className="h-5 w-5" strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={onBack}
        className="grid h-10 w-10 place-items-center rounded-xl border-2 border-orange-600 bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
        aria-label="بازگشت"
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove?: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
      <span className="whitespace-nowrap">{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="grid h-5 w-5 place-items-center rounded-full hover:bg-slate-300 transition-colors"
          aria-label="حذف فیلتر"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function EmptyState({
  hasFilters,
  searchQuery,
  onClearSearch,
}: {
  hasFilters: boolean;
  searchQuery: string;
  onClearSearch: () => void;
}) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center py-12">
      <Search className="h-20 w-20 text-slate-300 mx-auto mb-6" />
      <h3 className="text-xl font-bold text-slate-700 mb-3">
        {hasFilters ? "چیزی با این فیلتر پیدا نشد" : "شروع جستجو"}
      </h3>
      <p className="text-slate-500 mb-6">
        {hasFilters
          ? "فیلترها را تغییر دهید یا پاک کنید."
          : searchQuery
            ? `هیچ چالشی با عبارت "${searchQuery}" پیدا نشد`
            : "نام چالش مورد نظر خود را جستجو کنید"}
      </p>
      {searchQuery && (
        <button
          onClick={onClearSearch}
          className="px-6 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors"
        >
          مشاهده همه چالش‌ها
        </button>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="mt-6 py-4 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
      <p className="mt-2 text-sm text-slate-600">در حال جستجو...</p>
    </div>
  );
}

export function SearchModal({
  isOpen,
  onClose,
  challenges,
  onFilterClick,
  activeFilters,
  onClearFilter,
  categoryTitleById,
  onChallengeSelect,
}: SearchModalProps) {
  const [searchResults, setSearchResults] = useState<Challenge[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await searchChallengesService(query);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Error searching challenges:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    // حذف timeout قبلی
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, isOpen, performSearch]);

  if (!isOpen) return null;

  const handleOpenChallenge = (item: Challenge) => {
    onChallengeSelect?.(item);
    onClose();
  };

  const hasCategory = !!activeFilters?.selectedCategory;
  const hasSort = activeFilters?.sortBy && activeFilters.sortBy !== "newest";

  const categoryLabel = hasCategory
    ? (categoryTitleById?.[String(activeFilters?.selectedCategory)] ??
      `دسته‌بندی: ${activeFilters?.selectedCategory}`)
    : null;

  const sortLabel = hasSort
    ? activeFilters?.sortBy === "popular"
      ? "مرتب‌سازی: محبوب‌ترین"
      : activeFilters?.sortBy === "trending"
        ? "مرتب‌سازی: پرطرفدار"
        : activeFilters?.sortBy === "oldest"
          ? "مرتب‌سازی: قدیمی‌ترین"
          : "مرتب‌سازی: جدیدترین"
    : null;

  const hasAnyVisibleFilter = !!categoryLabel || !!sortLabel;
  const displayResults = searchQuery.trim() ? searchResults : challenges;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div dir="rtl" className="min-h-screen pb-32">
        <SearchTopBar onBack={onClose} onFilter={onFilterClick} />

        <div className="px-4 pt-4">
          <Formik initialValues={{ q: "" }} onSubmit={() => {}}>
            {({ values, setFieldValue }) => {
              // همگام‌سازی مقدار با state داخلی
              if (values.q !== searchQuery) {
                setSearchQuery(values.q);
              }

              return (
                <>
                  <div className="mb-3">
                    <CustomInput
                      name="q"
                      label="جست و جو"
                      icon={<Search className="h-5 w-5" />}
                      value={values.q}
                      onChange={(e) => setFieldValue("q", e.target.value)}
                      autoFocus
                    />
                  </div>

                  {/* فیلتر چیپ‌ها */}
                  {hasAnyVisibleFilter && (
                    <div className="mt-4 flex flex-wrap gap-2 mb-3">
                      {categoryLabel && (
                        <FilterChip
                          label={categoryLabel}
                          onRemove={() => onClearFilter?.("selectedCategory")}
                        />
                      )}
                      {sortLabel && (
                        <FilterChip
                          label={sortLabel}
                          onRemove={() => onClearFilter?.("sortBy")}
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          onClearFilter?.("selectedCategory");
                          onClearFilter?.("sortBy");
                        }}
                        className="text-sm text-orange-700 hover:text-orange-900 underline underline-offset-4 transition-colors"
                      >
                        پاک کردن همه
                      </button>
                    </div>
                  )}

                  {/* وضعیت جستجو */}
                  {isSearching && <LoadingSpinner />}

                  {/* تعداد نتایج */}
                  {!isSearching &&
                    values.q.trim() &&
                    displayResults.length > 0 && (
                      <div className="mb-4 mt-6 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900">
                          نتایج جستجو
                        </h2>
                        <span className="text-sm text-slate-500">
                          {displayResults.length} چالش یافت شد
                        </span>
                      </div>
                    )}

                  {/* لیست نتایج */}
                  {!isSearching && displayResults.length > 0 ? (
                    <div className="space-y-4 pb-8">
                      {displayResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenChallenge(item)}
                          className="cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleOpenChallenge(item);
                            }
                          }}
                        >
                          <ChallengeCard
                            {...item}
                            startDate={convertToJalali(item.start_date)}
                            endDate={convertToJalali(item.end_date)}
                            onClick={() => navigate(`/challenge/${item.id}`)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : !isSearching ? (
                    <EmptyState
                      hasFilters={hasAnyVisibleFilter}
                      searchQuery={values.q}
                      onClearSearch={() => setFieldValue("q", "")}
                    />
                  ) : null}
                </>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
