import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import { FaUser, FaEnvelope, FaShieldAlt, FaShoppingCart, FaEdit, FaCamera, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import Pageheader from './Pageheader';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, orders, wishlist, cartItems, addresses, addAddress, deleteAddress } = useContext(ShopContext);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [newAddress, setNewAddress] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    if (!user) return null;

    const stats = [
        { label: "Total Orders", value: orders.length, icon: <FaShoppingBag />, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Saved Items", value: wishlist.length, icon: <FaHeart />, color: "text-red-500", bg: "bg-red-50" },
        { label: "Cart Items", value: cartItems.length, icon: <FaShoppingCart />, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Pageheader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500" />

                            <div className="relative mb-8 inline-block">
                                <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                    ) : (
                                        <FaUser size={64} className="text-gray-200" />
                                    )}
                                </div>
                                <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <FaCamera size={16} />
                                </button>
                            </div>

                            <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter mb-2 leading-none">
                                {user.displayName || "Elite Athlete"}
                            </h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-8">
                                Member since {new Date(user.metadata?.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>

                            <div className="space-y-4 text-left">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:border-primary/20 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary shadow-sm">
                                        <FaEnvelope size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Email Identity</p>
                                        <p className="text-sm font-bold text-gray-700 truncate max-w-[180px]">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:border-primary/20 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-orange-500 shadow-sm">
                                        <FaShieldAlt size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Access Tier</p>
                                        <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">{user.role || "Standard"}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-5 bg-gray-900 text-white rounded-2xl font-black italic uppercase tracking-widest text-sm hover:bg-primary transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-3">
                                <FaEdit /> Update Profile
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-md flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
                                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                                        {React.cloneElement(stat.icon, { size: 24 })}
                                    </div>
                                    <p className="text-sm font-black text-gray-900 italic uppercase tracking-tight mb-1">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-xl font-black italic tracking-tighter text-gray-900 uppercase">Account Settings</h3>
                                <span className="px-3 py-1 bg-green-50 text-green-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-100 shadow-sm">
                                    Active Secure
                                </span>
                            </div>
                            <div className="bg-gray-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary shadow-sm">
                                        <FaMapMarkerAlt size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Default Shipping</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                            {addresses.length > 0
                                                ? `${addresses[0].address}, ${addresses[0].city}`
                                                : "No address saved yet"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="px-8 py-3 border-2 border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 hover:border-primary hover:text-primary transition-all">
                                    Manage Addresses
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {showAddressModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black italic tracking-tighter text-gray-900 uppercase">Manage Addresses</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Stored Delivery Locations</p>
                            </div>
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white hover:border-red-100 transition-all">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <FaPlus size={10} />
                                        </div>
                                        Add New Address
                                    </h4>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-primary/30 transition-colors"
                                            value={newAddress.fullName}
                                            onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Identity"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-primary/30 transition-colors"
                                            value={newAddress.email}
                                            onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Contact Number"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-primary/30 transition-colors"
                                            value={newAddress.phone}
                                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                        />
                                        <textarea
                                            placeholder="Complete Address"
                                            rows="2"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-primary/30 transition-colors resize-none"
                                            value={newAddress.address}
                                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-primary/30 transition-colors"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Pincode"
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-primary/30 transition-colors"
                                                value={newAddress.pincode}
                                                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (Object.values(newAddress).every(val => val !== "")) {
                                                    addAddress(newAddress);
                                                    setNewAddress({
                                                        fullName: "",
                                                        email: "",
                                                        phone: "",
                                                        address: "",
                                                        city: "",
                                                        pincode: ""
                                                    });
                                                } else {
                                                    toast.error("Please fill all fields");
                                                }
                                            }}
                                            className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black italic uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl shadow-gray-200 active:scale-95">
                                            Save Address
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6">Saved Locations ({addresses.length})</h4>
                                    <div className="space-y-4">
                                        {addresses.length === 0 ? (
                                            <div className="p-8 rounded-3xl border border-dashed border-gray-200 text-center">
                                                <FaMapMarkerAlt size={24} className="mx-auto text-gray-200 mb-3" />
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No addresses saved</p>
                                            </div>
                                        ) : (
                                            addresses.map((address) => (
                                                <div key={address.id} className="p-5 rounded-3xl bg-gray-50 border border-gray-100 group relative">
                                                    <button
                                                        onClick={() => deleteAddress(address.id)}
                                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                                                        <FaTrash size={12} />
                                                    </button>
                                                    <p className="text-sm font-black text-gray-900 mb-0.5 uppercase tracking-tighter italic">{address.fullName}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 truncate">{address.email}</p>
                                                    <div className="h-px bg-gray-100 my-3" />
                                                    <p className="text-xs font-bold text-gray-700 mb-1">{address.address}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{address.city} - {address.pincode}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                        <p className="text-[10px] font-black text-gray-600 uppercase italic tracking-widest">{address.phone}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;
