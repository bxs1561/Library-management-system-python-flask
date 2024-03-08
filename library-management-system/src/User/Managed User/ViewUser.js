import React, {useEffect, useState} from "react";
import "./ViewUser.css"
import person1 from "../../images/person1.jpg"
import { useSelector, useDispatch } from 'react-redux'
import { removeUser,getUser } from "../../Redux/action";
import axios from '../../API/axios'
import {userDataArray} from '../../data/UserData'
import _ from 'lodash'
import LibraryCard from './LibraryCard'
import { useHistory } from "react-router-dom"; // Import useHistory


function ViewUser(){
    const [student, setStudent] = useState('');
    const [userData, setUserData] = useState(userDataArray());
    const [selectedUser, setSelectedUser] = useState(null);



    const dispatch = useDispatch();
    const users = useSelector(state => state.getUser);
    const handleRemove=(userID)=>{
        dispatch(removeUser(userID))
    }
    const displayUser=()=>{
        dispatch(getUser())
    }
    useEffect(()=>{
        displayUser()
    },[dispatch])

    const searchUserByName=(searchTerm)=>{
        const lowerCaseSearchTerm = searchTerm.toUpperCase();
  
        const newData=_.filter(userDataArray(), (user) => {
            return (
              user.FirstName.toUpperCase().includes(lowerCaseSearchTerm) ||
              user.LastName.toUpperCase().includes(lowerCaseSearchTerm)
            )
          });
          
        setUserData(newData)
        setStudent(searchTerm)

    }
    const handlePrintButton=(user)=>{
        setSelectedUser(user);
    } 
    return(
        <div className="containers">
          <div className="ViewUser___container">
            <div className="userdata___header">
            </div>
            <div className="header___text">
                <h1> User Managment</h1>
            </div>
            <div className="ViewUser___content">
                <div className="content">
                    <div className="card">
                        <div className="card___header">
                            <span className="title">Manage Users</span>
                        </div>
                        <div className="card___body">
                            <div className="row">
                                <div className="search">
                                    <label>Advanced Filter</label>
                                    <input
                                        placeholder="Enter name"
                                        type="text"
                                        value={student}
                                        onChange={(event) => searchUserByName(event.target.value)}
                                    />
                                </div>
                                <div className="user___info">
                                {userData.length > 0 && (
                                    <table className="usertable___info">
                                        <thead>
                                            <tr>
                                                <th><input type ="checkbox"></input></th>
                                                <th>UID</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>Role</th>
                                                <th>Created on</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { userData.map(user=>(
                                            <tr key={user.user_id}>
                                                <td><input type ="checkbox"></input></td>
                                                <td>{user.user_id}</td>
                                                <td>
                                                    <img
                                                    src={user.image}
                                                    alt="user Cover"
                                                    className="user-covers"
                                                    />
                                                </td>
                                                <td>{user.FirstName}<br></br>{user.LastName}</td>
                                                <td>{user.Email}</td>
                                                <td>{user.PhoneNumber}</td>
                                                <td>{user.Address}</td>
                                                <td>{user.Role.role_name}</td>
                                                <td>{user.CreatedOn}</td>
                                                <td>
                                                <button className="edit___button"  >
                                                <i class="uil uil-edit"></i>
                                                </button>
                                                <button onClick={()=>handleRemove(user.user_id)} className="delete___button">
                                                <i class="uil uil-trash-alt"></i>
                                                </button>
                                                
                                                <button className="print___button" onClick={()=>handlePrintButton(user)}>
                                                    <i class="uil uil-print"></i>
                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                                {userData.length === 0 && (
                                    <p>No matching users found.</p>
                                )}
                                

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        {/* {selectedUser && <LibraryCard user={selectedUser} />} */}
        </div>
        
        
    )
}
export default ViewUser