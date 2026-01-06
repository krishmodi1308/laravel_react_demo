import React from 'react'
import { NavLink } from 'react-router-dom';
import {useCompany} from "../../context/CompanyContext.jsx";

const Footer = () => {
    const company = useCompany();
    if (!company) return null;
    return (
        <footer>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h3 className='mb-3'>{company.name}</h3>
                        <div className='pe-5'>
                            <p>
                                Our post-construction services gives you peace of mind
                                knowing that we are still here for you even after.
                            </p>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <h3 className='mb-3'>Our Services</h3>
                        <ul>
                            <li><a href="#">Specialty Construction</a></li>
                            <li><a href="#">Specialty Construction</a></li>
                            <li><a href="#">Specialty Construction</a></li>
                            <li><a href="#">Specialty Construction</a></li>
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
                            <p>
                                {company.address}
                            </p>
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
