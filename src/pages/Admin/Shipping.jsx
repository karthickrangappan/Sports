import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../Firebase';
import { collectionGroup, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { ShopContext } from '../../Context/Shopcontext';
import PageHeader from '../PageHeader';
import {
    FaTruck,
    FaCheckCircle,
    FaClock,
    FaBox,
    FaUser,
    FaMapMarkerAlt,
    FaChevronRight,
    FaSearch,
    FaFilter
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Shipping = () => {
    const { user } = useContext(ShopContext);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            let allFetchedOrders = [];

            try {
                const ordersQuery = query(collectionGroup(db, "orders"));
                const querySnapshot = await getDocs(ordersQuery);

                allFetchedOrders = querySnapshot.docs.map(d => ({
                    id: d.id,
                    path: d.ref.path,
                    ...d.data(),
                    createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate() : new Date(),
                }));
            } catch (cgError) {
                console.warn("CollectionGroup failed, attempting fallback aggregation:", cgError);

                const usersSnap = await getDocs(collection(db, "users"));
                const userOrderPromises = usersSnap.docs.map(async (userDoc) => {
                    const ordersSnap = await getDocs(collection(db, "users", userDoc.id, "orders"));
                    return ordersSnap.docs.map(o => ({
                        id: o.id,
                        path: o.ref.path,
                        ...o.data(),
                        createdAt: o.data().createdAt?.toDate ? o.data().createdAt.toDate() : new Date(),
                    }));
                });

                const results = await Promise.all(userOrderPromises);
                allFetchedOrders = results.flat();
            }

            allFetchedOrders.sort((a, b) => b.createdAt - a.createdAt);
            setAllOrders(allFetchedOrders);

        } catch (error) {
            console.error("Critical Logistics Synchronization Error:", error);
            toast.error("Failed to synchronize logistics. Check your Firebase permissions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchAllOrders();
        }
    }, [user]);

    const updateOrderStatus = async (orderPath, newStatus) => {
        try {
            const orderRef = doc(db, orderPath);
            await updateDoc(orderRef, { status: newStatus });

            setAllOrders(prev => prev.map(order =>
                order.path === orderPath ? { ...order, status: newStatus } : order
            ));

            toast.success(`Order status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const getNextStatus = (currentStatus) => {
        const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
        const index = statuses.indexOf(currentStatus);
        if (index !== -1 && index < statuses.length - 1) {
            return statuses[index + 1];
        }
        return null;
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return <FaClock className="text-yellow-500" />;
            case 'confirmed': return <FaCheckCircle className="text-blue-500" />;
            case 'processing': return <FaBox className="text-purple-500" />;
            case 'shipped': return <FaTruck className="text-orange-500" />;
            case 'delivered': return <FaCheckCircle className="text-green-500" />;
            default: return <FaClock className="text-gray-400" />;
        }
    };

    const filteredOrders = allOrders.filter(order => {
        const searchMatch = (order.orderId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.customer?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = filterStatus === 'All' || order.status === filterStatus;
        return searchMatch && statusMatch;
    });

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-500">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <PageHeader />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-12 text-center lg:text-left">
                    <div>
                        <span className="text-[9px] sm:text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2 block font-barlow">Logistics Control</span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">Shipping Management</h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-80 group">
                            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Locate Order ID or Person..."
                                className="w-full pl-14 pr-6 py-3.5 sm:py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative w-full sm:w-56 group">
                            <FaFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <select
                                className="w-full pl-14 pr-10 py-3.5 sm:py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold appearance-none cursor-pointer shadow-sm"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Logistics Phases</option>
                                <option value="Pending">Pending Verification</option>
                                <option value="Confirmed">Confirmed Inbound</option>
                                <option value="Processing">Processing Operations</option>
                                <option value="Shipped">Dispatched Product</option>
                                <option value="Delivered">Delivered (Complete)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                            <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-6 text-gray-400 font-bold uppercase tracking-[0.3em] text-[8px] sm:text-[10px]">Synchronizing Logistics...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-12 sm:p-24 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6 sm:mb-8 text-3xl sm:text-4xl">
                            <FaTruck />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black italic text-gray-900 uppercase tracking-tighter mb-4">No Data Found</h2>
                        <p className="text-sm sm:text-gray-400 font-bold max-w-xs mx-auto uppercase tracking-widest text-[10px]">Logistics chain is currently empty for these parameters.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:gap-6">
                        {filteredOrders.map((order) => {
                            const next = getNextStatus(order.status);
                            return (
                                <div key={order.path} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
                                    <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">

                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-none lg:flex lg:flex-wrap items-center gap-6 sm:gap-10 lg:flex-1">
                                            <div className="col-span-1 min-w-[100px] sm:min-w-[120px]">
                                                <p className="text-[8px] sm:text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 sm:mb-2 italic">Ref ID</p>
                                                <p className="text-xs sm:text-sm font-black text-gray-900 tracking-tight leading-none uppercase">#{order.orderId.slice(0, 8)}</p>
                                            </div>

                                            <div className="col-span-1 min-w-[120px] sm:min-w-[150px]">
                                                <p className="text-[8px] sm:text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 sm:mb-2 italic">Personnel</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[8px] sm:text-[10px]">
                                                        <FaUser size={8} />
                                                    </div>
                                                    <p className="text-[11px] sm:text-xs font-bold text-gray-700 truncate max-w-[100px] sm:max-w-none">{order.customer?.name}</p>
                                                </div>
                                            </div>

                                            <div className="col-span-1 min-w-[120px] sm:min-w-[150px]">
                                                <p className="text-[8px] sm:text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 sm:mb-2 italic">Destination</p>
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-primary/40" size={10} />
                                                    <p className="text-[11px] sm:text-xs font-bold text-gray-500 truncate max-w-[120px] sm:max-w-none">{order.customer?.city || 'HQ'}</p>
                                                </div>
                                            </div>

                                            <div className="col-span-1">
                                                <p className="text-[8px] sm:text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1 sm:mb-2 italic">Phase</p>
                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                    {getStatusIcon(order.status)}
                                                    <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${order.status === 'Delivered' ? 'text-green-600' : 'text-primary'}`}>
                                                        {order.status || 'Verified'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 border-t border-gray-50 lg:border-t-0 pt-6 lg:pt-0">
                                            {next ? (
                                                <button
                                                    onClick={() => updateOrderStatus(order.path, next)}
                                                    className="flex-1 lg:flex-none bg-[#121212] hover:bg-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-3 group/btn active:scale-95 shadow-lg shadow-gray-200/50"
                                                >
                                                    Move <span className="hidden sm:inline">Phase</span> <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            ) : (
                                                <div className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-green-50 text-green-600 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-green-100 italic">
                                                    <FaCheckCircle className="animate-pulse" /> Complete
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-6 sm:px-8 py-4 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100">
                                        <div className="flex items-center gap-4 sm:gap-6">
                                            <div className="flex -space-x-2 sm:-space-x-3">
                                                {order.items?.slice(0, 3).map((item, idx) => (
                                                    <div key={idx} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white border border-gray-100 p-1 shadow-sm ring-2 ring-white">
                                                        <img src={item.image} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                ))}
                                                {order.items?.length > 3 && (
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-200 border border-gray-100 flex items-center justify-center text-[8px] sm:text-[9px] font-black text-gray-500 shadow-sm relative z-10 ring-2 ring-white">
                                                        +{order.items.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                                                {order.items?.length} Unit{order.items?.length !== 1 ? 's' : ''} <span className="hidden sm:inline mx-3 opacity-20">|</span> <span className="sm:inline hidden text-gray-300">Net Valuation:</span> <span className="text-primary font-black italic ml-1 sm:ml-2">₹{order.total}</span>
                                            </p>
                                        </div>
                                        <p className="sm:hidden text-[11px] font-black text-primary italic">TOTAL VALUATION: ₹{order.total}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shipping;
