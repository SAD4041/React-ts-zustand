import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "./productListingComponents/ProductGrid";
import FilterSidebar from "./productListingComponents/FilterSidebar";
import SortOptions from "./productListingComponents/SortOptions";
import Pagination from "./productListingComponents/Pagination";
import type { Product, SortOption, ProductListingProps } from "@/types/productListingTypes";
import { toPersianDigits } from "@/utils/PersianDigits";
import SubCategorySlider from "./productListingComponents/SubCategorySilder";
import {
  categoryLabels,
  brandLabels,
  subCategoryLabels,
  modelStyleLabels,
  genderLabels,
  currentCategory,
} from "@/data/productListingData";
import { X } from "lucide-react";
import NavigationBar from "./productListingComponents/NavigationBar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { sorts } from "@/data/productListingData";
import sortIcon from "@/assets/Group 63.png";
import filterIcon from "@/assets/Group 64.png";
import { getData } from "@/services/services";

const ProductListing: React.FC<ProductListingProps> = ({
  category: categoryProp = null,
  brand: brandProp = null,
  subcategory: subCategoryProp = null,
  modelStyle: modelStyleProp = null,
  gender: genderProp = null,
}) => {
  const [searchParams] = useSearchParams();
  const category = categoryProp ?? searchParams.get("category");
  const brand = brandProp ?? searchParams.get("brand");
  const subCategory = subCategoryProp ?? searchParams.get("subcategory");
  const modelStyle = modelStyleProp ?? searchParams.get("modelStyle");
  const gender = genderProp ?? searchParams.get("gender");
  const searchQuery = searchParams.get("q");

  const normalizedCategory = category ?? null;
  const normalizedBrand = brand ? brand.toLowerCase() : null;
  const normalizedSubCategory = subCategory ?? null;
  const normalizedModelStyle = modelStyle ? modelStyle.toLowerCase() : null;
  const normalizedGender = gender ? gender.toLowerCase() : null;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() =>
    normalizedBrand ? [normalizedBrand] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<SortOption>("most-revelent");
  const [currentGroup, setCurrentGroup] = useState(1);
  const productsPerGroup = 20;
  const pagesPerGroup = 10;

  const resolveEndPoint = () => {
    if (searchQuery) return `/api/product/SE/${encodeURIComponent(searchQuery)}`;
    if (normalizedModelStyle) return `/api/product/CM/${encodeURIComponent(normalizedModelStyle)}`;
    if (normalizedBrand) return `/api/product/BR/${encodeURIComponent(normalizedBrand)}`;
    const chosenCategory = normalizedCategory || currentCategory;
    return `/api/product/CA/${encodeURIComponent(chosenCategory)}`;
  };

  const adaptProductFromApi = (apiProduct: any): Product => {
    const price = Number(apiProduct?.price ?? 0);
    const discount = 0; // فعلاً محصول تخفیف‌دار نداریم
    const hasDiscount = false;
    const discountedPrice = price;

    const colorsRaw = apiProduct?.color ?? [];
    const sizesRaw = apiProduct?.size ?? [];
    const categoryModel = apiProduct?.category_model ?? "";

    return {
      id: apiProduct?.id ?? apiProduct?._id ?? "",
      name: apiProduct?.name ?? "",
      model: apiProduct?.brand ?? "",
      brandSlug: (apiProduct?.brand || "").toLowerCase(),
      category: apiProduct?.category ?? "",
      subCategory: categoryModel || "",
      modelStyle: categoryModel || "",
      gender: apiProduct?.gender ?? "",
      image: apiProduct?.image ?? "",
      price,
      discount,
      hasDiscount,
      discountedPrice,
      rating: Number(apiProduct?.rating ?? 0),
      ratingCount: Number(apiProduct?.rating_count ?? 0),
      stock: Number(apiProduct?.inventory_count ?? 0),
      sales: Number(apiProduct?.sales ?? 0),
      colors: Array.isArray(colorsRaw)
        ? colorsRaw.map((c: any) =>
          typeof c === "string" ? { hex: c, label: c } : c
        )
        : [],
      sizes: Array.isArray(sizesRaw)
        ? sizesRaw.map((s: any) =>
          typeof s === "string" ? { label: s } : s
        )
        : [],
    };
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const endPoint = resolveEndPoint();
        const apiResponse = await getData({ endPoint, skipAuth: true });
        const apiProducts: any[] = Array.isArray(apiResponse)
          ? apiResponse
          : Array.isArray(apiResponse?.data)
            ? apiResponse.data
            : [];
        const adapted = apiProducts.map(adaptProductFromApi);
        setProducts(adapted);
      } catch (err) {
        setError("خطا در دریافت محصولات");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [normalizedBrand, normalizedCategory, normalizedModelStyle, searchQuery]);

  useEffect(() => {
    setSelectedBrands(normalizedBrand ? [normalizedBrand] : []);
  }, [normalizedBrand]);

  const productsWithoutPriceFilter = useMemo(() => {
    let result = [...products];

    if (normalizedCategory) {
      result = result.filter((p) => p.category === normalizedCategory);
    }

    if (normalizedSubCategory) {
      result = result.filter((p) => p.subCategory === normalizedSubCategory);
    }

    if (normalizedBrand) {
      result = result.filter(
        (p) => (p.brandSlug ?? p.model.toLowerCase()) === normalizedBrand
      );
    }

    if (normalizedModelStyle) {
      result = result.filter(
        (p) => (p.modelStyle ?? "").toLowerCase() === normalizedModelStyle
      );
    }

    if (normalizedGender) {
      result = result.filter(
        (p) => (p.gender ?? "").toLowerCase() === normalizedGender
      );
    }

    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(queryLower) ||
          p.model.toLowerCase().includes(queryLower)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.brandSlug ?? p.model.toLowerCase())
      );
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((sizeObj) => selectedSizes.includes(sizeObj.label))
      );
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((colorObj) => selectedColors.includes(colorObj.hex))
      );
    }

    return result;
  }, [
    products,
    normalizedCategory,
    normalizedBrand,
    normalizedSubCategory,
    normalizedModelStyle,
    normalizedGender,
    searchQuery,
    selectedBrands,
    selectedSizes,
    selectedColors,
  ]);

  const globalMaxPrice = useMemo(() => {
    if (productsWithoutPriceFilter.length === 0) return 100000;
    return Math.max(...productsWithoutPriceFilter.map((p) => p.discountedPrice));
  }, [productsWithoutPriceFilter]);

  const [priceRange, setPriceRange] = useState({ min: 0, max: globalMaxPrice });

  useEffect(() => {
    setPriceRange((prev) => ({ ...prev, max: globalMaxPrice }));
  }, [globalMaxPrice]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsWithoutPriceFilter];
    result = result.filter(
      (p) => Number(p.discountedPrice) >= priceRange.min && Number(p.discountedPrice) <= priceRange.max
    );
    if (currentSort) {
      result.sort((a, b) => {
        switch (currentSort) {
          case "newest": return Number(b.id) - Number(a.id);
          case "cheapest": return Number(a.discountedPrice) - Number(b.discountedPrice);
          case "expensive": return Number(b.discountedPrice) - Number(a.discountedPrice);
          case "most-salled": return (Number(b.sales) || 0) - (Number(a.sales) || 0);
          default: return 0;
        }
      });
    }
    return result;
  }, [productsWithoutPriceFilter, priceRange, currentSort]);

  const filteredProductsCount = filteredAndSortedProducts.length;
  const totalGroups = Math.max(1, Math.ceil(filteredAndSortedProducts.length / productsPerGroup));
  const startIndex = (currentGroup - 1) * productsPerGroup;
  const productsToDisplay = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerGroup);

  useEffect(() => {
    if (currentGroup > totalGroups) setCurrentGroup(1);
  }, [totalGroups, currentGroup]);

  const handleBrandToggle = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (code: string) => {
    setSelectedColors((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handlePriceChange = (range: { min: number; max: number }) => {
    setPriceRange(range);
  };

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
  };

  const handleClearFilters = () => {
    setSelectedBrands(normalizedBrand ? [normalizedBrand] : []);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: globalMaxPrice });
  };

  const getDisplayName = () => {
    const parts: string[] = [];
    // اولویت: اگر ساب‌کتگوری داریم همان به‌همراه کتگوری؛ در غیر این صورت کتگوری؛ وگرنه برند یا استایل
    if (normalizedSubCategory || normalizedCategory) {
      if (normalizedCategory) parts.push(categoryLabels[normalizedCategory] || normalizedCategory);
      if (normalizedSubCategory) parts.push(subCategoryLabels[normalizedSubCategory] || normalizedSubCategory);
    } else if (normalizedBrand) {
      parts.push(brandLabels[normalizedBrand] || normalizedBrand);
    } else if (normalizedModelStyle) {
      parts.push(modelStyleLabels[normalizedModelStyle] || normalizedModelStyle);
    }

    if (normalizedGender) parts.push(genderLabels[normalizedGender] || normalizedGender);
    if (searchQuery) parts.push(`جستجو "${searchQuery}"`);

    return parts.join(" ") || "محصولات";
  };

  if (loading) {
    return (
      <div dir="rtl" className="container mx-auto px-4 py-12 text-center">
        در حال دریافت محصولات...
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl" className="container mx-auto px-4 py-12 text-center text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div dir="rtl" className="container mx-auto px-4 py-6 font-vazir">
      <div className="-mx-4">
        <NavigationBar
          category={normalizedCategory}
          subCategory={normalizedSubCategory}
          brand={normalizedBrand}
          modelStyle={normalizedModelStyle}
          gender={normalizedGender}
          searchQuery={searchQuery}
        />
      </div>

      <SubCategorySlider category={normalizedCategory} />

      <hr className="my-6 border-border" />

      <div className="flex gap-6 mt-6">
        <div className="hidden md:block">
          <FilterSidebar
            selectedBrands={selectedBrands}
            selectedSizes={selectedSizes}
            selectedColors={selectedColors}
            priceRange={priceRange}
            globalMaxPrice={globalMaxPrice}
            onBrandToggle={handleBrandToggle}
            onSizeToggle={handleSizeToggle}
            onColorToggle={handleColorToggle}
            onPriceChange={handlePriceChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="flex-1">
          <div className="hidden md:flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <SortOptions currentSort={currentSort} onSortChange={handleSortChange} />
            </div>
            <div className="text-sm text-muted-foreground">
              {toPersianDigits(filteredProductsCount.toLocaleString("fa-IR"))} محصول در{" "}
              {getDisplayName()}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2 mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-4 text-sm mb-4 bg-muted-foreground/30 hover:bg-secondary border border-accent-foreground rounded">
                  <img
                    src={filterIcon}
                    alt="فیلتر محصولات"
                    className="w-4 h-4 object-cover ml-2 mr-2"
                  />
                  <button className="px-3 py-1 text-primary-foreground rounded-md text-sm">
                    فیلتر کردن
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent
                className="w-60 p-0 max-h-100 overflow-y-auto "
                hideCloseButton={true}
              >
                <DialogClose asChild>
                  <button className="absolute left-3 top-3 p-1 rounded-full hover:bg-border z-10">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </DialogClose>

                <div className="p-4">
                  <h3 className="font-bold text-right mb-3">مرتب‌سازی</h3>
                  <div className="flex flex-col gap-2">
                    {sorts.map(sort => {
                      const isActive = currentSort === sort.value;
                      const isChosenLabel = sort.label === "برگزیده";
                      return (
                        <button
                          key={sort.value}
                          onClick={() => handleSortChange(sort.value as any)}
                          className={`
                            px-3 py-2 text-right rounded-md transition-colors text-sm
                            ${isActive
                              ? "bg-primary text-white"
                              : isChosenLabel
                                ? "text-primary bg-transparent"
                                : "text-muted-foreground hover:text-primary bg-transparent hover:bg-muted"
                            }
              `}
                        >
                          {sort.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-4 text-sm mb-4 bg-muted-foreground/30 hover:bg-secondary border border-accent-foreground rounded">
                  <img
                    src={sortIcon}
                    alt="فیلتر محصولات"
                    className="w-5 h-5 object-cover ml-2 mr-1"
                  />
                  <button className="px-3 py-1 text-secondary-foreground rounded-md text-sm">
                    فیلترها
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent
                className="w-73 p-0 max-h-[90vh] overflow-y-auto"
                hideCloseButton={true}
                style={{ direction: "rtl" }}
              >
                <DialogClose asChild>
                  <button className="absolute left-3 top-3 p-1 rounded-full hover:bg-border z-10">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </DialogClose>

                <div dir="rtl">
                  <FilterSidebar
                    selectedBrands={selectedBrands}
                    selectedSizes={selectedSizes}
                    selectedColors={selectedColors}
                    priceRange={priceRange}
                    globalMaxPrice={globalMaxPrice}
                    onBrandToggle={handleBrandToggle}
                    onSizeToggle={handleSizeToggle}
                    onColorToggle={handleColorToggle}
                    onPriceChange={handlePriceChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <div className="grow"></div>

            <div className="text-sm text-muted-foreground">
              {toPersianDigits(filteredProductsCount.toLocaleString("fa-IR"))} محصول در{" "}
              {getDisplayName()}

            </div>
          </div>

          <hr className="mb-4 border-border" />

          <div className="h-150 overflow-y-auto border border-border rounded-lg p-4 bg-card shadow-sm">
            <ProductGrid products={productsToDisplay} />
          </div>

          <div className="mt-4 flex justify-center">
            <Pagination
              currentGroup={currentGroup}
              totalGroups={totalGroups}
              onGroupChange={setCurrentGroup}
              pagesPerGroup={pagesPerGroup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
