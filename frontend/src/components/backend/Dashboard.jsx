import React from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Sidebar from "../common/Sidebar.jsx";

const Dashboard = () => {

    return (
        <>
            <main>
                <div className='container py-5'>
                   <div className='row'>
                       <div className='col-md-3'>
                           {/*Sidebar*/}
                           <Sidebar/>
                       </div>
                       <div className='col-md-9 dashboard'>
                            {/*Dashboard*/}
                           <div className='card shadow border-0'>
                               <div className='card-body d-flex justify-content-center align-items-center'>
                                   <h4>Welcome to Admin console!</h4>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard