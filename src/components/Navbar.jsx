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
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">

                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center transform -rotate-6 shadow-md group-hover:rotate-0 transition-transform">
                            <span className="text-white text-lg lg:text-xl font-black italic">S</span>
                        </div>
                        <h1 className="text-xl lg:text-2xl font-black text-accent tracking-tighter">
                            SPORT<span className="text-primary italic">HUB</span>
                        </h1>
                    </Link>

                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to="/" className={`nav-link ${isActive('/') ? 'text-primary' : ''}`}>Home</Link>
                        <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'text-primary' : ''}`}>Shop</Link>
                        <Link to="/about" className={`nav-link ${isActive('/about') ? 'text-primary' : ''}`}>About</Link>
                        <Link to="/services" className={`nav-link ${isActive('/services') ? 'text-primary' : ''}`}>Services</Link>
                        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'text-primary' : ''}`}>Contact</Link>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5 text-lg sm:text-xl text-gray-700">

                        {user ? (
                            <div className="relative group hidden sm:block">
                                <button className="flex items-center gap-2 hover:text-primary transition-colors py-2">
                                    <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white transition-all">
                                        <FaUser size={14} />
                                    </div>
                                    <span className="text-sm font-bold hidden md:block max-w-[100px] truncate">
                                        {user.displayName || 'Account'}
                                    </span>
                                </button>

                                <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2">

                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl">
                                            <FaUser size={14} /> My Profile
                                        </Link>

                                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl">
                                            <FaBox size={14} /> My Orders
                                        </Link>

                                        {user?.role === 'admin' && (
                                            <>
                                                <div className="h-px bg-gray-100 my-1"></div>

                                                <Link to="/admin/add-product" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary rounded-xl">
                                                    <HiOutlineViewGridAdd size={14} /> Add Products
                                                </Link>

                                                <Link to="/admin/remove-product" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary rounded-xl">
                                                    <FaTrash size={14} /> Remove Products
                                                </Link>

                                                <Link to="/admin/shipping" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary rounded-xl">
                                                    <FaTruck size={14} /> Shipping
                                                </Link>

                                                <Link to="/admin/inventory" className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary rounded-xl">
                                                    <FaBox size={14} /> Inventory
                                                </Link>
                                            </>
                                        )}

                                        <div className="h-px bg-gray-100 my-1"></div>

                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl text-left"
                                        >
                                            <FaSignOutAlt size={14} /> Logout
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden sm:flex">
                                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
                                    <FaUser size={14} />
                                </div>
                            </Link>
                        )}

                        <Link to="/wishlist" className="relative hover:text-primary transition">
                            <FaHeart />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="relative hover:text-primary transition">
                            <FaShoppingCart />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden text-xl p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>

                    </div>
                </div>
            </div>

            <div className={`lg:hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t`}>

                <div className="px-4 pt-4 pb-6 space-y-3">

                    <Link to="/" onClick={() => setIsOpen(false)} className={`block py-2 text-sm ${isActive('/') ? 'text-primary font-bold' : 'text-gray-700'}`}>Home</Link>

                    <Link to="/shop" onClick={() => setIsOpen(false)} className={`block py-2 text-sm ${isActive('/shop') ? 'text-primary font-bold' : 'text-gray-700'}`}>Shop</Link>

                    <Link to="/about" onClick={() => setIsOpen(false)} className={`block py-2 text-sm ${isActive('/about') ? 'text-primary font-bold' : 'text-gray-700'}`}>About</Link>

                    <Link to="/services" onClick={() => setIsOpen(false)} className={`block py-2 text-sm ${isActive('/services') ? 'text-primary font-bold' : 'text-gray-700'}`}>Services</Link>

                    <Link to="/contact" onClick={() => setIsOpen(false)} className={`block py-2 text-sm ${isActive('/contact') ? 'text-primary font-bold' : 'text-gray-700'}`}>Contact</Link>

                    <div className="pt-4 border-t space-y-3">

                        {user ? (
                            <>
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                    <FaUser className="text-primary" />
                                    {user.displayName || 'User'}
                                </div>

                                <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600">
                                    My Profile
                                </Link>

                                <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600">
                                    My Orders
                                </Link>

                                {user?.role === 'admin' && (
                                    <div className="pt-2 mt-2 border-t border-gray-100 space-y-3">
                                        <Link to="/admin/add-product" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm text-gray-600">
                                            <HiOutlineViewGridAdd size={14} /> Add Products
                                        </Link>
                                        <Link to="/admin/remove-product" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaTrash size={14} /> Remove Products
                                        </Link>
                                        <Link to="/admin/shipping" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaTruck size={14} /> Shipping
                                        </Link>
                                        <Link to="/admin/inventory" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaBox size={14} /> Inventory
                                        </Link>
                                    </div>
                                )}

                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="text-sm font-bold text-red-500"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-700">
                                Login
                            </Link>
                        )}

                    </div>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
