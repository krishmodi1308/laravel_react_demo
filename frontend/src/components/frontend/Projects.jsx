import React, {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Link} from "react-router-dom";
import {useCompany} from "../../context/CompanyContext.jsx";

const Projects = () => {
    const company = useCompany();
    if (!company) return null;

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
                      text='We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise.' bgImage={company.other_page_image}/>

                <section className='section-3 bg-light futuristic-services py-5'>
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
                                            <div className='item service-card'>
                                                <img src={`${fileUrl}uploads/projects/small/${project.image}`} alt="" />
                                                <div className="overlay">
                                                    <h3>{project.title}</h3>
                                                    <p>{project.short_desc}</p>
                                                    <Link to={`/project/${project.slug}`} className="btn btn-outline-light">
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
            </main>
            <Footer/>
        </>
    )
}

export default Projects