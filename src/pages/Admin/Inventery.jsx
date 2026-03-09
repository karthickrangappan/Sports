import React, { useState, useContext, useMemo } from 'react';
import { ShopContext } from '../../Context/Shopcontext';
import Pageheader from '../Pageheader';
import {
    FaBox,
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaSave,
    FaTimes,
    FaPlus,
    FaMinus,
    FaExclamationTriangle,
    FaArrowRight
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Inventery = () => {
    const { dbProducts, deleteProductFromDb, updateProductInDb, user } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const filteredProducts = useMemo(() => {
        return dbProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [dbProducts, searchTerm, filterCategory]);

    const categories = useMemo(() => {
        const cats = dbProducts.map(p => p.category);
        return ['All', ...new Set(cats)];
    }, [dbProducts]);

    const handleEditStart = (product) => {
        setEditingId(product.id);
        setEditData({ ...product });
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleUpdate = async () => {
        const success = await updateProductInDb(editingId, editData);
        if (success) {
            setEditingId(null);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this product from inventory?")) {
            deleteProductFromDb(id);
        }
    };

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-gray-900 mb-2 italic">ACCESS REJECTED</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Admin Authorization Required</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Pageheader />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2 block">Stock Optimization</span>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter italic uppercase">Inventory Control</h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-80 group">
                            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Locate Product by Name..."
                                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative w-full sm:w-56 group">
                            <FaFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <select
                                className="w-full pl-14 pr-10 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold appearance-none cursor-pointer shadow-sm"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#121212] rounded-[2rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] -mr-10 -mt-10" />
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-3">Total Inventory</p>
                        <h3 className="text-4xl font-black italic">{dbProducts.length} <span className="text-xs uppercase opacity-30 not-italic ml-2">Units</span></h3>
                    </div>
                    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Low Stock Alerts</p>
                        <h3 className="text-4xl font-black italic text-accent">{dbProducts.filter(p => p.stock < 5).length} <span className="text-xs uppercase text-gray-300 not-italic ml-2">Warning</span></h3>
                    </div>
                    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Out of Stock</p>
                        <h3 className="text-4xl font-black italic text-red-500">{dbProducts.filter(p => !p.stock || p.stock === 0).length} <span className="text-xs uppercase text-gray-300 not-italic ml-2">Critical</span></h3>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8 text-4xl">
                            <FaBox />
                        </div>
                        <h2 className="text-3xl font-black italic text-gray-900 uppercase tracking-tighter mb-4">No Products Found</h2>
                        <p className="text-gray-400 font-bold max-w-xs mx-auto">Try refining your search parameters or check your network connection.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className={`bg-white rounded-[2rem] border transition-all duration-300 ${editingId === product.id ? 'border-primary shadow-xl shadow-primary/5 ring-1 ring-primary/20' : 'border-gray-100 hover:shadow-xl hover:shadow-gray-200/50'}`}>
                                <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-8">

                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-3 border border-gray-100 flex-shrink-0 relative overflow-hidden group">
                                        <img src={product.image} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-full">{product.category}</span>
                                            {(product.stock < 5) && (
                                                <span className="flex items-center gap-1.5 text-[9px] font-black text-accent uppercase tracking-widest px-3 py-1 bg-accent/5 rounded-full">
                                                    <FaExclamationTriangle size={10} /> Low Stock
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic truncate group-hover:text-primary transition-colors">{product.name}</h3>
                                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Inbound Reference: #{product.id.slice(0, 8)}</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-6 lg:gap-12 lg:border-l lg:pl-12 lg:border-gray-100">

                                        <div className="min-w-[100px]">
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">Unit Price</p>
                                            {editingId === product.id ? (
                                                <input
                                                    type="number"
                                                    value={editData.price}
                                                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-black italic text-primary outline-none focus:border-primary"
                                                />
                                            ) : (
                                                <p className="text-xl font-black italic text-primary tracking-tight">₹{product.price}</p>
                                            )}
                                        </div>

                                        <div className="min-w-[140px]">
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">On-Hand Quantity</p>
                                            {editingId === product.id ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setEditData({ ...editData, stock: Math.max(0, (Number(editData.stock) || 0) - 1) })}
                                                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-90 transition-all"
                                                    >
                                                        <FaMinus size={10} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={editData.stock}
                                                        onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                                                        className="w-16 bg-white border border-gray-100 rounded-xl py-2 text-center text-sm font-black text-gray-900 outline-none shadow-inner"
                                                    />
                                                    <button
                                                        onClick={() => setEditData({ ...editData, stock: (Number(editData.stock) || 0) + 1 })}
                                                        className="w-10 h-10 rounded-xl bg-[#121212] flex items-center justify-center text-white hover:bg-primary active:scale-90 transition-all"
                                                    >
                                                        <FaPlus size={10} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-4">
                                                    <p className={`text-2xl font-black italic tracking-tighter ${product.stock < 5 ? 'text-accent' : 'text-gray-900'}`}>{product.stock || 0}</p>
                                                    <div className="flex-1 h-1.5 bg-gray-50 rounded-full overflow-hidden max-w-[60px]">
                                                        <div
                                                            className={`h-full transition-all duration-1000 ${product.stock < 5 ? 'bg-accent' : (product.stock < 20 ? 'bg-yellow-400' : 'bg-green-500')}`}
                                                            style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="hidden md:block min-w-[80px]">
                                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">Demand Rate</p>
                                            <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase">
                                                <FaArrowRight className="-rotate-45" /> High
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 min-w-[120px]">
                                            {editingId === product.id ? (
                                                <>
                                                    <button
                                                        onClick={handleUpdate}
                                                        className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-[#121212] transition-all shadow-lg shadow-primary/20 active:scale-90"
                                                        title="Save Changes"
                                                    >
                                                        <FaSave size={14} />
                                                    </button>
                                                    <button
                                                        onClick={handleEditCancel}
                                                        className="w-11 h-11 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                                                        title="Cancel Edit"
                                                    >
                                                        <FaTimes size={14} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEditStart(product)}
                                                        className="w-11 h-11 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-90"
                                                        title="Quick Edit"
                                                    >
                                                        <FaEdit size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="w-11 h-11 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                                                        title="Remove Product"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventery;
