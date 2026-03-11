import React from 'react';

const JoinBanner = () => {
    return (
        <section className="py-12 sm:py-20 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="relative rounded-[3rem] overflow-hidden bg-[#121212] py-16 sm:py-24 px-8 sm:px-16 md:px-24">
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                        <div className="max-w-2xl">
                            <span className="text-[10px] sm:text-xs font-black text-accent uppercase tracking-[0.4em] mb-4 block">Exclusive Membership</span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic leading-[0.95]">
                                Join the <br className="hidden sm:block" /> <span className="text-primary">Elite Squad</span>
                            </h2>
                            <p className="text-gray-400 text-lg sm:text-xl font-medium max-w-lg mx-auto lg:mx-0">
                                Get <span className="text-white font-black underline decoration-primary decoration-4 underline-offset-8">20% OFF</span> on your first order & unlock exclusive pro-athlete gear.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                            <button className="w-full sm:w-auto bg-white text-dark hover:bg-primary hover:text-white px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-black text-base sm:text-xl uppercase italic tracking-widest transition-all duration-500 shadow-2xl active:scale-95 group flex items-center justify-center gap-3">
                                Become a Member
                                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </button>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest sm:hidden">No commitment required</p>
                        </div>
                    </div>
                    
                    {/* Corner Accent */}
                    <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-white/5 rounded-tl-3xl m-8"></div>
                </div>
            </div>
        </section>
    );
};

export default JoinBanner;
