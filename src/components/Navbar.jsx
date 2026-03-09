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
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform -rotate-6 shadow-md group-hover:rotate-0 transition-transform duration-300">
                            <span className="text-white text-xl font-black italic">S</span>
                        </div>
                        <h1 className="text-2xl font-black text-accent tracking-tighter">
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

                    <div className="flex items-center space-x-3 sm:space-x-6 text-xl text-gray-700 ml-4">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 hover:text-primary transition-colors focus:outline-none py-2">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <FaUser size={16} />
                                    </div>
                                    <span className="text-sm font-bold hidden md:block max-w-[100px] truncate">
                                        {user.displayName || 'Account'}
                                    </span>
                                </button>

                                <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-[60]">
                                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2">
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl transition-colors">
                                            <FaUser size={14} /> My Profile
                                        </Link>
                                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl transition-colors">
                                            <FaBox size={14} /> My Orders
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <>
                                                <div className="h-px bg-gray-50 my-1 mx-2"></div>
                                                <p className="px-4 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin Hub</p>
                                                <Link to="/admin/add-product" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl transition-colors">
                                                    <HiOutlineViewGridAdd size={14} /> Add Products
                                                </Link>
                                                <Link to="/admin/remove-product" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl transition-colors">
                                                    <FaTrash size={14} /> Remove Products
                                                </Link>
                                                <Link to="/admin/shipping" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl transition-colors">
                                                    <FaTruck size={14} /> Shipping & Logistics
                                                </Link>
                                                <Link to="/admin/inventory" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-xl transition-colors">
                                                    <FaBox size={14} /> Inventory Control
                                                </Link>
                                            </>
                                        )}
                                        <div className="h-px bg-gray-100 my-1"></div>
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
                                        >
                                            <FaSignOutAlt size={14} /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="hover:text-primary transition-colors hover:scale-110 duration-200">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
                                    <FaUser size={16} />
                                </div>
                            </Link>
                        )}

                        <Link to="/wishlist" className="hover:text-primary transition-colors hover:scale-110 duration-200 relative">
                            <FaHeart />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="hover:text-primary transition-colors hover:scale-110 duration-200 relative">
                            <FaShoppingCart />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-2xl text-dark p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t`}>
                <div className="px-4 pt-2 pb-6 space-y-2">
                    <Link to="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 ${isActive('/') ? 'text-primary font-bold' : 'text-dark font-medium hover:bg-gray-50'}`}>Home</Link>
                    <Link to="/shop" onClick={() => setIsOpen(false)} className={`block px-3 py-2 ${isActive('/shop') ? 'text-primary font-bold' : 'text-dark font-medium hover:bg-gray-50'}`}>Shop</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className={`block px-3 py-2 ${isActive('/about') ? 'text-primary font-bold' : 'text-dark font-medium hover:bg-gray-50'}`}>About</Link>
                    <Link to="/services" onClick={() => setIsOpen(false)} className={`block px-3 py-2 ${isActive('/services') ? 'text-primary font-bold' : 'text-dark font-medium hover:bg-gray-50'}`}>Services</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className={`block px-3 py-2 ${isActive('/contact') ? 'text-primary font-bold' : 'text-dark font-medium hover:bg-gray-50'}`}>Contact</Link>

                    <div className="pt-4 flex flex-col space-y-4 px-3 border-t border-gray-100 mt-4">
                        {user ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaUser className="text-primary" />
                                    <span className="text-sm font-bold text-gray-900">Hi, {user.displayName || 'User'}</span>
                                </div>
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-primary pl-6">My Profile</Link>
                                <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-primary pl-6">My Orders</Link>
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="text-sm font-bold text-red-500 hover:text-red-600 text-left w-full pl-6 pt-1"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-dark font-medium hover:text-primary transition-colors">
                                <FaUser /> <span>Login</span>
                            </Link>
                        )}

                        <div className="flex items-center gap-6 pb-2">
                            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="relative text-xl text-gray-700 hover:text-primary transition-colors">
                                <FaHeart />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="relative text-xl text-gray-700 hover:text-primary transition-colors">
                                <FaShoppingCart />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {user?.role === 'admin' && (
                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 pl-3">Admin Control Center</p>
                                <Link to="/admin/add-product" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-1 text-sm font-bold text-gray-700 hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                        <HiOutlineViewGridAdd size={16} />
                                    </div>
                                    Add New Products
                                </Link>
                                <Link to="/admin/remove-product" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-1 text-sm font-bold text-gray-700 hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 transition-colors">
                                        <FaTrash size={14} />
                                    </div>
                                    Manage Catalog
                                </Link>
                                <Link to="/admin/shipping" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-1 text-sm font-bold text-gray-700 hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 transition-colors">
                                        <FaTruck size={16} />
                                    </div>
                                    Shipping & Logistics
                                </Link>
                                <Link to="/admin/inventory" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-1 text-sm font-bold text-gray-700 hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 transition-colors">
                                        <FaBox size={16} />
                                    </div>
                                    Inventory Control
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
