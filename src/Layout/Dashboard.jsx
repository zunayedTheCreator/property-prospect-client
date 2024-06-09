import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../providers/AuthProvider';
import useAgent from '../hooks/useAgent';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();

    return (
        <div className='bg-[#3AAFA9] flex min-w-full min-h-screen'>
            <div className='hidden lg:block w-[300px] min-h-screen bg-[#17242A] text-[#FEFFFF] px-2 py-3'>
                <div className='flex items-center mb-8'>
                    <h4 className="text-2xl border-y-none border-l-none border-r-4 border-[#FEFFFF] pr-3 font-bold w-fit">Property Prospect</h4>
                    <Link to={'/'}><FaHome className='text-2xl ml-5'></FaHome></Link>
                </div>
                {
                    isAdmin ? <ul className='menu p-0 gap-3'>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/profile'}><li><a>Admin Profile</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/manage-properties'}><li><a>Manage Properties</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/manage-users'}><li><a>Manage Users</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/manage-reviews'}><li><a>Manage reviews</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/advertise-property'}><li><a>Advertise property</a></li></NavLink>
                    </ul> : 

                    isAgent ? <ul className='menu p-0 gap-3'>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/profile'}><li><a>Agent Profile</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/add-property'}><li><a>Add Property</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/my-added-properties'}><li><a>My added properties</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/sold-properties'}><li><a>My sold properties</a></li></NavLink>
                        <NavLink className={({ isActive, isPending }) =>
                                    isActive
                                    ? "text-[#17242A] bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold hover:text-[#17242A]"
                                    : isPending
                                    ? "pending text-[#FEFFFF]"
                                    : "rounded-full font-bold text-[#FEFFFF]"
                                } to={'/dashboard/requested-properties'}><li><a>Requested properties</a></li></NavLink>
                    </ul> : 

                    <ul className='menu p-0 gap-3'>
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
                                } to={'/dashboard/my-reviews'}><li><a>My Reviews</a></li></NavLink>
                    </ul>
                }
            </div>
            <div className='flex-1'>
                <div className='max-w-7xl mx-auto border'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;