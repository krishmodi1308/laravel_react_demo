import React, {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Link, useParams} from "react-router-dom";
import Testimonials from "../common/Testimonials.jsx";

const ServiceDetail = () => {
    const params = useParams();
    const [service, setService] = useState([]);
    const [services, setServices] = useState([]);
    const fetchService = async () => {
        // const res = fetch(apiUrl+'get-service/'+params.id)
        const res = await fetch(`${apiUrl}get-service/${params.id}`,{
            method: 'GET'
        });
        const result = await res.json();
        setService(result.data);
    }

    const fetchServices = async () => {
        // const res = fetch(apiUrl+'get-service/'+params.id)
        const res = await fetch(`${apiUrl}get-services`,{
            method: 'GET'
        });
        const result = await res.json();
        setServices(result.data);
    }

    useEffect(() => {
        fetchService();
        fetchServices();
    }, [params.id]);

    return (
        <>
            <Header/>
                <main>
                    <Hero preHeading='Quality. Integrity. Value.' heading={`${service.title}`} text=''/>
                </main>
                <section className='section-10'>
                    <div className='container py-5'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className='card shadow sidebar border-0'>
                                    <div className='card-body px-4 py-4'>
                                        <h3 className='mt-2 mb-3'>Our Services</h3>
                                        <ul>
                                            {
                                                services && services.map(service => {
                                                    return (
                                                        <li key={service.id}>
                                                            <Link to={`/service/${service.slug}`}>{service.title}</Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <div className=''>
                                    <img src={`${fileUrl}uploads/services/large/${service.image}`} className='w-100'/>
                                </div>
                                <h3 className='py-3'>{service.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html:service.content }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='col-md-12'>
                    <Testimonials/>
                </div>
            <Footer/>
        </>
    )
}

export default ServiceDetail