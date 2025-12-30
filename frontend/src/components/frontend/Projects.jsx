import React from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import constructionImg from "../../assets/images/construction2.jpg";

const Projects = () => {
    return (
        <>
            <Header/>
            <main>
                <Hero preHeading='Quality. Integrity. Value.' heading='Our Projects'
                      text='We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise.'/>

                <section className='section-3 bg-light py-5'>
                    <div className='container py-5'>
                        <div className='section-header text-center'>
                            <span>our projects</span>
                            <h2>Discover our diverse range of projects</h2>
                            <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                        </div>
                        <div className='row pt-4'>
                            <div className='col-md-4 col-lg-4'>
                                <div className='item'>
                                    <div className='service-image'>
                                        <img src={constructionImg} alt="" className='w-100'/>
                                    </div>
                                    <div className='service-body'>
                                        <div className='service-title'>
                                            <h3>Kolkata Project</h3>
                                        </div>
                                        <div className='service-content'>
                                            <p>Building construction is a broad and essential sector within the construction industry that focuses on the creation of structures designed for human occupancy and use.</p>
                                            <a href='#' className='btn btn-primary small'>Read More</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-4 col-lg-4'>
                                <div className='item'>
                                    <div className='service-image'>
                                        <img src={constructionImg} alt="" className='w-100'/>
                                    </div>
                                    <div className='service-body'>
                                        <div className='service-title'>
                                            <h3>Kolkata Project</h3>
                                        </div>
                                        <div className='service-content'>
                                            <p>Building construction is a broad and essential sector within the construction industry that focuses on the creation of structures designed for human occupancy and use.</p>
                                            <a href='#' className='btn btn-primary small'>Read More</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-4 col-lg-4'>
                                <div className='item'>
                                    <div className='service-image'>
                                        <img src={constructionImg} alt="" className='w-100'/>
                                    </div>
                                    <div className='service-body'>
                                        <div className='service-title'>
                                            <h3>Kolkata Project</h3>
                                        </div>
                                        <div className='service-content'>
                                            <p>Building construction is a broad and essential sector within the construction industry that focuses on the creation of structures designed for human occupancy and use.</p>
                                            <a href='#' className='btn btn-primary small'>Read More</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-4 col-lg-4'>
                                <div className='item'>
                                    <div className='service-image'>
                                        <img src={constructionImg} alt="" className='w-100'/>
                                    </div>
                                    <div className='service-body'>
                                        <div className='service-title'>
                                            <h3>Kolkata Project</h3>
                                        </div>
                                        <div className='service-content'>
                                            <p>Building construction is a broad and essential sector within the construction industry that focuses on the creation of structures designed for human occupancy and use.</p>
                                            <a href='#' className='btn btn-primary small'>Read More</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-4 col-lg-4'>
                                <div className='item'>
                                    <div className='service-image'>
                                        <img src={constructionImg} alt="" className='w-100'/>
                                    </div>
                                    <div className='service-body'>
                                        <div className='service-title'>
                                            <h3>Kolkata Project</h3>
                                        </div>
                                        <div className='service-content'>
                                            <p>Building construction is a broad and essential sector within the construction industry that focuses on the creation of structures designed for human occupancy and use.</p>
                                            <a href='#' className='btn btn-primary small'>Read More</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-md-4 col-lg-4'>
                                <div className='item'>
                                    <div className='service-image'>
                                        <img src={constructionImg} alt="" className='w-100'/>
                                    </div>
                                    <div className='service-body'>
                                        <div className='service-title'>
                                            <h3>Kolkata Project</h3>
                                        </div>
                                        <div className='service-content'>
                                            <p>Building construction is a broad and essential sector within the construction industry that focuses on the creation of structures designed for human occupancy and use.</p>
                                            <a href='#' className='btn btn-primary small'>Read More</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Projects