import React, {useEffect, useState} from "react";
import "./AddUser.css"


function AddUser(){
    const [firstName, setFirstName] = useState('');
    const [LastName, setLasttName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');




    return(
        <div className="adduser___container">
            <div className="add___user">
            <div className="adduser___header">
                <strong>Add user</strong>
            </div>
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
                        <div className="phone___number">
                            <label>Phone Number *</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="city">
                            <label>City *</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="state">
                            <label>State</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="zipcode">
                            <label>Zipcode *</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="role">
                            <label>role *</label>
                            <input
                            placeholder="Enter phone number"
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="button">
              <button class="primary-button">Submit</button>
              </div>
              </div>
            </div>

    )
}export default AddUser