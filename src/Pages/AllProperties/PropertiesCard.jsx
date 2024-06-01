import React from 'react';
import { FaDollarSign, FaMapPin } from 'react-icons/fa';

const PropertiesCard = ({data}) => {

    const { property_image, property_title, property_location, agent_name, agent_image, verification_status, price_range } = data;

    return (
        <div className="card w-[350px] md:w-[400px] bg-[#17242A] text-[#FEFFFF] shadow-xl mx-auto rounded-md">
            <figure><img src={property_image} alt="property" className='w-full h-[200px] object-cover' /></figure>
            <div className="card-body p-4">
                <div className='flex items-center justify-between mb-2 border-b-2 border-[#FEFFFF] pb-2'>
                    <div className='flex items-center gap-2'>
                        <div className="avatar">
                            <div className="w-10 md:w-12 rounded-full">
                                <img src={agent_image} alt="Tailwind-CSS-Avatar-component" />
                            </div>
                        </div>
                        <h3 className='text-xl md:text-2xl font-bold'>{agent_name}</h3>
                    </div>
                    <h2 className="font-bold text-sm w-fit text-green-600 border-2 rounded-full border-green-600 px-3 py-1">{verification_status}</h2>
                </div>
                <h2 className="card-title">{property_title}</h2>
                <p className='flex items-center text-sm md:text-base'><FaMapPin className='text-base md:text-lg'></FaMapPin>Location:- {property_location}</p>
                <p className='flex items-center text-sm md:text-base'><FaDollarSign className='text-base md:text-lg'></FaDollarSign>Price Range:- {price_range}</p>
                <div className="card-actions mt-2">
                <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default PropertiesCard;