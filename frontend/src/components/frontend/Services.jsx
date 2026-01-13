import React, {useEffect, useState} from 'react'
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Link} from "react-router-dom";

const Services = () => {
    const [services, setServices] = useState([]);
    const fetchAllService = async () => {
        const res = await fetch(apiUrl+'get-services',{
            'method' : 'GET',
        });
        const result = await res.json();
        setServices(result.data);
    }

    useEffect(() => {
        fetchAllService()
    }, []);
    return (
        <>
            <Header/>
                <Hero preHeading='Quality. Integrity. Value.' heading='Services'
                      text='We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise.'/>

                <section className='section-3 futuristic-services bg-light py-5'>
                    <div className='container py-5'>
                        <div className='section-header text-center'>
                            <span>our services</span>
                            <h2>Our construction services</h2>
                            <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                        </div>
                        <div className='row pt-4'>

                            {
                                services && services.map(service =>{
                                    return (
                                        <div className='col-md-4 col-lg-4' key={service.id}>
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
            <Footer/>
        </>
    )
}

export default Services