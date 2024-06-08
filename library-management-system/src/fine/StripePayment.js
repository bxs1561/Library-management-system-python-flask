import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "../API/axios"
import "./StripePayment.css"


function StripePayment(){
    const session_key = JSON.parse(localStorage.getItem("user"));

    const stripe = useStripe()
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);




    const handlePayment=async(event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
          return;
        }
        setIsLoading(true);
        setError(null);

    
        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
    
        if (error) {
          setError(error.message);
          setIsLoading(false);
          return;
        }
    
        try {
            const response = await axios.post(
                '/payment', 
                {
                  amount: 1000, 
                },
                {
                  headers: {
                    Authorization: session_key.sessionKey,
                    'Content-Type': 'application/json',
                  },
                }
              );
    
          const { clientSecret } = response.data;
    
          const confirmResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
          });
    
          if (confirmResult.error) {
            setError(confirmResult.error.message);
          } else {
            setSuccess(true);
          }
        } catch (error) {
          setError(error.message);
        }finally {
            setIsLoading(false);
          }
    
        


    }
   


    return(
        <form id="payment-form" onSubmit={handlePayment}>

        <CardElement id="payment-element" />
        <button className="payment___button" disabled={!stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading  ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {error && <div id="payment-message">{error}</div>}
        

      </form>
  

    )
}
export default function StripeComponent() {
    
    const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY);

    return (
      <Elements stripe={stripePromise}>
        <StripePayment />
      </Elements>
    );
  }

  