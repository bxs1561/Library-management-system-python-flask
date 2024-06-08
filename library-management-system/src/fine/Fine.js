import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import FineSteps from "./FineSteps";
import { savePaymentMethod } from "../Redux/Action/UsersAction";
import "./Fine.css"

function Fine(){
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    console.log(paymentMethod)

    const submitHandle =(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
    }
    return(
            <div>
                <form className="form" onSubmit={submitHandle}>
                    <div>
                        <h1>Payment Method </h1>
                    </div>
                    <div>
                        <div>
                            <input
                                type="radio"
                                id="paypal"
                                value="PayPal"
                                name="paymentMethod"
                                required
                                checked
                                onChange={event => setPaymentMethod(event.target.value)}
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input
                                type="radio"
                                id="stripe"
                                value="Stripe"
                                name="paymentMethod"
                                required
                                onChange={event => setPaymentMethod(event.target.value)}
                            />
                            <label htmlFor="stripe">Stripe</label>
                        </div>
                    </div>
                    <div>
                        <button className="primary" type="submit">
                            Continue
                        </button>
                    </div>
                </form>
    
            </div>
        )
    
    
    
}
export default Fine