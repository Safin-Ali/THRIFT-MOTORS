import React, { useEffect } from 'react';
import {PaymentElement,useElements,useStripe,CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

const StripePayment = () => {

    useEffect(()=>{
        axios.post('http://localhost:5000/stripe/payment')
        .then(res => console.log(res))
        .catch(e => console.log(e.message))
    },[])


    const stripe = useStripe();

    const elements = useElements();

    // submit function 
    async function handleSubmit (event) {
        event.preventDefault();
        
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
              return_url: "https://example.com/order/123/complete",
            },
          });
    
          if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
          } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
          }

        };

    return (
                <form onSubmit={handleSubmit}>
                    <PaymentElement>
                    </PaymentElement>
                    <button disabled={!stripe}>Submit</button>
                </form>
    );
};

export default StripePayment;