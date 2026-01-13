import React, { useEffect, useState } from 'react';
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import icon1 from '../../assets/images/icon-1.svg';
import icon2 from '../../assets/images/icon-2.svg';
import icon3 from '../../assets/images/icon-3.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import About from "../common/About.jsx";
import LatestServices from "../common/LatestServices.jsx";
import LatestProjects from "../common/LatestProjects.jsx";
import LatestArticles from "../common/LatestArticles.jsx";
import Testimonials from "../common/Testimonials.jsx";
import { Link } from "react-router-dom";
import { useCompany } from "../../context/CompanyContext.jsx";
import api from "../common/axios.js";
import { fileUrl } from "../common/http.jsx";

const Home = () => {
    const company = useCompany();
    const [sliders, setSliders] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const res = await api.get('get-sliders');
                console.log(res.data);
                if (res.data.status && Array.isArray(res.data.data)) {
                    setSliders(res.data.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSliders();
    }, []);

    useEffect(() => {
        if (sliders.length === 0) return;
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % sliders.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [sliders]);

    if (!company) return null;

    const slider = sliders[current];

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className='section-1'>
                    {slider ? (
                        <div className="hero d-flex align-items-center"
                             style={{
                                 minHeight: '600px',
                                 color: '#fff',
                                 backgroundImage: `
                                    linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                                    url(${fileUrl}uploads/sliders/${slider.image})
                                `,
                                 backgroundSize: 'cover',
                                 backgroundPosition: 'center',
                                 backgroundRepeat: 'no-repeat',
                                 transition: 'background-image 0.5s ease-in-out',
                             }}>
                        <div className='container text-center'>
                                <span>Welcome to {company.name}</span>
                                <h1>{slider.title}</h1>
                                <p>{slider.description}</p>
                                <div className='mt-4'>
                                    <Link to='/contact-us' className='btn btn-primary large'>Contact Now</Link>
                                    <Link to='/projects' className='btn btn-secondary large ms-2'>View Projects</Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="hero d-flex align-items-center justify-content-center" style={{ minHeight: '600px', color: '#fff', background: '#333' }}>
                            <h2>Loading Slider...</h2>
                        </div>
                    )}

                    {sliders.length > 1 && (
                        <div className="slider-controls text-center">
                            {sliders.map((_, i) => (
                                <button key={i} onClick={() => setCurrent(i)}
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        margin: '0 6px',
                                        border: '1.5px solid var(--dot-color)',
                                        backgroundColor: i === current ? 'var(--dot-color)' : 'transparent',
                                        cursor: 'pointer',
                                        opacity: i === current ? 1 : 0.7,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                </section>

                {/* About us Section */}
                <About />

                {/* Our services Section */}
                <LatestServices />

                {/* Why Choose us */}
                <section className='section-4 py-5 futuristic-why'>
                    <div className='container py-5'>
                        <div className='section-header text-center'>
                            <span>Why choose us</span>
                            <h2>Discover our wide variety of projects</h2>
                            <p>Created in close partnership with our clients and collaborators, this approach merges industry expertise,<br />
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
                <LatestProjects />

                {/* Testimonials Section */}
                <Testimonials />

                {/* Latest Articles Section */}
                <LatestArticles />
            </main>
            <Footer />
        </>
    );
};

export default Home;
