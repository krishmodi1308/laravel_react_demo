import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useCompany } from "../../context/CompanyContext.jsx";
import {fileUrl} from "./http.jsx";

const Header = () => {
    const company = useCompany();

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            document.body.classList.add('dark-mode');
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.body.classList.toggle('dark-mode', newMode);
        localStorage.setItem('darkMode', newMode);
    };

    if (!company) return null;
    return (
        <header>
            <div className='container py-3'>
                <Navbar expand="lg">
                    <Navbar.Brand as={NavLink} to="/" className="logo company-logo">
                        {company?.image ? (
                            <img src={`${fileUrl}uploads/companies/${company.image}`} alt={company.name} className="company-logo" style={{ width: '140px', height: '80px' }}/>
                        ) : (
                            <span>{company?.name?.split(' ')[0]} </span>
                        )}
                        {company?.image ? null : (
                            <>{company?.name?.split(' ')[1]}</>
                        )}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-lg-center">
                            <Nav.Link as={NavLink} to="/" end className="nav-link">
                                Home
                            </Nav.Link>

                            <Nav.Link as={NavLink} to="/about" className="nav-link">
                                About us
                            </Nav.Link>

                            <Nav.Link as={NavLink} to="/services" className="nav-link">
                                Service
                            </Nav.Link>

                            <Nav.Link as={NavLink} to="/projects" className="nav-link">
                                Projects
                            </Nav.Link>

                            <Nav.Link as={NavLink} to="/blogs" className="nav-link">
                                Blogs
                            </Nav.Link>

                            <Nav.Link as={NavLink} to="/contact-us" className="nav-link">
                                Contact us
                            </Nav.Link>

                            {/* Dark mode icon toggle */}
                            <a onClick={toggleDarkMode}
                               className="theme-toggle ms-lg-3 mt-3 mt-lg-0"
                               aria-label="Toggle dark mode">
                                {darkMode ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16">\n' +
                                    '  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>\n' +
                                    '</svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">\n' +
                                    '  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>\n' +
                                    '</svg>}
                            </a>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}

export default Header;
