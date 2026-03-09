import React from 'react';
import { categories } from '../data/sportsData';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-dark mb-4 italic tracking-tighter uppercase">
                        Shop by <span className="text-primary">Category</span>
                    </h2>
                    <div className="w-24 h-1 bg-gray-100 mx-auto rounded-full">
                        <div className="w-12 h-full bg-primary rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((cat, index) => (
                        <Link to={"/shop"} key={index}  >

                        <div className="group relative bg-gray-50 rounded-[2rem] p-6 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 transition-all duration-300 cursor-pointer overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`w-20 h-20 rounded-2xl ${cat.color} flex items-center justify-center text-3xl mb-6 shadow-sm transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    {cat.icon}
                                </div>

                                <h3 className="text-lg font-black text-dark uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                                    {cat.name}
                                </h3>
                                <div className="flex gap-2">
                                    {cat.subcategories.map(sub => (
                                        <span key={sub} className="text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 px-3 py-1 rounded-full group-hover:border-primary/20 group-hover:text-primary transition-all">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <FaArrowRight className="text-primary" />
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
