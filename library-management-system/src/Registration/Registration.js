import React, {useEffect, useState} from "react";
import {BrowserRouter as Router,useNavigate, Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {addAdmin} from '../redux/action/usersAction'
import './Registration.css'
import MessageBox from "../error/MessageBox";

/**
 * Register user.
 */
function Registration(){
    const dispatch = useDispatch();
    const {error} = useSelector(state => state.addUser);

    const [firstName, setFirstName] = useState('');
    const [LastName, setLasttName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [phone, setPhone] = useState('');

    /**
     * performa registration and dispatch info to redux.
     */
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
            return;
        }
        dispatch(addAdmin(userData));
    };

    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
          setSelectedFile(URL.createObjectURL(event.target.files[0]));
        } 
        else {
          setSelectedFile(null);
        }
    };

    return(
        <div className="registration___container">
            <div className="register___user">
                <div className="register___header">
                    <strong>register</strong>
                </div>
                {error && <MessageBox variant="danger">{error?.error}</MessageBox>}
                <form>
                    <div className="register___body">
                        <div className="register___information">
                            <div className="register___picture">
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
