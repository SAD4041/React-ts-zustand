// src/components/productListing/ProductListing.tsx

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "./productListingComponents/ProductGrid";
import FilterSidebar from "./productListingComponents/FilterSidebar";
import SortOptions from "./productListingComponents/SortOptions";
import Pagination from "./productListingComponents/Pagination";
import { getData } from "@/services/services";
import type { Product as AdaptedProduct } from "@/types/productCardTypes";
import type { SortOption } from "@/types/productListingTypes";
import { toPersianDigits } from "@/utils/PersianDigits";
import SubCategorySlider from "./productListingComponents/SubCategorySilder";
import { categoryLabels, brandLabels } from "@/data/productListingData";
import { transformProducts } from "@/utils/transformproduct";
import LoadingSpinner from "../ui/LoadingSpinner";

const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const searchQuery = searchParams.get("q");

  const [products, setProducts] = useState<AdaptedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!listingType || !listingValue) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let endPoint = "";
    if (listingType === "category") {
      endPoint = `/api/product/CA/${listingValue}`;
    } else if (listingType === "brand") {
      endPoint = `/api/product/BR/${listingValue}`;
    } else if (listingType === "search") {
      endPoint = `/api/product/SE/${listingValue}`;
    } else {
      setError("پارامتر نامعتبر برای لیست محصولات");
      setLoading(false);
      return;
    }

    const fetchPromise = getData({
      endPoint,
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Accept: "*/*" },
    });

    fetchPromise
      .then((data) => {
        const adaptedProducts = transformProducts(Array.isArray(data) ? data : []);
        setProducts(adaptedProducts);
      })
      .catch((err) => {
        setError("خطا در دریافت محصولات");
        console.error(err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [listingType, listingValue]);

  const getDisplayName = () => {
    if (listingType === "search") return `جستجو: ${listingValue}`;
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
  }, [products, selectedBrands, selectedSizes, selectedColors]);

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
      (p) => p.discountedPrice >= priceRange.min && p.discountedPrice <= priceRange.max
    );
    if (currentSort) {
      result.sort((a, b) => {
        switch (currentSort) {
          case "newest":
            return b.id - a.id;
          case "cheapest":
            return a.discountedPrice - b.discountedPrice;
          case "expensive":
            return b.discountedPrice - a.discountedPrice;
          case "most-salled":
            return (b.sales || 0) - (a.sales || 0);
          default:
            return 0;
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
    return <LoadingSpinner />;
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
      <hr className="my-6 border-border border" />

      <div className="flex gap-6 mt-6">
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

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <SortOptions currentSort={currentSort} onSortChange={handleSortChange} />
            </div>
            <div className="text-sm text-muted-foreground">
              {toPersianDigits(filteredProductsCount.toLocaleString("fa-IR"))} محصول{" "}
              {getDisplayName()}
            </div>
          </div>

          <hr className="mb-4 border-border border" />

          <div className="h-150 overflow-y-auto border border-border rounded-lg p-4 bg-card shadow-sm">
            <ProductGrid products={productsToDisplay} />
          </div>

          <hr className="my-6 border-border border" />

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
