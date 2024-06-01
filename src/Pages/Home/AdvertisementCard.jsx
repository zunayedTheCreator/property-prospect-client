import React from 'react';
import { FaMapPin } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

const AdvertisementCard = ({data}) => {
    const {image, location, price_range, verification_status} = data;
    return (
        <div className="card w-[450px] bg-[#17242A] text-[#FEFFFF] shadow-xl mx-auto rounded-md mt-6">
            <figure><img src={image} alt="property" className='w-full h-[250px] object-cover' /></figure>
            <div className="card-body">
                <div className='border-2 rounded-full border-green-600'>
                    <h2 className="card-title w-fit mx-auto text-green-600">{verification_status}</h2>
                </div>
                <p className='flex items-center'><FaMapPin className='text-lg'></FaMapPin>Location:- {location}</p>
                <p className='flex items-center'><FaDollarSign className='text-lg'></FaDollarSign>Price Range:- {price_range}</p>
                <div className="card-actions mt-2">
                <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementCard;