import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/Shopcontext';
import { FiTrash2, FiSearch, FiFilter, FiAlertCircle, FiBox } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Pageheader from '../Pageheader';

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
            <Pageheader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter uppercase">Inventory Management</h2>
                            <p className="text-gray-500 mt-2 font-medium">Manage and remove products from your store catalog.</p>
                        </div>
                        <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <FiBox /> Total Products: {allProducts.length}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                            />
                        </div>
                        <div className="relative min-w-[200px]">
                            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-11 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium appearance-none cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                    {filteredProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
                                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 border border-gray-100 flex-shrink-0">
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</h4>
                                                        <span className="text-xs text-gray-400">ID: {product.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wide">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <span className="font-black text-gray-900 italic">₹{product.price}</span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-red-200 active:scale-90"
                                                    title="Delete Product"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-20 text-center flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                                <FiAlertCircle size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RemoveProduct;