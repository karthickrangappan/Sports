import React, { useState, useContext, useMemo } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import { categories as sportsCategories } from '../data/sportsData';
import Pageheader from './Pageheader';
import { FaStar, FaThLarge, FaList, FaChevronDown, FaChevronUp, FaRupeeSign, FaPercent, FaFilter, FaRedo, FaPlus, FaMinus, FaShoppingCart, FaRegHeart, FaTimes } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Shop = () => {
    const { addToCart, addToWishlist, allProducts } = useContext(ShopContext);

    const [selectedPriceRange, setSelectedPriceRange] = useState('All');
    const [selectedRating, setSelectedRating] = useState('All');
    const [selectedOffer, setSelectedOffer] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewType, setViewType] = useState('grid');
    const [sortBy, setSortBy] = useState('Default');
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [productSizes, setProductSizes] = useState({});
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const toggleExpansion = (categoryName) => {
        setExpandedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const ratings = ['All', '4', '3', '2'];
    const offers = ['All', '10', '20', '30', '50'];
    const priceRanges = [
        { label: 'All', min: 0, max: 100000 },
        { label: 'Under ₹500', min: 0, max: 500 },
        { label: '₹500 - ₹1000', min: 500, max: 1000 },
        { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
        { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
        { label: 'Above ₹5000', min: 5000, max: 100000 }
    ];

    const toggleSizeSelection = (productId, size) => {
        setProductSizes(prev => ({
            ...prev,
            [productId]: prev[productId] === size ? null : size
        }));
    };

    const handleAction = (action, product) => {
        const hasSizes = product.sizes && product.sizes.length > 0;
        const selectedSize = productSizes[product.id];

        if (hasSizes && !selectedSize) {
            toast.dismiss();
            return toast.error("Please select a size first!");
        }

        const productWithDetails = {
            ...product,
            size: selectedSize
        };

        if (action === 'cart') {
            addToCart(productWithDetails);
        } else if (action === 'wishlist') {
            addToWishlist(productWithDetails);
        }
    };

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const currentRange = priceRanges.find(r => r.label === selectedPriceRange);
            const matchesPrice = product.price >= currentRange.min && product.price <= currentRange.max;

            const matchesCategory = selectedCategory === 'All' ||
                (product.category === selectedCategory) ||
                (product.category.startsWith(selectedCategory + ' '));
            const matchesRating = selectedRating === 'All' || product.rating >= parseFloat(selectedRating);

            const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
            const matchesOffer = selectedOffer === 'All' || discount >= parseInt(selectedOffer);

            return matchesPrice && matchesCategory && matchesRating && matchesOffer;
        }).sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.price - b.price;
            if (sortBy === 'Price: High to Low') return b.price - a.price;
            if (sortBy === 'Rating') return b.rating - a.rating;
            return 0;
        });
    }, [allProducts, selectedPriceRange, selectedCategory, selectedRating, selectedOffer, sortBy]);

    const resetFilters = () => {
        setSelectedPriceRange('All');
        setSelectedRating('All');
        setSelectedOffer('All');
        setSelectedCategory('All');
        setSortBy('Default');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Pageheader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-center gap-2 font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                    <FaFilter className="text-primary" /> Filter Products
                </button>

                <div
                    className={`fixed inset-0 bg-black/50 z-[55]  lg:hidden transition-opacity duration-300 ${showMobileFilters ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    onClick={() => setShowMobileFilters(false)}
                />

                <div className="flex flex-col lg:flex-row gap-8">

                    <aside className={`fixed inset-y-0 left-0 z-[60] w-[280px] sm:w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-72 lg:shadow-none lg:bg-transparent lg:z-auto ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="bg-white h-full lg:h-auto lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100 p-6 lg:p-8 lg:sticky lg:top-28 overflow-y-auto lg:overflow-visible custom-scrollbar">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black italic tracking-tighter text-gray-900 flex items-center gap-2 uppercase">
                                    <FaFilter className="text-primary text-sm" /> Filters
                                </h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={resetFilters}
                                        className="text-primary hover:text-dark transition-colors"
                                        title="Reset All"
                                    >
                                        <FaRedo size={12} />
                                    </button>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="lg:hidden text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <FaTimes size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Price</h4>
                                <div className="space-y-3">
                                    {priceRanges.map(range => (
                                        <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={selectedPriceRange === range.label}
                                                onChange={() => setSelectedPriceRange(range.label)}
                                                className="w-4 h-4 accent-primary"
                                            />
                                            <span className="text-sm font-bold text-gray-600 group-hover:text-primary transition-colors">
                                                {range.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-10">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Rating</h4>
                                <div className="space-y-3">
                                    {ratings.map(r => (
                                        <label key={r} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="rating"
                                                checked={selectedRating === r}
                                                onChange={() => setSelectedRating(r)}
                                                className="w-4 h-4 accent-primary"
                                            />
                                            <span className="text-sm font-bold text-gray-600 group-hover:text-primary transition-colors">
                                                {r === 'All' ? 'All Ratings' : `${r}★ & above`}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-10">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Offers</h4>
                                <div className="space-y-3">
                                    {offers.map(o => (
                                        <label key={o} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="offer"
                                                checked={selectedOffer === o}
                                                onChange={() => setSelectedOffer(o)}
                                                className="w-4 h-4 accent-primary"
                                            />
                                            <span className="text-sm font-bold text-gray-600 group-hover:text-primary transition-colors">
                                                {o === 'All' ? 'All Offers' : `${o}% & above`}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-2">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Category</h4>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer group pt-2 px-1">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === 'All'}
                                            onChange={() => setSelectedCategory('All')}
                                            className="w-4 h-4 accent-primary"
                                        />
                                        <span className={`text-sm font-black uppercase tracking-tighter italic transition-colors ${selectedCategory === 'All' ? 'text-primary' : 'text-gray-900 group-hover:text-primary'}`}>
                                            All Equipment
                                        </span>
                                    </label>

                                    {sportsCategories.map(cat => (
                                        <div key={cat.id} className="space-y-2">
                                            <div className="flex items-center justify-between group px-1">
                                                <label className="flex items-center gap-3 cursor-pointer flex-1">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        checked={selectedCategory === cat.name}
                                                        onChange={() => setSelectedCategory(cat.name)}
                                                        className="w-4 h-4 accent-primary"
                                                    />
                                                    <span className={`text-sm font-black uppercase tracking-tighter italic transition-colors ${selectedCategory === cat.name ? 'text-primary' : 'text-gray-900 group-hover:text-primary'}`}>
                                                        {cat.name}
                                                    </span>
                                                </label>
                                                <button
                                                    onClick={() => toggleExpansion(cat.name)}
                                                    className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all ${expandedCategories.includes(cat.name) ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:text-primary'}`}
                                                >
                                                    {expandedCategories.includes(cat.name) ? <FaMinus size={10} /> : <FaPlus size={10} />}
                                                </button>
                                            </div>

                                            {expandedCategories.includes(cat.name) && (
                                                <div className="ml-6 border-l border-gray-100 pl-4 space-y-2 py-1 animate-in slide-in-from-top-2 duration-300">
                                                    {cat.subcategories.map(sub => {
                                                        const fullCat = `${cat.name} ${sub}`;
                                                        return (
                                                            <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                                                                <input
                                                                    type="radio"
                                                                    name="category"
                                                                    checked={selectedCategory === fullCat}
                                                                    onChange={() => setSelectedCategory(fullCat)}
                                                                    className="w-3.5 h-3.5 accent-primary"
                                                                />
                                                                <span className={`text-xs font-bold transition-colors ${selectedCategory === fullCat ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>
                                                                    {sub}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="bg-white rounded-3xl   shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-black italic tracking-tighter uppercase">
                                    {selectedCategory}
                                </div>
                                <span className="text-sm font-bold text-gray-400 italic">
                                    Showing {filteredProducts.length} items
                                </span>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="relative flex-1 md:flex-none">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full md:w-48 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Default</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Rating</option>
                                    </select>
                                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none" />
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${viewType === 'grid' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-primary'}`}
                                    >
                                        <FaThLarge />
                                    </button>
                                    <button
                                        onClick={() => setViewType('list')}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${viewType === 'list' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-primary'}`}
                                    >
                                        <FaList />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className={viewType === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                                : "space-y-6"
                            }>
                                {filteredProducts.map((product) => {
                                    const discount = product.originalPrice
                                        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                                        : 0;

                                    return (
                                        <div
                                            key={product.id}
                                            className={`group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${viewType === 'list' ? 'flex flex-col md:flex-row h-auto' : 'flex flex-col h-full'}`}
                                        >
                                            <div className={`relative overflow-hidden bg-gray-50 ${viewType === 'list' ? 'w-full md:w-72 shrink-0 h-72' : 'aspect-square pt-12 p-8 flex items-center justify-center'}`}>
                                                {discount > 0 && (
                                                    <div className="absolute top-6 left-6 z-10 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-primary/20 flex items-center gap-1 uppercase tracking-widest">
                                                        <FaPercent className="text-[8px]" /> {discount}% OFF
                                                    </div>
                                                )}
                                                <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className={`object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl ${viewType === 'list' ? 'w-48 h-48' : 'w-full h-full'}`}
                                                    />
                                                </Link>

                                                <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                                    <button
                                                        onClick={() => handleAction('wishlist', product)}
                                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark hover:text-red-500 hover:bg-red-50 shadow-lg transition-all active:scale-90"
                                                        title="Add to Wishlist"
                                                    >
                                                        <FaRegHeart />
                                                    </button>
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark hover:text-primary hover:bg-blue-50 shadow-lg transition-all active:scale-90"
                                                        title="Quick View"
                                                    >
                                                        <IoEyeSharp />
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="p-8 flex flex-col flex-1">
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-black italic text-gray-900 tracking-tighter mb-1 uppercase group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{product.category}</p>
                                                </div>

                                                <div className="flex items-center gap-1 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} size={12} className={i < Math.floor(product.rating) ? "text-orange-400" : "text-gray-200"} />
                                                    ))}
                                                    <span className="text-xs font-bold text-gray-400 ml-2">({product.rating})</span>
                                                </div>

                                                {product.sizes && product.sizes.length > 0 && (
                                                    <div className="mb-6">
                                                        <div className="flex flex-wrap gap-2">
                                                            {product.sizes.map((size) => (
                                                                <button
                                                                    key={size}
                                                                    onClick={() => toggleSizeSelection(product.id, size)}
                                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${productSizes[product.id] === size
                                                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110'
                                                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                                        }`}
                                                                >
                                                                    {size}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mt-auto flex items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-2xl font-black text-primary leading-none mb-1 flex items-center">
                                                            <FaRupeeSign className="text-sm mr-0.5" />{product.price}
                                                        </p>
                                                        {product.originalPrice && (
                                                            <p className="text-sm text-gray-300 line-through font-bold flex items-center">
                                                                <FaRupeeSign className="text-[10px] mr-0.5" />{product.originalPrice}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => handleAction('cart', product)}
                                                        className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white hover:rotate-12 transition-all shadow-sm active:scale-90"
                                                    >
                                                        <FaShoppingCart className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 flex flex-col items-center justify-center">
                                <div className="w-24 h-24 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mb-6 text-4xl">
                                    <FaFilter />
                                </div>
                                <h2 className="text-3xl font-black italic text-gray-900 uppercase tracking-tighter mb-4">No Products Found</h2>
                                <p className="text-gray-400 font-bold max-w-xs mx-auto mb-8">Try adjusting your filters or search criteria to find what you're looking for.</p>
                                <button
                                    onClick={resetFilters}
                                    className="bg-primary hover:bg-dark text-white font-black italic px-8 py-3 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95 uppercase tracking-widest text-sm"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </main>

                </div>
            </div>

        </div >
    );
};

export default Shop;
