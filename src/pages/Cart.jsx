import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/Shopcontext';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import PageHeader from './PageHeader';

const Cart = () => {
    const { cartItems, removeFromCart, updateCartQuantity, user } = useContext(ShopContext);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHeader />
                <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 text-center">
                    <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShoppingBag size={40} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Please Login</h2>
                        <p className="text-gray-500 mb-8 text-base sm:text-lg">You need to be logged in to view your shopping cart and continue your journey.</p>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-base sm:text-lg font-bold rounded-xl text-white bg-orange-600 hover:bg-orange-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-200"
                        >
                            Sign In Now <FiArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHeader />
                <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 text-center">
                    <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShoppingCart size={40} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-8 text-base sm:text-lg">Looks like you haven't added anything to your cart yet. Let's find some great gear!</p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-base sm:text-lg font-bold rounded-xl text-white bg-primary hover:bg-slate-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-slate-200"
                        >
                            Explore Products <FiArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">

                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                <h3 className="text-xl font-bold text-gray-900">Items Collection ({cartItems.length})</h3>
                                <span className="text-sm font-medium text-gray-500 italic">Secure Checkout</span>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {cartItems.map((item) => (
                                    <li key={item.cartDocId} className="p-6 hover:bg-gray-50/30 transition-colors group">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <Link to={`/product/${item.id}`} className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden shadow-inner group-hover:shadow-md transition-shadow">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-500"
                                                />
                                            </Link>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{item.category}</div>
                                                        <Link to={`/product/${item.id}`}>
                                                            <h4 className="text-xl font-black text-gray-900 tracking-tight hover:text-primary transition-colors">{item.name}</h4>
                                                        </Link>
                                                        <p className="text-gray-500 text-sm font-medium mt-1">Size: <span className="text-orange-600 font-bold">{item.size || 'N/A'}</span></p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-black text-primary">₹{item.price}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Subtotal: ₹{item.price * item.quantity}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto pt-4">
                                                    <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                                                        <button
                                                            onClick={() => updateCartQuantity(item.cartDocId, item.quantity - 1)}
                                                            className="p-2 hover:bg-white rounded-lg text-gray-600 hover:text-orange-600 transition-all active:scale-90"
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateCartQuantity(item.cartDocId, item.quantity + 1)}
                                                            className="p-2 hover:bg-white rounded-lg text-gray-600 hover:text-orange-600 transition-all active:scale-90"
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            removeFromCart(item.cartDocId);
                                                            toast.success("Item removed from cart");
                                                        }}
                                                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-all hover:scale-105"
                                                    >
                                                        <FiTrash2 /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-4 mt-12 lg:mt-0 sticky top-32">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50 rounded-full -mr-20 -mt-20 z-0"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black italic tracking-tighter text-gray-900 mb-8">ORDER SUMMARY</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Subtotal</span>
                                        <span className="text-lg font-bold text-gray-900">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Shipping</span>
                                        <span className="text-lg font-bold text-gray-900">₹{shipping}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tax</span>
                                        <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded">Free</span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-dashed border-gray-100 pt-6 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">Total</span>
                                        <span className="text-4xl font-black text-primary italic tracking-tighter">₹{total}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full group relative flex items-center justify-center px-6 py-5 bg-gray-900 text-white font-black italic text-lg rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-gray-900/30 active:scale-95"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        CHECKOUT <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                </Link>

                                <div className="mt-8 flex items-center justify-center gap-4 text-gray-300">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white"></div>
                                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">Trusted by 15k+ Athletes</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                    <FiShoppingBag />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-900">Have a coupon?</h4>
                                    <p className="text-xs text-gray-500">Add your code for instant discount</p>
                                </div>
                                <FiArrowRight className="text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
