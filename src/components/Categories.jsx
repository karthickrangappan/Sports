import React from 'react';
import { categories } from '../data/sportsData';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <section className="py-20 sm:py-24 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="text-center mb-12 sm:mb-20">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-3 block">Premium Selection</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-dark mb-6 italic tracking-tighter uppercase leading-none">
                        Sport <span className="text-primary">Disciplines</span>
                    </h2>
                    <div className="w-24 h-1 bg-gray-100 mx-auto rounded-full overflow-hidden">
                        <div className="w-12 h-full bg-primary rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {categories.map((cat, index) => (
                        <Link to={"/shop"} key={index} className="group">
                            <div className="relative h-full bg-gray-50/50 rounded-[2.5rem] p-8 sm:p-10 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gray-200/50">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/60 rounded-bl-[5rem] -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                                
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${cat.color} flex items-center justify-center text-3xl sm:text-4xl mb-8 shadow-lg shadow-gray-200/20 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                                        {cat.icon}
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-black text-dark uppercase tracking-tighter italic mb-4 group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h3>
                                    
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {cat.subcategories.map(sub => (
                                            <span key={sub} className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 px-4 py-1.5 rounded-full group-hover:border-primary/20 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute bottom-6 right-8 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                    Explore <FaArrowRight />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
