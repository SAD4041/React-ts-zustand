
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrandProfile, getBrandProducts } from '@/services/brandProfile';

import ProductCard from '../Product/ProductCard';
import LoadingSpinner from "../Custom/LoadingSpinner";

const BestSell = () => {
    const { brandId, brandName } = useParams<{ brandId: string; brandName: string }>();
    const [brandData, setBrandData] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const brand = await getBrandProfile(brandId, brandName);
                setBrandData(brand);
            } catch (error) {
                console.error("Error fetching brand data:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const prods = await getBrandProducts(brandId, brandName);
                setProducts(prods);
            } catch (error) {
                console.error("Error fetching brand products:", error);
            }
        };

        if (brandId) {
            Promise.all([fetchBrandData(), fetchProducts()]).finally(() => setLoading(false));
        }
    }, [brandId, brandName]);

    if (loading) return <LoadingSpinner />;

    if (!brandData) return <div>.داده‌ای یافت نشد</div>;

    return (
        <div className="mt-[100px] mx-[150px] p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white">
            <div className='flex'>
                <div className="items-start my-3 mx-7">
                    <div className="mb-4 w-25 bg-white text-red-500 text-l font-bold px-2 py-2 rounded-full">
                        فروش ویژه!
                    </div>
                    <div className="my-4 text-xl font-bold">{brandData.promotion.title}</div>
                    <div className="my-4 text-2xl mt-1">{brandData.promotion.subtitle}</div>
                </div>

                <div className="relative mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {products.map((product) => (
                            <div key={product.id} className="inline-block mx-3 cursor-pointer">
                                <a href=''><ProductCard product={product} /></a>
                                {/* change it to product detail */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <a href='/'>
                {/* change it to brand's products offer */}
                <button className="w-3/4 mt-3 mx-auto block bg-white text-red-500 font-medium py-2 rounded-md hover:bg-gray-100 transition-colors text-center cursor-pointer">
                    مشاهده محصولات
                </button>
            </a>
        </div>
    )
}

export default BestSell;