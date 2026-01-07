import React, {useEffect, useState} from 'react'
import {Link, NavLink} from 'react-router-dom';
import {useCompany} from "../../context/CompanyContext.jsx";
import {apiUrl} from "./http.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    const company = useCompany();


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
    if (!company) return null;
    return (
        <footer>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h3 className='mb-3'>{company.name}</h3>
                        <div className='pe-5'>
                            <p>
                                {company.description}
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <h3 className="mb-3">Our Services</h3>
                        <ul>
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <li key={index}>
                                        <Link to={`/service/${service.slug}`}>{service.title}</Link>
                                    </li>
                                ))
                            ) : (
                                <li>No services available</li>
                            )}
                            <li>
                                <Link to='/services'>More Services</Link>
                            </li>
                        </ul>
                    </div>


                    <div className='col-md-3'>
                        <h3 className='mb-3'>Quick Links</h3>
                        <ul className="footer-links">
                            <li>
                                <NavLink to="/about">About us</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services">Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/projects">Projects</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blogs">Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact-us">Contact us</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className='col-md-3'>
                        <h3 className='mb-3'>Contact Us</h3>
                        <ul>
                            <li>
                                <a href={`tel:${company.phone}`}>{company.phone}</a>
                            </li>
                            <li className='mb-2'>
                                <a href={`mailto:${company.email}`}>{company.email}</a>
                            </li>
                            <p className='mb-2'>
                                {company.address}
                            </p>
                            <div className="social-icons mt-3">
                                {company.linkedin && (
                                    <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className='me-3'>
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                )}

                                {company.facebook && (
                                    <a href={company.facebook} target="_blank" rel="noopener noreferrer" className='me-3'>
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                )}

                                {company.instagram && (
                                    <a href={company.instagram} target="_blank" rel="noopener noreferrer" className='me-3'>
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                )}

                                {company.twitter && (
                                    <a href={company.twitter} target="_blank" rel="noopener noreferrer" className='me-3'>
                                        <i className="fab fa-x-twitter"></i>
                                    </a>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>

                <hr />

                <div className='text-center pt-4'>
                    <p>Copyright © 2026 {company.name}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
