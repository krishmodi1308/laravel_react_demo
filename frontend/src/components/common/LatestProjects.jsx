import React, { useEffect, useState } from "react";
import { apiUrl, fileUrl } from "../common/http.jsx";
import { Link } from "react-router-dom";

const LatestProjects = () => {
    const [projects, setProjects] = useState([]);

    const fetchLatestProjects = async () => {
        const res = await fetch(apiUrl + 'get-latest-projects?limit=4');
        const result = await res.json();
        setProjects(result.data);
    };

    useEffect(() => {
        fetchLatestProjects();
    }, []);

    return (
        <section className="section-3 bg-light futuristic-projects py-5">
            <div className="container-fluid py-5">
                <div className="section-header text-center mb-5">
                    <span className="subtitle">Our Projects</span>
                    <h2 className="title">Built with Precision & Purpose</h2>
                    <p className="description">
                        Residential, commercial, and industrial projects engineered for longevity.
                    </p>
                </div>

                <div className="row g-4">
                    {projects && projects.map(project => (
                        <div className="col-md-6 col-lg-3" key={project.id}>
                            <div className="project-card">
                                <div className="project-image">
                                    <img
                                        src={`${fileUrl}uploads/projects/small/${project.image}`}
                                        alt={project.title}
                                    />
                                    <div className="overlay" />
                                </div>

                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.short_desc}</p>
                                    <Link
                                        to={`/project/${project.slug}`}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        View Project →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestProjects;
