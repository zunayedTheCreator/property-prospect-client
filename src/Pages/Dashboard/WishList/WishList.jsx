import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaDollarSign, FaMapPin, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WishList = () => {
    const {user} = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch('http://localhost:5000/wishlist')
        .then(res => res.json())
        .then(data => {
            setProperties(data)
        })
    } , [refresh])

    useEffect(() => {
        if (user) {
          const filtered = properties.filter(property => property.user_email === user.email);
          setFilteredProperties(filtered);
        }
      }, [properties, user, refresh]);
    return (
        <div>
            <div>
                {
                    filteredProperties.map(property => <div key={property._id} className="card max-w-4xl bg-[#17242A] text-[#FEFFFF] shadow-xl mx-auto rounded-md">
                    <figure><img src={property.property_image} alt="property" className='w-full h-[300px] object-cover' /></figure>
                    <div className="card-body p-4">
                        <div className='flex items-center justify-between mb-2 border-b-2 border-[#FEFFFF] pb-2'>
                            <div className='flex items-center gap-2'>
                                <div className="avatar">
                                    <div className="w-10 md:w-12 rounded-full">
                                        <img src={property.agent_image} alt="Tailwind-CSS-Avatar-component" />
                                    </div>
                                </div>
                                <h3 className='text-xl md:text-2xl font-bold'>{property.agent_name}</h3>
                            </div>
                            <h2 className="font-bold text-sm w-fit text-green-600 border-2 rounded-full border-green-600 px-3 py-1">{property.verification_status}</h2>
                        </div>
                        <h2 className="card-title">{property.property_title}</h2>
                        <p className='flex items-center text-sm md:text-base'><FaMapPin className='text-base md:text-lg'></FaMapPin>Location:- {property.property_location}</p>
                        <p className='flex items-center text-sm md:text-base'><FaDollarSign className='text-base md:text-lg'></FaDollarSign>Price Range:- {property.price_range}</p>
                        <div className='max-w-2xl border-t-2 border-[#FEFFFF] mt-2 mb-1'></div>
                        <div className="card-actions mt-2 items-center justify-between">
                            <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md">Make Offer</button>
                            <button className="btn btn-square min-h-0 h-10 w-10 bg-red-600 hover:bg-red-500 border-none">
                                <FaTrashAlt className='text-lg text-[#FEFFFF]'></FaTrashAlt>
                            </button>
                        </div>
                    </div>
                </div>)
                }
            </div>
        </div>
    );
};

export default WishList;