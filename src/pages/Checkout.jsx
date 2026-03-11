import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from '../Context/Shopcontext';
import toast from "react-hot-toast";
import {
FaChevronRight,
FaCreditCard,
FaTruck,
FaMapMarkerAlt,
FaShoppingBag
} from 'react-icons/fa';
import { FiShield } from 'react-icons/fi';
import PageHeader from './PageHeader';

const Checkout = () => {

const { cartItems: cart = [], placeOrder, user, addresses } = useContext(ShopContext);
const navigate = useNavigate();
const [selectedAddressId, setSelectedAddressId] = useState(null);

const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
const total = subtotal + shipping;

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
name: user.displayName || "",
email: user.email || "",
}));
}
if (addresses && addresses.length > 0) {
handleSelectAddress(addresses[0]);
}
}, [user, addresses]);

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

if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
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
<div className="min-h-screen bg-[#FBFBFB] font-sans selection:bg-[#c9a84c]/20 pb-16">
<PageHeader />

<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-16">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">

<div className="lg:col-span-7 space-y-8 lg:space-y-12">

<section>

<div className="flex items-center gap-3 mb-6">
<FaMapMarkerAlt className="text-[#c9a84c]" size={20} />
<h2 className="text-xl sm:text-2xl font-black text-[#121212] italic tracking-tight">Delivery Details</h2>
<div className="h-[1px] flex-1 bg-gray-100 ml-4" />
</div>

{addresses && addresses.length > 0 && (

<div className="mb-8">

<h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">
Select from Saved Locations
</h3>

<div className="flex gap-3 overflow-x-auto pb-3 snap-x">

{addresses.map((addr) => (

<button
key={addr.id}
onClick={() => handleSelectAddress(addr)}
className={`min-w-[240px] sm:min-w-[280px] p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative group
${selectedAddressId === addr.id
? 'bg-[#121212] border-[#121212] text-white shadow-xl'
: 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c]'
}`}
>

<p className={`font-bold text-xs sm:text-sm mb-1 truncate ${selectedAddressId === addr.id ? 'text-white' : 'text-gray-800'}`}>
{addr.fullName}
</p>

<p className={`text-xs ${selectedAddressId === addr.id ? 'text-gray-400' : 'text-gray-500'}`}>
{addr.address}, {addr.city}
</p>

</button>

))}

</div>
</div>
)}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

<div className="sm:col-span-2">
<input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name*" className="w-full bg-white border border-gray-100 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm focus:border-[#c9a84c] outline-none"/>
</div>

<div>
<input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email*" className="w-full bg-white border border-gray-100 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm focus:border-[#c9a84c] outline-none"/>
</div>

<div>
<input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone*" className="w-full bg-white border border-gray-100 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm focus:border-[#c9a84c] outline-none"/>
</div>

<div className="sm:col-span-2">
<textarea name="address" value={form.address} onChange={handleChange} rows="3" placeholder="Address*" className="w-full bg-white border border-gray-100 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm resize-none focus:border-[#c9a84c] outline-none"/>
</div>

<div>
<input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City*" className="w-full bg-white border border-gray-100 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm focus:border-[#c9a84c] outline-none"/>
</div>

<div>
<input type="text" name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode*" className="w-full bg-white border border-gray-100 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-sm focus:border-[#c9a84c] outline-none"/>
</div>

</div>

</section>

<section>

<div className="flex items-center gap-3 mb-6">
<FaCreditCard className="text-[#c9a84c]" size={20} />
<h2 className="text-xl sm:text-2xl font-black text-[#121212] italic tracking-tight">Payment Method</h2>
<div className="h-[1px] flex-1 bg-gray-100 ml-4" />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

<button
onClick={() => setPaymentMethod("razorpay")}
className={`p-4 sm:p-6 rounded-3xl border-2 text-left transition-all duration-300
${paymentMethod === 'razorpay'
? 'bg-[#121212] border-transparent text-white shadow-xl'
: 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c]'
}`}
>

<div className="flex items-center justify-between mb-2">
<h4 className="font-black text-base sm:text-lg italic">Online Payment</h4>
<FaCreditCard className={`${paymentMethod === 'razorpay' ? 'text-[#c9a84c]' : 'text-gray-300'}`} />
</div>

<p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${paymentMethod === 'razorpay' ? 'text-gray-400' : 'text-gray-500'}`}>
Cards, UPI & Netbanking
</p>

</button>

<button
onClick={() => setPaymentMethod("cod")}
className={`p-4 sm:p-6 rounded-3xl border-2 text-left transition-all duration-300
${paymentMethod === 'cod'
? 'bg-[#121212] border-transparent text-white shadow-xl'
: 'bg-white border-gray-100 text-[#121212] hover:border-[#c9a84c]'
}`}
>

<div className="flex items-center justify-between mb-2">
<h4 className="font-black text-base sm:text-lg italic">Cash on Delivery</h4>
<FaTruck className={`${paymentMethod === 'cod' ? 'text-[#c9a84c]' : 'text-gray-300'}`} />
</div>

<p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${paymentMethod === 'cod' ? 'text-gray-400' : 'text-gray-500'}`}>
Pay at your doorstep
</p>

</button>

</div>

</section>

</div>

<div className="lg:col-span-5 mt-8 lg:mt-0">

<div className="lg:sticky lg:top-28 bg-white border border-gray-100 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 shadow-xl">

<div className="flex items-center gap-3 mb-6">
<FaShoppingBag className="text-[#c9a84c]" size={20} />
<h2 className="text-xl sm:text-2xl font-black text-[#121212] italic tracking-tight">
Order Summary
</h2>
</div>

<div className="space-y-4">

{cart.map((item) => (

<div key={item.cartDocId || item.id} className="flex items-start justify-between gap-3 py-3 border-b border-gray-50">

<div className="flex gap-3 items-start">

<div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-xl p-2 border border-gray-100">
<img src={item.image} alt={item.name} className="w-full h-full object-contain" />
</div>

<div>
<p className="font-bold text-xs sm:text-sm text-gray-800 leading-tight">{item.name}</p>
<p className="text-[10px] sm:text-xs text-gray-500 mt-1">
Qty: {item.quantity} {item.size && `| Size: ${item.size}`}
</p>
</div>

</div>

<p className="font-bold text-xs sm:text-sm text-gray-800 shrink-0">₹{item.price * item.quantity}</p>

</div>

))}

</div>

<div className="space-y-3 py-5 border-t border-gray-100">

<div className="flex justify-between text-sm">
<span className="font-bold text-gray-500">Subtotal</span>
<span className="font-bold text-gray-800">₹{subtotal}</span>
</div>

<div className="flex justify-between text-sm">
<span className="font-bold text-gray-500">Shipping</span>
<span className="font-bold text-gray-800">₹{shipping}</span>
</div>

</div>

<div className="flex justify-between items-center text-lg sm:text-xl font-black text-[#121212] pt-5 border-t-2 border-dashed border-gray-200">
<span className="italic uppercase tracking-tight">Total</span>
<span className="italic">₹{total}</span>
</div>

{paymentMethod === "razorpay" ? (

<button onClick={handleRazorpay} className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-5 bg-gray-900 text-white font-black italic text-base sm:text-lg rounded-2xl hover:bg-[#c9a84c] transition-all mt-6">
Pay Now <FaChevronRight />
</button>

) : (

<button onClick={handleCOD} className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-5 bg-gray-900 text-white font-black italic text-base sm:text-lg rounded-2xl hover:bg-[#c9a84c] transition-all mt-6">
Place Order (COD) <FaChevronRight />
</button>

)}

<div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
<FiShield size={14} />
<p className="text-[10px] sm:text-xs font-bold">100% Secure & Encrypted Checkout</p>
</div>

</div>

</div>

</div>

</div>

</div>
);
};

export default Checkout;
