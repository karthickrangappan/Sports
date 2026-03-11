import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] text-white pt-20 pb-12 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                    
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link to="/" className="inline-flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center transform -rotate-6 shadow-xl group-hover:rotate-0 transition-all duration-500">
                                <span className="text-white text-2xl font-black italic">S</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter italic">
                                SPORT<span className="text-primary">HUB</span>
                            </h1>
                        </Link>
                        <p className="text-gray-500 text-base leading-relaxed font-medium max-w-xs">
                            Equipping the next generation of elite athletes with the world's most innovative performance gear.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links - Scalable Grid */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            {['Shop All', 'Performance Gear', 'Elite Training', 'Limited Editions', 'Sustainability'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-white text-sm font-black uppercase tracking-widest transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-[2px] bg-primary transition-all duration-300"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-8">Performance Hub</h3>
                        <ul className="space-y-4">
                            {['Order Tracking', 'Pro Members', 'Training Tips', 'Store Locator', 'Elite Support'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-white text-sm font-black uppercase tracking-widest transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-4 h-[2px] bg-primary transition-all duration-300"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-8">The Insider</h3>
                        <p className="text-gray-500 text-sm mb-8 font-medium italic">Join 15k+ athletes receiving our weekly drops and training hacks.</p>
                        <form className="space-y-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="ATHLETE@EMAIL.COM"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/50 text-[10px] sm:text-xs font-black tracking-widest text-white transition-all"
                                />
                            </div>
                            <button className="w-full bg-[#121212] hover:bg-primary text-white py-4 sm:py-5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95">
                                Join the Squad
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-10">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">© 2024 SPORT HUB ELITE PERFORMANCE</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                        {['Privacy', 'Terms', 'Cookies', 'Compliance'].map((item) => (
                            <a key={item} href="#" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">{item}</a>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Edge Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px]"></div>
        </footer>
    );
};

export default Footer;
