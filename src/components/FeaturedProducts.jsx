import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";
import { ShopContext } from '../Context/Shopcontext';
import { toast } from 'react-hot-toast';

const FeaturedProducts = () => {
    const { addToCart, addToWishlist, allProducts } = useContext(ShopContext);
    const [productSizes, setProductSizes] = useState({});

    const toggleSizeSelection = (productId, size) => {
        setProductSizes(prev => ({
            ...prev,
            [productId]: prev[productId] === size ? '' : size
        }));
    };

    const handleAction = (action, product) => {
        const hasSizes = product.sizes && product.sizes.length > 0;
        const selectedSize = productSizes[product.id];

        if (hasSizes && !selectedSize) {
            toast.dismiss();
            toast.error("Please select a size first!");
            return;
        }

        const productWithDetails = { ...product, size: selectedSize };

        if (action === 'cart') {
            addToCart(productWithDetails);
        } else if (action === 'wishlist') {
            addToWishlist(productWithDetails);
        }
    };

    return (
        <section className="py-20 sm:py-24 bg-gray-50/50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
                    <div className="text-center md:text-left">
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-3 block">High Performance</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-dark italic tracking-tighter uppercase leading-none">
                            Trending <span className="text-primary">Equipment</span>
                        </h2>
                    </div>
                    <Link to="/shop" className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors group">
                        View Entire Collection <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                    {allProducts.slice(0, 8).map((product) => (
                        <div key={product.id} className="group relative bg-white rounded-[2.5rem] p-4 sm:p-5 border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col h-full overflow-hidden">
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-gray-50/50 rounded-3xl mb-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                                    loading="lazy"
                                />

                                {/* Quick Actions - Visible on Hover (Desktop) or partially accessible on Mobile */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 transform lg:translate-x-14 lg:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                    <button
                                        onClick={() => handleAction('wishlist', product)}
                                        className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-2xl flex items-center justify-center text-dark hover:text-red-500 hover:bg-red-50 shadow-xl shadow-gray-200/50 transition-all active:scale-95"
                                    >
                                        <FaRegHeart className="text-sm" />
                                    </button>
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-2xl flex items-center justify-center text-dark hover:text-primary hover:bg-primary/5 shadow-xl shadow-gray-200/50 transition-all active:scale-95"
                                    >
                                        <IoEyeSharp className="text-sm" />
                                    </Link>
                                </div>

                                {/* Badge */}
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <div className="absolute top-4 left-4 bg-[#121212] text-white text-[9px] font-black px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1 uppercase tracking-[0.15em] z-10 italic">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </div>
                                )}

                                {/* Card Add to Cart (Desktop) */}
                                <div className="hidden lg:block absolute bottom-4 left-4 right-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 z-10">
                                    <button
                                        onClick={() => handleAction('cart', product)}
                                        className="w-full bg-[#121212] text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-2xl shadow-xl hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <FaShoppingCart size={12} /> Add to Terminal
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-2 flex-1 flex flex-col">
                                <div className="flex justify-between items-center gap-3 mb-3">
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-lg">
                                        {product.category}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-orange-400 text-[10px] font-black bg-orange-50/50 px-2 py-1 rounded-lg">
                                        <FaStar size={10} /> {product.rating}
                                    </div>
                                </div>

                                <Link to={`/product/${product.id}`} className="block mb-4">
                                    <h3 className="text-lg sm:text-xl font-black text-dark group-hover:text-primary transition-colors line-clamp-1 italic uppercase tracking-tighter">
                                        {product.name}
                                    </h3>
                                </Link>

                                {product.sizes && product.sizes.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSizeSelection(product.id, size)}
                                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-black transition-all border-2 ${productSizes[product.id] === size
                                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-primary/30 hover:text-primary'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto flex items-center justify-between pb-2">
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl sm:text-3xl font-black text-primary italic leading-none">
                                            ₹{product.price}
                                        </p>
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <p className="text-xs sm:text-sm font-bold text-gray-300 line-through leading-none">
                                                ₹{product.originalPrice}
                                            </p>
                                        )}
                                    </div>
                                    
                                    {/* Mobile/Tablet Add to Cart (Visible Always) */}
                                    <button
                                        onClick={() => handleAction('cart', product)}
                                        className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all"
                                    >
                                        <FaShoppingCart size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 sm:mt-20 text-center">
                    <Link to="/shop" className="inline-flex items-center gap-3 px-10 py-4 sm:py-5 bg-white border border-gray-100 text-dark font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs rounded-2xl hover:bg-[#121212] hover:text-white hover:border-[#121212] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all active:scale-95 group">
                        Explore Full Inventory <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
