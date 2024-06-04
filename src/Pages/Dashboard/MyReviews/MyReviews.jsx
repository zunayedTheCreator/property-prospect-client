import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaRegClock, FaTrashAlt } from 'react-icons/fa';

const MyReviews = () => {
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/review')
        .then(res => res.json())
        .then(data => {
            setReviews(data)
        })
    } , [refresh])

    useEffect(() => {
        if (user) {
          const filtered = reviews.filter(review => review.reviewer_email === user.email);
          setFilteredReviews(filtered);
        }
      }, [user, reviews, user.email, refresh]);

      const handleDeleteReview = id => {
        console.log(id);
      }

    return (
        <div className='max-w-7xl mx-auto px-2 md:px-4 mt-7'>
                    <div className='border-b border-black pb-2 mb-6'>
                        <h2 className='text-4xl font-bold ml-2 pl-2'>My Reviews</h2>
                    </div>
                    {
                        filteredReviews.length > 0 ? <div className='px-3'>
                            {
                                filteredReviews.map(review => <div className='max-w-3xl bg-[#17242A] px-3 py-4 rounded-lg mb-3' key={review._id}>
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
                                        <h2 className='text-[#FEFFFF] flex items-center gap-2'><FaRegClock className='text-xl'></FaRegClock>{review.posting_date}</h2>
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
    );
};

export default MyReviews;