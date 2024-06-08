import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Header from '../../../../Shared/Header/Header';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const PaymentPage = () => {
    const property = useLoaderData();
    console.log(property);

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key_PK);
    return (
        <div className='mt-8'>
            <Header header='Payment'></Header>
            <div className='mt-8'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm property={property}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;