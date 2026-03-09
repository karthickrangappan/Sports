import React, { useState, useContext } from 'react';
import { ShopContext } from '../../Context/Shopcontext';
import { toast } from 'react-hot-toast';
import { FiUploadCloud, FiPlus, FiX, FiDollarSign, FiTag, FiImage, FiType, FiCheck, FiStar, FiLayers } from 'react-icons/fi';
import Pageheader from '../Pageheader';

const AddProduct = () => {
    const { addProductToDb } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        originalPrice: '',
        stock: '',
        image: '',
        rating: '',
        sizes: [],
        description: '',
        features: []
    });
    const [featureInput, setFeatureInput] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const toggleSize = (size) => {
        setProduct(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setProduct({ ...product, features: [...product.features, featureInput.trim()] });
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        const newFeatures = product.features.filter((_, i) => i !== index);
        setProduct({ ...product, features: newFeatures });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (addProductToDb) {
                const dataToSubmit = {
                    ...product,
                    price: Number(product.price),
                    originalPrice: Number(product.originalPrice) || Number(product.price),
                    stock: Number(product.stock) || 0,
                    rating: Number(product.rating) || 4.5,
                };

                await addProductToDb(dataToSubmit);
                toast.success('Product added successfully!');
                setProduct({
                    name: '',
                    category: '',
                    price: '',
                    originalPrice: '',
                    stock: '',
                    image: '',
                    rating: '',
                    sizes: [],
                    description: '',
                    features: []
                });
            } else {
                toast.success('Product added (Simulation)');
            }
        } catch (error) {
            toast.error('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Pageheader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-100 border border-gray-100">
                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter uppercase">Add New Gear</h2>
                                <p className="text-gray-500 mt-2">Inventory Management Terminal</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Product Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FiType className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={product.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold text-gray-900"
                                            placeholder="e.g. Pro Runner X1"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Category</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <FiTag className="text-gray-400" />
                                            </div>
                                            <select
                                                name="category"
                                                value={product.category}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold text-gray-900 appearance-none cursor-pointer"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Cricket Kit">Cricket Kit</option>
                                                <option value="Cricket Wears">Cricket Wears</option>
                                                <option value="Football Kit">Football Kit</option>
                                                <option value="Football Wears">Football Wears</option>
                                                <option value="Tennis Kit">Tennis Kit</option>
                                                <option value="Tennis Wears">Tennis Wears</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Stock Quantity</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <FiLayers className="text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={product.stock}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold text-gray-900"
                                                placeholder="Total Inventory"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Sale Price (₹)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                                                ₹
                                            </div>
                                            <input
                                                type="number"
                                                name="price"
                                                value={product.price}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold text-gray-900"
                                                placeholder="999"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Old Price / MRP (₹)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                ₹
                                            </div>
                                            <input
                                                type="number"
                                                name="originalPrice"
                                                value={product.originalPrice}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold text-gray-900"
                                                placeholder="1299"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(product.category.toLowerCase().includes('wears') || product.category.toLowerCase().includes('kit')) && (
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Available Sizes</label>
                                            <div className="flex flex-wrap gap-3">
                                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => toggleSize(size)}
                                                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-black transition-all duration-200 border-2 ${product.sizes.includes(size)
                                                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110'
                                                            : 'bg-white border-gray-100 text-gray-400 hover:border-primary hover:text-primary'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {(product.category.toLowerCase().includes('kit') || product.category.toLowerCase().includes('wears')) && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Performance Rating</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-orange-400">
                                                    <FiStar />
                                                </div>
                                                <input
                                                    type="number"
                                                    name="rating"
                                                    value={product.rating}
                                                    onChange={handleChange}
                                                    step="0.1"
                                                    min="0"
                                                    max="5"
                                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold text-gray-900"
                                                    placeholder="4.5"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Media Asset (Image URL)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FiImage className="text-gray-400" />
                                        </div>
                                        <input
                                            type="url"
                                            name="image"
                                            value={product.image}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold text-gray-900"
                                            placeholder="https://example.com/gear-image.jpg"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-gray-900 resize-none"
                                        placeholder="Outline product specifications and material benefits..."
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Key Features</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
                                            placeholder="e.g. Aerodynamic Design"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                        />
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-primary transition-colors flex items-center gap-2"
                                        >
                                            <FiPlus /> Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {product.features.map((feature, index) => (
                                            <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {feature}
                                                <button type="button" onClick={() => removeFeature(index)} className="hover:text-red-500">
                                                    <FiX />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-primary text-white rounded-2xl font-black italic text-lg uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3"
                                >
                                    {loading ? 'Processing...' : <><FiUploadCloud size={24} /> Publish Product</>}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Live Catalog Preview</h3>
                            <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                                <div className="relative aspect-square bg-gray-50 rounded-3xl mb-6 overflow-hidden flex items-center justify-center">
                                    {product.image ? (
                                        <img src={product.image} alt="Preview" className="w-full h-full object-contain mix-blend-multiply p-6" />
                                    ) : (
                                        <div className="text-gray-300 flex flex-col items-center">
                                            <FiImage size={48} />
                                            <span className="text-xs font-bold uppercase mt-2">Asset Required</span>
                                        </div>
                                    )}
                                    {product.category && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase tracking-widest shadow-sm border border-primary/10">
                                            {product.category}
                                        </div>
                                    )}
                                    {product.rating && (
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-orange-500 uppercase tracking-widest shadow-sm flex items-center gap-1">
                                            <FiStar fill="currentColor" /> {product.rating}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-xl font-black text-gray-900 italic tracking-tight mb-2 line-clamp-1 uppercase">
                                        {product.name || "Equipment Label"}
                                    </h4>

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl font-black text-primary italic">
                                            ₹{product.price || "0.00"}
                                        </span>
                                        {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                                            <span className="text-sm font-bold text-gray-300 line-through">
                                                ₹{product.originalPrice}
                                            </span>
                                        )}
                                        {product.stock && (
                                            <div className="ml-auto text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                                Stock: {product.stock}
                                            </div>
                                        )}
                                    </div>

                                    {product.sizes.length > 0 && (
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {product.sizes.map(s => (
                                                <span key={s} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded text-[10px] font-black text-gray-400 uppercase">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        {(product.features.length > 0 ? product.features.slice(0, 3) : ["Elite Engineering", "Impact Protection"]).map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                <FiCheck className="text-green-500" /> {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;