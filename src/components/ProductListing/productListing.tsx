import React, { useState, useMemo, useEffect } from "react";
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
import { fetchAllProducts } from "@/services/productListingService";
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type FetchMode = "category" | "brand" | "search" | "style";

const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const searchQuery = searchParams.get("q");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAllProducts();
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
        {/* FilterSidebar - فقط در md+ */}
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
          {/* SortOptions - فقط در md+ */}
          <div className="hidden md:flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <SortOptions currentSort={currentSort} onSortChange={handleSortChange} />
            </div>
            <div className="text-sm text-muted-foreground">
              {toPersianDigits(filteredProductsCount.toLocaleString("fa-IR"))} محصول در{" "}
              {getDisplayName()}
            </div>
          </div>

          {/* دکمه‌های موبایل - فقط در sm- */}
          <div className="md:hidden flex items-center justify-end gap-2 mb-4">
            {/* دکمه مرتب سازی */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">
                  مرتب سازی
                </button>
              </DialogTrigger>
              <DialogContent className="w-60 p-0 max-h-[80vh] overflow-y-auto">
                <DialogClose asChild>
                  <button
                    className="absolute left-3 top-3 p-1 rounded-full hover:bg-border z-10"
                    aria-label="بستن"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </DialogClose>
                <div className="p-4 pb-2 text-right">
                  <h3 className="font-bold text-foreground">مرتب‌سازی بر اساس:</h3>
                </div>

                {/* گزینه‌های مرتب‌سازی */}
                <div className="px-4 pb-4">
                  <SortOptions currentSort={currentSort} onSortChange={handleSortChange} />
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  فیلتر ها
                </button>
              </DialogTrigger>


              <DialogContent
                className={`
                  w-73 p-0 max-h-[90vh] overflow-y-auto
                  fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bottom-auto
                  rounded-lg
                  flex flex-col
                `}
                dir="rtl"
              >

                <DialogClose asChild>
                  <button
                    className="absolute left-3 top-3 p-1 rounded-full hover:bg-border z-10"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </DialogClose>

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
              </DialogContent>
            </Dialog>

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