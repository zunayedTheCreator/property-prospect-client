import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateProperty = () => {
    const property = useLoaderData();
    console.log(property);
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const parsePriceRange = (priceRange) => {
        const [min, max] = priceRange.split(' - ').map(price => parseInt(price.replace(/\$|,/g, ''), 10));
        return { min, max };
    };
    const { min, max } = parsePriceRange(property.price_range);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit  = async (data) => {
        if (data.highest_price <= data.lowest_price) {
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Highest price must be higher than the lowest price.",
                showConfirmButton: false,
                timer: 2000
            });
        }
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const newProperty = {
                property_title: data.property_title,
                property_location: data.property_location,
                property_image: res.data.data.display_url,
                agent_name: data.agent_name,
                agent_email: data.agent_email,
                price_range: '$'+data.lowest_price+' '+'-'+' '+'$'+data.highest_price,
                description: data.description,
            }

            axiosSecure.patch(`/property/${property._id}`, newProperty)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully updated!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
        }
    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row items-center justify-center px-5 xl:px-0 mt-10 lg:mt-0 pt-5'>
            <div className='w-full xl:w-[1030px] bg-[#17242A] mx-auto rounded-lg px-4 py-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='text-4xl font-bold text-[#FEFFFF] text-center'>Update Property</h3>
                    <div className='border-t-2 border-[#FEFFFF] mt-2 mb-4'></div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Property Title -</span>
                            </div>
                            <input type="text" defaultValue={property.property_title} required {...register('property_title')} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Property Location -</span>
                            </div>
                            <input type="text" defaultValue={property.property_location} required {...register('property_location')} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center md:gap-6 mb-3'>
                        <label className="form-control w-fit">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Current photo -</span>
                            </div>
                            <div>
                                <img className="w-[150px] h-16 object-cover rounded" src={property.property_image} />
                            </div>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Upload photo -</span>
                            </div>
                            <input type="file" required {...register('image')} className="file-input bg-[#FEFFFF] w-full border-none rounded-md file-input-black font-bold text-[#17242A] mt-2" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Agent Name -</span>
                            </div>
                            <input defaultValue={property.agent_name} readOnly required type="text" {...register('agent_name')} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Agent Email -</span>
                            </div>
                            <input defaultValue={property.agent_email} readOnly required type="email" {...register('agent_email')} className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Lowest Price  -</span>
                            </div>
                            <input required defaultValue={min} type="number" {...register('lowest_price')} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Highest Price -</span>
                            </div>
                            <input required defaultValue={max} type="number" {...register('highest_price')} className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-6'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Property Description  -</span>
                            </div>
                            <textarea required defaultValue={property.description} {...register('description')} className="textarea textarea-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A] no-resize" rows={3} placeholder="Description"></textarea>
                        </label>
                    </div>
                    <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md w-full">Update Property</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProperty;