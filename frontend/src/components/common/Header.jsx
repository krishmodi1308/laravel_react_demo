import { IconSun, IconMoon } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useCompany } from "../../context/CompanyContext.jsx";
import { fileUrl } from "./http.jsx";

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
        <header className="main-header">
            <div className="container">
                <Navbar expand="lg" className="py-3">
                    <Navbar.Brand as={NavLink} to="/" className="logo d-flex align-items-center gap-2">
                        {company?.image ? (
                            <img
                                src={`${fileUrl}uploads/companies/${company.image}`}
                                alt={company.name}
                                className="company-logo"
                            />
                        ) : (
                            <span>
                                {company?.name?.split(' ')[0]}
                                <strong>{company?.name?.split(' ')[1]}</strong>
                            </span>
                        )}
                    </Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav className="ms-auto align-items-lg-center gap-lg-4">
                            {[
                                ['/', 'Home'],
                                ['/about', 'About'],
                                ['/services', 'Services'],
                                ['/projects', 'Projects'],
                                ['/blogs', 'Blogs'],
                                ['/contact-us', 'Contact']
                            ].map(([path, label]) => (
                                <Nav.Link key={path} as={NavLink} to={path} end>
                                    {label}
                                </Nav.Link>
                            ))}

                            <button
                                onClick={toggleDarkMode}
                                className="theme-toggle"
                                aria-label="Toggle theme"
                            >
                                {darkMode ? <IconSun size={17} /> : <IconMoon size={17} />}
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;
