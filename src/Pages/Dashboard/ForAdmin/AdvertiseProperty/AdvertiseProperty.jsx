import React, { useEffect, useState } from 'react';
import Header from '../../../../Shared/Header/Header';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MyDynamicTitle from '../../../../../MyDynamicTitle';

const AdvertiseProperty = () => {

    MyDynamicTitle('Dashboard | Advertise Property')
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const {data: properties = [], refetch} = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/property')
            const filtered = res.data.filter(data => data.verification_status === 'Verified');
            return filtered;
        }
    })

    const handleAdvertiseProperty = property => {
        const newProperty = {
            image: property.property_image,
            location: property.property_location,
            price_range: property.price_range,
            verification_status: property.verification_status,
            main_id: property._id
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/advertisement', newProperty)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        axiosSecure.patch(`/property/advertised/${property._id}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0){
                                refetch();
                                Swal.fire({
                                    title: "Advertised!",
                                    text: "You advertised this property!",
                                    icon: "success"
                                });
                            }
                        })
                    }
                })
            }
          });
    }
    return (
        <div className='mt-8'>
            <Header header='Advertise Property'></Header>
            <div className='px-2 md:px-4 mt-7'>
                <div className="overflow-x-auto rounded-t-lg border-[#FEFFFF]">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#17242A] text-[#FEFFFF]'>
                        <tr>
                            <th></th>
                            <th>Property Image</th>
                            <th>Property Title</th>
                            <th>Price Range</th>
                            <th>Agent Name</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='text-[#17242A] font-bold'>
                            {
                                properties.map((property, index) => <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={property.property_image} alt={property.property_title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{property.property_title}</td>
                                    <td>{property.price_range}</td>
                                    <td>{property.agent_name}</td>
                                    {property.advertised ? <td><h2 className='text-lime-400 font-bold'>Advertised</h2></td> : <td><button onClick={() => handleAdvertiseProperty(property)} className="btn min-h-0 h-8 bg-transparent hover:bg-[#DEF2F1] font-bold rounded px-4 border-2 border-[#FEFFFF] text-[#FEFFFF] hover:text-black hover:border-[#FEFFFF]">Advertise</button></td>}
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseProperty;