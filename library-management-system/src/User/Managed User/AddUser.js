import React, {useEffect, useState} from "react";
import "./AddUser.css";
import axios from '../../API/axios'
import { useSelector, useDispatch } from 'react-redux'
import { addUserFailure, addUserRequest,addUserSuccess } from "../../Redux/action";
import avatar from '../../images/avatar.png'


function AddUser(){
    const [firstName, setFirstName] = useState('');
    const [LastName, setLasttName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


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
    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
      
        if (file) {
          setSelectedFile(URL.createObjectURL(event.target.files[0]));
        } else {
          // Handle case where user canceled file selection
          // For example, you can clear the selected file:
          setSelectedFile(null);
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
                <div className="upload___picture">
            <img src={selectedFile?selectedFile:avatar} className="image___thumbnail" />
            {/* <br/> */}
            <div className="file">
            <input  type="file" onChange={handleFileChange} />
            </div>

      
                    </div>
                    <div className="first___name">
                        <label>First Name</label>
                        <input
                        placeholder="Enter First Name"
                        type="text"
                        value={firstName}
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
                        <div className="phone___number">
                            <label>Phone Number</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                       
                        <div className="address">
                            <label>address</label>
                            <input
                            placeholder="Enter address"
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div className="birthDate">
                            <label>birthDate</label>
                            <input
                            placeholder="Enter birthDate"
                            type="text"
                            value={birthDate}
                            onChange={(event) => setBirthDate(event.target.value)}
                            />
                        </div>
                        <div className="role">
                        <h5>Select Role</h5>
                        <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="">Select...</option>
              <option value="librarian">Librarian</option>
              <option value="student">Student</option>
            </select>
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
}export default AddUser