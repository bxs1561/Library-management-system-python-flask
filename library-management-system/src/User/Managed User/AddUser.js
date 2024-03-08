import React, {useEffect, useState} from "react";
import "./AddUser.css";
import axios from '../../API/axios'
import { useSelector, useDispatch } from 'react-redux'
import { addUserFailure, addUserRequest,addUserSuccess } from "../../Redux/action";


function AddUser(){
    const [firstName, setFirstName] = useState('');
    const [LastName, setLasttName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();

    const handleSumbit=async(event)=>{
        event.preventDefault();
        let userData={
            first_name: firstName,
            last_name: LastName,
            username:username,
            password:password,
            address:address,
            email:email,
            phone_number:phone,
            date_of_birth:birthDate,
            role:role,
        }
        dispatch(addUserRequest(userData));

        try {
            const response = await axios.post('/user/add', JSON.stringify(userData),{
                headers: {
                    "content-type": "application/json"
                }
            });
            dispatch(addUserSuccess(response));
           



        } catch (error) {
            dispatch(addUserFailure(error));
        }
    };
    return(
        <div className="adduser___container">
            <div className="add___user">
            <div className="adduser___header">
                <strong>Add user</strong>
            </div>
            <form>

            <div className="adduser___body">
                <div className="user___information">
                    <div className="first___name">
                        <label>First Name *</label>
                        <input
                        placeholder="Enter First Name"
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        />
                        </div>
                        <div className="last___name">
                            <label>Last Name *</label>
                            <input
                            placeholder="Enter Last Name"
                            type="text"
                            value={LastName}
                            onChange={(event) => setLasttName(event.target.value)}
                            />
                        </div>
                        <div className="email">
                            <label>Email *</label>
                            <input
                            placeholder="Enter email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="username">
                            <label>username *</label>
                            <input
                            placeholder="Enter username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="password">
                            <label>password *</label>
                            <input
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="phone___number">
                            <label>Phone Number *</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                       
                        <div className="address">
                            <label>address *</label>
                            <input
                            placeholder="Enter address"
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div className="birthDate">
                            <label>birthDate *</label>
                            <input
                            placeholder="Enter birthDate"
                            type="text"
                            value={birthDate}
                            onChange={(event) => setBirthDate(event.target.value)}
                            />
                        </div>
                        <div className="role">
                            <label>role *</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="button">
              <button type= "submit" onClick={handleSumbit} className="primary-button">Submit</button>
              </div>
              </form>

              </div>
            </div>

    )
}export default AddUser