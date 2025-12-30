import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className='container py-3'>
                <Navbar expand="lg">
                    <Navbar.Brand as={NavLink} to="/" className="logo">
                        <span>Kanha </span>Constructions
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
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
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}

export default Header
