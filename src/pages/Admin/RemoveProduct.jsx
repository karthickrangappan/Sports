import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/Shopcontext';
import { FiTrash2, FiSearch, FiFilter, FiAlertCircle, FiBox } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import PageHeader from '../PageHeader';

const RemoveProduct = () => {
    const { allProducts, deleteProductFromDb } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            try {
                if (deleteProductFromDb) {
                    await deleteProductFromDb(id);
                } else {
                    toast.success("Product removed (Simulation)");
                }
            } catch (error) {
                toast.error("Failed to remove product");
            }
        }
    };

    const categories = ['All', ...new Set(allProducts.map(p => p.category))];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <PageHeader />
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12 text-center lg:text-left">
                    <div className="flex-1">
                        <span className="text-[9px] sm:text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2 block">Catalog Control</span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">Catalog Management</h1>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] mt-4 flex items-center justify-center lg:justify-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mb-0.5"></span>
                            {allProducts.length} Active SKUs in Database
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-80 group">
                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by SKU name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-3.5 sm:py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
                            />
                        </div>
                        <div className="relative w-full sm:w-56 group">
                            <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-14 pr-10 py-3.5 sm:py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold appearance-none cursor-pointer shadow-sm"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {/* Mobile & Tablet Card View */}
                        <div className="lg:hidden space-y-4">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-[2rem] p-5 border border-gray-100 flex items-center gap-5 relative group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                                    <div className="w-20 h-20 bg-gray-50 rounded-2xl p-3 border border-gray-100 flex-shrink-0 relative overflow-hidden">
                                        <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[8px] font-black text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/5 rounded-full">{product.category}</span>
                                        </div>
                                        <h3 className="font-black text-gray-900 uppercase tracking-tighter italic truncate">{product.name}</h3>
                                        <p className="text-[10px] font-black text-primary italic mt-0.5">₹{product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                        title="Delete SKU"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="p-8 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Details</th>
                                        <th className="p-8 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                                        <th className="p-8 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">List Price</th>
                                        <th className="p-8 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="group hover:bg-gray-50/30 transition-colors">
                                            <td className="p-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-2xl p-4 border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                        <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-gray-900 group-hover:text-primary transition-colors text-lg uppercase tracking-tighter italic">{product.name}</h4>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">SKU: {product.id.slice(0, 12)}...</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <span className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-100">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="p-8">
                                                <span className="text-xl font-black text-gray-900 italic tracking-tight">₹{product.price}</span>
                                            </td>
                                            <td className="p-8 text-right">
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all group/btn active:scale-90"
                                                    title="Decommission Product"
                                                >
                                                    <FiTrash2 size={20} className="group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8 text-4xl">
                            <FiAlertCircle />
                        </div>
                        <h2 className="text-3xl font-black italic text-gray-900 uppercase tracking-tighter mb-4">No Products Found</h2>
                        <p className="text-gray-400 font-bold max-w-xs mx-auto">Try refining your search parameters or check your network connection.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RemoveProduct;
