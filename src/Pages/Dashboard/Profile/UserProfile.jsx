import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaClock, FaEnvelope, FaPen, FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdBlockFlipped } from 'react-icons/md';

const UserProfile = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        axiosSecure.get(`/user/normal/${user.email}`)
        .then(res => {
            setCurrentUser(res.data)
        })
    }, [axiosSecure, user.email])

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='w-[350px] md:w-[450px] bg-[#17242A] rounded-lg px-3 py-4 text-[#FEFFFF]'>
                <div className='text-center mb-2'>
                    <div className="avatar">
                        <div className="w-20 rounded-full border-2 border-[#FEFFFF]">
                            <img src={user.photoURL} />
                        </div>
                    </div>
                </div>
                <div className='border-t-2 border-[#FEFFFF] mb-5'></div>
                <div className='px-3'>
                    <h3 className='font-bold flex items-center gap-2 text-base md:text-xl mb-3'><FaUser className='text-xl md:text-2xl'></FaUser> {user.displayName}</h3>
                    <h3 className='font-bold flex items-center gap-2 text-base md:text-xl mb-5'><FaEnvelope className='text-xl md:text-2xl'></FaEnvelope> {user.email}</h3>
                    <h3 className='font-bold text-base md:text-xl mb-1'>Account Created on:</h3>
                    <h3 className='font-bold flex items-center gap-2 text-base md:text-xl'><FaClock className='text-xl md:text-2xl'></FaClock> {user.metadata?.creationTime}</h3>
                </div>
                <div className='border-t-2 border-[#FEFFFF] mb-5 mt-3'></div>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                    <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md"><FaPen></FaPen>Update Profile</button>
                    {
                        currentUser.status === 'fraud' ? <h2 className="flex items-center gap-1 text-center font-bold px-3 py-1 w-fit text-red-600 rounded-full"><MdBlockFlipped className='text-lg'></MdBlockFlipped> You are a fraud</h2> : currentUser?.role === 'admin' ? <h2 className="text-center font-bold px-3 py-1 w-fit text-pink-600 border-2 rounded-full border-pink-600">Admin</h2> : currentUser?.role === 'agent' ? <h2 className="text-center font-bold px-3 py-1 w-fit text-indigo-600 border-2 rounded-full border-indigo-600">Agent</h2> : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserProfile;