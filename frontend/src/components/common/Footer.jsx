import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h3 className='mb-3'>Kanha Constructions</h3>
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
                                <a href="tel:8880000000">(888-000-0000)</a>
                            </li>
                            <li>
                                <a href="mailto:info@example.com">info@example.com</a>
                            </li>
                            <p>
                                B-18X, Rajaji Puram <br />
                                Lucknow, Uttar Pradesh, 226017<br />
                                0522400XXXX
                            </p>
                        </ul>
                    </div>
                </div>

                <hr />

                <div className='text-center pt-4'>
                    <p>Copyright © 2024 UrbanEdge Constructions. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
