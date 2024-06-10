import React from 'react';
import Header from '../../../../Shared/Header/Header';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEnvelope, FaRegClock, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import MyDynamicTitle from '../../../../../MyDynamicTitle';

const ManageReviews = () => {
    MyDynamicTitle('Dashboard | Manage Reviews')
    const axiosSecure = useAxiosSecure();

    const {data: reviews = [], refetch} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/review')
            const reversedData = res.data.reverse();
            return reversedData;
        }
    })

    const handleDeleteReview = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/review/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Review deleted successfully.",
                            icon: "success"
                        });
                    }
                })
            }
          });
      }
    return (
        <div className='mt-8'>
            <Header header='Manage Reviews'></Header>
            <div className='mt-6'>
                <div className='w-fit mx-auto'>
                    {
                        reviews.length > 0 ? <div className='px-3'>
                            {
                                reviews.map(review => <div className='max-w-3xl bg-[#17242A] px-3 py-4 rounded-lg mb-3' key={review._id}>
                                    <div className='border-b border-[#FEFFFF] pb-2 mb-3 flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <div className="avatar">
                                                <div className="w-11 rounded-full border-2 border-[#FEFFFF]">
                                                    <img src={review.reviewer_image} alt={review.reviewer_name} />
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='text-[#FEFFFF] text-lg font-bold w-fit mb-2'>{review.reviewer_name}</h2>
                                            </div>
                                        </div>
                                        <h2 className='text-[#FEFFFF] flex items-center gap-2'><FaEnvelope className='text-xl'></FaEnvelope>{review.reviewer_email}</h2>
                                    </div>
                                    <div>
                                        <h2 className='text-[#FEFFFF] text-2xl font-bold mb-2'>{review.property_title}</h2>
                                        <p className='text-[#FEFFFF] text-sm font-bold'>{review.review_description}</p>
                                    </div>
                                    <div className='border-t border-[#FEFFFF] max-w-lg mt-3 mb-2'></div>
                                    <div className='flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between gap-2'>
                                        <h2 className='text-[#FEFFFF] text-lg font-bold mb-2'>Agent Name: {review.agent_name}</h2>
                                        <button onClick={() => handleDeleteReview(review._id)} className="btn btn-square min-h-0 h-10 w-10 bg-red-600 hover:bg-red-500 border-none">
                                            <FaTrashAlt className='text-lg text-[#FEFFFF]'></FaTrashAlt>
                                        </button>
                                    </div>
                                </div>)
                            }
                        </div> : <h2 className='text-4xl text-red-600 text-center font-semibold'>No reviews available :(</h2>
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageReviews;