import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { AuthContext } from '../../providers/AuthProvider';
import { VscSignOut } from "react-icons/vsc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { FaEdit, FaUser } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    const navigate = useNavigate();
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

    const handleSignOut = () => {
        logOut()
        .then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Logged Out!",
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/');
        })
        .catch(error => {
            toast.error(error)
        })
    }

    return (
        <div className="navbar bg-[#17242A] text-[#FEFFFF] px-2 md:px-6 z-[1000] top-0 left-0 fixed">
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
                {user? <>
                    <h3 className='hidden md:flex text-sm font-bold border-r-2 border-[#FEFFFF] pr-2 mr-2'>Dashboard</h3>
                    <NavLink to={'/dashboard'}><MdDashboard className='text-2xl mr-2 hover:rotate-12 duration-200 md:mr-5'></MdDashboard></NavLink>
                </> : <></>}
                {user ? <>
                    <div className="dropdown dropdown-end border-x-2 border-[#FEFFFF] md:border-none px-2 md:px-0 mr-2">
                        <div tabIndex={0} role="button" className="btn min-h-0 h-11 w-11 btn-ghost btn-circle avatar border-2 border-[#FEFFFF] hover:border-[#FEFFFF]">
                            <div className="w-9 rounded-full">
                            <img alt={user?.displayName} src={user?.photoURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#17242A] rounded-box w-52 border border-[#FEFFFF] gap-2">
                            <h3 className='font-bold text-lg ml-2'>{user?.displayName}</h3>
                            <div className='border-b-2 border-[#FEFFFF]'></div>
                            <NavLink to={'/profile'} className={({ isActive, isPending }) =>
                                isActive
                                ? " bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold text-black"
                                : isPending
                                ? "pending text-[#FEFFFF]"
                                : "rounded-full font-bold text-[#FEFFFF]"
                            }><li><a><FaUser></FaUser>Profile</a></li></NavLink>
                            <NavLink to={'/update-profile'} className={({ isActive, isPending }) =>
                                isActive
                                ? " bg-[#DEF2F1] hover:bg-[#FEFFFF] rounded-full font-bold text-black"
                                : isPending
                                ? "pending text-[#FEFFFF]"
                                : "rounded-full font-bold text-[#FEFFFF]"
                            }><li><a><FaEdit></FaEdit>Update Profile</a></li></NavLink>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                    <h3 className='hidden md:flex font-bold border-r-2 border-[#FEFFFF] pr-2 mr-2'>{user?.displayName}</h3>
                    <VscSignOut data-tooltip-id="my-tooltip" data-tooltip-content="Sign Out!" onClick={handleSignOut} className='text-3xl hover:-rotate-12 duration-200 cursor-pointer'></VscSignOut>
                </> : <>
                    <NavLink to={'/login'}><a className="btn min-h-0 h-8 bg-transparent hover:bg-[#DEF2F1] font-bold rounded px-4 border-2 border-[#FEFFFF] text-[#FEFFFF] hover:text-black hover:border-[#FEFFFF]">Login</a></NavLink>
                </>}
            </div>
            <ToastContainer />
            <Tooltip place='bottom-start' id="my-tooltip" />
        </div>
    );
};

export default Navbar;