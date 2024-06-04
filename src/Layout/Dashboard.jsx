import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='bg-[#3AAFA9] flex'>
            <div className='w-[300px] min-h-screen bg-[#17242A]'>
                <ul className='menu'>
                    <NavLink className={({ isActive, isPending }) =>
                                isActive
                                ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                : isPending
                                ? "pending text-[#FEFFFF]"
                                : "rounded-full font-bold text-[#FEFFFF]"
                            } to={'/dashboard/profile'}><li><a>My Profile</a></li></NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                                isActive
                                ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                : isPending
                                ? "pending text-[#FEFFFF]"
                                : "rounded-full font-bold text-[#FEFFFF]"
                            } to={'/dashboard/wishlist'}><li><a>Wishlist</a></li></NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                                isActive
                                ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                : isPending
                                ? "pending text-[#FEFFFF]"
                                : "rounded-full font-bold text-[#FEFFFF]"
                            } to={'/dashboard/property-brought'}><li><a>Property Bought</a></li></NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                                isActive
                                ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                : isPending
                                ? "pending text-[#FEFFFF]"
                                : "rounded-full font-bold text-[#FEFFFF]"
                            } to={'/dashboard/my-reviews'}><li><a>My Profile</a></li></NavLink>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;