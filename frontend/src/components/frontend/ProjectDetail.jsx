import React, {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Link, useParams} from "react-router-dom";
import Testimonials from "../common/Testimonials.jsx";
import {useCompany} from "../../context/CompanyContext.jsx";

const ProjectDetail = () => {
    const company = useCompany();
    if (!company) return null;

    const params = useParams();
    const [project, setProject] = useState([]);
    const [projects, setProjects] = useState([]);
    const fetchProject = async () => {
        // const res = fetch(apiUrl+'get-project/'+params.id)
        const res = await fetch(`${apiUrl}get-project/${params.id}`,{
            method: 'GET'
        });
        const result = await res.json();
        setProject(result.data);
    }

    const fetchProjects = async () => {
        // const res = fetch(apiUrl+'get-project/'+params.id)
        const res = await fetch(`${apiUrl}get-projects`,{
            method: 'GET'
        });
        const result = await res.json();
        setProjects(result.data);
    }

    useEffect(() => {
        fetchProject();
        fetchProjects();
    }, [params.id]);

    return (
        <>
            <Header/>
                <main>
                    <Hero preHeading='Quality. Integrity. Value.' heading={`${project.title}`} text='' bgImage={company.other_page_image}/>
                </main>
                <section className='section-10'>
                    <div className='container-fluid py-5 bg-light'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div className='card shadow sidebar border-0'>
                                        <div className='card-body px-4 py-4'>
                                            <h3 className='mt-2 mb-3'>Our Projects</h3>
                                            <ul>
                                                {
                                                    projects && projects.map(project => {
                                                        return (
                                                            <li key={project.id}>
                                                                <Link to={`/project/${project.slug}`}>{project.title}</Link>
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
                                        <img src={`${fileUrl}uploads/projects/large/${project.image}`} className='w-100'/>
                                    </div>
                                    <h3 className='py-3  text-info'>{project.title}</h3>
                                    {/*<p className=''>{project.short_desc}</p>*/}
                                    <div dangerouslySetInnerHTML={{ __html:project.content }}></div>
                                </div>
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

export default ProjectDetail