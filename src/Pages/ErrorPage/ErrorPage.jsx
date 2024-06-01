import React from 'react';
import city from '../../../public/images/error-city.png'
import error from '../../../public/images/404.png'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='bg-[#3AAFA9] h-full'>
            <div className='h-screen container-bottom'>
                <div className='flex flex-col lg:flex-row items-center justify-around'>
                    <img className='w-full md:w-[300px] lg:w-[400px] xl:w-[500px]' src={error} alt="" />
                    <div className='px-5 lg:px-0'>
                        <h3 className='text-5xl font-bold mb-2'>Oh No!</h3>
                        <h4 className='text-3xl font-bold'>Something went wrong :(</h4>
                        <h5 className='font-bold text-xl text-red-600 mb-4'>404 - Page not found</h5>
                        <Link to={'/'}><button className='btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-full px-7'>Go back</button></Link>
                    </div>
                </div>
                <div className='hidden lg:flex justify-end'>
                    <img src={city} alt="" />
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;