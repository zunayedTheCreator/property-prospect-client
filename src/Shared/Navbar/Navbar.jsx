import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
    const navLinks = <>
        <NavLink to={'/'} className={({ isActive, isPending }) =>
                      isActive
                        ? " bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold text-black"
                        : isPending
                        ? "pending text-[#FEFFFF]"
                        : "rounded-full font-bold text-[#FEFFFF]"
                    }><li><a>Home</a></li></NavLink>
        <NavLink to={'/all-properties'} className={({ isActive, isPending }) =>
                      isActive
                        ? " bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold text-black"
                        : isPending
                        ? "pending text-[#FEFFFF]"
                        : "rounded-full font-bold text-[#FEFFFF]"
                    }><li><a>All Properties</a></li></NavLink>
    </>
    return (
        <div className="navbar bg-[#17242A] text-[#FEFFFF] px-6 z-[1000] top-0 left-0 fixed">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#17242A] rounded-box w-52 gap-2">
                    {navLinks}
                </ul>
                </div>
                <a className="text-xl mr-7 border-y-none border-l-none border-r-4 border-[#FEFFFF] pr-3 font-bold">Property Prospect</a>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {navLinks}
                    </ul>
                </div>
            </div>
            <div className="navbar-end">
                <h3 className='text-sm font-bold border-r-2 border-[#FEFFFF] pr-2 mr-2'>Dashboard</h3>
                <NavLink to={'/dashboard'}><MdDashboard className='text-2xl mr-4 hover:rotate-12 duration-200'></MdDashboard></NavLink>
                <a className="btn min-h-0 h-8 bg-transparent hover:bg-[#DEF2F1] font-bold rounded px-4 border-2 border-[#FEFFFF] text-[#FEFFFF] hover:text-black hover:border-[#FEFFFF]">Login</a>
            </div>
        </div>
    );
};

export default Navbar;