import axios from 'axios';
import React from 'react';

export const axiosPublic = axios.create({
    baseURL: 'https://property-prospect-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
