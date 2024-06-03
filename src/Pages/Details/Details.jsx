import React from 'react';
import { FaDollarSign, FaMapPin } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';

const Details = () => {
    const property = useLoaderData();
    const { property_image, property_title, property_location, agent_name, agent_image, verification_status, price_range, _id, description } = property;

    return (
        <div className='pt-14'>
            <div>
                <div className=''>
                    <img className='w-full h-[450px] rounded-lg mx-auto object-cover' src={property_image} alt="" />
                </div>
                <div className='border-t-4 border-[#FEFFFF] mt-4 mb-5'></div>
                <div className='max-w-7xl bg-[#17242A] mx-auto rounded-md py-4 px-6 text-[#FEFFFF]'>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className="avatar">
                                <div className="w-12 rounded-full border-2 border-[#FEFFFF]">
                                    <img src={agent_image} alt={agent_name} />
                                </div>
                            </div>
                            <h1 className='font-bold text-lg mb-4'>{agent_name}</h1>
                        </div>
                        <h2 className="font-bold text-sm w-fit text-green-600 border-2 rounded-full border-green-600 px-3 py-1">{verification_status}</h2>
                    </div>
                    <div className='border border-[#FEFFFF] mt-3 mb-5'></div>
                    <div className='mb-4'>
                        <h2 className='text-3xl font-bold mb-3'>{property_title}</h2>
                        <p className='font-bold text-sm max-w-4xl'>{description}</p>
                    </div>
                    <div className='border border-[#FEFFFF] mb-4'></div>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 mb-3'>
                        <h2 className='flex items-center text-sm md:text-base gap-1'><FaMapPin className='text-base md:text-lg'></FaMapPin>Location:- {property_location}</h2>
                        <h2 className='flex items-center text-sm md:text-base gap-1'><FaDollarSign className='text-base md:text-lg'></FaDollarSign>Price Range:- {price_range}</h2>
                    </div>
                    <div className='flex justify-end'>
                        <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md">Add to wishlist</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Details;