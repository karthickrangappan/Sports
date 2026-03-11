import React from 'react';
import { FaTruck, FaShieldAlt, FaSync, FaHeadset, FaTools, FaLaptopCode, FaChevronRight } from 'react-icons/fa';
import PageHeader from './PageHeader';

const Services = () => {
    const services = [
        {
            icon: <FaTruck className="text-3xl" />,
            title: "Global Shipping",
            desc: "Express worldwide delivery with real-time tracking and premium insurance for all your sporting gear.",
            highlight: "Fast & Secure"
        },
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: "Secure Payments",
            desc: "Shop with peace of mind using our military-grade encrypted payment systems and fraud protection.",
            highlight: "100% Protected"
        },
        {
            icon: <FaSync className="text-3xl" />,
            title: "Easy Returns",
            desc: "Flexible 30-day return policy on all unused items. We make exchanges and refunds completely hassle-free.",
            highlight: "Zero Stress"
        },
        {
            icon: <FaHeadset className="text-3xl" />,
            title: "24/7 Support",
            desc: "Our dedicated team of sports experts is always on standby to assist with your technical queries.",
            highlight: "Always Online"
        },
        {
            icon: <FaTools className="text-3xl" />,
            title: "Equipment Care",
            desc: "Professional maintenance, stringing, and repair services to keep your elite equipment at peak performance.",
            highlight: "Pro Service"
        },
        {
            icon: <FaLaptopCode className="text-3xl" />,
            title: "Custom Solutions",
            desc: "Bespoke gear customization and team management systems for clubs, schools, and pro athletes.",
            highlight: "Tailor Made"
        }
    ];

    return (
        <div className="bg-light min-h-screen">
            <PageHeader />

            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight">
                        Our Specialized <br />Service Ecosystem
                    </h2>
                    <div className="w-20 h-1.5 bg-accent mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 card-hover overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-0 bg-accent group-hover:h-full transition-all duration-500"></div>

                            <div className="relative z-10">
                                <span className="text-xs font-black text-accent/60 uppercase tracking-widest mb-6 block">
                                    {service.highlight}
                                </span>

                                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-500 mb-8">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-black text-primary mb-4">
                                    {service.title}
                                </h3>

                                <p className="text-gray-500 leading-relaxed mb-8 group-hover:text-gray-600">
                                    {service.desc}
                                </p>

                                <button className="flex items-center gap-2 font-bold text-sm text-primary group-hover:text-accent transition-colors">
                                    Details <FaChevronRight className="text-[10px] transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="absolute -bottom-8 -right-8 text-primary/5 text-9xl transform rotate-12 group-hover:scale-110 group-hover:text-accent/5 transition-all duration-700">
                                {service.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-16 md:mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-[3rem] bg-dark p-8 sm:p-12 md:p-24 overflow-hidden border border-white/5">
                    <div className="absolute inset-0 opacity-20">
                        <img
                            src="https://images.unsplash.com/photo-1541534741688-6078c64b5ca5?q=80&w=2069&auto=format&fit=crop"
                            alt="Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent"></div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                                Need a Bespoke <br />
                                <span className="text-accent italic">Sporting Solution?</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                From large-scale tournament logistics to professional club infrastructure development, our specialized consultants are ready to help your organization reach its absolute peak.
                            </p>
                            <button className="btn-secondary !px-8 !py-3 sm:!px-12 sm:!py-4 text-base sm:text-lg">
                                Start Consultation
                            </button>
                        </div>

                        <div className="hidden lg:flex justify-end">
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: "Success Rate", value: "99%" },
                                    { label: "Global Partners", value: "450+" },
                                    { label: "Countries Served", value: "120+" },
                                    { label: "Team Experts", value: "85+" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
                                        <div className="text-3xl font-black text-accent mb-1">{stat.value}</div>
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
