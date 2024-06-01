import React from 'react';
import { FaHouseChimney } from "react-icons/fa6";
import house from '../../../../public/images/banner-house.png'
const Banner = () => {
    return (
        <div className='bg-[#17242A] h-[700px] container-bottom border-b-2 border-[#FEFFFF]'>
            <div className='mt-16 ml-6 lg:ml-16'>
                <div className='h-[100px] lg:h-[170px] flex gap-2 mt-12 mb-5'>
                    <div><h4 className='text-3xl lg:text-7xl text-[#FEFFFF] font-bold mt-4'>Property</h4></div>
                    <div className='border-[3px] lg:border-[5px] border-[#FEFFFF]'></div>
                    <div className='flex items-end'><h4 className='text-3xl lg:text-7xl text-[#FEFFFF] font-bold mb-4'>Prospect</h4></div>
                </div>
                <p className='max-w-5xl font-bold text-[#FEFFFF] mb-6'>Explore verified property listings with competitive prices and expert guidance at Property Prospect. Discover your dream home effortlessly with our user-friendly platform. Whether buying or renting, your perfect property is just a click away. Start your journey today - With Property Prospect!</p>
                <button className='btn bg-[#DEF2F1] hover:bg-[#FEFFFF] font-bold text-black rounded-full px-6'>View Property</button>
            </div>
           <div className='flex justify-end'>
                <img src={house} alt='house' />
           </div>
        </div>
    );
};

export default Banner;