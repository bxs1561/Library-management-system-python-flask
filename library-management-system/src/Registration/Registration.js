import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate, Link
} from "react-router-dom";
import axios from "../API/axios";
import { useSelector, useDispatch } from 'react-redux'
import { loginRequest, loginSuccess } from "../Redux/action";
import { addUserFailure, addUserRequest,addUserSuccess } from "../Redux/action";

import './Registration.css'



function Registration(){
    const [firstName, setFirstName] = useState('');
    const [LastName, setLasttName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();


    const handleSumbit=async(event)=>{
        event.preventDefault();
        let userData={
            first_name: firstName,
            last_name: LastName,
            username:username,
            password:password,
            email:email,
            phone_number:phone,
            user_image_url:selectedFile,
        }
        if(password!==confirmPassword){
            alert("password do not match")
        }
        dispatch(addUserRequest(userData));

        try {
            const response = await axios.post('/admin/add', userData,{
                headers: {
                    "content-type": "application/json"
                }
            });
            const responseData = response.data;
            dispatch(addUserSuccess(responseData));
            // if (responseData.success) {
            //     dispatch(addUserSuccess(responseData));
            //   } else {
            //     dispatch(addUserFailure(responseData.message));
            //   }

        } catch (error) {
            dispatch(addUserFailure(error));
        }
    };


    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
      
        if (file) {
          setSelectedFile(URL.createObjectURL(event.target.files[0]));
        } else {
          setSelectedFile(null);
        }
      };



    return(
        <div className="registration___container">
            <div className="register___user">
            <div className="register___header">
                <strong>register</strong>
            </div>
            <form>

            <div className="register___body">
                <div className="register___information">
                <div className="register___picture">
            {/* <br/> */}
            <div className="file">
            <input  type="file" onChange={handleFileChange} />
            </div>

      
                    </div>
                    <div className="first___name">
                        <label>First Name</label>
                        <input
                        placeholder="Enter First Name"
                        type='text'
                        value={firstName}
                        required
                        onChange={(event) => setFirstName(event.target.value)}
                        />
                        </div>
                        
                        <div className="last___name">
                            <label>Last Name</label>
                            <input
                            placeholder="Enter Last Name"
                            type="text"
                            value={LastName}
                            onChange={(event) => setLasttName(event.target.value)}
                            />
                        </div>
                        <div className="email">
                            <label>Email</label>
                            <input
                            placeholder="Enter email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="username">
                            <label>username</label>
                            <input
                            placeholder="Enter username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="password">
                            <label>password</label>
                            <input
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="confirm___password">
                            <label>confirm password</label>
                            <input
                            placeholder="confirm password"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <div className="phone___number">
                            <label>Phone Number</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                       
                    </div>
                </div>
                <div className="add___button">
              <button type= "submit" onClick={handleSumbit} className="adduser___button" style={{width:'168px', marginTop:'10px'}}>Submit</button>
              </div>
              </form>

              </div>
            </div>

    )
}
export default Registration
