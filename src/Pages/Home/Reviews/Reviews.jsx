import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Reviews = () => {

    const [slicedDatas, setSlicedDatas] = useState([]);

    useEffect( () => {
        fetch('https://property-prospect-server.vercel.app/review')
        .then(res => res.json())
        .then(data => {
            const reversedData = data.reverse();
            setSlicedDatas(reversedData.slice(0,5))
        })
    }, [])

    return (
        <div className='max-w-5xl mx-auto mb-9'>
            <Swiper

                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-[350px] mt-4"
            >
                {
                    slicedDatas.map(data => <SwiperSlide key={data._id}>
                        <div className='mt-10 bg-[#17242A] py-4 px-5 rounded-md w-fit mx-auto'>
                            <div className='flex items-center gap-2 w-fit mx-auto mb-2'>
                                <div className="avatar">
                                    <div className="w-12 border-2 border-[#FEFFFF] rounded-full">
                                        <img src={data.reviewer_image} alt={data.reviewer_name} />
                                    </div>
                                </div>
                                <h2 className='text-2xl font-bold text-[#FEFFFF]'>{data.reviewer_name}</h2>
                            </div>
                            <div className='border-[#FEFFFF] border-2 mx-auto w-3/5 mb-4'></div>
                            <h3 className='text-4xl font-bold text-[#FEFFFF] text-center mb-5'>{data.property_title}</h3>
                            <p className='max-w-3xl text-center mx-auto font-bold text-[#FEFFFF] border-x-4 border-[#3AAFA9]'>{data.review_description}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Reviews;