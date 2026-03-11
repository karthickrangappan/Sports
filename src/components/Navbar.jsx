import React, { useState, useContext } from 'react';
import { FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes, FaBox, FaSignOutAlt, FaTrash, FaTruck } from 'react-icons/fa';
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from "../Context/Shopcontext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { cartItems, wishlist, user, logout } = useContext(ShopContext);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100/50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#121212] rounded-xl flex items-center justify-center transform -rotate-6 shadow-xl group-hover:rotate-0 transition-all duration-500">
                            <span className="text-white text-xl sm:text-2xl font-black italic">S</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-dark tracking-tighter">
                            SPORT<span className="text-primary italic">HUB</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-12">
                        {['Home', 'Shop', 'About', 'Services', 'Contact'].map((item) => (
                            <Link 
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${
                                    isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`) 
                                    ? 'text-primary' 
                                    : 'text-gray-400 hover:text-dark'
                                }`}
                            >
                                {item}
                                {isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`) && (
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-2 sm:gap-6">
                        
                        {/* User Account / Login */}
                        <div className="hidden sm:block">
                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center gap-3 bg-gray-50/50 p-1.5 pr-4 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[0.9rem] bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                            <FaUser size={12} />
                                        </div>
                                        <div className="text-left hidden md:block">
                                            <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Elite Runner</p>
                                            <p className="text-xs font-black text-dark leading-none truncate max-w-[80px]">
                                                {user.displayName?.split(' ')[0] || 'Member'}
                                            </p>
                                        </div>
                                    </button>

                                    <div className="absolute right-0 top-full pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-[60]">
                                        <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden p-3">
                                            <Link to="/profile" className="flex items-center gap-3 px-5 py-3.5 text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:text-primary rounded-2xl group/item">
                                                <FaUser size={14} className="opacity-40 group-hover/item:opacity-100" /> Dashboard
                                            </Link>
                                            <Link to="/orders" className="flex items-center gap-3 px-5 py-3.5 text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:text-primary rounded-2xl group/item">
                                                <FaBox size={14} className="opacity-40 group-hover/item:opacity-100" /> Track Orders
                                            </Link>

                                            {user?.role === 'admin' && (
                                                <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                                                    <p className="px-5 py-2 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Command Center</p>
                                                    <Link to="/admin/inventory" className="flex items-center gap-3 px-5 py-3 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-2xl">
                                                        <FaBox size={14} /> Inventory
                                                    </Link>
                                                </div>
                                            )}

                                            <div className="mt-2 pt-2 border-t border-gray-100">
                                                <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-4 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl group/logout">
                                                    <FaSignOutAlt size={14} className="transition-transform group-hover/logout:translate-x-1" /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="bg-[#121212] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-gray-200">
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Social/Utility Icons */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <Link to="/wishlist" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-dark hover:text-primary transition-all relative">
                                <FaHeart size={18} />
                                {wishlist.length > 0 && (
                                    <span className="absolute top-2 right-2 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>
                            <Link to="/cart" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-dark hover:text-primary transition-all relative">
                                <FaShoppingCart size={18} />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-2 right-2 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-dark"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Sidebar-like menu */}
            <div className={`lg:hidden fixed inset-x-0 top-[64px] sm:top-[80px] bottom-0 bg-white z-[40] transition-all duration-700 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <div className="h-full flex flex-col p-8 bg-white">
                    <div className="space-y-6 flex-1">
                        {['Home', 'Shop', 'About', 'Services', 'Contact'].map((item) => (
                            <Link 
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                                onClick={() => setIsOpen(false)}
                                className={`block text-4xl font-black uppercase tracking-tighter italic ${
                                    isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`) 
                                    ? 'text-primary' 
                                    : 'text-dark/20'
                                }`}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto border-t pt-8 space-y-6">
                        {user ? (
                            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-[2rem]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg">
                                        {user.displayName?.[0] || 'M'}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Member</p>
                                        <p className="text-lg font-black text-dark leading-none">{user.displayName || 'Member'}</p>
                                    </div>
                                </div>
                                <button onClick={logout} className="p-4 bg-white rounded-2xl text-red-500 shadow-sm"><FaSignOutAlt /></button>
                            </div>
                        ) : (
                            <Link to="/login" className="w-full bg-[#121212] text-white py-6 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] italic text-center block" onClick={() => setIsOpen(false)}>
                                Join the Hub
                            </Link>
                        )}
                        <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">© 2024 SPORT HUB ELITE</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
