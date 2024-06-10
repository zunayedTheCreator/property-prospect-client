import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaListUl } from "react-icons/fa";
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../providers/AuthProvider';
import useAgent from '../hooks/useAgent';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();

    return (
        <div className='bg-[#3AAFA9] flex flex-col lg:flex-row min-w-full min-h-screen'>
            <div className='navbar bg-[#17242A] px-2 z-[1000] top-0 left-0 fixed block lg:hidden'>
                <div className='navbar-start'>
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn bg-transparent hover:bg-transparent border-none"><FaListUl className='text-xl text-[#FEFFFF]'></FaListUl></label>
                        </div> 
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-[#17242A] text-[#FEFFFF]">
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
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
            <div className='flex-1 mt-12 lg:mt-0'>
                <div className='max-w-7xl mx-auto'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;