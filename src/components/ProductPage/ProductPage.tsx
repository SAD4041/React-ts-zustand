// src/pages/ProductPage.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StarIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, CheckIcon, RepeatIcon, ShieldIcon, MessageSquareIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';

// Mock Data
const mockProduct = {
    id: 1,
    name: "Ù¾ÛŒØ±Ø§Ù‡Ù† Ø¨Ù‡Ø§Ø±Ù‡ Ø¢Ø³ØªÛŒÙ† Ø¨Ù„Ù†Ø¯",
    images: [
        "https://via.placeholder.com/600x800?text=Image+1",
        "https://via.placeholder.com/600x800?text=Image+2",
        "https://via.placeholder.com/600x800?text=Image+3",
        "https://via.placeholder.com/600x800?text=Image+4"
    ],
    brand: {
        name: "Ø¨Ø±Ù†Ø¯ Ù…Ø¯Ø¢ÙˆØ±Ø§Ù†",
        logo: "https://via.placeholder.com/50x50?text=Brand",
        isOfficial: true,
        description: "Ù…Ø¯ Ø§Ù…Ø±ÙˆØ²ØŒ Ø³Ø¨Ú© ÙØ±Ø¯Ø§"
    },
    price: 850000,
    originalPrice: 1200000,
    discountPercent: 29,
    discountEndsIn: "23:45:34", // This will be dynamic in real app
    rating: 4.8,
    reviewsCount: 148,
    questionsCount: 18,
    stock: 15,
    colors: [
        { id: 1, name: "Ø³Ø¨Ø²", hex: "#008000" },
        { id: 2, name: "Ø¢Ø¨ÛŒ", hex: "#0000FF" },
        { id: 3, name: "Ù…Ø´Ú©ÛŒ", hex: "#000000" }
    ],
    sizes: ["XXXL","XXL", "XL", "L", "M", "S"],
    features: [
        "Ù¾Ø§Ø±Ú†Ù‡ Ú©ØªØ§Ù† Û±Û°Û°Ùª Ø·Ø¨ÛŒØ¹ÛŒ Ùˆ Ø§Ø±Ú¯Ø§Ù†ÛŒÚ©",
        "Ù…Ù‚Ø§ÙˆÙ… Ø¯Ø± Ø¨Ø±Ø§Ø¨Ø± Ú†Ø±ÙˆÚ© Ùˆ Ù¾Ø§Ø±Ú¯ÛŒ",
        "Ø¯ÙˆØ®Øª ØªÙ…ÛŒØ² Ùˆ Ø­Ø±ÙÙ‡â€ŒØ§ÛŒ",
        "Ø¶Ø¯ Ø¨Ø§Ú©ØªØ±ÛŒ Ùˆ Ø¶Ø¯ Ø¨Ùˆ",
        "ØªÙ†ÙØ³â€ŒÙ¾Ø°ÛŒØ±ÛŒ Ø¹Ø§Ù„ÛŒ Ø¨Ø±Ø§ÛŒ ÙØµÙ„ Ú¯Ø±Ù…",
        "Ù‚Ø§Ø¨Ù„ Ø´Ø³ØªØ´Ùˆ Ø¯Ø± Ù…Ø§Ø´ÛŒÙ† Ù„Ø¨Ø§Ø³Ø´ÙˆÛŒÛŒ"
    ],
    specifications: {
        fabric: "Ú©ØªØ§Ù† Û±Û°Û°Ùª Ø·Ø¨ÛŒØ¹ÛŒ",
        country: "Ø§ÛŒØ±Ø§Ù†",
        collar: "ÛŒÙ‚Ù‡ Ø¨Ø±Ú¯Ø±Ø¯Ø§Ù†",
        sleeve: "Ø¢Ø³ØªÛŒÙ† Ø¨Ù„Ù†Ø¯",
        pattern: "Ø³Ø§Ø¯Ù‡ ØªÚ© Ø±Ù†Ú¯",
        season: "Ø¨Ù‡Ø§Ø± Ùˆ ØªØ§Ø¨Ø³ØªØ§Ù†"
    },
    relatedProducts: [
        { id: 2, name: "CATWAREHOUSE Bussiness Not Boomin Ù…Ø¯Ù„", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+1", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 3, name: "CATWAREHOUSE Bussiness Not Boomin Ù…Ø¯Ù„", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+2", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 4, name: "CATWAREHOUSE Bussiness Not Boomin Ù…Ø¯Ù„", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+3", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 5, name: "CATWAREHOUSE Bussiness Not Boomin Ù…Ø¯Ù„", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+4", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 6, name: "CATWAREHOUSE Bussiness Not Boomin Ù…Ø¯Ù„", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+5", colors: ["#FF6B6B", "#008000", "#000000"] },
    ],
    reviews: [
        {
            id: 1,
            user: "Ø§ÛŒÙ„ÛŒØ§ Ù…ÙˆØ³ÙˆÛŒ",
            avatar: "https://via.placeholder.com/40x40?text=U1",
            rating: 5,
            text: "Ú©ÛŒÙÛŒØª Ù…Ø­ØµÙˆÙ„Ø§Øª Ø§ÛŒÙ† Ø¨Ø±Ù†Ø¯ ÙˆØ§Ù‚Ø¹Ø§Ù‹ Ø¹Ø§Ù„ÛŒÙ‡. Ù¾Ø§Ø±Ú†Ù‡â€ŒÙ‡Ø§ Ù…Ø±ØºÙˆØ¨ Ù‡Ø³ØªÙ†Ø¯ Ùˆ Ø¯ÙˆØ®Øª Ù…Ø­ØµÙˆÙ„Ø§Øª Ø¨Ø³ÛŒØ§Ø± ØªÙ…ÛŒØ² Ùˆ Ø­Ø±ÙÙ‡â€ŒØ§ÛŒ Ø§Ø³Øª.",
            helpful: 29,
            notHelpful: 2
        },
        {
            id: 2,
            user: "Ø±ÛŒØ­Ø§Ù†Ù‡ Ú©Ø±Ø¯Ú¯Ø§Ø±ÛŒ",
            avatar: "https://via.placeholder.com/40x40?text=U2",
            rating: 5,
            text: "Ø¨Ø³ØªÙ‡â€ŒØ¨Ù†Ø¯ÛŒ Ù…Ø­ØµÙˆÙ„Ø§Øª Ø®ÛŒÙ„ÛŒ Ø´ÛŒÚ© Ø¨ÙˆØ¯ Ùˆ Ø§Ø±Ø³Ø§Ù„ Ù‡Ù… Ø³Ø±ÛŒØ¹ Ø§Ù†Ø¬Ø§Ù… Ø´Ø¯. Ù…Ø§Ù†ØªÙˆÛŒ Ú©Ù‡ Ø®Ø±ÛŒØ¯Ù… Ø¯Ù‚ÛŒÙ‚Ø§Ù‹ Ù…Ø·Ø§Ø¨Ù‚ ØªØµÙˆÛŒØ± Ø¨ÙˆØ¯.",
            helpful: 36,
            notHelpful: 1
        }
    ],
    questions: [
        {
            id: 1,
            user: "Ø´Ù…Ø§",
            question: "Ø¢ÛŒØ§ Ø§ÛŒÙ† Ù¾ÛŒØ±Ø§Ù‡Ù† Ø¢Ø¨ Ù…ÛŒâ€ŒØ±ÙˆØ¯ØŸ",
            answer: "Ø®ÛŒØ±ØŒ Ø§ÛŒÙ† Ù…Ø­ØµÙˆÙ„ Ø¨Ø§ Ù¾Ø§Ø±Ú†Ù‡ Ú©ØªØ§Ù† Ù…Ø±ØºÙˆØ¨ Ùˆ Ø±Ù†Ú¯ Ø«Ø§Ø¨Øª ØªÙˆÙ„ÛŒØ¯ Ø´Ø¯Ù‡ Ùˆ Ø¢Ø¨ Ù†Ù…ÛŒâ€ŒØ±ÙˆØ¯.",
            answeredBy: "Ù¾Ø§Ø³Ø® ÙØ±ÙˆØ´Ù†Ø¯Ù‡",
            daysAgo: 3
        },
        {
            id: 2,
            user: "Ø´Ù…Ø§",
            question: "Ø¨Ø±Ø§ÛŒ Ù‚Ø¯ Û±Û¸Û° Ø³Ø§Ù†ØªÛŒ Ù…ØªØ± Ú†Ù‡ Ø³Ø§ÛŒØ²ÛŒ Ù…Ù†Ø§Ø³Ø¨ Ø§Ø³ØªØŸ",
            answer: "Ø¨Ø±Ø§ÛŒ Ù‚Ø¯ Û±Û¸Û° Ø³Ø§Ù†ØªÛŒ Ù…ØªØ±ØŒ Ø³Ø§ÛŒØ² XL ÛŒØ§ L ØªÙˆØµÛŒÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯. Ø¨Ù‡ØªØ± Ø§Ø³Øª Ø¬Ø¯ÙˆÙ„ Ø³Ø§ÛŒØ² Ø±Ø§ Ø¨Ø±Ø±Ø³ÛŒ Ú©Ù†ÛŒØ¯.",
            answeredBy: "Ù¾Ø§Ø³Ø® ÙØ±ÙˆØ´Ù†Ø¯Ù‡",
            daysAgo: 1
        }
    ]
};

// Custom Star Rating Component
const StarRating: React.FC<{
    value: number;
    onChange: (value: number) => void;
}> = ({ value, onChange }) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const handleClick = (newValue: number) => {
        onChange(newValue);
    };

    const handleMouseEnter = (newValue: number) => {
        setHoverValue(newValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(null);
    };

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = hoverValue ? star <= hoverValue : star <= value;
                return (
                    <StarIcon
                        key={star}
                        className={`w-6 h-6 cursor-pointer transition-colors ${filled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                            }`}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                    />
                );
            })}
        </div>
    );
};

// Product Image Gallery Component
const ProductImageGallery: React.FC<{
    images: string[];
}> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const selectImage = (index: number) => {
        setCurrentIndex(index);
    };

    const thumbnailImages = images.slice(0, 4);

    return (
        <div className="space-y-4">
            <div className="relative w-[500px] h-[500px] bg-gray-100 rounded-xl overflow-hidden mx-auto">
                <img
                    src={images[currentIndex]}
                    alt={`Product Image ${currentIndex + 1}`}
                    className="w-full h-full object-contain"
                />
                <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
            </div>
            <div className="flex gap-[10px] overflow-x-auto justify-center">
                {thumbnailImages.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`w-[90px] h-[90px] rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index ? 'border-pink-500' : 'border-gray-200'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

// Product Details Component
const ProductDetails: React.FC<{
    product: typeof mockProduct;
}> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'questions'>('description');

    const handleAddToCart = () => {
        alert(`Ù…Ø­ØµÙˆÙ„ ${product.name} Ø¨Ø§ ØªØ¹Ø¯Ø§Ø¯ ${quantity} Ø¨Ù‡ Ø³Ø¨Ø¯ Ø®Ø±ÛŒØ¯ Ø§Ø¶Ø§ÙÙ‡ Ø´Ø¯.`);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-full w-[720px] mx-auto">
            {/* Header with Favorite */}
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-100' : 'text-gray-500 hover:text-red-500'
                        }`}
                >
                    <HeartIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Product Image Gallery */}
            <ProductImageGallery images={product.images} />

            {/* Brand Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full w-[720px] mx-auto">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">B</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{product.brand.name}</span>
                            {product.brand.isOfficial && (
                                <Badge variant="secondary" className="bg-pink-500 text-white">Ø¨Ø±Ù†Ø¯ Ø±Ø³Ù…ÛŒ</Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">{product.brand.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{product.rating}</span>
                        <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span>Ø§Ù…ØªÛŒØ§Ø²</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{product.reviewsCount}</span>
                        <span>Ø¯Ù†Ø¨Ø§Ù„ Ú©Ù†Ù†Ø¯Ù‡</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{product.stock}</span>
                        <span>ÙØ±ÙˆØ´</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={toggleFollow}>
                        {isFollowing ? 'Ø¯Ù†Ø¨Ø§Ù„ Ù…ÛŒâ€ŒÚ©Ù†ÛŒØ¯' : 'Ø¯Ù†Ø¨Ø§Ù„ Ú©Ø±Ø¯Ù†'}
                    </Button>
                </div>
            </div>

            {/* Discount Banner */}
            {product.discountPercent > 0 && (
                <div className="mt-4 p-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg text-white w-full max-w-[720px] mx-auto">
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-white/30 text-white">ØªØ®ÙÛŒÙ {product.discountPercent}%</Badge>
                        <div className="flex items-center gap-2">
                            <span>Ù¾ÛŒØ´Ù†Ù‡Ø§Ø¯ ÙˆÛŒÚ˜Ù‡ Ù…Ø­Ø¯ÙˆØ¯</span>
                            <ClockIcon className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-2 text-xl font-bold">{product.discountEndsIn}</div>
                    <div className="mt-1 text-sm">ØªØ§ Ù¾Ø§ÛŒØ§Ù† ØªØ®ÙÛŒÙ Ø¨Ø§Ù‚ÛŒ Ù…Ø§Ù†Ø¯Ù‡ ...</div>
                </div>
            )}

            {/* Price Section */}
            <div className="mt-6 w-full w-[720px] mx-auto">
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-pink-600">{product.price.toLocaleString()} ØªÙˆÙ…Ø§Ù†</span>
                    {product.originalPrice > product.price && (
                        <span className="text-gray-500 line-through">{product.originalPrice.toLocaleString()} ØªÙˆÙ…Ø§Ù†</span>
                    )}
                </div>
                {product.originalPrice > product.price && (
                    <div className="mt-1 text-green-600 text-sm">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% ØªØ®ÙÛŒÙ Ø´Ù…Ø§
                    </div>
                )}
                <div className="mt-4 w-full bg-gray-300 h-2 rounded-full">
                    <div
                        className="bg-black h-full rounded-full"
                        style={{ width: `${(product.stock / 100) * 100}%` }}
                    ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">ÙÙ‚Ø· {product.stock} Ø¹Ø¯Ø¯ Ø¨Ø§Ù‚ÛŒ Ù…Ø§Ù†Ø¯Ù‡!</div>
            </div>

            {/* Selection Options */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full w-[720px] mx-auto">
                <div>
                    <Label className="block mb-2">Ø±Ù†Ú¯: Ø³ÙÛŒØ¯</Label>
                    <div className="flex gap-2">
                        {product.colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setSelectedColor(color.id)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.id ? 'border-black' : 'border-gray-300'
                                    }`}
                                style={{ backgroundColor: color.hex }}
                            ></button>
                        ))}
                        <button
                            onClick={() => setSelectedColor(null)}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === null ? 'border-black' : 'border-gray-300'
                                }`}
                        >
                            <CheckIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div>
                    <Label className="block mb-2">Ø§Ù†ØªØ®Ø§Ø¨ Ø³Ø§ÛŒØ²</Label>
                    <div className="flex gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 border rounded-md transition-all ${selectedSize === size ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <Label className="block mb-2">ØªØ¹Ø¯Ø§Ø¯</Label>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                            -
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                            +
                        </Button>
                    </div>
                </div>
            </div>

            {/* Add to Cart Button */}
            <Button
                className="mt-6 w-full max-w-[720px] mx-auto bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white"
                onClick={handleAddToCart}
            >
                <ShoppingCartIcon className="ml-2 w-5 h-5" />
                Ø§ÙØ²ÙˆØ¯Ù† Ø¨Ù‡ Ø³Ø¨Ø¯ Ø®Ø±ÛŒØ¯
            </Button>

            {/* Trust Icons */}
            <div className="mt-6 flex justify-around w-full w-[720px] mx-auto">
                <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm">Ù¾Ø±Ø¯Ø§Ø®Øª Ø§Ù…Ù†</div>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <RepeatIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-sm">Ø¨Ø§Ø²Ú¯Ø´Øª Ø¢Ø³Ø§Ù†</div>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <ShieldIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-sm">ØªØ¶Ù…ÛŒÙ† Ø§ØµØ§Ù„Øª</div>
                </div>
            </div>
        </div>
    );
};

// Tabs Component for Description, Specifications, Reviews, Questions
const ProductTabs: React.FC<{
    product: typeof mockProduct;
}> = ({ product }) => {
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'questions'>('description');
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [questionText, setQuestionText] = useState('');

    const submitReview = () => {
        if (reviewRating === 0 || reviewText.trim() === '') {
            alert('Ù„Ø·ÙØ§Ù‹ Ø§Ù…ØªÛŒØ§Ø² Ùˆ Ù†Ø¸Ø± Ø®ÙˆØ¯ Ø±Ø§ ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯.');
            return;
        }
        alert('Ù†Ø¸Ø± Ø´Ù…Ø§ Ø¨Ø§ Ù…ÙˆÙÙ‚ÛŒØª Ø«Ø¨Øª Ø´Ø¯.');
        setReviewRating(0);
        setReviewText('');
    };

    const submitQuestion = () => {
        if (questionText.trim() === '') {
            alert('Ù„Ø·ÙØ§Ù‹ Ø³ÙˆØ§Ù„ Ø®ÙˆØ¯ Ø±Ø§ ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯.');
            return;
        }
        alert('Ø³ÙˆØ§Ù„ Ø´Ù…Ø§ Ø¨Ø§ Ù…ÙˆÙÙ‚ÛŒØª Ø«Ø¨Øª Ø´Ø¯.');
        setQuestionText('');
    };

    return (
        <div className="mt-6 bg-white rounded-xl shadow-md mx-auto w-full w-[720px]">
            <div className="border-b">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'description'
                                ? 'bg-blue-100 text-blue-800 border-b-2 border-blue-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        ØªÙˆØ¶ÛŒØ­Ø§Øª
                    </button>
                    <button
                        onClick={() => setActiveTab('specifications')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'specifications'
                                ? 'bg-orange-100 text-orange-800 border-b-2 border-orange-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Ù…Ø´Ø®ØµØ§Øª
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'reviews'
                                ? 'bg-green-100 text-green-800 border-b-2 border-green-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Ù†Ø¸Ø±Ø§Øª ({product.reviewsCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('questions')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'questions'
                                ? 'bg-purple-100 text-purple-800 border-b-2 border-purple-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        Ù¾Ø±Ø³Ø´ Ùˆ Ù¾Ø§Ø³Ø® ({product.questionsCount})
                    </button>
                </div>
            </div>

            <div className="p-6">
                {activeTab === 'description' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Ø¯Ø±Ø¨Ø§Ø±Ù‡ Ø§ÛŒÙ† Ù…Ø­ØµÙˆÙ„</h2>
                        <p className="mb-6">
                            Ø§ÛŒÙ† Ù¾ÛŒØ±Ø§Ù‡Ù† Ú©ØªØ§Ù† Ø¨Ø§ Ø·Ø±Ø§Ø­ÛŒ Ù…ÛŒÙ†ÛŒÙ…Ø§Ù„ Ùˆ Ù…Ø¯Ø±Ù†ØŒ Ø§Ù†ØªØ®Ø§Ø¨ÛŒ Ø¹Ø§Ù„ÛŒ Ø¨Ø±Ø§ÛŒ Ø§Ø³ØªØ§ÛŒÙ„ Ø±ÙˆØ²Ù…Ø±Ù‡ Ø´Ù…Ø§Ø³Øª. Ù¾Ø§Ø±Ú†Ù‡ Ú©ØªØ§Ù† Ø¨Ø§ Ú©ÛŒÙÛŒØª Ø¨Ø§Ù„Ø§ØŒ Ù†Ø±Ù… Ùˆ Ø±Ø§Ø­ØªÛŒ ÙÙˆÙ‚â€ŒØ§Ù„Ø¹Ø§Ø¯Ù‡â€ŒØ§ÛŒ Ø±Ø§ Ø¨Ù‡ Ø´Ù…Ø§ Ù‡Ø¯ÛŒÙ‡ Ù…ÛŒâ€ŒØ¯Ù‡Ø¯. Ù…Ù†Ø§Ø³Ø¨ Ø¨Ø±Ø§ÛŒ ÙØµÙ„ Ø¨Ù‡Ø§Ø± Ùˆ ØªØ§Ø¨Ø³ØªØ§Ù†.
                        </p>
                        <h3 className="text-lg font-semibold mb-3">ÙˆÛŒÚ˜Ú¯ÛŒâ€ŒÙ‡Ø§ÛŒ Ø¨Ø±Ø¬Ø³ØªÙ‡</h3>
                        <ul className="space-y-2">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'specifications' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Ù…Ø´Ø®ØµØ§Øª ÙÙ†ÛŒ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">Ø¬Ù†Ø³ Ù¾Ø§Ø±Ú†Ù‡</div>
                                <div>{product.specifications.fabric}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">Ú©Ø´ÙˆØ± Ø³Ø§Ø²Ù†Ø¯Ù‡</div>
                                <div>{product.specifications.country}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">Ù†ÙˆØ¹ ÛŒÙ‚Ù‡</div>
                                <div>{product.specifications.collar}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">Ù†ÙˆØ¹ Ø§Ø³ØªÛŒÙ†</div>
                                <div>{product.specifications.sleeve}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">Ø§Ù„Ú¯Ùˆ</div>
                                <div>{product.specifications.pattern}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">ÙØµÙ„ Ù…Ù†Ø§Ø³Ø¨</div>
                                <div>{product.specifications.season}</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Ù†Ø¸Ø±Ø§Øª Ù…Ø´ØªØ±ÛŒØ§Ù†</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-2xl font-bold">{product.rating}</div>
                            <div className="flex items-center gap-1">
                                <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span>Ø§Ø² {product.reviewsCount} Ù†Ø¸Ø±</span>
                            </div>
                        </div>

                        {/* Write Review */}
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <span>Ø´Ù…Ø§</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <StarRating value={reviewRating} onChange={setReviewRating} />
                                </div>
                                <Input
                                    name="reviewText"
                                    placeholder="...Ù†Ø¸Ø± Ø®ÙˆØ¯ Ø±Ø§ Ø«Ø¨Øª Ú©Ù†ÛŒØ¯"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    className="mb-4"
                                />
                                <Button onClick={submitReview}>Ø«Ø¨Øª Ù†Ø¸Ø± Ø¬Ø¯ÛŒØ¯</Button>
                            </CardContent>
                        </Card>

                        {/* Reviews List */}
                        {product.reviews.map((review) => (
                            <Card key={review.id} className="mb-4">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <span>{review.user}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon
                                                key={star}
                                                className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4">{review.text}</p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                                            <ThumbsUpIcon className="w-4 h-4" /> Ù…ÙÛŒØ¯ Ø¨ÙˆØ¯ ({review.helpful})
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                                            <ThumbsDownIcon className="w-4 h-4" /> Ù…ÙÛŒØ¯ Ù†Ø¨ÙˆØ¯ ({review.notHelpful})
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Button variant="outline" className="w-full">Ù…Ø´Ø§Ù‡Ø¯Ù‡ Ù†Ø¸Ø±Ø§Øª Ø¨ÛŒØ´ØªØ±</Button>
                    </div>
                )}

                {activeTab === 'questions' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Ù¾Ø±Ø³Ø´ Ùˆ Ù¾Ø§Ø³Ø®</h2>

                        {/* Ask Question */}
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <span>Ø´Ù…Ø§</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    name="questionText"
                                    placeholder="...Ø³ÙˆØ§Ù„ Ø®ÙˆØ¯ Ø±Ø§ Ø¨Ù¾Ø±Ø³ÛŒØ¯"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    className="mb-4"
                                />
                                <Button onClick={submitQuestion}>Ø«Ø¨Øª Ù¾Ø±Ø³Ø´ Ø¬Ø¯ÛŒØ¯</Button>
                            </CardContent>
                        </Card>

                        {/* Questions List */}
                        {product.questions.map((q) => (
                            <Card key={q.id} className="mb-4 bg-green-50">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <MessageSquareIcon className="w-5 h-5 text-green-600" />
                                        <span>{q.question}</span>
                                    </div>
                                    <div className="text-xs text-green-600 mt-1">Ù¾ÛŒØ´ {q.daysAgo} Ø±ÙˆØ²</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                            <span className="text-green-600">{q.answeredBy}</span>
                                        </div>
                                        <p>{q.answer}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Button variant="outline" className="w-full">Ù…Ø´Ø§Ù‡Ø¯Ù‡ Ù¾Ø±Ø³Ø´â€ŒÙ‡Ø§ÛŒ Ø¨ÛŒØ´ØªØ±</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Related Products Carousel
const RelatedProducts: React.FC<{
    products: typeof mockProduct.relatedProducts;
}> = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + 4);

    return (
        <div className="mt-6 mx-auto w-full w-[720px]">
            <h2 className="text-xl font-bold mb-4">Ù…Ø­ØµÙˆÙ„Ø§Øª Ù…Ø±ØªØ¨Ø·</h2>
            <div className="relative">
                <div className="flex gap-4">
                    {visibleProducts.map((product) => (
                        <Card key={product.id} className="w-48 flex-shrink-0">
                            <div className="relative">
                                {product.discount > 0 && (
                                    <Badge variant="secondary" className="absolute top-2 left-2 bg-orange-500 text-white">
                                        {product.discount}%
                                    </Badge>
                                )}
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <button className="absolute top-2 right-2 p-1 bg-white/70 rounded-full">
                                        <HeartIcon className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                            <CardContent className="p-3">
                                <div className="text-xs text-gray-500 mb-1">{product.name}</div>
                                <div className="flex items-center gap-1 mb-2">
                                    <span className="text-sm font-bold text-pink-600">{product.price.toLocaleString()}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="text-xs line-through text-gray-400">{product.originalPrice.toLocaleString()}</span>
                                    )}
                                </div>
                                <div className="flex gap-1 mb-2">
                                    {product.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: color }}
                                        ></div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

// Clock Icon for Timer (Simple version)
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

// Main Product Page Component
const ProductPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-8 max-w-5xl text-right" dir="rtl">
            <div className="grid grid-cols-1 gap-8 items-start">
                <div className="flex flex-col items-center">
                    <ProductDetails product={mockProduct} />
                    <ProductTabs product={mockProduct} />
                    <RelatedProducts products={mockProduct.relatedProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;

