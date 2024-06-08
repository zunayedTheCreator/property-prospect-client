import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const CheckoutForm = (property) => {
    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price: property.property.offered_amount})
        .then(res => {
            setClientSecret(res.data.clientSecret)
        })

    }, [axiosSecure, property.property.offered_amount])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 2000
            });
        }
        else {
            console.log('payment method', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transition id', paymentIntent.id);
                const updateProperty = {
                    transition_id: paymentIntent.id
                }
                axiosSecure.patch(`/brought-property/bought/${property.property._id}`, updateProperty)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: 'Payment done',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                })
            }
        }
    }

    return (
        <form className='w-full xl:w-[1030px] bg-[#17242A] mx-auto rounded-lg px-4 py-6' onSubmit={handleSubmit}>
            <CardElement 
                options={{
                    style: {
                        base: {
                          iconColor: '#c4f0ff',
                          color: '#fff',
                          fontWeight: '500',
                          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                          fontSize: '16px',
                          fontSmoothing: 'antialiased',
                          ':-webkit-autofill': {
                            color: '#fce883',
                          },
                          '::placeholder': {
                            color: '#87BBFD',
                          },
                        },
                        invalid: {
                          iconColor: '#FFC7EE',
                          color: '#FFC7EE',
                        },
                      },
                }}
            />
            <button className="btn min-h-0 h-6 bg-[#DEF2F1] hover:bg-[#FEFFFF] text-black font-bold rounded-md px-4 mt-4 text-sm " type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;