import React, {useEffect, useState} from "react";
import book1 from "../images/book1.jpg"


function Dashboard(){
    return(
        <div className="container">
            <div className="dashboard___container">
                <div className="card">
                    <div className="card___body">
                        <div className="row">
                            <div className="total___books">
                                <div className="books___info">
                                    <div className="books___content">
                                    <img
                                                    src={book1}
                                                    alt="user Cover"
                                                    className="user-cover"
                                                    />
                                        <span className="info-box-number">30</span>
                                    </div>

                                </div>
                            </div>
                            <div className="books___fine">
                                <div className="fine___info">
                                    <div className="fine___content">
                                    <img
                                                    src={book1}
                                                    alt="user Cover"
                                                    className="user-cover"
                                                    />
                                        <span className="info-box-number">$30</span>
                                    </div>

                                </div>
                            </div>
                            <div className="books___borrow">
                                <div className="borrow___info">
                                    <div className="borrow___content">
                                    <img
                                                    src={book1}
                                                    alt="user Cover"
                                                    className="user-cover"
                                                    />
                                        <span className="info-box-number">$30</span>
                                    </div>

                                </div>
                            </div>
                            <div className="total___users">
                                <div className="totalusers___info">
                                    <div className="totalusers___content">
                                    <img
                                                    src={book1}
                                                    alt="user Cover"
                                                    className="user-cover"
                                                    />
                                        <span className="info-box-number">$30</span>
                                    </div>

                                </div>
                            </div>
                            <div className="book___prediction">
                                <div className="prediction___info">
                                    <div className="prediction___content">
                                    
                                        <span className="info-box-number">$30</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Dashboard