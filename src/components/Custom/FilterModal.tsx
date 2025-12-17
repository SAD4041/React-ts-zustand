import { useEffect, useMemo, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Formik, Form } from "formik";

import CustomBtn from "./CustomButton";
import CustomCheckbox from "./CustomCheckbox";
import { getChallengesByCategoryService} from "@/services/userService";
import type { Challenge } from "@/types/challengeTypes";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: { selectedCategory: string | null; sortBy: string }) => void;
  onFilteredChallenges?: (challenges: Challenge[]) => void; // اضافه شده
}

type SortKey = "newest" | "popular" | "trending" | "oldest";

type FilterFormValues = {
  selectedCategory: string | null;
  sort: Record<SortKey, boolean>;
};

export function FilterModal({ 
  isOpen, 
  onClose, 
  onApply,
  onFilteredChallenges 
}: FilterModalProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // اضافه شده

  // دریافت دسته‌بندی‌ها از API
  const [categories, setCategories] = useState([
    { id: "health", title: "سلامت" },
    { id: "fitness", title: "تناسب اندام" },
    { id: "study", title: "مطالعه" },
    { id: "finance", title: "مالی" },
    { id: "mindfulness", title: "آگاهی ذهنی" },
    { id: "lifestyle", title: "سبک زندگی" },
    { id: "hobby", title: "سرگرمی" },
    { id: "social", title: "اجتماعی" },
  ]);

  const sortOptions = useMemo(
    () => [
      { value: "newest" as const, label: "جدیدترین" },
      { value: "popular" as const, label: "محبوب‌ترین" },
      { value: "trending" as const, label: "پرطرفدار" },
      { value: "oldest" as const, label: "قدیمی‌ترین" },
    ],
    []
  );

  // انیمیشن باز/بسته شدن
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsBackdropVisible(true);
      setTimeout(() => setIsModalVisible(true), 50);
    } else {
      setIsModalVisible(false);
      setTimeout(() => {
        setIsBackdropVisible(false);
        document.body.style.overflow = "unset";
      }, 300);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // دریافت دسته‌بندی‌ها از API (اختیاری)
  /*
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // اگر API جداگانه برای دسته‌بندی‌ها دارید
        const response = await getData({ endPoint: "/api/v1/categories" });
        setCategories(response.data.map((cat: any) => ({
          id: cat.slug || cat.id,
          title: cat.name
        })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);
  */

  const initialValues: FilterFormValues = {
    selectedCategory: null,
    sort: {
      newest: true,
      popular: false,
      trending: false,
      oldest: false,
    },
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const getSortBy = (values: FilterFormValues): SortKey => {
    const found = (Object.entries(values.sort) as [SortKey, boolean][])
      .find(([, v]) => v === true)?.[0];
    return found ?? "newest";
  };

  const setOnlyOneSort = (
    setFieldValue: (field: string, value: any) => void,
    selected: SortKey
  ) => {
    sortOptions.forEach((opt) => {
      setFieldValue(`sort.${opt.value}`, opt.value === selected);
    });
  };

  // تابع اعمال فیلتر و دریافت داده‌ها از API
  const applyFiltersAndFetch = async (
    selectedCategory: string,
    sortBy: string
  ) => {
    setIsLoading(true);
    try {
      // دریافت چالش‌ها با فیلتر دسته‌بندی
      const challenges = await getChallengesByCategoryService(selectedCategory);
      console.log(challenges)
      
      // اعمال مرتب‌سازی روی داده‌های دریافتی
      const sortedChallenges = sortChallenges(challenges, sortBy);
      
      // ارسال داده‌های فیلتر شده به کامپوننت والد
      if (onFilteredChallenges) {
        onFilteredChallenges(sortedChallenges);
      }
      
      // اعمال فیلترها (برای log یا stateهای دیگر)
      if (onApply) {
        onApply({ selectedCategory, sortBy });
      }
      
      return sortedChallenges;
    } catch (error) {
      console.error("Error fetching filtered challenges:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // تابع مرتب‌سازی محلی (اگر API مرتب‌سازی ندارد)
  const sortChallenges = (challenges: Challenge[], sortBy: string): Challenge[] => {
    const sorted = [...challenges];
    
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "oldest":
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case "popular":
        return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case "trending":
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      default:
        return sorted;
    }
  };

  if (!isOpen && !isBackdropVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-300 ease-out ${
          isBackdropVisible
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[32px] shadow-2xl transform transition-all duration-300 ease-out ${
          isModalVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        {/* Header */}
        <div
          className="sticky top-0 bg-white flex items-center justify-between px-4 pt-6 pb-4 border-b border-slate-100 rounded-t-[32px] z-10"
          dir="rtl"
        >
          <h2 className="text-xl font-bold text-slate-900">فیلتر</h2>
          <button
            onClick={handleClose}
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100 transition-all duration-200 active:scale-95"
            aria-label="بستن"
            disabled={isLoading}
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            const sortBy = getSortBy(values);
            
            // اعمال فیلتر و دریافت داده‌ها
            await applyFiltersAndFetch(values.selectedCategory, sortBy);
            
            setIsCategoryOpen(false);
            handleClose();
          }}
        >
          {({ values, setFieldValue, resetForm, isSubmitting }) => {
            const selectedCategoryTitle = values.selectedCategory
              ? categories.find((c) => c.id === values.selectedCategory)?.title
              : null;

            return (
              <Form>
                {/* Content */}
                <div className="px-4 py-4 max-h-[55vh] overflow-y-auto" dir="rtl">
                  {/* دسته‌بندی */}
                  <div
                    className="mb-6 transition-all duration-300 delay-75"
                    style={{
                      opacity: isModalVisible ? 1 : 0,
                      transform: isModalVisible ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    <h3 className="text-base font-bold text-slate-900 mb-4">
                      دسته‌بندی
                    </h3>

                    {/* دراپ‌داون هدر */}
                    <button
                      type="button"
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="w-full mb-10 px-4 py-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 font-medium text-sm flex items-center justify-between hover:border-primary transition-all duration-200 active:scale-[0.98]"
                      disabled={isLoading}
                    >
                      <span className="text-slate-800">
                        {selectedCategoryTitle ?? "همه دسته‌بندی‌ها"}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                          isCategoryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* محتوای دراپ‌داون */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isCategoryOpen
                          ? "mt-3 max-h-48 opacity-100"
                          : "mt-0 max-h-0 opacity-0"
                      }`}
                    >
                      <div className="rounded-2xl border-2 border-slate-200 overflow-hidden">
                        <div className="max-h-48 overflow-y-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue("selectedCategory", null);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full px-4 py-3.5 text-right text-sm font-medium border-b border-slate-100 transition-colors duration-200 ${
                              !values.selectedCategory
                                ? "bg-primary/20 text-primary"
                                : "bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                            disabled={isLoading}
                          >
                            همه دسته‌بندی‌ها
                          </button>

                          {categories.map((cat, index) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => {
                                setFieldValue("selectedCategory", cat.id);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full px-4 py-3.5 text-right text-sm font-medium border-b border-slate-100 last:border-b-0 transition-colors duration-200 ${
                                values.selectedCategory === cat.id
                                  ? "bg-primary/20 text-primary"
                                  : "bg-white text-slate-700 hover:bg-slate-50"
                              }`}
                              style={{
                                transitionDelay: isCategoryOpen ? `${index * 30}ms` : "0ms",
                              }}
                              disabled={isLoading}
                            >
                              {cat.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* نمایش وضعیت لودینگ */}
                  {isLoading && (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <p className="text-sm text-slate-600 mt-2">در حال دریافت داده‌ها...</p>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div
                  className="sticky bottom-0 bg-white px-4 py-4 border-t border-slate-100 flex justify-between transition-all duration-300 delay-300
                  mb-20"
                >
                  <CustomBtn
                    type="button"
                    onClick={() => {
                      resetForm();
                      setIsCategoryOpen(false);
                    }}
                    className="bg-secondary"
                    disabled={isLoading}
                  >
                    پاک کردن
                  </CustomBtn>

                  <CustomBtn 
                    type="submit" 
                    className="!bg-primary !text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "در حال اعمال..." : "اعمال فیلتر"}
                  </CustomBtn>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}