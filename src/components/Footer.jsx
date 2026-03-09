import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform -rotate-6 shadow-md group-hover:rotate-0 transition-transform duration-300">
                                <span className="text-white text-xl font-black italic">S</span>
                            </div>
                            <h1 className="text-2xl font-black text-accent tracking-tighter">
                                SPORT<span className="text-primary italic">HUB</span>
                            </h1>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Your ultimate destination for professional sports equipment and performance gear. Level up your performance today.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 border-l-4 border-primary pl-4">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Find a Store</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Special Offers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 border-l-4 border-primary pl-4">Support</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Order Tracking</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 border-l-4 border-primary pl-4">Newsletter</h3>
                        <p className="text-gray-400 mb-6">Subscribe to get latest updates and offers.</p>
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full bg-white/10 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary text-white"
                                />
                            </div>
                            <button className="w-full btn-primary !rounded-lg py-3">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-6">
                    <p>© 2024 SportHub. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
