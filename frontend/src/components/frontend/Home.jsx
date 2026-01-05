import React, {useEffect, useState} from 'react'
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import constructionImg from '../../assets/images/construction2.jpg';
import BlogImg from '../../assets/images/construction3.jpg';
import icon1 from '../../assets/images/icon-1.svg';
import icon2 from '../../assets/images/icon-2.svg';
import icon3 from '../../assets/images/icon-3.svg';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import AvatarImg from '../../assets/images/author-2.jpg';
import {Pagination} from 'swiper/modules';
import About from "../common/About.jsx";
import LatestServices from "../common/LatestServices.jsx";
import LatestProjects from "../common/LatestProjects.jsx";
import LatestArticles from "../common/LatestArticles.jsx";
import Testimonials from "../common/Testimonials.jsx";
import {Link} from "react-router-dom";


const Home = () => {

    return (
        <>
            <Header/>
            <main>
                {/* Hero Section */}
                <section className='section-1'>
                    <div className='hero d-flex align-items-center'>
                        <div className='container-fluid'>
                            <div className='text-center'>
                                <span>Welcome to Kanha Constructions</span>
                                <h1>Crafting dreams with <br/>precision and excellence.</h1>
                                <p>We excel at transforming visions into reality through outstanding craftsmanship and precise</p>
                                <div className='mt-4'>
                                    <Link to='/contact-us' className='btn btn-primary large'>Contact Now</Link>
                                    <Link to='/projects' className='btn btn-secondary large ms-2'>View Projects</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About us Section */}
                <About />

                {/* Our services Section */}
                <LatestServices/>

                {/* Why Choose us */}
                <section className='section-4 py-5'>
                    <div className='container py-5'>
                        <div className='section-header text-center'>
                            <span>Why choose us</span>
                            <h2>Discover our wide variety of projects</h2>
                            <p>Created in close partnership with our clients and collaborators, this approach merges industry expertise,<br/>
                                decades of experience, innovation, and flexibility to consistently deliver excellence.</p>
                        </div>
                        <div className='row pt-4'>
                            <div className='col-md-4 mb-2'>
                                <div className='card shadow border-0 p-4'>
                                    <div className='card-icon'>
                                        <img src={icon1} alt='' />
                                    </div>
                                    <div className='card-title mt-3'>
                                        <h3>Cutting-Edge Solutions</h3>
                                    </div>
                                    <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                                </div>
                            </div>
                            <div className='col-md-4 mb-2'>
                                <div className='card shadow border-0 p-4'>
                                    <div className='card-icon'>
                                        <img src={icon2} alt='' />
                                    </div>
                                    <div className='card-title mt-3'>
                                        <h3>Cutting-Edge Solutions</h3>
                                    </div>
                                    <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                                </div>
                            </div>
                            <div className='col-md-4 mb-2'>
                                <div className='card shadow border-0 p-4'>
                                    <div className='card-icon'>
                                        <img src={icon3} alt='' />
                                    </div>
                                    <div className='card-title mt-3'>
                                        <h3>Cutting-Edge Solutions</h3>
                                    </div>
                                    <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our project Section */}
                <LatestProjects/>

                <Testimonials/>

                <LatestArticles/>
            </main>
            <Footer/>
        </>
    )
}

export default Home