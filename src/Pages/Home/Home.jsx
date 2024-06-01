import React from 'react';
import Advertisement from './Advertisement/Advertisement';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='pt-20 max-w-7xl mx-auto'>
                <Advertisement></Advertisement>
            </div>
        </div>
    );
};

export default Home;