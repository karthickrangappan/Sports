import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/Shopcontext';
import PageHeader from './PageHeader';
import {
    FaBox,
    FaClock,
    FaCheckCircle,
    FaTruck,
    FaArrowRight,
    FaChevronDown,
    FaChevronUp,
    FaMapMarkerAlt,
    FaCreditCard,
    FaShoppingBag
} from 'react-icons/fa';

const Orders = () => {
    const { orders, ordersLoading, expandedOrders, toggleOrderDetails, fetchedOrders } = useContext(ShopContext);

    useEffect(() => {
        fetchedOrders();
    }, []);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    const getCurrentStep = (orderStatus) => {
        const status = orderStatus?.toLowerCase() || 'pending';
        if (status === 'delivered') return 4;
        if (status === 'shipped') return 3;
        if (status === 'processing' || status === 'paid') return 2;
        return 1;
    };

    if (ordersLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHeader />
                <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <PageHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="mb-10 lg:mb-16">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2 block">Purchase history</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter italic uppercase">My Orders</h1>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-8 sm:p-16 lg:p-24 text-center border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mb-8">
                            <FaShoppingBag size={48} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 italic tracking-tight uppercase">No Orders Yet</h2>
                        <p className="text-gray-500 font-bold mb-10 max-w-sm">You haven't placed any orders yet. Start your sports journey today!</p>
                        <button
                            onClick={() => window.location.href = '/shop'}
                            className="bg-primary text-white px-10 py-4 rounded-2xl font-black italic uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-3"
                        >
                            Explore Gear <FaArrowRight size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 lg:space-y-8">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-gray-200/50">
                                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/50">
                                    <div className="flex flex-wrap items-center gap-6 md:gap-12">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">#{order.orderId || order.id.slice(0, 8)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                                            <p className="text-sm font-black text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                                            <p className="text-sm font-black text-primary italic tracking-tight text-xl">₹{order.total}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(order.status)}`}>
                                                {order.status || 'Processing'}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleOrderDetails(order.id)}
                                        className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:text-orange-600 transition-colors"
                                    >
                                        {expandedOrders[order.id] ? (
                                            <>Hide Details <FaChevronUp size={16} /></>
                                        ) : (
                                            <>View Details <FaChevronDown size={16} /></>
                                        )}
                                    </button>
                                </div>

                                <div className={`transition-all duration-500 ease-in-out ${expandedOrders[order.id] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <div className="p-8 border-t border-gray-100">

                                        <div className="mb-16 bg-gray-50/50 rounded-[2rem] p-8 lg:p-12 border border-gray-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-10 -mt-10" />

                                            <div className="flex items-center gap-3 mb-10">
                                                <FaTruck className="text-primary" size={20} />
                                                <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] italic">Live Logistics Tracking</h4>
                                            </div>

                                            <div className="relative">
                                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block" />

                                                <div
                                                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-1000 ease-out hidden md:block"
                                                    style={{ width: `${((getCurrentStep(order.status) - 1) / 3) * 100}%` }}
                                                />

                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                                                    {[
                                                        { label: "Confirmed", icon: <FaClock />, step: 1 },
                                                        { label: "Processing", icon: <FaCheckCircle />, step: 2 },
                                                        { label: "Shipped", icon: <FaTruck />, step: 3 },
                                                        { label: "Delivered", icon: <FaBox />, step: 4 }
                                                    ].map((step) => {
                                                        const isActive = getCurrentStep(order.status) >= step.step;
                                                        return (
                                                            <div key={step.step} className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
                                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 mb-4 shadow-lg ${isActive ? 'bg-primary text-white scale-110 shadow-primary/20' : 'bg-white text-gray-300 border border-gray-100'}`}>
                                                                    {step.icon}
                                                                </div>
                                                                <div className="text-left md:text-center">
                                                                    <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                                                        {step.label}
                                                                    </p>
                                                                    {isActive && (
                                                                        <p className="text-[8px] font-bold text-green-500 uppercase tracking-tight mt-0.5">Completed</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:grid md:grid-cols-12 md:gap-12">
                                            <div className="md:col-span-12 lg:col-span-8 space-y-6">
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Items Purchased</h4>
                                                <div className="space-y-4">
                                                    {order.items?.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white transition-colors">
                                                            <div className="w-20 h-20 bg-white rounded-xl p-2 flex items-center justify-center border border-gray-100 flex-shrink-0 shadow-sm">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate">{item.name}</h5>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                                                    Size: {item.size || 'N/A'} <span className="mx-2">|</span> Qty: {item.quantity}
                                                                </p>
                                                            </div>
                                                            <p className="text-sm font-black text-gray-900 italic tracking-tight whitespace-nowrap">₹{item.price * item.quantity}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="md:col-span-12 lg:col-span-4 mt-10 lg:mt-0 space-y-8">
                                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <FaMapMarkerAlt size={16} className="text-primary" />
                                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Shipping Address</h4>
                                                    </div>
                                                    <div className="text-xs font-bold text-gray-500 leading-relaxed space-y-1">
                                                        <p className="text-gray-900 font-black">{order.customer?.name}</p>
                                                        <p>{order.customer?.address}</p>
                                                        <p>{order.customer?.city} - {order.customer?.pincode}</p>
                                                        <p>Phone: {order.customer?.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <FaCreditCard size={16} className="text-primary" />
                                                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Payment Meta</h4>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="font-bold text-gray-400 uppercase tracking-widest">Method</span>
                                                            <span className="font-black text-gray-900 uppercase tracking-tight italic">{order.paymentType}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="font-bold text-gray-400 uppercase tracking-widest">ID</span>
                                                            <span className="font-bold text-gray-500 font-mono tracking-tight">{order.paymentId}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-xs pt-3 border-t border-gray-200 mt-2">
                                                            <span className="font-black text-gray-900 uppercase tracking-widest">Grand Total</span>
                                                            <span className="font-black text-primary italic text-lg tracking-tight">₹{order.total}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default Orders;
