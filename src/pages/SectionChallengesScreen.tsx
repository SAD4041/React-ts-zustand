import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ChallengeCard from "@/components/Custom/ChallangeCard";
import { convertToJalali } from "@/components/Custom/ConvertToJalali";
import {
  getChallengesByTypeService,
  getChallengesByCategoryService,
  getPopularChallengesService,
  getPublicChallengesService,
} from "@/services/userService";

type SectionType =
  | "popular"
  | "near"
  | "followers"
  | "moreCreators"
  | "category";

type Challenge = {
  id: number | string;
  title: string;
  description?: string;
  coverImage?: string;
  creator?: { name: string };
  startDate?: string;
  endDate?: string;
  start_time?: string;
  end_time?: string;
  profiles?: any[];
  initialLikes?: number;
  initialComments?: number;
  isJoined?: boolean;
  isPrivate?: boolean;
};

// نگاشت دسته‌بندی‌ها
const CATEGORY_META: Record<string, { title: string }> = {
  health: { title: "سلامت" },
  fitness: { title: "تناسب اندام" },
  study: { title: "مطالعه" },
  finance: { title: "مالی" },
  mindfulness: { title: "آگاهی ذهنی" },
  lifestyle: { title: "سبک زندگی" },
  hobby: { title: "سرگرمی" },
  social: { title: "اجتماعی" },
};

const SECTION_META: Record<SectionType, { title: string }> = {
  popular: { title: "محبوب‌ترین چالش‌ها" },
  near: { title: "چالش‌های نزدیک" },
  followers: { title: "چالش‌های دنبال‌شوندگان" },
  category: { title: "چالش‌های دسته‌بندی" },
  moreCreators: { title: "برترین سازندگان" },
};

// تابع برای دریافت چالش‌ها بر اساس نوع
async function fetchChallenges(type: string): Promise<Challenge[]> {
  try {
    switch (type) {
      case "popular":
        return await getPopularChallengesService();

      case "near":
        // اگر سرویس مخصوص نزدیک دارید، از getChallengesByTypeService استفاده کنید
        // در غیر این صورت از public استفاده کنید
        return await getPublicChallengesService();

      case "followers":
        // اگر سرویس مخصوص دنبال‌شوندگان دارید
        return await getPublicChallengesService(); // جایگزین با سرویس واقعی

      case "moreCreators":
        // برای سازندگان - فعلاً چالش‌های عمومی نمایش داده می‌شود
        return await getPublicChallengesService();

      default:
        // اگر type نام دسته‌بندی باشد (مثل health, fitness)
        if (CATEGORY_META[type]) {
          return await getChallengesByCategoryService(type);
        }

        // به صورت پیش‌فرض چالش‌های عمومی
        return await getPublicChallengesService();
    }
  } catch (error) {
    console.error(`Error fetching challenges for ${type}:`, error);

    // در صورت خطا، داده‌های نمونه برگردانید
    return getSampleData(type);
  }
}

// تابع برای ایجاد داده‌های نمونه (در صورت خطا)
function getSampleData(type: string): Challenge[] {
  const typeTitles: Record<string, string> = {
    popular: "محبوب",
    near: "نزدیک",
    followers: "دنبال‌شونده",
    health: "سلامت",
    fitness: "تناسب اندام",
    study: "مطالعه",
    finance: "مالی",
    mindfulness: "ذهن آگاهی",
    lifestyle: "سبک زندگی",
    hobby: "سرگرمی",
    social: "اجتماعی",
    default: "چالش",
  };

  const titlePrefix = typeTitles[type] || typeTitles.default;

  return Array.from({ length: 8 }).map((_, i) => ({
    id: `${type}_${i + 1}`,
    title: `${titlePrefix} چالش ${i + 1}`,
    description: `این یک چالش ${titlePrefix} نمونه است.`,
    coverImage: `/images/sample-cover.jpg`,
    creator: { name: "کاربر نمونه" },
    start_time: "2024-01-15T08:00:00Z",
    end_time: "2024-02-15T23:59:59Z",
    profiles: [],
    initialLikes: Math.floor(Math.random() * 100) + 10,
    initialComments: Math.floor(Math.random() * 20) + 1,
    isJoined: i % 3 === 0,
    isPrivate: i % 4 === 0,
  }));
}

export default function SectionChallengesScreen() {
  const navigate = useNavigate();
  const { type, categoryId } = useParams<{
    type?: string;
    categoryId?: string;
  }>();

  const isCategory = !!categoryId;
  const sectionType = isCategory ? "category" : (type as SectionType);
  const title = useMemo(() => {
    if (isCategory && categoryId) {
      return CATEGORY_META[categoryId]?.title || "دسته‌بندی";
    }
    return SECTION_META[sectionType]?.title || "چالش‌ها";
  }, [sectionType, categoryId, isCategory]);

  const [items, setItems] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchType = isCategory ? categoryId! : type || "popular";
        const data = await fetchChallenges(fetchType);

        setItems(data || []);
      } catch (e) {
        console.error("Error fetching challenges:", e);
        setError("خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.");

        // نمایش داده‌های نمونه در صورت خطا
        const fetchType = isCategory ? categoryId! : type || "popular";
        setItems(getSampleData(fetchType));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sectionType, categoryId, type, isCategory]);

  const handleChallengeClick = (challenge: Challenge) => {
    ب;
    // ناوبری به صفحه جزئیات چالش
    navigate(`/challenge/${challenge.id}`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Header (Back button + Title) */}
      <div className="sticky top-0 z-10 bg-white px-4 pt-4 pb-3 shadow-sm">
        <div className="flex items-center justify-between" dir="ltr">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="grid h-12 w-12 place-items-center rounded-xl border-2 border-primary bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="بازگشت"
          >
            <ArrowLeft className="h-8 w-8" strokeWidth={2.5} />
          </button>

          {/* Title aligned to the right */}
          <div className="font-bold text-xl text-primary ml-auto text-right pr-2">
            {title}
          </div>
        </div>
      </div>

      {/* Content (Grid of Challenges) */}
      <div className="px-4 pb-8">
        {loading ? (
          <div className="py-10 text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-slate-600">در حال بارگذاری چالش‌ها...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-slate-500 text-sm">
              چالش‌های نمونه نمایش داده می‌شوند
            </p>
          </div>
        ) : items.length > 0 ? (
          <>
            <div className="mb-4 mt-2">
              <p className="text-slate-500 text-sm">
                {items.length} چالش یافت شد
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => handleChallengeClick(item)}
                >
                  <ChallengeCard
                    {...item}
                    startDate={convertToJalali(item.start_time)}
                    endDate={convertToJalali(item.end_time)}
                    onClick={() => navigate(`/challenge/${item.id}`)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="text-slate-400 mb-3">
              <svg
                className="h-16 w-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              چالشی یافت نشد
            </h3>
            <p className="text-slate-500">هیچ چالشی در این بخش وجود ندارد.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              بازگشت
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
