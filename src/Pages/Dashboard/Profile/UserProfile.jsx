import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaClock, FaEnvelope, FaPen, FaUser } from 'react-icons/fa';

const UserProfile = () => {
    const {user} = useContext(AuthContext);

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
                <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md"><FaPen></FaPen>Update Profile</button>
            </div>
        </div>
    );
};

export default UserProfile;