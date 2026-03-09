import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from '../Context/Shopcontext';
import toast from "react-hot-toast";
import {
    FaChevronRight,
    FaCreditCard,
    FaTruck,
    FaMapMarkerAlt,
    FaShoppingBag,
    FaCheckCircle,
    FaArrowLeft,
    FaLock
} from 'react-icons/fa';
import { FiShield } from 'react-icons/fi';
import Pageheader from './Pageheader';


const Checkout = () => {
    const { cartItems: cart = [], placeOrder, user, addresses } = useContext(ShopContext);
    const navigate = useNavigate();
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const [paymentMethod, setPaymentMethod] = useState("razorpay");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    useEffect(() => {
        if (user) {
            setForm((prev) => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSelectedAddressId(null);
    };

    const handleSelectAddress = (addr) => {
        setSelectedAddressId(addr.id);
        setForm({
            ...form,
            name: addr.fullName,
            email: addr.email,
            address: addr.address,
            city: addr.city,
            pincode: addr.pincode,
            phone: addr.phone,
        });
    };
    const validateForm = () => {
        const phoneRegex = /^[0-9]{10}$/;
        const pincodeRegex = /^[0-9]{6}$/;

        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.address ||
            !form.city ||
            !form.pincode
        ) {
            toast.dismiss();
            toast.error("Please fill all address details");
            return false;
        }

        if (!phoneRegex.test(form.phone)) {
            toast.dismiss();
            toast.error("Enter valid 10-digit phone number");
            return false;
        }

        if (!pincodeRegex.test(form.pincode)) {
            toast.dismiss();
            toast.error("Enter valid 6-digit pincode");
            return false;
        }

        if (!cart.length) {
            toast.dismiss();
            toast.error("Cart is empty");
            return false;
        }

        return true;
    };

    const handleCOD = async () => {
        if (!validateForm()) return;

        try {
            await placeOrder({
                customer: form,
                paymentType: "COD",
                paymentId: "COD",
                status: "Pending",
            });

            toast.success("Order placed successfully 🚚 (Cash on Delivery)");
            setTimeout(() => navigate("/orders"), 2000);
        } catch (error) {
            console.error(error);
            toast.dismiss();
            toast.error("Order placement failed");
        }
    };

    const loadRazorpay = () =>
        new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handleRazorpay = async () => {
        if (!validateForm()) return;

        const isLoaded = await loadRazorpay();

        if (!isLoaded) {
            toast.dismiss();
            toast.error("Razorpay SDK failed to load");
            return;
        }

        const options = {
            key: "rzp_test_2ORD27rb7vGhwj",
            amount: total * 100,
            currency: "INR",
            name: "Sports Hub",
            description: "Order Payment",

            handler: async function (response) {
                try {
                    await placeOrder({
                        customer: form,
                        paymentType: "Razorpay",
                        paymentId: response.razorpay_payment_id,
                        status: "Paid",
                    });

                    toast.success("Payment successful ✅");
                    setTimeout(() => navigate("/orders"), 2000);
                } catch (error) {
                    console.error(error);
                    toast.dismiss();
                    toast.error("Order placement failed after payment");
                }
            },

            modal: {
                ondismiss: () => {
                    toast.dismiss();
                    toast.error("Payment cancelled ❌");
                },
            },

            prefill: {
                name: form.name,
                email: form.email,
                contact: form.phone,
            },

            theme: {
                color: "#c9a84c",
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <div className="min-h-screen bg-[#FBFBFB] font-sans selection:bg-[#c9a84c]/20 pb-20">
            <Pageheader />
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-7 space-y-12">

                        <section>

                            <div className="flex items-center gap-3 mb-8">
                                <FaMapMarkerAlt className="text-[#c9a84c]" size={20} />
                                <h2 className="text-2xl font-black text-[#121212] italic tracking-tight">Delivery Details</h2>
                                <div className="h-[1px] flex-1 bg-gray-100 ml-4" />
                            </div>

                            {addresses && addresses.length > 0 && (
                                <div className="mb-10">
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">Select from Saved Locations</h3>
                                    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                        {addresses.map((addr) => (
                                            <button
                                                key={addr.id}
                                                onClick={() => handleSelectAddress(addr)}
                                                className={`
                                                    min-w-[240px] p-5 rounded-2xl border text-left transition-all duration-300 relative group
                                                    ${selectedAddressId === addr.id
                                                        ? 'bg-[#121212] border-[#121212] text-white shadow-xl shadow-gray-200'
                                                        : 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c]'}
                                                `}
                                            >
                                                <p className="text-xs font-black uppercase tracking-tight mb-1 truncate">{addr.street}</p>
                                                <p className={`text-[10px] font-bold ${selectedAddressId === addr.id ? 'text-gray-400' : 'text-gray-400'} uppercase tracking-widest`}>
                                                    {addr.city}, {addr.pincode}
                                                </p>
                                                {selectedAddressId === addr.id && (
                                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#c9a84c]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="E.g. Alexander McQueen"
                                        className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Email Identity</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="alex@boutique.com"
                                        className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Contact Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 00000 00000"
                                        className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Complete Address</label>
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Floor 4, Royal Heritage..."
                                        className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="Mumbai"
                                        className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block px-2">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        placeholder="400001"
                                        className="w-full bg-white border border-gray-100 py-4 px-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/20 focus:border-[#c9a84c] shadow-sm transition-all"
                                    />
                                </div>
                            </div>
                        </section>

                        <section>

                            <div className="flex items-center gap-3 mb-8">
                                <FaCreditCard className="text-[#c9a84c]" size={20} />
                                <h2 className="text-2xl font-black text-[#121212] italic tracking-tight">Payment Method</h2>
                                <div className="h-[1px] flex-1 bg-gray-100 ml-4" />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setPaymentMethod("razorpay")}
                                    className={`
                                        flex-1 p-5 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden group
                                        ${paymentMethod === "razorpay"
                                            ? 'bg-[#121212] border-[#121212] text-white shadow-xl shadow-gray-200'
                                            : 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c] shadow-sm'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0
                                            ${paymentMethod === "razorpay" ? 'bg-white/10 text-[#c9a84c]' : 'bg-gray-50 text-gray-400'}
                                        `}>
                                            <FaCreditCard size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-black uppercase tracking-widest leading-tight">Razorpay Online</h3>
                                            <p className={`text-[9px] font-medium mt-0.5 ${paymentMethod === "razorpay" ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Cards, UPI, Netbanking
                                            </p>
                                        </div>
                                    </div>
                                    {paymentMethod === "razorpay" && (
                                        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                                    )}
                                </button>

                                <button
                                    onClick={() => setPaymentMethod("cod")}
                                    className={`
                                        flex-1 p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group
                                        ${paymentMethod === "cod"
                                            ? 'bg-[#121212] border-[#121212] text-white shadow-xl shadow-gray-200'
                                            : 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c] shadow-sm'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0
                                            ${paymentMethod === "cod" ? 'bg-white/10 text-[#c9a84c]' : 'bg-gray-50 text-gray-400'}
                                        `}>
                                            <FaTruck size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-black uppercase tracking-widest leading-tight">Cash On Delivery</h3>
                                            <p className={`text-[9px] font-medium mt-0.5 ${paymentMethod === "cod" ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Pay upon successful delivery
                                            </p>
                                        </div>
                                    </div>
                                    {paymentMethod === "cod" && (
                                        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                                    )}
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-10 bg-white border border-gray-100 rounded-[3rem] p-8 md:p-10 shadow-xl shadow-gray-100 overflow-hidden">

                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/5 rounded-bl-[5rem] -mr-10 -mt-10" />

                            <div className="flex items-center gap-3 mb-10">
                                <FaShoppingBag className="text-[#c9a84c]" size={20} />
                                <h2 className="text-2xl font-black text-[#121212] italic tracking-tight">Order Summary</h2>
                            </div>

                            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-[#121212] uppercase tracking-wider truncate">{item.name}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                                Size: {item.size} <span className="mx-2">|</span> Qty: {item.quantity || 1}
                                            </p>
                                        </div>
                                        <p className="text-sm font-black text-[#121212] italic">₹{item.price * (item.quantity || 1)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-dashed border-gray-100 pt-8 mb-10">
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Subtotal</span>
                                    <span className="text-sm font-bold text-[#121212]">₹{total}</span>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Delivery Fee</span>
                                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Free</span>
                                </div>
                                <div className="flex justify-between items-center px-8 py-6 bg-gray-50 rounded-3xl mt-6">
                                    <span className="text-xs font-black text-[#121212] uppercase tracking-[0.2em]">Total Amount</span>
                                    <span className="text-3xl font-black text-[#121212] italic tracking-tighter">₹{total}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {paymentMethod === "razorpay" ? (
                                    <button
                                        onClick={handleRazorpay}
                                        className="w-full bg-[#121212] text-white py-6 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#c9a84c] hover:text-[#121212] transition-all duration-500 shadow-xl shadow-[#121212]/20 flex items-center justify-center gap-4 group"
                                    >
                                        Authorize Payment
                                        <FaChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleCOD}
                                        className="w-full bg-[#121212] text-white py-6 rounded-2xl text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#c9a84c] hover:text-[#121212] transition-all duration-500 shadow-xl shadow-[#121212]/20 flex items-center justify-center gap-4 group"
                                    >
                                        Confirm Order (COD)
                                        <FaChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}

                                <div className="flex items-center justify-center gap-6 mt-8 opacity-40">
                                    <div className="flex items-center gap-2">
                                        <FiShield size={14} className="text-gray-400" />
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600">Secure Checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaLock size={12} className="text-gray-400" />
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600">SSL Encrypted</span>
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

export default Checkout;