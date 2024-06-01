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
        fetch('advertisement.json')
        .then(res => res.json())
        .then(data => {
            setDatas(data)
            console.log(data.length);
        })
    }, [])

    const cards = datas.map(data => <SwiperSlide key={data.id}><AdvertisementCard data={data}></AdvertisementCard></SwiperSlide>)

    return (
        <div className='max-w-4xl mx-auto mb-9'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-[550px] mt-10"
            >
                {cards}
            </Swiper>
        </div>
    );
};

export default Advertisement;