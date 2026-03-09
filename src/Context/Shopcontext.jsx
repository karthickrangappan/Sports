import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import { toast } from "react-hot-toast";

import {
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import {
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    collection,
    updateDoc,
    query,
    where,
    setDoc,
    serverTimestamp,
    runTransaction,
} from "firebase/firestore";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [expandedOrders, setExpandedOrders] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [dbProducts, setDbProducts] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [addressLoading, setAddressLoading] = useState(false);

    const ADMIN_EMAIL = "admin@gmail.com";

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u) {
                const userDoc = await getDocs(query(collection(db, "users"), where("email", "==", u.email)));
                let role = "user";
                if (!userDoc.empty) {
                    role = userDoc.docs[0].data().role || "user";
                }

                await setDoc(doc(db, "users", u.uid), { isActive: true }, { merge: true });
                setUser({ ...u, role });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const createUserDocument = async (firebaseUser) => {
        if (!firebaseUser) return;
        const role = firebaseUser.email === ADMIN_EMAIL ? "admin" : "user";
        await setDoc(
            doc(db, "users", firebaseUser.uid),
            {
                name: firebaseUser.displayName || "User",
                email: firebaseUser.email,
                role,
                isActive: true,
                createdAt: serverTimestamp(),
            },
            { merge: true }
        );
    };

    const fetchedOrders = async () => {
        if (!user) return;

        try {
            setOrdersLoading(true);

            const snap = await getDocs(collection(db, "users", user.uid, "orders"));

            const fetched = snap.docs.map((d) => {
                const data = d.data();
                return {
                    id: d.id,
                    ...data,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                };
            });

            fetched.sort((a, b) => b.createdAt - a.createdAt);

            setOrders(fetched);
            setOrdersLoading(false);
        } catch {
            toast.error("Failed to fetch orders");
            setOrdersLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchedOrders();
        else {
            setOrders([]);
            setExpandedOrders({});
        }
    }, [user]);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    const fetchDbProducts = async () => {
        try {
            const snap = await getDocs(collection(db, "products"));
            const items = snap.docs.map((d) => ({
                ...d.data(),
                id: d.id,
                isDbProduct: true
            }));
            setDbProducts(items);
        } catch (error) {
            console.error("Failed to fetch products from Firestore:", error);
        }
    };

    useEffect(() => {
        fetchDbProducts();

        if (!user) {
            setCartItems([]);
            setWishlist([]);
            return;
        }

        const fetchCart = async () => {
            const snap = await getDocs(collection(db, "users", user.uid, "cart"));
            const items = snap.docs.map((d) => ({
                ...d.data(),
                cartDocId: d.id,
            }));
            setCartItems(items);
        };

        const fetchWishlist = async () => {
            const snap = await getDocs(collection(db, "users", user.uid, "wishlist"));
            const items = snap.docs.map((d) => ({
                ...d.data(),
                wishlistDocId: d.id,
            }));
            setWishlist(items);
        };

        const fetchAddresses = async () => {
            setAddressLoading(true);
            try {
                const snap = await getDocs(collection(db, "users", user.uid, "addresses"));
                const items = snap.docs.map((d) => ({
                    ...d.data(),
                    id: d.id,
                }));
                setAddresses(items);
            } catch (error) {
                console.error("Failed to fetch addresses:", error);
            } finally {
                setAddressLoading(false);
            }
        };

        if (user) {
            fetchCart();
            fetchWishlist();
            fetchAddresses();
        }
    }, [user]);

    useEffect(() => {
        setAllProducts([...dbProducts]);
    }, [dbProducts]);

    const addToCart = async (product) => {
        if (!user) {
            toast.dismiss();
            return toast.error("Login First");
        }

        const hasSizes = product.sizes && product.sizes.length > 0;
        if (hasSizes && !product.size) {
            toast.dismiss();
            return toast.error("Please select a size first!");
        }

        try {
            const dbProduct = allProducts.find(p => String(p.id) === String(product.id));
            const availableStock = dbProduct ? Number(dbProduct.stock) : 0;

            const productToCart = {
                id: String(product.id),
                name: product.name,
                price: Number(product.price),
                image: product.image,
                category: product.category,
                size: product.size || null,
                quantity: Number(product.quantity) || 1
            };

            const existingItem = cartItems.find(item =>
                String(item.id) === productToCart.id &&
                (item.size || null) === productToCart.size
            );

            if (existingItem) {
                const newQuantity = (Number(existingItem.quantity) || 1) + productToCart.quantity;

                if (newQuantity > availableStock) {
                    toast.dismiss();
                    return toast.error(`Out of Stock! Only ${availableStock} available.`);
                }

                await updateDoc(doc(db, "users", user.uid, "cart", existingItem.cartDocId), {
                    quantity: newQuantity,
                });

                setCartItems(prev => prev.map(item =>
                    item.cartDocId === existingItem.cartDocId
                        ? { ...item, quantity: newQuantity }
                        : item
                ));

                toast.dismiss();
                toast.success("Increased quantity in Cart");
            } else {
                if (productToCart.quantity > availableStock) {
                    toast.dismiss();
                    return toast.error(`Out of Stock! Only ${availableStock} available.`);
                }

                const cartRef = collection(db, "users", user.uid, "cart");
                const docRef = await addDoc(cartRef, {
                    ...productToCart,
                    createdAt: serverTimestamp(),
                });

                setCartItems(prev => [...prev, { ...productToCart, cartDocId: docRef.id }]);

                toast.dismiss();
                toast.success("Added to Cart Successfully");
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Failed to add to cart");
        }
    };

    const removeFromCart = async (id) => {
        if (!user) return;
        await deleteDoc(doc(db, "users", user.uid, "cart", id));
        setCartItems((prev) => prev.filter((item) => item.cartDocId !== id));
    };

    const updateCartQuantity = async (id, qty) => {
        if (!user) return;
        if (qty <= 0) return removeFromCart(id);

        const cartItem = cartItems.find(item => item.cartDocId === id);
        if (cartItem) {
            const dbProduct = allProducts.find(p => String(p.id) === String(cartItem.id));
            const availableStock = dbProduct ? Number(dbProduct.stock) : 0;

            if (qty > availableStock) {
                toast.dismiss();
                return toast.error(`Out of Stock! Only ${availableStock} units left.`);
            }
        }

        await updateDoc(doc(db, "users", user.uid, "cart", id), { quantity: qty });

        setCartItems((prev) =>
            prev.map((item) =>
                item.cartDocId === id ? { ...item, quantity: qty } : item
            )
        );
    };

    const addToWishlist = async (product) => {
        if (!user) {
            toast.dismiss();
            return toast.error("Login First");
        }

        try {
            const productToWishlist = {
                id: String(product.id),
                name: product.name,
                price: Number(product.price),
                image: product.image,
                category: product.category,
                rating: product.rating || 0,
                originalPrice: product.originalPrice || product.price,
                description: product.description || ""
            };

            const exists = wishlist.some(item => String(item.id) === productToWishlist.id);
            if (exists) {
                toast.dismiss();
                return toast.error("Already in Wishlist!");
            }

            const wishlistRef = collection(db, "users", user.uid, "wishlist");
            const docRef = await addDoc(wishlistRef, {
                ...productToWishlist,
                createdAt: serverTimestamp(),
            });

            setWishlist(prev => [...prev, { ...productToWishlist, wishlistDocId: docRef.id }]);

            toast.dismiss();
            toast.success("Added to Wishlist Successfully");
        } catch (error) {
            console.error("Add to wishlist error:", error);
            toast.error("Failed to add to wishlist");
        }
    };

    const removeFromWishlist = async (wishlistDocId) => {
        if (!user || !wishlistDocId) return;
        try {
            await deleteDoc(doc(db, "users", user.uid, "wishlist", wishlistDocId));
            setWishlist(prev => prev.filter(item => item.wishlistDocId !== wishlistDocId));
            toast.dismiss();
            toast.success("Removed from Wishlist");
        } catch (error) {
            console.error("Remove from wishlist error:", error);
            toast.error("Failed to remove item");
        }
    };

    const placeOrder = async (orderData) => {
        if (!user) return false;
        if (!cartItems.length) return false;

        try {
            await runTransaction(db, async (transaction) => {
                const itemSnapshots = [];
                for (const item of cartItems) {
                    const productRef = doc(db, "products", String(item.id));
                    const productDoc = await transaction.get(productRef);

                    if (!productDoc.exists()) {
                        throw new Error(`Product ${item.name} no longer exists.`);
                    }

                    const currentStock = Number(productDoc.data().stock) || 0;
                    if (currentStock < item.quantity) {
                        throw new Error(`Insufficient stock for ${item.name}. Only ${currentStock} left.`);
                    }
                    itemSnapshots.push({ ref: productRef, newStock: currentStock - item.quantity });
                }

                const counterRef = doc(db, "counters", "orders");
                const counterDoc = await transaction.get(counterRef);
                const currentNumber = counterDoc.exists() ? counterDoc.data().currentNumber : 0;
                const newNumber = currentNumber + 1;

                transaction.set(counterRef, { currentNumber: newNumber }, { merge: true });

                itemSnapshots.forEach(item => {
                    transaction.update(item.ref, { stock: item.newStock });
                });

                const orderId = "ORD" + String(newNumber).padStart(4, "0");
                const orderRef = doc(collection(db, "users", user.uid, "orders"));

                transaction.set(orderRef, {
                    orderId,
                    items: cartItems,
                    total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    status: "Pending",
                    ...orderData,
                    createdAt: serverTimestamp(),
                });
            });

            const snap = await getDocs(collection(db, "users", user.uid, "cart"));
            await Promise.all(snap.docs.map(d => deleteDoc(doc(db, "users", user.uid, "cart", d.id))));

            setCartItems([]);
            await fetchedOrders();
            await fetchDbProducts();
            toast.success("Order Placed & Inventory Updated");
            return true;
        } catch (error) {
            console.error("Order error:", error);
            toast.error(error.message || "Order Failed");
            return false;
        }
    };

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", result.user.uid), { isActive: true }, { merge: true });
        return result.user;
    };

    const handleGoogleLogin = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        await createUserDocument(result.user);
        return result.user;
    };

    const handleRegister = async (username, email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: username });
        await createUserDocument(result.user);
        setUser(result.user);
        return result.user;
    };

    const addProductToDb = async (productData) => {
        if (!user || user.role !== 'admin') return;
        try {
            const docRef = await addDoc(collection(db, "products"), {
                ...productData,
                createdAt: serverTimestamp(),
            });
            await fetchDbProducts();
            return docRef.id;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    };

    const deleteProductFromDb = async (productId) => {
        if (!user || user.role !== 'admin') return;
        try {
            await deleteDoc(doc(db, "products", productId));
            await fetchDbProducts();
            toast.success("Product deleted successfully");
            return true;
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
            return false;
        }
    };

    const updateProductInDb = async (productId, updatedData) => {
        if (!user || user.role !== 'admin') return;
        try {
            const productRef = doc(db, "products", productId);
            await updateDoc(productRef, updatedData);
            await fetchDbProducts();
            toast.success("Product updated successfully");
            return true;
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product");
            return false;
        }
    };

    const logout = async () => {
        if (user) {
            await setDoc(doc(db, "users", user.uid), { isActive: false }, { merge: true });
        }

        await signOut(auth);
        setUser(null);
        setCartItems([]);
        setWishlist([]);
        setOrders([]);
        setExpandedOrders({});
    };

    const addAddress = async (addressData) => {
        if (!user) return;
        try {
            const addressRef = collection(db, "users", user.uid, "addresses");
            const docRef = await addDoc(addressRef, {
                ...addressData,
                createdAt: serverTimestamp(),
            });
            const newAddress = { ...addressData, id: docRef.id };
            setAddresses(prev => [...prev, newAddress]);
            toast.success("Address added successfully");
            return true;
        } catch (error) {
            console.error("Error adding address:", error);
            toast.error("Failed to add address");
            return false;
        }
    };

    const deleteAddress = async (addressId) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, "users", user.uid, "addresses", addressId));
            setAddresses(prev => prev.filter(a => a.id !== addressId));
            toast.success("Address deleted successfully");
            return true;
        } catch (error) {
            console.error("Error deleting address:", error);
            toast.error("Failed to delete address");
            return false;
        }
    };

    return (
        <ShopContext.Provider
            value={{
                user,
                cartItems,
                wishlist,
                orders,
                ordersLoading,
                expandedOrders,
                toggleOrderDetails,
                fetchedOrders,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                addToWishlist,
                removeFromWishlist,
                placeOrder,
                handleLogin,
                handleGoogleLogin,
                handleRegister,
                logout,
                allProducts,
                dbProducts,
                fetchDbProducts,
                deleteProductFromDb,
                addProductToDb,
                updateProductInDb,
                addresses,
                addressLoading,
                addAddress,
                deleteAddress
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};