import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "./productListingComponents/ProductGrid";
import FilterSidebar from "./productListingComponents/FilterSidebar";
import SortOptions from "./productListingComponents/SortOptions";
import Pagination from "./productListingComponents/Pagination";
import type { Product } from "@/types/productListingTypes";
import type { SortOption } from "@/types/productListingTypes";
import { toPersianDigits } from "@/utils/PersianDigits";
import SubCategorySlider from "./productListingComponents/SubCategorySilder";
import { categoryLabels, brandLabels } from "@/data/productListingData";
import { getMockProducts } from "@/data/productList.mock";
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { sorts } from "@/data/productListingData";
import sortIcon from "@/assets/Group 63.png"
import filterIcon from "@/assets/Group 64.png"


const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const searchQuery = searchParams.get("q");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = getMockProducts();
        setProducts(data);
      } catch (err) {
        setError("خطا در بارگذاری محصولات");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  let listingType: "category" | "brand" | "search" | null = null;
  let listingValue = "";

  if (searchQuery) {
    listingType = "search";
    listingValue = searchQuery;
  } else if (category) {
    listingType = "category";
    listingValue = category;
  } else if (brand) {
    listingType = "brand";
    listingValue = brand;
  }

  const getDisplayName = () => {
    if (listingType === "search") return `جستجوی «${listingValue}»`;
    if (listingType === "brand") return brandLabels[listingValue] || listingValue;
    return categoryLabels[listingValue] || listingValue;
  };

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<SortOption>("most-revelent");
  const [currentGroup, setCurrentGroup] = useState(1);
  const productsPerGroup = 20;
  const pagesPerGroup = 10;

  const productsWithoutPriceFilter = useMemo(() => {
    let result = [...products];

    if (category && listingType === "category") {
      result = result.filter((p) => p.category === category);
    }

    if (brand && listingType === "brand") {
      result = result.filter((p) => p.model === brand);
    }

    if (searchQuery && listingType === "search") {
      const queryLower = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(queryLower) ||
          p.model.toLowerCase().includes(queryLower)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.model));
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
    category,
    brand,
    searchQuery,
    listingType,
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
          case "cheapest": return a.discountedPrice - b.discountedPrice;
          case "expensive": return b.discountedPrice - a.discountedPrice;
          case "most-salled": return (b.sales || 0) - (a.sales || 0);
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

  const handleBrandToggle = (name: string) => {
    setSelectedBrands((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
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
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: globalMaxPrice });
  };

  if (loading) {
    return (
      <div dir="rtl" className="container mx-auto px-4 py-12 text-center">
        در حال بارگذاری...
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
      <SubCategorySlider />

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

          <div
            className="md:hidden flex items-center gap-2 mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-4 text-sm mb-4 bg-secondary hover:bg-muted-foreground/30 border border-accent-foreground rounded">
                  <img
                    src={filterIcon}
                    alt="آیکون مرتب‌سازی"
                    className="w-4 h-4 object-cover ml-2 mr-2"
                  />
                  <button className="px-3 py-1 text-primary-foreground rounded-md text-sm">
                    مرتب سازی
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
                      const isChosenLabel = sort.label === "منتخب";
                      return (
                        <button
                          key={sort.value}
                          onClick={() => handleSortChange(sort.value as any)}
                          className={`
                            px-3 py-2 text-right rounded-md transition-colors text-sm
                            ${isActive
                              ? 'bg-primary text-white'
                              : isChosenLabel
                                ? 'text-primary bg-transparent'
                                : 'text-muted-foreground hover:text-primary bg-transparent hover:bg-muted'
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
                <div className="flex items-center space-x-4 text-sm mb-4 bg-secondary hover:bg-muted-foreground/30 border border-accent-foreground rounded">
                  <img
                    src={sortIcon}
                    alt="آیکون مرتب‌سازی"
                    className="w-5 h-5 object-cover ml-2 mr-1"
                  />
                  <button className="px-3 py-1 text-secondary-foreground rounded-md text-sm">
                    فیلتر ها
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent
                className="w-73 p-0 max-h-[90vh] overflow-y-auto"
                hideCloseButton={true}
                style={{ direction: 'rtl' }}
              >
                <DialogClose asChild>
                  <button className="absolute left-3 top-3 p-1 rounded-full hover:bg-border z-10">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </DialogClose>

                <div
                  dir="rtl">
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
