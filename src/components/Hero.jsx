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
        <div className="relative min-h-screen flex items-center pt-20 sm:pt-24 lg:pt-32 overflow-hidden bg-dark">
            {/* Background Layer with optimized overlay */}
            <div className="absolute inset-0 z-0 bg-hero-pattern bg-cover bg-fixed bg-center">
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-dark via-dark/80 lg:via-dark/40 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20 lg:py-24">
                <div className="max-w-4xl text-center lg:text-left">
                    {/* Tagline */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6 sm:mb-8 text-accent font-black text-[10px] sm:text-xs tracking-[0.3em] uppercase animate-fade-in mx-auto lg:mx-0">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-[0_0_10px_rgba(201,168,76,0.8)]"></span>
                        </span>
                        {heroData.tagline}
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-black text-white mb-6 sm:mb-8 leading-[0.95] sm:leading-[0.9] tracking-tighter uppercase italic">
                        {heroData.title.split(' ').map((word, i) => (
                            <span key={i} className={word === 'STRENGTH' ? 'text-secondary block lg:inline' : 'block lg:inline lg:mr-5'}>
                                {word}
                            </span>
                        ))}
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300/90 mb-10 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                        {heroData.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                        <Link 
                            to="/shop" 
                            className="w-full sm:w-auto bg-primary hover:bg-white hover:text-dark text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-black italic text-base sm:text-xl uppercase tracking-widest transition-all duration-500 shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 group"
                        >
                            {heroData.cta.primary}
                            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-2" />
                        </Link>

                        <a
                            href="https://www.youtube.com/watch?v=-DwAVMDPUYk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black text-base sm:text-xl italic uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
                        >
                            <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-accent text-white group-hover:scale-110 group-hover:bg-white group-hover:text-accent transition-all duration-500 shadow-lg shadow-accent/20">
                                <FaPlay className="ml-1 text-xs" />
                            </span>
                            {heroData.cta.secondary}
                        </a>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 border-t border-white/10 pt-10 sm:pt-12 max-w-3xl mx-auto lg:mx-0">
                        {heroData.stats.map((stat, index) => (
                            <div key={index} className={`space-y-1 sm:space-y-2 ${index === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                                <p className="text-3xl sm:text-5xl font-black text-white tracking-tighter italic">
                                    {stat.value}
                                </p>
                                <p className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] ${stat.color} opacity-80`}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10"></div>
        </div>
    );
};

export default Hero;
