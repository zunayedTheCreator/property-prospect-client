import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
    const navLinks = <>
        <li><NavLink to={'/'} className={({ isActive, isPending }) =>
                      isActive
                        ? " bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold text-black"
                        : isPending
                        ? "pending"
                        : "rounded-full font-bold"
                    }>Home</NavLink></li>
        <li><NavLink to={'blog'} className={({ isActive, isPending }) =>
                      isActive
                        ? " bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold text-black"
                        : isPending
                        ? "pending"
                        : "rounded-full font-bold"
                    }>All Properties</NavLink></li>
    </>
    return (
        <div className="navbar bg-[#17242A] text-[#FEFFFF] px-6 absolute z-[1000] top-0 left-0">
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
                <NavLink to={'/dashboard'}><MdDashboard className='text-2xl mr-4 hover:rotate-12 duration-200'></MdDashboard></NavLink>
                <a className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] font-bold text-black rounded px-6">Login</a>
            </div>
        </div>
    );
};

export default Navbar;