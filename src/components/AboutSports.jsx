import React from 'react';

const AboutSports = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop"
                                alt="Sport 1"
                                className="rounded-2xl h-80 w-full object-cover shadow-lg transform translate-y-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?q=80&w=2032&auto=format&fit=crop"
                                alt="Sport 2"
                                className="rounded-2xl h-80 w-full object-cover shadow-lg"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary rounded-full -z-10 animate-pulse"></div>
                    </div>

                    <div className="lg:pl-8">
                        <h4 className="text-primary font-bold uppercase tracking-widest mb-4">Why SportHub?</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight">
                            Fueling Your <br /> Athletic Journey
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            We believe that the right gear makes the difference between a good workout and a legendary one. Our curated collection brings together the world's most innovative sports brands.
                        </p>

                        <ul className="space-y-4 mb-10">
                            <li className="flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">✓</span>
                                <span className="text-dark font-semibold">Premium Quality Materials</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">✓</span>
                                <span className="text-dark font-semibold">Scientifically Proven Design</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">✓</span>
                                <span className="text-dark font-semibold">Eco-Friendly Manufacturing</span>
                            </li>
                        </ul>

                        <button className="btn-primary">
                            Learn Our Story
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSports;
