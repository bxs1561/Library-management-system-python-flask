import React,{useState,useEffect} from "react";
import "./Modal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from '../API/axios'
import { fetchPayment } from "../redux/action/usersAction";
import { useSelector, useDispatch } from 'react-redux'

/**
 * Modal Component.
 */
function Modal({fine, onClose,setFine,return_date,setReturnDate }) {
  const dispatch = useDispatch();
  const  {payment}  = useSelector((state) => state.getPayment);
  const user = JSON.parse(localStorage.getItem("user"));
  const admin_user_id = user?.user_id
  console.log(admin_user_id)

  const[paymentID,setPaymentID] = useState("")


  useEffect(()=>{
    dispatch(fetchPayment())
  },[dispatch])

  useEffect(()=>{
    payment?.map(pay=>{
      setPaymentID(pay?.payment_id)
    })
  },[payment])
  const handleApprovePayment=()=>{
    try{
      const response = axios.post(`/approve/${paymentID}`,{
        admin_user_id:admin_user_id,
        return_date:return_date
      })
      console.log(response.data)

    }catch(error){

    }
  }
  return (
    <div className="services___modal active___modal">
      <div className="services___modal-content">
        <div style={{width:"100%"}}className="modal___header">
          <h3 className="modal___title">Return Book Manage</h3>
        </div>
        <i className="uil uil-times modal___close" onClick={onClose} />
        <div className="modal___body" style={{paddingTop:"10px", paddingRight:"35px"}}>
          <div className="modal___date-picker" style={{marginLeft:"-20px"}}>
            <span className="return___date">return date</span>
            <DatePicker
              selected={return_date}
              onChange={date => setReturnDate(date)}
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
        </div>
        <div className="modal___button">
          <button onClick={()=>handleApprovePayment()} style={{marginBottom:"15px"}} >Return Book</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
