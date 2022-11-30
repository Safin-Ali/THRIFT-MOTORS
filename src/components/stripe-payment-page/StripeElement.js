import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripePayment from './StripePayment';

const stripePromise = loadStripe('pk_test_51M6f3lE4zqv3Gon5S5kBwapy9jiC6v7LvytktIFuiEfL2BaPUYs88EtG3TjZGhzlTRKZ7Ovr3GbipnOlG8t2o59r00SnvY5pmh');

const StripeElement = () => {

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: 'pi_3M9ivNE4zqv3Gon50PongpC3_secret_pfNqcV9NU9TBeQSCkbofTNbMB',
        // Fully customizable with appearance API.
        appearance: {/*...*/},
      };
    return (
        <Elements stripe={stripePromise} options={options}>
          <StripePayment></StripePayment>
        </Elements>
      );
};

export default StripeElement;