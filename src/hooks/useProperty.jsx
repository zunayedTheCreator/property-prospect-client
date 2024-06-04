import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useProperty = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch, data: property = []} =  useQuery({
        queryKey: ['cart'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('property')
            return res.data;
        }
    })
    return [property, refetch]
};

export default useProperty;