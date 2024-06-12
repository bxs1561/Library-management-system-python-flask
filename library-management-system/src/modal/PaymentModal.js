import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StripeComponent from "../fine/StripePayment";

function PaymentModal({fine, onClose,setFine,checkoutDate,setCheckoutDate,amount}){
    return (
        <div className="services___modal active___modal">
    
          <div className="services___modal-content">
          <div style={{width:"100%"}}className="modal___header">
                <h3 className="modal___title">Payment Manage</h3>
            </div>
            
            <i className="uil uil-times modal___close" onClick={onClose} />
            <div className="modal___body" style={{paddingTop:"10px", paddingRight:"35px"}}>
            <div className="modal___date-picker" style={{marginLeft:"-20px"}}>
                <span className="return___date">return date</span>
      <DatePicker
        selected={checkoutDate}
        onChange={date => setCheckoutDate(date)}
        dateFormat="MM/dd/yyyy" 
      />
    </div>
    <div className="fine" style={{marginLeft:"-14px"}}>
        <span className="fine___title">
            Fine
        </span>
        <input style={{width:"58%", borderRadius:"0"}}
                          id="modal_autocomplete"
                          placeholder="fine"
                          type="text"
                          className="form-control ui-autocomplete-input"
                          autoComplete="off"
                          value={fine}
                          onChange={event => setFine(event.target.value)}
    
                        ></input>
    </div>
    <div className="days">
    
    </div>
          </div>
          <div className="payment___component">
          <StripeComponent amount={amount}/>
          </div>
          {/* <div className="modal___button">
                    <button style={{marginBottom:"15px"}} >pay fine</button>
                    </div> */}
          
          </div>
        </div>
      );
    
    
}
export default PaymentModal;