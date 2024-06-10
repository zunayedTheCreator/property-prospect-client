import React from 'react';
import Header from '../../../../Shared/Header/Header';
import useProperty from '../../../../hooks/useProperty';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import MyDynamicTitle from '../../../../../MyDynamicTitle';

const ManageProperties = () => {
    MyDynamicTitle('Dashboard | Manage Properties')
    const [property, refetch] = useProperty();
    const axiosSecure = useAxiosSecure();

    const handleVerified = id => {
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
                axiosSecure.patch(`/property/verified/${id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal
                        .fire({
                            title: "Accepted!",
                            text: "You verified the property!.",
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
                axiosSecure.patch(`/property/rejected/${id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal
                        .fire({
                            title: "Rejected!",
                            text: "You rejected the property!.",
                            icon: "success"
                        });
                    }
                })
            }
          });
    }

    return (
        <div className='mt-8'>
            <Header header='Manage Properties'></Header>
            <div className='px-2 md:px-4 mt-7'>
            <div className="overflow-x-auto rounded-t-lg border-[#FEFFFF]">
                <table className="table">
                    {/* head */}
                    <thead className='bg-[#17242A] text-[#FEFFFF]'>
                    <tr>
                        <th></th>
                        <th>Property Title</th>
                        <th>Property Location</th>
                        <th>Agent Name</th>
                        <th>Agent Email</th>
                        <th>Offered Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className='text-[#17242A] font-bold'>
                        {
                            property.map((property, index) => <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>{property.property_title}</td>
                                <td>{property.property_location}</td>
                                <td>{property.agent_name}</td>
                                <td>{property.agent_email}</td>
                                <td>{property.price_range}</td>
                                {
                                    property.verification_status === 'Verified' ? <td><h2 className="text-center font-bold px-3 py-1 w-fit text-lime-400 border-2 rounded-full border-lime-400"> {property.verification_status}</h2></td> : property.verification_status === 'Rejected' ? <td><h2 className="text-center font-bold px-3 py-1 w-fit text-red-600 border-2 rounded-full border-red-600"> {property.verification_status}</h2></td> : <td><button onClick={() => handleVerified(property._id)} className="btn btn-square min-h-0 h-8 w-8 bg-green-600 hover:bg-green-500 border-none">
                                    <FaCheck className=' text-[#FEFFFF]'></FaCheck>
                                    </button></td>
                                }
                                {
                                    property.verification_status === 'Verified' ? <td></td> : property.verification_status === 'Rejected' ? <td></td> : <td><button onClick={() => handleReject(property._id)} className="btn btn-square min-h-0 h-8 w-8 bg-red-600 hover:bg-red-500 border-none">
                                    <FaXmark className='text-lg text-[#FEFFFF]'></FaXmark>
                                </button></td>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ManageProperties;