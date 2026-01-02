import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    return (
        <div className='card shadow border-0 mb-3'>
            <div className='card-body p-4 sidebar'>
                <h4>Sidebar</h4>
                <ul>
                    <li><Link to='/admin/dashboard'>Dashboard</Link></li>
                    <li><Link to='/admin/services'>Services</Link></li>
                    <li><Link to='/admin/articles'>Articles</Link></li>
                    <li><Link to='/admin/projects'>Projects</Link></li>
                    <li><Link to='/admin/testimonials'>Testimonials</Link></li>
                    <li><Link to='/admin/members'>Members</Link></li>

                    <li>
                        <button type="button" onClick={handleLogout} className='btn btn-primary mt-4'>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
