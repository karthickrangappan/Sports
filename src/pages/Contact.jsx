import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaPaperPlane, FaClock } from 'react-icons/fa';
import PageHeader from './PageHeader';

const Contact = () => {
    return (
        <div className="bg-light overflow-hidden">
            <PageHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-card p-8 rounded-3xl space-y-8">
                            <h2 className="text-2xl font-black text-primary uppercase italic tracking-tight">HQ Station</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-primary text-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                                        <FaPhoneAlt className="text-lg" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-primary/40 uppercase tracking-widest">Hotline</h4>
                                        <p className="text-lg font-bold text-primary">+1 (555) POWER-UP</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-primary text-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                                        <FaEnvelope className="text-lg" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-primary/40 uppercase tracking-widest">Digital Dispatch</h4>
                                        <p className="text-lg font-bold text-primary">pro@sporthub.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-primary text-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                                        <FaMapMarkerAlt className="text-lg" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-primary/40 uppercase tracking-widest">Basecamp</h4>
                                        <p className="text-lg font-bold text-primary">123 Victory Lane, Performance City</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-primary text-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                                        <FaClock className="text-lg" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-primary/40 uppercase tracking-widest">Operation Hours</h4>
                                        <p className="text-lg font-bold text-primary">Mon - Sat: 08:00 - 22:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-primary/10">
                                <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-4">Sync Socially</h4>
                                <div className="flex gap-3">
                                    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                                        <a key={idx} href="#" className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300">
                                            <Icon />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-primary/5">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-1 w-12 bg-accent"></div>
                                <h2 className="text-2xl md:text-3xl font-black text-primary uppercase italic tracking-tighter">Submit Field Report</h2>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Athlete Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        className="w-full px-6 py-4 rounded-xl bg-primary/5 border-2 border-transparent focus:border-accent focus:bg-white focus:ring-0 transition-all outline-none font-bold text-primary placeholder:text-primary/20"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Comms Link (Email)</label>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full px-6 py-4 rounded-xl bg-primary/5 border-2 border-transparent focus:border-accent focus:bg-white focus:ring-0 transition-all outline-none font-bold text-primary placeholder:text-primary/20"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Mission Objective (Subject)</label>
                                    <select className="w-full px-6 py-4 rounded-xl bg-primary/5 border-2 border-transparent focus:border-accent focus:bg-white focus:ring-0 transition-all outline-none font-bold text-primary cursor-pointer appearance-none">
                                        <option>General Intel</option>
                                        <option>Order Logistics</option>
                                        <option>Sponsorship Inquiry</option>
                                        <option>Tech Support</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Message Content</label>
                                    <textarea
                                        rows="5"
                                        placeholder="Transmit your message here..."
                                        className="w-full px-6 py-4 rounded-xl bg-primary/5 border-2 border-transparent focus:border-accent focus:bg-white focus:ring-0 transition-all outline-none font-bold text-primary placeholder:text-primary/20 resize-none"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button className="btn-primary w-full py-5 flex items-center justify-center gap-3 group">
                                        <span className="uppercase italic tracking-tighter">Initiate Transmission</span>
                                        <FaPaperPlane className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative h-[300px] md:h-[500px] w-full mt-8 md:mt-12 grayscale hover:grayscale-0 transition-all duration-1000 group">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                    alt="Map Location"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 py-8 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="glass-card px-8 py-3 rounded-full text-primary font-black uppercase italic tracking-tighter text-sm">
                        Flagship Store Located in Downtown Victory
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
