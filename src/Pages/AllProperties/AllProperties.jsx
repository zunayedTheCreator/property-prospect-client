import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import PropertiesCard from './PropertiesCard';
import useProperty from '../../hooks/useProperty';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

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

    return (
        <div className='pt-20 mb-9'>
            <div className='pt-10 mb-12'>
                <Header header="All Properties" ></Header>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-fit mx-auto'>
                    {
                        properties.map(data => <PropertiesCard key={data._id} data={data}></PropertiesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProperties;