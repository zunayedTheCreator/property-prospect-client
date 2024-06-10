import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaDollarSign, FaMapPin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LatestProperty = () => {
    const axiosPublic = useAxiosPublic();
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        axiosPublic.get('/property')
        .then(res => {
            const filtered = res.data.filter(data => data.verification_status === 'Verified');
            const reversedData = filtered.reverse();
            setProperties(reversedData)
        })
    }, [axiosPublic])
    console.log(properties[0]);
    return (
        <div className='mt-10'>
            <div><img className='w-full h-[400px] object-cover rounded-lg' src={properties[0]?.property_image} alt="" /></div>
            <div className='border-t-4 border-[#FEFFFF] mt-4 mb-5'></div>
                <div className='max-w-7xl bg-[#17242A] mx-auto rounded-md py-4 px-6 text-[#FEFFFF] mb-8'>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className="avatar">
                                <div className="w-12 rounded-full border-2 border-[#FEFFFF]">
                                    <img src={properties[0]?.agent_image} alt={properties[0]?.agent_name} />
                                </div>
                            </div>
                            <h1 className='font-bold text-lg mb-4'>{properties[0]?.agent_name}</h1>
                        </div>
                        <h2 className="font-bold text-sm w-fit text-green-600 border-2 rounded-full border-green-600 px-3 py-1">{properties[0]?.verification_status}</h2>
                    </div>
                    <div className='border border-[#FEFFFF] mt-3 mb-5'></div>
                    <div className='mb-4'>
                        <h2 className='text-3xl font-bold mb-3'>{properties[0]?.property_title}</h2>
                        <p className='font-bold text-sm max-w-4xl'>{properties[0]?.description}</p>
                    </div>
                    <div className='border border-[#FEFFFF] mb-4'></div>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 mb-3'>
                        <h2 className='flex items-center text-sm md:text-base gap-1'><FaMapPin className='text-base md:text-lg'></FaMapPin>Location:- {properties[0]?.property_location}</h2>
                        <h2 className='flex items-center text-sm md:text-base gap-1'><FaDollarSign className='text-base md:text-lg'></FaDollarSign>Price Range:- {properties[0]?.price_range}</h2>
                    </div>
                    <div className='flex justify-end'>
                        <Link to={`/property-details/${properties[0]?._id}`}><button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md">View Details</button></Link>
                    </div>
                </div>
        </div>
    );
};

export default LatestProperty;