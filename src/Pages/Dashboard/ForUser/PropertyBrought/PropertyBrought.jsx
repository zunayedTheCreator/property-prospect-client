import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaDollarSign, FaMapPin, FaUser } from 'react-icons/fa';

const PropertyBrought = () => {
    const {user} = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch('http://localhost:5000/brought-property')
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
      }, [user, refresh, properties]);

    
    return (
        <div className='mt-8 sm:px-2 md:px-4'>
            <h2 className='text-[#17242A] font-bold text-4xl text-center'>Property Brought</h2>
            <div className='border-t border-[#17242A] mt-2 mb-5'></div>
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-2 w-fit gap-4 mx-auto'>
                    {
                        filteredProperties.map(property => <div key={property._id} className="card sm:w-[350px] w-[400px] bg-[#17242A] text-[#FEFFFF] shadow-xl mx-auto rounded-md mb-4">
                        <figure><img src={property.property_image} alt="property" className='w-full h-[250px] object-cover' /></figure>
                        <div className="card-body py-4 px-4">
                            <h2 className='text-xl font-bold flex items-center justify-center border-b-2 border-[#FEFFFF] pb-2 mb-2 gap-1'><FaUser></FaUser> {property.agent_name}</h2>
                            <h4 className='text-2xl font-bold'>{property.property_title}</h4>
                            <p className='flex items-center'><FaMapPin className='text-lg'></FaMapPin>Location:- {property.property_location}</p>
                            <p className='flex items-center'><FaDollarSign className='text-lg'></FaDollarSign>Offered Price:- {property.offered_amount}</p>
                            <div className="mt-2">
                                <h2 className="text-center font-bold text-lg w-full text-green-600 border-2 rounded-full border-green-600"> {property.status}</h2>
                            </div>
                        </div>
                    </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PropertyBrought;