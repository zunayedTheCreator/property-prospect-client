import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const MakeOffer = () => {
    const {user} = useContext(AuthContext);
    const property = useLoaderData();
    console.log(property);

    const {property_title, property_location, agent_name, user_email, price_range} = property;

    return (
        <div className='min-h-screen flex flex-col md:flex-row items-center justify-center px-5 xl:px-0'>
            <div className='w-full xl:w-[1030px] bg-[#17242A] mx-auto rounded-lg px-4 py-6'>
                <form>
                    <h3 className='text-4xl font-bold text-[#FEFFFF] text-center'>Make A Offer</h3>
                    <div className='border-t-2 border-[#FEFFFF] mt-2 mb-4'></div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Property Title -</span>
                            </div>
                            <input type="text" readOnly defaultValue={property_title} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Property Location -</span>
                            </div>
                            <input type="text" readOnly defaultValue={property_location} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Buyer Name -</span>
                            </div>
                            <input type="text" readOnly defaultValue={user.displayName} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Buyer Email -</span>
                            </div>
                            <input type="text" readOnly defaultValue={user_email} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Agent Name -</span>
                            </div>
                            <input type="text" readOnly defaultValue={agent_name} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Offered Amount -</span>
                            </div>
                            <input type="number" placeholder={`Price must be between ${price_range}`} className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='mb-6'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Buying Date -</span>
                            </div>
                            <input type="date" placeholder="Enter a date" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md w-full">Offer</button>
                </form>
            </div>
        </div>
    );
};

export default MakeOffer;