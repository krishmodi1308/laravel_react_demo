import React, {useEffect, useState} from "react";
import serviceImg from '../../assets/images/construction1.jpg';
import Header from "./Header.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Link} from "react-router-dom";

const LatestServices = () => {
    const [services, setServices] = useState([]);
    const fetchLatestService = async () => {
        const res = await fetch(apiUrl+'get-latest-services?limit=4',{
            'method' : 'GET',
        });
        const result = await res.json();
        setServices(result.data);
    }

    useEffect(() => {
        fetchLatestService()
    }, []);
    return (
        <>
            <section className='section-3 futuristic-services bg-light py-5'>
                <div className='container-fluid py-5'>
                    <div className='section-header text-center'>
                        <span>our services</span>
                        <h2>Our construction services</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className='row pt-4'>
                        {
                            services && services.map(service =>{
                                return (
                                <div className='col-md-3 col-lg-3' key={service.id}>
                                    <div className="item service-card">
                                        <img
                                            src={`${fileUrl}uploads/services/small/${service.image}`}
                                            alt=""
                                        />

                                        <div className="overlay">
                                            <h3>{service.title}</h3>
                                            <p>{service.short_desc}</p>
                                            <Link to={`/service/${service.slug}`} className="btn btn-outline-light">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default LatestServices