import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className='bg-[#3AAFA9] h-full'>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto border'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;