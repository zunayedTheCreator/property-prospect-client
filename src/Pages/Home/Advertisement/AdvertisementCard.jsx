import React from 'react';
import { FaMapPin } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdvertisementCard = ({data}) => {
    const {image, location, price_range, verification_status, main_id} = data;
    return (
        <div className="animate__animated animate__fadeIn card sm:w-[350px] md:w-[400px] bg-[#17242A] text-[#FEFFFF] shadow-xl mx-auto rounded-md mt-6">
            <figure><img src={image} alt="property" className='w-full h-[250px] object-cover' /></figure>
            <div className="card-body">
                <div className='border-2 rounded-full border-green-600'>
                    <h2 className="card-title w-fit mx-auto text-green-600">{verification_status}</h2>
                </div>
                <p className='flex items-center'><FaMapPin className='text-lg'></FaMapPin>Location:- {location}</p>
                <p className='flex items-center'><FaDollarSign className='text-lg'></FaDollarSign>Price Range:- {price_range}</p>
                <div className="card-actions mt-2">
                <Link to={`/property-details/${main_id}`}><button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementCard;