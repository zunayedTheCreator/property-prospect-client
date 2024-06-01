import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className='bg-[#3AAFA9] h-full'>
            <Navbar></Navbar>
            <div className='border'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;