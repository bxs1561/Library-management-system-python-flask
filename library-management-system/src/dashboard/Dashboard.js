import React, {useEffect, useState} from "react";
import book1 from "../images/book1.jpg"
import './Dashboard.css'
import VisitorStats from '../Visitor/VisitorStats'


function Dashboard(){

    return(
        <div className="dashboard___container">
            <div className="dashboard___header">
                <h1>dashboard</h1>
                <div className="content">
                <div className="dashboard___card">
                    <div className="dashboardcard___body">
                    <div className="dashboard___row"></div>
                        <div className="dashboard___row">
                            <div className="total___books">
                                <div className="books___box">
                                <i class='bx bxs-book'></i>
                                    <div className="books___content">
                                        <span className="book___boxtext">
                                            Total books
                                        </span>
                                        <span className="info___book___number">70</span>
                                    </div>

                                </div>
                            </div>
                            <div className="books___fine">
                                <div className="fine___info">
                                <i class='bx bx-money'></i>
                                    <div className="fine___content">
                                    <span className="fine___boxtext">
                                            Total fine
                                        </span>
                                        <span className="info___fine___number">85</span>
                                        
                                    </div>

                                </div>
                            </div>
                            <div className="books___borrow">
                                <div className="borrow___info">
                                <i class='bx bx-cart'></i>
                                    <div className="borrow___content">
                                    <span className="borrow___boxtext">
                                            borrowed
                                        </span>
                                        <span className="info___borrow___number">20</span>
                                        
                                    </div>

                                </div>
                            </div>
                            <div className="total___users">
                                <div className="totalusers___info">
                                <i class='bx bxs-user'></i>
                                    <div className="totalusers___content">
                                    <span className="totalusers___boxtext">
                                            users
                                        </span>
                                        <span className="info___users___number">40</span>
                                    </div>

                                </div>
                            </div>
                           
                           
                        </div>
                        <div className="dashboard___row">
                            <div className="graph">
                                <div className="visitor___stats" style={{height: '380px', width: '100%'}}>
                                <VisitorStats/>

                                </div>
                            </div>
                            <div className="graph">
                                <div className="visitor___stats" style={{height: '380px', width: '100%'}}>
                                <VisitorStats/>

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
