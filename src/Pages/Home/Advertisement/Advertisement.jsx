import React, { useEffect, useState } from 'react';
import AdvertisementCard from './AdvertisementCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Advertisement = () => {

    const [datas, setDatas] = useState([]);

    useEffect( () => {
        fetch('https://property-prospect-server.vercel.app/advertisement')
        .then(res => res.json())
        .then(data => {
            setDatas(data)
            console.log(data.length);
        })
    }, [])

    const cards = datas.map(data => <SwiperSlide key={data._id}><AdvertisementCard data={data}></AdvertisementCard></SwiperSlide>)

    return (
        <div className='mb-9'>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-fit mx-auto'>
                {cards}
            </div>
        </div>
    );
};

export default Advertisement;