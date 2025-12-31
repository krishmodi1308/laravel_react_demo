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
import {default as ShowProjects} from "./components/backend/projects/Show.jsx";
import {default as CreateProjects} from "./components/backend/projects/Create.jsx";
import {default as EditProjects} from "./components/backend/projects/Edit.jsx";
import {default as ShowArticles} from "./components/backend/articles/Show.jsx";
import {default as CreateArticles} from "./components/backend/articles/Create.jsx";
import {default as EditArticles} from "./components/backend/articles/Edit.jsx";

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

                <Route path="/admin/projects" element={
                    <RequireAuth>
                        <ShowProjects />
                    </RequireAuth>
                } />

                <Route path="/admin/projects/create" element={
                    <RequireAuth>
                        <CreateProjects />
                    </RequireAuth>
                } />

                <Route path="/admin/projects/edit/:id" element={
                    <RequireAuth>
                        <EditProjects />
                    </RequireAuth>
                } />

                <Route path="/admin/articles" element={
                    <RequireAuth>
                        <ShowArticles />
                    </RequireAuth>
                } />

                <Route path="/admin/articles/create" element={
                    <RequireAuth>
                        <CreateArticles />
                    </RequireAuth>
                } />

                <Route path="/admin/articles/edit/:id" element={
                    <RequireAuth>
                        <EditArticles />
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
