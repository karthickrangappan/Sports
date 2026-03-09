import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";
import { ShopContext } from '../Context/Shopcontext';
import { toast } from 'react-hot-toast';

const FeaturedProducts = () => {
    const { addToCart, addToWishlist, allProducts } = useContext(ShopContext);
    const [activeTab, setActiveTab] = useState('Best Selling');
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
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-black text-dark mb-4 italic tracking-tighter">
                            TRENDING <span className="text-primary">GEAR</span>
                        </h2>
                        <p className="text-gray-500 text-lg max-w-lg">Our top-rated performance products chosen by athletes worldwide.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {allProducts.slice(0, 8).map((product) => (
                        <div key={product.id} className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                            <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-2xl mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                                    loading="lazy"
                                />

                                <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                    <button
                                        onClick={() => handleAction('wishlist', product)}
                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark hover:text-red-500 hover:bg-red-50 shadow-lg transition-all active:scale-90"
                                        title="Add to Wishlist"
                                    >
                                        <FaRegHeart />
                                    </button>
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark hover:text-blue-500 hover:bg-blue-100 shadow-lg transition-all active:scale-90"
                                        title="Quick View"
                                    >
                                        <IoEyeSharp />
                                    </Link>
                                </div>

                                {product.originalPrice && product.originalPrice > product.price && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-widest z-10 animate-pulse">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </div>
                                )}

                                <div className="absolute bottom-3 left-3 right-3 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 z-10">
                                    <button
                                        onClick={() => handleAction('cart', product)}
                                        className="w-full bg-white text-dark font-bold py-3 rounded-xl shadow-lg hover:bg-green-100 hover:text-green-500 flex items-center justify-center gap-2 transition-colors active:scale-95"
                                    >
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                </div>
                            </div>

                            <div className="px-2 pb-2 flex-1 flex flex-col">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
                                        {product.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-orange-400 text-xs font-bold bg-orange-50 px-2 py-1 rounded-md">
                                        <FaStar /> {product.rating}
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="text-lg font-black text-dark group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                            {product.name}
                                        </h3>
                                    </Link>
                                </div>

                                {product.sizes && product.sizes.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSizeSelection(product.id, size)}
                                                className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-black transition-all ${productSizes[product.id] === size
                                                    ? 'bg-primary text-white shadow-sm'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-black text-primary italic leading-none">
                                            ₹{product.price}
                                        </p>
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <p className="text-sm font-bold text-gray-300 line-through leading-none mt-1">
                                                ₹{product.originalPrice}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link to="/shop" className="inline-block px-10 py-4 bg-white border-2 border-gray-100 text-dark font-black uppercase tracking-widest rounded-full hover:border-primary hover:text-primary hover:shadow-xl transition-all active:scale-95">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
