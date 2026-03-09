import React from 'react';

const JoinBanner = () => {
    return (
        <section className="pt-20 pb-10 relative overflow-hidden bg-gradient-to-r from-primary to-primary">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/10 backdrop-blur-sm p-12 rounded-3xl border border-white/20 shadow-2xl">
                    <div className="text-white text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">JOIN THE ELITE SQUAD</h2>
                        <p className="text-blue-100 text-lg md:text-xl font-light">
                            Get <span className="text-white font-bold underline decoration-accent underline-offset-4">20% off</span> on your first order & exclusive VIP access.
                        </p>
                    </div>
                    <button className="whitespace-nowrap bg-white text-primary px-12 py-5 rounded-full font-black text-xl hover:bg-light transition-all shadow-xl hover:scale-105 active:scale-95 group flex items-center gap-2">
                        Sign Up Now
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default JoinBanner;
