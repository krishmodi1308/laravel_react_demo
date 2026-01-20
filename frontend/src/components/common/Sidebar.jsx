import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import {useCompany} from "../../context/CompanyContext.jsx";
import {IconMoon, IconSun} from "@tabler/icons-react";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

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
        <div className='card shadow border-0 mb-3'>
            <div className='card-body p-4 sidebar'>
                <div className="sidebar-header mb-3">
                    <div className="sidebar-head-content">
                        <i className='fa fa-bars fs-6'></i><h4>&nbsp;Menu</h4>
                    </div>

                    <button onClick={toggleDarkMode} className="theme-toggle mb-1" aria-label="Toggle theme">
                        {darkMode ? <IconSun size={17} /> : <IconMoon size={17} />}
                    </button>
                </div>
                <ul>
                    <li><Link to='/admin/dashboard'>Dashboard</Link></li>
                    <li><Link to='/admin/services'>Services</Link></li>
                    <li><Link to='/admin/articles'>Articles</Link></li>
                    <li><Link to='/admin/projects'>Projects</Link></li>
                    <li><Link to='/admin/testimonials'>Testimonials</Link></li>
                    <li><Link to='/admin/members'>Members</Link></li>
                    <li><Link to='/admin/sliders'>Sliders</Link></li>
                    <li><Link to="/admin/company-settings">Settings</Link></li>
                    <li>
                        <button type="button" onClick={handleLogout} className='btn btn-primary mt-4'>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
