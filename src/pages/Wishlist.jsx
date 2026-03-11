import React, { useContext } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import { FaTrash, FaShoppingCart, FaHeartBroken, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, addToCart } = useContext(ShopContext);

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHeader />
                <div className="flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-gray-300 shadow-sm animate-pulse">
                    <FaHeartBroken size={40} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-dark mb-2 italic tracking-tight">Your Wishlist is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any gear to your wishlist yet. Explore our collection and find your perfect match.</p>
                <Link to="/shop" className="px-6 py-3 sm:px-8 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                    Start Shopping <FaArrowRight />
                </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <PageHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.wishlistDocId} className="group bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">

                            <button
                                onClick={() => removeFromWishlist(item.wishlistDocId)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                                title="Remove from Wishlist"
                            >
                                <FaTrash size={12} />
                            </button>

                            <div className="relative aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.category}</div>
                                <Link to={`/product/${item.id}`} className="mb-2 block">
                                    <h3 className="text-lg font-black text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {item.name}
                                    </h3>
                                </Link>

                                <div className="mt-auto pt-3 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-black text-primary italic">₹{item.price}</span>
                                        {item.size && <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Size: {item.size}</span>}
                                    </div>
                                    <button
                                        onClick={() => {
                                            addToCart(item);
                                            removeFromWishlist(item.wishlistDocId);
                                        }}
                                        className="w-full bg-dark text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary transition-colors shadow-lg shadow-gray-200 active:scale-95"
                                    >
                                        <FaShoppingCart /> Move to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
