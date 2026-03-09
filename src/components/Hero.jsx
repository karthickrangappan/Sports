import React from 'react';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const heroData = {
    tagline: "Elevate Your Performance",
    title: "UNLEASH YOUR STRENGTH",
    description: "Discover cutting-edge sports technology and gear designed to push you beyond your limits. From elite professional equipment to everyday training essentials.",
    stats: [
        { label: "Active Users", value: "15k+", color: "text-accent" },
        { label: "Premium Gear", value: "500+", color: "text-white" },
        { label: "Expert Help", value: "24/7", color: "text-accent" }
    ],
    cta: {
        primary: "Shop Collection",
        secondary: "Watch Story"
    }
};

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-hero-pattern bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-accent font-bold text-sm tracking-widest uppercase animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        {heroData.tagline}
                    </div>

                    <h1 className="text-6xl md:text-4xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase">
                        {heroData.title.split(' ').map((word, i) => (
                            <span key={i} className={word === 'STRENGTH' ? 'text-secondary italic block md:inline' : 'block md:inline mr-4'}>
                                {word}
                            </span>
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-xl leading-relaxed font-light">
                        {heroData.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Link to="/shop" className="btn-primary w-full sm:w-auto text-xl px-12 py-5 flex items-center justify-center gap-3 group">
                            {heroData.cta.primary}
                            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                        </Link>

                        <a
                            href="https://www.youtube.com/watch?v=-DwAVMDPUYk&pp=ygUMc3BvcnRzIHZpZGVv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-12 py-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
                        >
                            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent group-hover:scale-110 transition-transform shadow-lg hover:text-white shadow-accent/20">
                                <FaPlay className="ml-1 text-sm" />
                            </span>
                            {heroData.cta.secondary}
                        </a>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 max-w-2xl">
                        {heroData.stats.map((stat, index) => (
                            <div key={index} className="space-y-1">
                                <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                                <p className={`text-sm font-bold uppercase tracking-widest ${stat.color}`}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent z-10"></div>
        </div>
    );
};

export default Hero;
