import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/Shopcontext';
import { products } from '../data/sportsData';
import { IoStar, IoHeartOutline, IoHeartSharp, IoCartOutline, IoArrowBackOutline } from 'react-icons/io5';
import { FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import PageHeader from './PageHeader';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist, wishlist, removeFromWishlist, allProducts } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!allProducts || allProducts.length === 0) return;

        const foundProduct = allProducts.find(p => String(p.id) === String(id));

        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate('/');
            toast.error("Product not found");
        }
        window.scrollTo(0, 0);
    }, [id, navigate, allProducts]);

    if (!product) return null;

    const isInWishlist = wishlist.some(item => item.id === product.id);

    const handleCartClick = () => {
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            toast.error("Please select a size first!");
            return;
        }
        addToCart({ ...product, quantity, size: selectedSize });
    };

    const handleWishlistClick = () => {
        if (isInWishlist) {
            const item = wishlist.find(i => i.id === product.id);
            removeFromWishlist(item.wishlistDocId);
            toast.success("Removed from wishlist");
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <PageHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold mb-8 transition-colors group"
                >
                    <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </button>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20">

                    <div className="lg:w-1/2">
                        <div className="relative aspect-square rounded-[3rem] bg-gray-50 p-6 sm:p-12 flex items-center justify-center overflow-hidden group shadow-inner">
                            <div className="absolute top-8 left-8">
                                <span className="px-6 py-2 bg-white shadow-md rounded-full text-[12px] font-black text-primary uppercase tracking-[0.2em]">
                                    {product.category}
                                </span>
                            </div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-4 cursor-pointer hover:border-primary transition-colors">
                                    <img src={product.image} alt="" className="w-full h-full object-contain opacity-50 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex flex-col pt-4">
                        <div className="flex items-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <IoStar key={i} size={18} className={i < Math.floor(product.rating) ? "text-orange-400" : "text-gray-200"} />
                            ))}
                            <span className="text-sm font-bold text-gray-400 ml-3">({product.rating}) Verified Performance</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 italic tracking-tighter leading-none mb-6 uppercase">
                            {product.name}
                        </h1>

                        <div className="text-4xl font-black text-primary mb-8 flex items-center gap-4 italic shrink-0">
                            <span className="shrink-0 leading-none">₹{product.price}</span>
                            {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                                <div className="flex items-center gap-3">
                                    <span className="text-lg text-gray-300 line-through font-bold leading-none">₹{product.originalPrice}</span>
                                    <span className="px-3 py-1 bg-red-100 text-red-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-200 shadow-sm animate-pulse shrink-0">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6 mb-10">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Description</h3>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                {product.description || "Unleash your potential with our professionally engineered gear. This product combines cutting-edge technology with high-grade materials to ensure you stay at the top of your game, no matter the intensity."}
                            </p>
                        </div>

                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-10 animate-in slide-in-from-left duration-500">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                                    <div className="w-8 h-px bg-gray-100" /> Choose Size
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black transition-all duration-300 border-2 ${selectedSize === size
                                                ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 -translate-y-2'
                                                : 'bg-white border-gray-100 text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-10">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Key Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(product.features || ["Performance Mesh", "Breathable Fabric", "Custom Fit", "Shock Absorption"]).map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                                            <FiCheck size={14} />
                                        </div>
                                        <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl border border-gray-100 min-w-[160px]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl text-gray-500 hover:text-primary shadow-sm hover:shadow-md active:scale-90 transition-all"
                                >
                                    <FiMinus />
                                </button>
                                <span className="font-black text-xl text-gray-900 px-6">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl text-gray-500 hover:text-primary shadow-sm hover:shadow-md active:scale-90 transition-all"
                                >
                                    <FiPlus />
                                </button>
                            </div>

                            <button
                                onClick={handleCartClick}
                                className="flex-1 px-6 py-4 sm:px-10 sm:py-5 bg-primary text-white font-black italic text-lg rounded-[1.5rem] flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95 group"
                            >
                                <IoCartOutline size={24} className="group-hover:-translate-x-1 transition-transform" />
                                ADD TO CART
                            </button>

                            <button
                                onClick={handleWishlistClick}
                                className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-[1.5rem] border transition-all active:scale-90 ${isInWishlist ? 'bg-red-50 border-red-100 text-red-500 shadow-lg shadow-red-100' : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100'}`}
                            >
                                {isInWishlist ? <IoHeartSharp size={32} /> : <IoHeartOutline size={32} />}
                            </button>
                        </div>

                        <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Shipping</p>
                                <p className="text-xs font-bold text-gray-900">Standard & Express</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Returns</p>
                                <p className="text-xs font-bold text-gray-900">30-Day Policy</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Secure</p>
                                <p className="text-xs font-bold text-gray-900">SSL Encryption</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
