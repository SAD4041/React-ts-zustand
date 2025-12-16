import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Check, RefreshCcw, Shield, Star, Clock, Plus, Minus } from 'lucide-react';

const App = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('black');
    const [isFollowing, setIsFollowing] = useState(false);
    const [countdown, setCountdown] = useState({ hours: 23, minutes: 45, seconds: 34 });

    // Simulated product data
    const product = {
        title: "پیراهن بهاره آستین بلند",
        brand: "برند مدآوران",
        brandDescription: "مد آمروز، سبک فردا",
        originalPrice: 1200000,
        discountedPrice: 850000,
        discountPercentage: 30,
        sales: 45678,
        followers: 33456,
        rating: 4.8,
        colors: [
            { id: 'green', name: 'سبز', hex: '#4CAF50' },
            { id: 'blue', name: 'آبی', hex: '#2196F3' },
            { id: 'black', name: 'مشکی', hex: '#000000' }
        ],
        sizes: ['XXL', 'XL', 'L', 'M', 'S'],
        stock: 10,
        description: "این پیراهن با طراحی مدرن و مواد با کیفیت، بهترین انتخاب برای روزهای خوش آب و هوایی است."
    };

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const images = [
        'https://placehold.co/885x885?text=Product+1',
        'https://placehold.co/885x885?text=Product+2',
        'https://placehold.co/885x885?text=Product+3'
    ];

    const handleAddToCart = () => {
        alert(`محصول با سایز ${selectedSize} و رنگ ${selectedColor} به سبد خرید اضافه شد!`);
    };

    const handleFollowBrand = () => {
        setIsFollowing(!isFollowing);
    };

    const formatTime = (time: Number) => {
        return time.toString().padStart(2, '0');
    };

    return (
        <div
            className="min-h-screen bg-gray-50"
            dir="rtl"
            style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
        >
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative bg-gray-100 rounded-xl overflow-hidden w-[885px] h-[885px]">
                            <img
                                src={images[selectedImage]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full transition-all"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                            <button
                                onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full transition-all"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex justify-center space-x-[70px]">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-[293px] h-[293px] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                            <button className="w-[293px] h-[293px] bg-orange-500 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A4.5 4.5 0 008.9 10.5H6.75v4.5H8.9a4.5 4.5 0 003.658 3.658l3.197-2.132M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                        {/* Brand Info */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-800 font-bold">M</div>
                                <div>
                                    <div className="font-semibold">{product.brand}</div>
                                    <div className="text-xs text-gray-500">"{product.brandDescription}"</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <span>{product.sales.toLocaleString()}</span>
                                    <span>فروش</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>{product.followers.toLocaleString()}</span>
                                    <span>دنبال کننده</span>
                                </div>
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                    <span className="mr-1">{product.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Discount Banner */}
                        <div className="bg-gradient-to-r from-[#E4004B] to-[#ED775A] rounded-lg p-4 text-white h-[200px] flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">تخفیف ۳۰٪</span>
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="text-lg font-bold">پیشنهاد ویژه محدود</div>
                            <div className="text-xl font-bold my-2">
                                {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
                            </div>
                            <div className="text-sm">تا پایان تخفیف باقی مانده ...</div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-8">
                                <span className="text-3xl font-bold text-[#E4004B]">{product.discountedPrice.toLocaleString()} تومان</span>
                                <span className="text-lg text-gray-500 line-through">{product.originalPrice.toLocaleString()} تومان</span>
                            </div>
                            <div className="text-right text-green-600 text-sm">
                                {Math.round(product.originalPrice - product.discountedPrice).toLocaleString()} تومان سود شما
                            </div>

                            {/* Stock Progress */}
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>فقط {product.stock} عدد باقی مانده!</span>
                                    <span>{Math.round((product.stock / 50) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-black h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex items-center space-x-8">
                            {/* Quantity */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm font-medium">تعداد:</label>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-1">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm font-medium">انتخاب سایز:</label>
                                <div className="flex space-x-2">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-3 py-1 border rounded-md text-sm transition-all ${selectedSize === size
                                                    ? 'border-[#E4004B] bg-[#E4004B] text-white'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm font-medium">انتخاب رنگ:</label>
                                <div className="flex space-x-2">
                                    {product.colors.map(color => (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColor(color.id)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.id
                                                    ? 'border-white ring-2 ring-offset-2 ring-[#E4004B]'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                        >
                                            {selectedColor === color.id && (
                                                <Check className="w-4 h-4 text-white absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-gradient-to-r from-[#E4004B] to-[#ED775A] text-white py-3 px-6 rounded-lg font-medium hover:from-[#E4004B] hover:to-[#ED775A] transition-all transform hover:scale-105"
                        >
                            <ShoppingCart className="inline w-5 h-5 ml-2" />
                            افزودن به سبد خرید
                        </button>

                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-[289px] pt-4">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                                    <Check className="w-8 h-8" />
                                </div>
                                <div className="text-sm">پرداخت امن</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                                    <RefreshCcw className="w-8 h-8" />
                                </div>
                                <div className="text-sm">بازگشت آسان</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <div className="text-sm">تضمین اصالت</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
