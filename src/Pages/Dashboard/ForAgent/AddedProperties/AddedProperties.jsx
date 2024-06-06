import React, { useEffect, useState } from 'react';
import Header from '../../../../Shared/Header/Header';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaDollarSign, FaMapPin, FaPen, FaTrashAlt, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const AddedProperties = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: properties = [], refetch} = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/property/normal/${user.email}`)
            const reversedData = res.data.reverse();
            return reversedData;
        }
    })

    const handleDeleteProperty = data => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/property/${data._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${data.property_title} is successfully deleted!`,
                            showConfirmButton: false,
                            timer: 2000
                          });
                    }
                })
            }
          });
    }

    return (
        <div className='mt-8'>
            <Header header='My Added Properties'></Header>
            <div className='mt-6'>
                <div className='grid grid-cols-1 lg:grid-cols-2 w-fit gap-4 mx-auto'>
                    {
                        properties.map(property => <div key={property._id} className="card sm:w-[350px] w-[400px] bg-[#17242A] text-[#FEFFFF] shadow-xl mx-auto rounded-md mb-4">
                        <figure><img src={property.property_image} alt="property" className='w-full h-[250px] object-cover' /></figure>
                        <div className="card-body py-4 px-4">
                            <div className='flex items-center gap-2 justify-center'>
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={property.agent_image} alt={property.agent_name} />
                                    </div>
                                </div>
                                <h2 className='text-xl font-bold flex items-center justify-center gap-1'> {property.agent_name}</h2>
                            </div>
                            <div className='border-b-2 border-[#FEFFFF] mt-2 mb-1'></div>
                            <h4 className='text-2xl font-bold'>{property.property_title}</h4>
                            <p className='flex items-center'><FaMapPin className='text-lg'></FaMapPin>Location:- {property.property_location}</p>
                            <p className='flex items-center'><FaDollarSign className='text-lg'></FaDollarSign>Price Range:- {property.price_range}</p>
                            <div className='border-b-2 border-[#FEFFFF] mt-2 mb-1'></div>
                            <div className='flex items-center justify-between'>
                                <div className="">
                                    { property.verification_status === 'pending' ? <h2 className="text-center font-bold px-3 py-1 w-fit text-yellow-500 border-2 rounded-full border-yellow-500"> {property.verification_status}</h2> : property.verification_status === 'Rejected' ? <h2 className="text-center font-bold px-3 py-1 w-fit text-red-600 border-2 rounded-full border-red-600"> {property.verification_status}</h2> : <h2 className="text-center font-bold px-3 py-1 w-fit text-green-600 border-2 rounded-full border-green-600"> {property.verification_status}</h2>}
                                </div>
                                <div className='flex items-center gap-3 w-fit'>
                                    {
                                        property.verification_status === 'Rejected' ? <></> : <button className="btn btn-square min-h-0 h-10 w-10 bg-yellow-500 hover:bg-yellow-400 border-none">
                                        <FaPen className='text-lg text-[#FEFFFF]'></FaPen>
                                        </button>
                                    }
                                    <button onClick={() => handleDeleteProperty(property)} className="btn btn-square min-h-0 h-10 w-10 bg-red-600 hover:bg-red-500 border-none">
                                        <FaTrashAlt className='text-lg text-[#FEFFFF]'></FaTrashAlt>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AddedProperties;