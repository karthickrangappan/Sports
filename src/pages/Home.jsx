import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutSports from '../components/AboutSports';
import JoinBanner from '../components/JoinBanner';

const Home = () => {
    return (
        <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <AboutSports />
            <JoinBanner />
        </>
    );
};

export default Home;
