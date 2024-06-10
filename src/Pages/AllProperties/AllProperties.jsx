import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import PropertiesCard from './PropertiesCard';
import useProperty from '../../hooks/useProperty';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaAngleUp, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import MyDynamicTitle from '../../../MyDynamicTitle';

const AllProperties = () => {
    MyDynamicTitle('Property | All Properties')
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        axiosPublic.get('/property')
        .then(res => {
            const filtered = res.data.filter(data => data.verification_status === 'Verified');
            const reversedData = filtered.reverse();
            setProperties(reversedData)
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
                    const filtered = res.data.filter(data => data.verification_status === 'Verified');
                    setProperties(filtered)
                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: 'Something went wrong. Please try later!',
                        showConfirmButton: false,
                        timer: 2000
                      });
                })
        }
        e.target.search.value = ''
    }

    const handleSortLess = () => {
        axiosSecure.get('/property')
            .then(response => {
                const filtered = response.data.filter(data => data.verification_status === 'Verified');
                const fetchedProperties = filtered;

                const sorted = fetchedProperties.sort((a, b) => {
                    const pricesA = a.price_range.replace(/[\$,]/g, '').split('-').map(Number);
                    const pricesB = b.price_range.replace(/[\$,]/g, '').split('-').map(Number);
                    const minPriceA = pricesA[0];
                    const minPriceB = pricesB[0];
                    return minPriceA - minPriceB;
                });
        
                setProperties(sorted);
            })
    }

    const handleSortHigh = () => {
        axiosSecure.get('/property')
            .then(response => {
                const filtered = response.data.filter(data => data.verification_status === 'Verified');
                const fetchedProperties = filtered;

                const sorted = fetchedProperties.sort((a, b) => {
                    const pricesA = a.price_range.replace(/[\$,]/g, '').split('-').map(Number);
                    const pricesB = b.price_range.replace(/[\$,]/g, '').split('-').map(Number);
                    const minPriceA = pricesA[0];
                    const minPriceB = pricesB[0];
                    return minPriceB - minPriceA;
                });

                setProperties(sorted);
            })
    }

    const handleShowAll = () => {
        axiosSecure.get('/property')
            .then(res => {
                const filtered = res.data.filter(data => data.verification_status === 'Verified');
                setProperties(filtered);
            })
    }

    return (
        <div className='pt-20 mb-9'>
            <div className='pt-10 mb-6'>
                <Header header="All Properties" ></Header>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='w-fit mx-auto'>
                    <div className='flex flex-col lg:flex-row justify-center lg:justify-between mb-5 border-b-2 border-[#FEFFFF] pb-2 items-center gap-5'>
                        <div className='flex items-center gap-2 w-fit'>
                            <h3 className='text-[#17242A] font-bold text-lg'>Sort :-</h3>
                            <button onClick={handleSortLess} className='btn border-none bg-[#17242A] rounded-md px-4 text-[#FEFFFF] font-bold'><FaChevronUp className='text-lg'></FaChevronUp></button>
                            <button onClick={handleSortHigh} className='btn border-none bg-[#17242A] rounded-md px-4 text-[#FEFFFF] font-bold'><FaChevronDown className='text-lg'></FaChevronDown></button>
                            <button onClick={handleShowAll} className='btn border-none bg-[#17242A] rounded-md px-4 text-[#FEFFFF] font-bold'>Show All</button>
                        </div>
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