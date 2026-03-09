import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import { IoCloseOutline, IoStar, IoHeartOutline, IoHeartSharp, IoCartOutline } from 'react-icons/io5';
import { FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const QuickViewModal = () => {
    const { quickViewProduct, setQuickViewProduct, addToCart, addToWishlist, wishlist, removeFromWishlist } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (quickViewProduct) {
            setQuantity(1);
            setSelectedSize('');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [quickViewProduct]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setQuickViewProduct(null);
            setIsClosing(false);
        }, 300);
    };

    if (!quickViewProduct && !isClosing) return null;

    const isInWishlist = quickViewProduct && wishlist.some(item => String(item.id) === String(quickViewProduct.id));

    const handleCartClick = () => {
        if (quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && !selectedSize) {
            toast.dismiss();
            return toast.error("Please select a size first!");
        }
        addToCart({ ...quickViewProduct, quantity, size: selectedSize });
        handleClose();
    };

    const handleWishlistClick = () => {
        if (isInWishlist) {
            const item = wishlist.find(i => String(i.id) === String(quickViewProduct.id));
            removeFromWishlist(item.wishlistDocId);
            toast.success("Removed from wishlist");
        } else {
            addToWishlist(quickViewProduct);
        }
    };

    return (
        <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`relative bg-white w-full h-full overflow-y-auto transition-all duration-500 transform ${isClosing ? 'translate-y-full' : 'translate-y-0'}`}>
                <button
                    onClick={handleClose}
                    className="fixed top-8 right-8 z-[110] w-14 h-14 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md text-gray-900 border border-gray-100 shadow-xl hover:bg-primary hover:text-white transition-all transform active:scale-90"
                >
                    <IoCloseOutline size={32} />
                </button>

                <div className="flex flex-col md:flex-row min-h-screen">

                    <div className="md:w-1/2 p-10 sm:p-20 bg-gray-50 flex items-center justify-center relative group min-h-[50vh] md:min-h-screen">
                        <div className="absolute top-12 left-12">
                            <span className="px-6 py-2 bg-white shadow-xl rounded-full text-xs font-black text-primary uppercase tracking-[0.3em] border border-gray-100">
                                {quickViewProduct?.category}
                            </span>
                        </div>
                        <img
                            src={quickViewProduct?.image}
                            alt={quickViewProduct?.name}
                            className="w-full max-w-[500px] object-contain transform group-hover:scale-110 transition-transform duration-1000 drop-shadow-2xl"
                        />
                    </div>

                    <div className="md:w-1/2 p-8 sm:p-20 lg:p-32 flex flex-col justify-center bg-white">
                        <div className="max-w-xl mx-auto w-full">
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <IoStar key={i} size={18} className={i < Math.floor(quickViewProduct?.rating || 0) ? "text-orange-400" : "text-gray-100"} />
                                ))}
                                <span className="text-sm font-bold text-gray-400 ml-3 uppercase tracking-widest">({quickViewProduct?.rating}) verified Reviews</span>
                            </div>

                            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 italic tracking-tighter leading-none mb-8 uppercase">
                                {quickViewProduct?.name}
                            </h2>

                            <div className="text-5xl font-black text-primary mb-10 flex items-baseline gap-4">
                                ₹{quickViewProduct?.price}
                                <span className="text-xl text-gray-300 line-through font-bold">₹{Math.round(quickViewProduct?.price * 1.2)}</span>
                                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-black uppercase tracking-tighter ml-2">Save 20%</span>
                            </div>

                            <div className="w-12 h-1.5 bg-primary mb-10 rounded-full"></div>

                            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium italic">
                                "{quickViewProduct?.description || "Push your limits with our premium athletic gear. Designed for durability, performance, and style, this piece will elevate your game to the next level."}"
                            </p>

                            {quickViewProduct?.sizes && quickViewProduct?.sizes.length > 0 && (
                                <div className="mb-10">
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                                        Select Your Size <div className="flex-1 h-px bg-gray-100" />
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {quickViewProduct.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-300 border-2 ${selectedSize === size
                                                    ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/40 scale-110'
                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-primary hover:text-primary hover:scale-105'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-y-5 mb-12">
                                {(quickViewProduct?.features || ["Moisture Wicking", "Breathable Material", "Elite Design", "Ergonomic Fit"]).map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs font-black text-gray-500 uppercase tracking-[0.15em]">
                                        <div className="w-6 h-6 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                            <FiCheck size={12} />
                                        </div>
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl border border-gray-100 min-w-[160px]">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl text-gray-400 hover:text-primary shadow-sm active:scale-95 transition-all"
                                    >
                                        <FiMinus size={20} />
                                    </button>
                                    <span className="font-black text-xl text-gray-900 px-6">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl text-gray-400 hover:text-primary shadow-sm active:scale-95 transition-all"
                                    >
                                        <FiPlus size={20} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleCartClick}
                                    className="flex-1 px-10 py-5 bg-primary text-white font-black italic rounded-2xl flex items-center justify-center gap-4 hover:bg-dark transition-all shadow-2xl shadow-primary/20 hover:shadow-dark/20 active:scale-95 group tracking-widest text-lg"
                                >
                                    <IoCartOutline size={24} className="group-hover:-translate-x-1 transition-transform" />
                                    ADD TO CART
                                </button>

                                <button
                                    onClick={handleWishlistClick}
                                    className={`w-14 h-14 flex items-center justify-center rounded-2xl border transition-all active:scale-90 ${isInWishlist ? 'bg-red-50 border-red-100 text-red-500 shadow-lg shadow-red-100' : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-red-500 hover:bg-white'}`}
                                >
                                    {isInWishlist ? <IoHeartSharp size={28} /> : <IoHeartOutline size={28} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
