import React from 'react';
import { FaAward, FaUsers, FaGlobe, FaChevronRight } from 'react-icons/fa';
import storyImg from '../assets/about-story.png';
import PageHeader from './PageHeader';

const About = () => {
    return (
        <div className="bg-white overflow-hidden">
            <PageHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={storyImg}
                                alt="Our Story"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 hidden md:block w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -top-10 -left-10 hidden md:block w-48 h-48 bg-primary/10 rounded-full blur-2xl -z-10"></div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <span className="text-accent font-bold tracking-widest uppercase text-sm">Our Journey</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">Founded on Passion and Innovation</h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Established in 2010, SportHub began as a small shop dedicated to providing high-quality sporting equipment to local athletes. Over the years, we have grown into a global brand, partnering with some of the world's most talented creators and athletes.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our mission is simple: to empower athletes through innovation, quality, and a commitment to excellence. We don't just sell gear; we provide the tools for greatness.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <div>
                                <h3 className="text-4xl font-black text-primary">15+</h3>
                                <p className="text-gray-500 font-medium">Years of Excellence</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-primary">50k+</h3>
                                <p className="text-gray-500 font-medium">Happy Athletes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-primary text-white py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Values That Drive Us</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            {
                                icon: <FaAward className="text-5xl text-accent mb-6" />,
                                title: "Quality First",
                                desc: "We never compromise on the quality of our equipment. Every product is tested for peak performance."
                            },
                            {
                                icon: <FaUsers className="text-5xl text-accent mb-6" />,
                                title: "Community Driven",
                                desc: "We support grassroots initiatives and local sports clubs to foster a love for the game."
                            },
                            {
                                icon: <FaGlobe className="text-5xl text-accent mb-6" />,
                                title: "Sustainability",
                                desc: "Our commitment to the planet is reflected in our eco-friendly packaging and ethical sourcing."
                            }
                        ].map((item, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                {item.icon}
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
                    <div className="max-w-xl">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm">Leadership</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">The Minds Behind SportHub</h2>
                    </div>
                    <button className="flex items-center gap-2 font-bold text-primary hover:text-accent transition-colors group">
                        Join Our Team <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[1, 2, 3, 4].map((member) => (
                        <div key={member} className="group">
                            <div className="aspect-[4/5] rounded-2xl bg-gray-100 overflow-hidden mb-6">
                                <img
                                    src={`https://i.pravatar.cc/400?img=${member + 10}`}
                                    alt="Team Member"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                                />
                            </div>
                            <h4 className="text-xl font-bold text-primary">Team Lead {member}</h4>
                            <p className="text-gray-500">Department Head</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
