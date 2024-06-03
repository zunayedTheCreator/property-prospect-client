import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import PropertiesCard from './PropertiesCard';

const AllProperties = () => {

    const [datas, setDatas] = useState([]);

    useEffect( () => {
        fetch('properties.json')
        .then(res => res.json())
        .then(data => {
            setDatas(data)
            console.log(data);
        })
    }, [])
    return (
        <div className='pt-20 mb-9'>
            <div className='pt-10 mb-12'>
                <Header header="All Properties" ></Header>
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-fit mx-auto'>
                    {
                        datas.map((data, index) => <PropertiesCard key={index} data={data}></PropertiesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProperties;