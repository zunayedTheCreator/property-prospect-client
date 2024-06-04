import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaMapPin, FaPen } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Details = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const property = useLoaderData();
    const { property_image, property_title, property_location, agent_name, agent_image, verification_status, price_range, _id, description } = property;
    const presentTime = new Date();

    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const textarea = document.querySelector('textarea')
    textarea?.addEventListener("keyup", e => {
        textarea.style.height = "20px"
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`
    })

    useEffect(() => {
        fetch('http://localhost:5000/review')
        .then(res => res.json())
        .then(data => {
            setReviews(data)
        })
    } , [refresh])

    useEffect(() => {
        if (property) {
          const filtered = reviews.filter(review => review.property_id === _id);
          setFilteredReviews(filtered);
        }
      }, [property, reviews, _id, refresh]);

    const handleAddReview = e => {
        e.preventDefault();
        const review = e.target.review.value;
        if (e.target.review.value === '' || e.target.review.value === ' ') {
            return Swal.fire({
                position: "top-right",
                icon: "error",
                title: "Please write something",
                showConfirmButton: false,
                timer: 2000
            });
        }
        const newReview = {
            reviewer_name: user.displayName,
            reviewer_image: user.photoURL,
            review_description: review,
            property_title: property_title,
            property_id: _id,
            posting_date: presentTime,
            reviewer_email: user.email,
            agent_name: agent_name
        }
        console.log(newReview);
        axiosSecure.post('/review', newReview)
        .then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-right",
                    icon: "success",
                    title: "Thanks for the review!",
                    showConfirmButton: false,
                    timer: 2000
                });
                e.target.review.value = '';
                setRefresh(!refresh);
            }
        })
    }

    console.log(filteredReviews.length);
    return (
        <div className='pt-14'>
            <div>
                <div className=''>
                    <img className='w-full h-[450px] rounded-lg mx-auto object-cover' src={property_image} alt="" />
                </div>
                <div className='border-t-4 border-[#FEFFFF] mt-4 mb-5'></div>
                <div className='max-w-7xl bg-[#17242A] mx-auto rounded-md py-4 px-6 text-[#FEFFFF] mb-8'>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className="avatar">
                                <div className="w-12 rounded-full border-2 border-[#FEFFFF]">
                                    <img src={agent_image} alt={agent_name} />
                                </div>
                            </div>
                            <h1 className='font-bold text-lg mb-4'>{agent_name}</h1>
                        </div>
                        <h2 className="font-bold text-sm w-fit text-green-600 border-2 rounded-full border-green-600 px-3 py-1">{verification_status}</h2>
                    </div>
                    <div className='border border-[#FEFFFF] mt-3 mb-5'></div>
                    <div className='mb-4'>
                        <h2 className='text-3xl font-bold mb-3'>{property_title}</h2>
                        <p className='font-bold text-sm max-w-4xl'>{description}</p>
                    </div>
                    <div className='border border-[#FEFFFF] mb-4'></div>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 mb-3'>
                        <h2 className='flex items-center text-sm md:text-base gap-1'><FaMapPin className='text-base md:text-lg'></FaMapPin>Location:- {property_location}</h2>
                        <h2 className='flex items-center text-sm md:text-base gap-1'><FaDollarSign className='text-base md:text-lg'></FaDollarSign>Price Range:- {price_range}</h2>
                    </div>
                    <div className='flex justify-end'>
                        <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md">Add to wishlist</button>
                    </div>

                </div>
                <div className='max-w-7xl mx-auto px-2 md:px-0'>
                    <div className='border-b border-black pb-1 flex items-center justify-between mb-4'>
                        <h2 className='text-4xl font-bold ml-2'>Reviews</h2>
                        <button onClick={()=>document.getElementById('my_modal').showModal()} className="btn min-h-0 h-8 bg-transparent hover:bg-[#17242A] font-bold rounded px-4 border-2 border-[#17242A] text-[#17242A] hover:text-[#FEFFFF] hover:border-[#17242A] mr-2"><FaPen></FaPen> Add a review </button>
                        <dialog id="my_modal" className="modal modal-bottom sm:modal-middle z-[1]">
                            <div className="modal-box bg-[#17242A] text-[#FEFFFF]">
                                <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg mb-3">Add a review!</h3>
                                <form onSubmit={handleAddReview}>
                                    <textarea className="textarea textarea-ghost bg-[#17242A] font-bold review-input rounded-none px-2 pt-4 pb-1 w-full min-h-0 h-[58px] mb-3" name='review' placeholder="Type Here"></textarea>
                                    <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md w-full">Post Review</button>
                                </form>
                            </div>
                        </dialog>
                    </div>
                    {
                        filteredReviews.length > 0 ? <div>
                            {
                                filteredReviews.map(review => <div className='max-w-3xl' key={review._id}>
                                    <div className='flex items-center gap-2'>
                                        <div className="avatar pb-10">
                                            <div className="w-11 rounded-full border-2 border-[#17242A]">
                                                <img src={review.reviewer_image} alt={review.reviewer_name} />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className='text-[#17242A] text-lg font-bold border-b border-[#17242A] w-fit mb-2'>{review.reviewer_name}</h2>
                                            <p className='text-[#17242A] text-sm font-bold'>{review.review_description}</p>
                                        </div>
                                    </div>
                                    <div className='border-t border-[#17242A] max-w-lg mt-3 mb-5'></div>
                                </div>)
                            }
                        </div> : <h2 className='text-4xl text-red-600 text-center font-semibold'>No reviews available :(</h2>
                    }
                </div>
            </div>
        </div>
    );
};

export default Details;