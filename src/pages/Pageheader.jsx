import React from "react";
import { useLocation } from "react-router-dom";

const Pageheader = () => {
    const location = useLocation();

    if (location.pathname === "/") return null;

    const pages = {
        "/shop": {
            title: "New Arrivals",
            subtitle: "Shop The Latest",
        },
        "/cart": {
            title: "Shopping Cart",
            subtitle: "Review Your Items",
        },
        "/wishlist": {
            title: "My Wishlist",
            subtitle: "Your Saved Items",
        },
        "/checkout": {
            title: "Checkout",
            subtitle: "Secure Payment",
        },
        "/orders": {
            title: "My Orders",
            subtitle: "View History",
        },
        "/profile": {
            title: "My Profile",
            subtitle: "Manage Account",
        },
        "/login": {
            title: "Login",
            subtitle: "Welcome Back",
        },
        "/register": {
            title: "Register",
            subtitle: "Create Account",
        },
        "/contact": {
            title: "Contact Us",
            subtitle: "Get In Touch",
        },
        "/blog": {
            title: "Our Blog",
            subtitle: "Latest News & Trends",
        },
        "/about": {
            title: "About Us",
            subtitle: "Our Story & Vision",
        },
        "/services": {
            title: "Our Services",
            subtitle: "What We Offer",
        },
        "/filtering": {
            title: "Filter Products",
            subtitle: "Find Your Perfect Pair",
        },
        "/admin/shipping": {
            title: "Logistics Hub",
            subtitle: "Manage Order Pipeline",
        },
        "/admin/inventory": {
            title: "Stock Control",
            subtitle: "Optimize Product Inventory",
        },
    };

    const page = pages[location.pathname];

    if (!page) return null;

    return (
        <div className="relative py-16 md:py-24 bg-[#aaa692] overflow-hidden border-b border-gray-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a84c]/5 rounded-bl-[10rem] -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#121212]/5 rounded-tr-[8rem] -ml-16 -mb-16 pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase pt-10 text-[#161208] mb-3 block opacity-80">
                        {page.subtitle}
                    </span>

                    <h1 className="text-4xl md:text-7xl font-black text-[#121212] tracking-tighter leading-tight italic mb-3">
                        {page.title}
                    </h1>

                    <nav className="flex items-center  gap-3 px-6 py-2 bg-white rounded-full border border-gray-100 shadow-sm shadow-gray-100/50">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Home</span>
                        <div className="w-4 h-px bg-gray-200" />
                        <span className="text-[9px] font-black text-[#121212] uppercase tracking-widest">{page.title}</span>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pageheader;