import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../Firebase';
import { collectionGroup, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { ShopContext } from '../../Context/Shopcontext';
import Pageheader from '../Pageheader';
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
            <Pageheader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2 block">Logistics Control</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic uppercase">Shipping Management</h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative group">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Order ID or Customer..."
                                className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold w-full sm:w-64 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative group">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <select
                                className="pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold appearance-none cursor-pointer shadow-sm w-full sm:w-48"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Logistics...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6 text-3xl">
                            <FaTruck />
                        </div>
                        <h2 className="text-2xl font-black italic text-gray-900 uppercase tracking-tighter mb-2">No Logistics Found</h2>
                        <p className="text-gray-400 font-bold text-sm">Either no orders have been placed or your filters are too strict.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredOrders.map((order) => {
                            const next = getNextStatus(order.status);
                            return (
                                <div key={order.path} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
                                    <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                                        <div className="flex flex-wrap items-center gap-8 md:gap-12 lg:flex-1">
                                            <div className="min-w-[120px]">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Inbound Reference</p>
                                                <p className="text-sm font-black text-gray-900 tracking-tight italic">#{order.orderId}</p>
                                            </div>

                                            <div className="min-w-[150px]">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Personnel</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px]">
                                                        <FaUser size={10} />
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-700">{order.customer?.name}</p>
                                                </div>
                                            </div>

                                            <div className="min-w-[180px]">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Destination</p>
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-gray-300" size={10} />
                                                    <p className="text-xs font-bold text-gray-500 truncate max-w-[200px]">{order.customer?.city || 'HQ'}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Phase Status</p>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(order.status)}
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'text-green-600' : 'text-primary'}`}>
                                                        {order.status || 'Verified'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 border-t lg:border-t-0 pt-6 lg:pt-0">
                                            {next ? (
                                                <button
                                                    onClick={() => updateOrderStatus(order.path, next)}
                                                    className="flex-1 lg:flex-none bg-[#121212] hover:bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 group/btn active:scale-95 shadow-lg shadow-gray-200"
                                                >
                                                    Move to {next} <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100">
                                                    <FaCheckCircle /> Logistics Complete
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-8 py-4 bg-gray-50 flex flex-wrap items-center gap-6 border-t border-gray-100">
                                        <div className="flex -space-x-3">
                                            {order.items?.slice(0, 3).map((item, idx) => (
                                                <div key={idx} className="w-8 h-8 rounded-lg bg-white border border-gray-100 p-1 shadow-sm">
                                                    <img src={item.image} alt="" className="w-full h-full object-contain" />
                                                </div>
                                            ))}
                                            {order.items?.length > 3 && (
                                                <div className="w-8 h-8 rounded-lg bg-gray-200 border border-gray-100 flex items-center justify-center text-[8px] font-black text-gray-500 shadow-sm relative z-10">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {order.items?.length} Items <span className="mx-3 opacity-30">|</span> Total Value: <span className="text-primary italic">₹{order.total}</span>
                                        </p>
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
