import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Header from '../../../../Shared/Header/Header';
import useAuth from '../../../../hooks/useAuth';

const SoldProperties = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/brought-property/normal/${user.email}`)
        .then(res => {
            const filtered = res.data.filter(property => property.status === 'Bought');
            setProperties(filtered)
        })
    }, [axiosSecure, user.email])

    return (
        <div className='mt-8'>
        <Header header="Sold Properties"></Header>
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
                        <th>Sold Price</th>
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
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default SoldProperties;