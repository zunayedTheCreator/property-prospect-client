import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import PropertiesCard from './PropertiesCard';
import useProperty from '../../hooks/useProperty';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaSearch } from 'react-icons/fa';
import { axiosSecure } from '../../hooks/useAxiosSecure';

const AllProperties = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        axiosPublic.get('/property')
        .then(res => {
            const filtered = res.data.filter(data => data.verification_status === 'Verified');
            setProperties(filtered)
        })
    }, [axiosPublic])
    console.log(properties);

    const handleSearch = e => {
        e.preventDefault();
        const search = e.target.search.value;

        if (search === '') {
            axiosPublic.get('/property')
            .then(res => {
                const filtered = res.data.filter(data => data.verification_status === 'Verified');
                setProperties(filtered)
            })
        }
        else {
            axiosSecure.get(`/property/search/${search}`)
                .then(res => {
                    setProperties(res.data)
                })
        }
        e.target.search.value = ''
    }

    return (
        <div className='pt-20 mb-9'>
            <div className='pt-10 mb-6'>
                <Header header="All Properties" ></Header>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='w-fit mx-auto'>
                    <div className='flex justify-center lg:justify-end mb-5 border-b-2 border-[#FEFFFF] pb-2'>
                        <form onSubmit={handleSearch} className='max-w-xs bg-[#FEFFFF] rounded-full flex items-center p-1 border border-[#17242A]'>
                            <input name='search' type="text" placeholder="Type here" className="input w-full min-h-0 h-10 border rounded-full no-border bg-transparent text-[#17242A] font-bold" />
                            <button className='btn border-none min-h-0 h-10 w-10 rounded-full p-2 bg-[#17242A] text-[#FEFFFF] hover:bg-black'><FaSearch className='text-lg'></FaSearch></button>
                        </form>
                    </div>
                    {properties.length === 0 ? <h2 className='text-2xl font-bold text-red-600 text-center'>No Properties Found!</h2> : <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-fit mx-auto'>
                        {
                            properties.map(data => <PropertiesCard key={data._id} data={data}></PropertiesCard>)
                        }
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default AllProperties;