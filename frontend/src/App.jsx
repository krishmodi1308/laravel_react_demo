import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';

import Home from "./components/frontend/Home";
import About from "./components/frontend/About";
import Services from "./components/frontend/Services";
import Projects from "./components/frontend/Projects";
import Blogs from "./components/frontend/Blogs";
import ContactUs from "./components/frontend/ContactUs";
import Login from "./components/backend/Login.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/backend/Dashboard.jsx";
import RequireAuth from "./components/common/RequireAuth.jsx";
import {default as ShowServices} from "./components/backend/services/Show.jsx";
import {default as CreateService} from "./components/backend/services/Create.jsx";
import {default as EditService} from "./components/backend/services/Edit.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/admin/login" element={<Login />} />

                <Route path="/admin/dashboard" element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                } />

                <Route path="/admin/services" element={
                    <RequireAuth>
                        <ShowServices />
                    </RequireAuth>
                } />

                <Route path="/admin/services/create" element={
                    <RequireAuth>
                        <CreateService />
                    </RequireAuth>
                } />

                <Route path="/admin/services/edit/:id" element={
                    <RequireAuth>
                        <EditService />
                    </RequireAuth>
                } />

            </Routes>
            <ToastContainer
                position="top-center"
            />
        </>
    )
}

export default App
