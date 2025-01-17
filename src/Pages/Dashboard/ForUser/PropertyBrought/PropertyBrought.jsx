import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaDollarSign, FaMapPin, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FaCopy } from "react-icons/fa";
import { RiCheckDoubleFill } from "react-icons/ri";
import MyDynamicTitle from '../../../../../MyDynamicTitle';

const PropertyBrought = () => {
    MyDynamicTitle('Dashboard | Brought Property')
    const {user} = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [copied, setCopied] = useState(false)

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch('https://property-prospect-server.vercel.app/brought-property')
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
                                { property.status === 'Accepted' ? <h2 className="text-center font-bold text-lg w-full text-green-600 border-2 rounded-full border-green-600"> {property.status}</h2> : property.status === 'Rejected' ? <h2 className="text-center font-bold text-lg w-full text-red-600 border-2 rounded-full border-red-600"> {property.status}</h2> : property.status === 'Bought' ? <h2 className="text-center font-bold text-lg w-full text-blue-600 border-2 rounded-full border-blue-600"> {property.status}</h2> : <h2 className="text-center font-bold text-lg w-full text-yellow-400 border-2 rounded-full border-yellow-400"> {property.status}</h2>}
                            </div>
                            {
                                property.status === "Accepted" ? <div className='border-t-2 border-[#FEFFFF] mt-1 flex justify-end'>
                                    <Link to={`/dashboard/payment-for/${property._id}`}><button className="btn min-h-0 h-8 bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md px-6 mt-2">Pay</button></Link>
                                </div> : property.status === "Bought" ? <div className='border-t-2 border-[#FEFFFF] mt-1 flex justify-center'>
                                    <CopyToClipboard text={property.transition_id} onCopy={(text, result) => {
                                        setCopied(true)
                                    }}>
                                        <button className={ copied ? 'font-bold flex items-center gap-2 mt-2 text-[#16a34a]' : 'font-bold flex items-center gap-2 mt-2 text-[#FEFFFF]'}>{ copied ? <RiCheckDoubleFill className='text-xl'></RiCheckDoubleFill> : <FaCopy className='text-lg'></FaCopy>} {property.transition_id}</button>
                                    </CopyToClipboard>
                                </div> : <></>
                            }
                        </div>
                    </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PropertyBrought;