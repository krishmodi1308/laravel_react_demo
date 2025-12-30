import React, {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const fetchAllProject = async () => {
        const res = await fetch(apiUrl+'get-projects',{
            'method' : 'GET',
        });
        const result = await res.json();
        setProjects(result.data);
    }

    useEffect(() => {
        fetchAllProject()
    }, []);
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
                            {
                                projects && projects.map(project =>{
                                    return (
                                        <div className='col-md-4 col-lg-4' key={project.id}>
                                            <div className='item'>
                                                <div className='service-image'>
                                                    <img src={`${fileUrl}uploads/projects/small/${project.image}`} alt="" className='w-100'/>
                                                </div>
                                                <div className='service-body'>
                                                    <div className='service-title'>
                                                        <h3>{project.title}</h3>
                                                    </div>
                                                    <div className='service-content'>
                                                        <p>{project.short_desc}</p>
                                                        <a href='#' className='btn btn-primary small'>Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Projects