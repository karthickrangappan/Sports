import React from 'react';

const AboutSports = () => {
    return (
        <section className="py-20 sm:py-24 bg-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
                    {/* Image Composition */}
                    <div className="relative order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <div className="relative mt-12 sm:mt-16 group">
                                <img
                                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop"
                                    alt="Elite Training"
                                    className="rounded-[2.5rem] h-[300px] sm:h-[450px] w-full object-cover shadow-2xl shadow-gray-200 transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-dark/40 to-transparent"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?q=80&w=2032&auto=format&fit=crop"
                                    alt="Performance Gear"
                                    className="rounded-[2.5rem] h-[300px] sm:h-[450px] w-full object-cover shadow-2xl shadow-gray-200 transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-dark/40 to-transparent"></div>
                            </div>
                        </div>
                        
                        {/* Interactive Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-primary rounded-full flex flex-col items-center justify-center text-white border-8 border-white shadow-2xl z-20 animate-bounce-slow">
                            <span className="text-xl sm:text-2xl font-black italic mb-0">EST</span>
                            <span className="text-sm font-bold tracking-widest opacity-80">2024</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:pl-6 order-1 lg:order-2 text-center lg:text-left">
                        <span className="text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Our DNA & Vision</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-dark mb-8 leading-[0.95] tracking-tighter uppercase italic">
                            Fueling Your <br /> <span className="text-primary">Athletic Destiny</span>
                        </h2>
                        <p className="text-gray-500 text-lg sm:text-xl mb-10 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                            We believe that the right gear makes the difference between a good workout and a legendary one. Our curated collection brings together the world's most innovative sports brands.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto lg:mx-0">
                            {[
                                { title: "Elite Materials", color: "bg-primary/10", text: "text-primary" },
                                { title: "Proven Design", color: "bg-accent/10", text: "text-accent" },
                                { title: "Eco-Conscious", color: "bg-green-50", text: "text-green-600" },
                                { title: "24/7 Support", color: "bg-blue-50", text: "text-blue-600" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-primary/20 transition-colors">
                                    <div className={`w-10 h-10 rounded-xl ${item.color} ${item.text} flex items-center justify-center font-black shadow-sm`}>
                                        ✓
                                    </div>
                                    <span className="text-dark font-black uppercase text-[10px] tracking-widest leading-none">{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full sm:w-auto px-12 py-5 bg-[#121212] text-white rounded-2xl font-black italic text-lg uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-gray-200 active:scale-95">
                            Our Full Story
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSports;
