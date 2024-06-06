import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaCheck } from 'react-icons/fa';
import Header from '../../../../Shared/Header/Header';
import { FaXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';

const RequestedProperties = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: properties = [], refetch} = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/brought-property/normal/${user.email}`)
            const reversedData = res.data.reverse();
            return reversedData;
        }
    })

    const handleAccept = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/brought-property/accepted/${id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal
                        .fire({
                            title: "Accepted!",
                            text: "You accepted the request!.",
                            icon: "success"
                        });
                    }
                })
            }
          });
    }

    const handleReject = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/brought-property/rejected/${id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal
                        .fire({
                            title: "Rejected!",
                            text: "You rejected the request!.",
                            icon: "success"
                        });
                    }
                })
            }
          });
    }

    return (
        <div className='mt-8'>
        <Header header="Requested Properties"></Header>
        <div className='px-2 md:px-4 mt-7'>
            <div className="overflow-x-auto rounded-t-lg border-[#FEFFFF]">
                <table className="table">
                    {/* head */}
                    <thead className='bg-[#17242A] text-[#FEFFFF]'>
                    <tr>
                        <th></th>
                        <th>Property Title</th>
                        <th>Property Location</th>
                        <th>Buyer Name</th>
                        <th>Buyer Email</th>
                        <th>Offered Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className='text-[#17242A] font-bold'>
                        {
                            properties.map((property, index) => <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>{property.property_title}</td>
                                <td>{property.property_title}</td>
                                <td>{property.user_name}</td>
                                <td>{property.user_email}</td>
                                <td>${property.offered_amount}</td>
                                { property.status === 'Accepted' ? <td><h2 className="font-bold px-3 py-1 w-fit text-lime-400 border-2 rounded-full border-lime-400"> {property.status}</h2></td> : property.status === 'Rejected' ? <td><h2 className="text-center font-bold px-3 py-1 w-fit text-red-600 border-2 rounded-full border-red-600"> {property.status}</h2></td> : <td><button onClick={() => handleAccept(property._id)} className="btn btn-square min-h-0 h-8 w-8 bg-green-600 hover:bg-green-500 border-none">
                                        <FaCheck className=' text-[#FEFFFF]'></FaCheck>
                                    </button></td>}
                                { property.status === 'Accepted' ? <td></td> : property.status === 'Rejected' ? <td></td> : <td><button onClick={() => handleReject(property._id)} className="btn btn-square min-h-0 h-8 w-8 bg-red-600 hover:bg-red-500 border-none">
                                        <FaXmark className='text-lg text-[#FEFFFF]'></FaXmark>
                                    </button></td>}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default RequestedProperties;