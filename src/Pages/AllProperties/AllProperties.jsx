import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import PropertiesCard from './PropertiesCard';
import useProperty from '../../hooks/useProperty';

const AllProperties = () => {
    const [property] = useProperty();
    
    return (
        <div className='pt-20 mb-9'>
            <div className='pt-10 mb-12'>
                <Header header="All Properties" ></Header>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-fit mx-auto'>
                    {
                        property.map((data) => <PropertiesCard key={data._id} data={data}></PropertiesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProperties;