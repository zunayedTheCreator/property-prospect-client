import React from 'react';
import Advertisement from './Advertisement/Advertisement';
import Banner from './Banner/Banner';
import Header from '../../Shared/Header/Header';
import Reviews from './Reviews/Reviews';
import Ad from './Ad/Ad';
import MyDynamicTitle from '../../../MyDynamicTitle';

const Home = () => {
    MyDynamicTitle('Property | Home')
    return (
        <div>
            <Banner></Banner>
            <div className='pt-20 max-w-7xl mx-auto'>
                <Header header='Advertisement' ></Header>
                <Advertisement></Advertisement>
            </div>
            <Ad></Ad>
            <div className='max-w-7xl mx-auto'>
                <Header header='Latest User reviews' ></Header>
                <Reviews></Reviews>
            </div>
        </div>
    );
};

export default Home;