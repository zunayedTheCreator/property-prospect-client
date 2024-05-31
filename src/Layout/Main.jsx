import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='bg-[#3AAFA9] h-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;