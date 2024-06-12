import React, {useEffect, useState} from "react";
import "./ViewUser.css"
import person1 from "../../images/person1.jpg"
import { useSelector, useDispatch } from 'react-redux'
import {fetchUser,deleteUser} from '../../redux/action/usersAction'
import _ from 'lodash'
import {BrowserRouter as Router,useNavigate, Link,useParams} from "react-router-dom";

/**
 * View users  Component.
 */
function ViewUser(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState(null);
    const  {user}  = useSelector((state) => state.getUser);
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState([]);

    const session_key = localStorage.getItem("sessionKey")
    ? localStorage.getItem("sessionKey"):
    null

    useEffect(()=>{
        setUserData(user)
    },[user])
    /**
     * Search users by name.
     */
    const searchUserByName=(searchTerm)=>{
        const lowerCaseSearchTerm = searchTerm.toUpperCase();
        const newData=_.filter(user, (usr) => {
            return (
              usr.first_name.toUpperCase().includes(lowerCaseSearchTerm) ||
              usr.last_name.toUpperCase().includes(lowerCaseSearchTerm)
            )
        });
        setUserData(newData)
        setSearchTerm(searchTerm)
    }
    
    

    //remove user
    const removeUser=(userID) => {
        dispatch(deleteUser(userID))
        setUserData(userData.filter(user => user.user_id !== userID));
    };

    //library card
    const handlePrintButton=(user)=>{
        setSelectedUser(user);
        navigate(`/library-card/${user.user_id}`, { state: user });
    } 

    useEffect(()=>{
        dispatch(fetchUser())
    },[dispatch])

    const handleEdit=(user)=>{
        navigate(`/user/${user.user_id}`,{state:user});
    } 
    
    return(
        <div className="view___user-containers">
          <div className="ViewUser___container">
            <div className="ViewUser___content">
                <div className="content">
                    <div className="card">
                        <div className="card___header">
                            <span className="title">Manage Users</span>
                        </div>
                        <div className="card___body">
                            <div className="row">
                                <div className="search">
                                    <label>Search User</label>
                                    <input
                                        placeholder="Enter name"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(event) => searchUserByName(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="user___info">
                                {userData?.length > 0 && (
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
                                                {/* <th>Created on</th> */}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData?.map(user=>(
                                                <tr key={user.user_id}>
                                                    <td><input type ="checkbox"></input></td>
                                                    <td>{user.user_id}</td>
                                                    <td>
                                                        <img
                                                        src={user.user_image_url}
                                                        alt="user Cover"
                                                        className="user-covers"
                                                        />
                                                    </td>
                                                    <td>{user.first_name}<br></br>{user.last_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone_number}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.role.name}</td>
                                                    {/* <td>{user.CreatedOn}</td> */}
                                                    <td>
                                                        <button className="edit___button" onClick={()=>handleEdit(user)} >
                                                            <i className="uil uil-edit"></i>
                                                        </button>
                                                        <button onClick={()=>removeUser(user?.user_id)} className="delete___button">
                                                            <i className="uil uil-trash-alt"></i>
                                                        </button>
                                                
                                                        <button className="print___button" onClick={()=>handlePrintButton(user)}>
                                                            <i className="uil uil-print"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {userData?.length === 0 && (
                                    <p>No matching users found.</p>
                                )}
                            </div>

                          </div>
                    </div>

                </div>
            </div>
        </div>
    </div>    
    )
}
export default ViewUser