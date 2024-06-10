import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import MyDynamicTitle from '../../../../../MyDynamicTitle';

const MakeOffer = () => {
    MyDynamicTitle('Dashboard | Make Offer')
    const {user} = useContext(AuthContext);
    const property = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const {property_title, property_location, agent_name, user_email, price_range, property_image, agent_email, _id} = property;

    const parsePriceRange = (priceRange) => {
            const [min, max] = priceRange.split(' - ').map(price => parseInt(price.replace(/\$|,/g, ''), 10));
            return { min, max };
    };

    const [inputValue, setInputValue] = useState('');
    const [isWithinRange, setIsWithinRange] = useState(null);

    const { min, max } = parsePriceRange(price_range);

    const handleOffer= e => {
        e.preventDefault();

        const form = e.target;
        const property_title = form.property_title.value;
        const property_location = form.property_location.value;
        const user_name = form.user_name.value;
        const user_email = form.user_email.value;
        const agent_name = form.agent_name.value;
        const offered_amount = form.offered_amount.value;
        const buying_date = form.buying_date.value;
        
        const newBroughtProperty = {
            property_title,
            property_location,
            user_name, 
            user_email,
            agent_name,
            agent_email,
            offered_amount, 
            buying_date,
            property_image,
            status: 'pending',
            main_id: _id
        }
    
        if (isWithinRange) {
            axiosSecure.post('/brought-property', newBroughtProperty)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Added to Property Brought!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    form.buying_date.value = '';
                    form.offered_amount.value = '';
                }
            })
        }
        else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Offered Price must be between ${price_range}`,
                showConfirmButton: false,
                timer: 2000
            });
            form.offered_amount.value = '';
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    
        const numberValue = parseInt(value, 10);
        if (!isNaN(numberValue)) {
          setIsWithinRange(numberValue >= min && numberValue <= max);
        } else {
          setIsWithinRange(null);
        }
      };

    return (
        <div className='min-h-screen flex flex-col md:flex-row items-center justify-center px-5 xl:px-0'>
            <div className='w-full xl:w-[1030px] bg-[#17242A] mx-auto rounded-lg px-4 py-6'>
                <form onSubmit={handleOffer}>
                    <h3 className='text-4xl font-bold text-[#FEFFFF] text-center'>Make A Offer</h3>
                    <div className='border-t-2 border-[#FEFFFF] mt-2 mb-4'></div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Property Title -</span>
                            </div>
                            <input type="text" name='property_title' readOnly defaultValue={property_title} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Property Location -</span>
                            </div>
                            <input type="text" name='property_location' readOnly defaultValue={property_location} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Buyer Name -</span>
                            </div>
                            <input type="text" name='user_name' readOnly defaultValue={user.displayName} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Buyer Email -</span>
                            </div>
                            <input type="text" name='user_email' readOnly defaultValue={user_email} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='flex flex-col md:flex-row item-center gap-3 mb-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Agent Name -</span>
                            </div>
                            <input type="text" name='agent_name' readOnly defaultValue={agent_name} placeholder="Type here" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Offered Amount -</span>
                            </div>
                            <input value={inputValue} onChange={handleChange} type="number" name='offered_amount' placeholder={`Price must be between ${price_range}`} className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <div className='mb-6'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-[#FEFFFF] font-bold">Buying Date -</span>
                            </div>
                            <input type="date" name='buying_date' placeholder="Enter a date" className="input input-bordered w-full bg-[#FEFFFF] font-bold text-[#17242A]" />
                        </label>
                    </div>
                    <button className="btn bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md w-full">Offer</button>
                </form>
            </div>
        </div>
    );
};

export default MakeOffer;