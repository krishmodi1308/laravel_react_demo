import React, {useEffect, useState} from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import {apiUrl, token} from "../../common/http.jsx";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Show = () => {

    const [projects, setProjects] = useState([]);
    const fetchProjects = async () => {
        const res = await fetch(apiUrl+'projects',{
            'method' : 'GET',
            'headers' : {
                'Content-type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setProjects(result.data);
    }

    const deleteProject = async (id) => {
        if(confirm("Are you sure you want to delete?")){
            const res = await fetch(apiUrl+'projects/'+id,{
                'method' : 'DELETE',
                'headers' : {
                    'Content-type' : 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token()}`
                }
            });
            const result = await res.json();

            if(result.status == true) {
                const newProjects = projects.filter(project => project.id != id)
                setProjects(newProjects);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        }
        // setProjects(result.data);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return(
        <>
            <main>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            {/*Sidebar*/}
                            <Sidebar/>
                        </div>
                        <div className='col-md-9'>
                            {/*Dashboard*/}
                            <div className='card shadow border-0'>
                                <div className='card-body p-4'>
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='h5'>Projects</h4>
                                        <Link to="/admin/projects/create" className='btn btn-primary'>Create</Link>
                                    </div>
                                    <hr />
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Slug</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                projects && projects.map(project => {
                                                    return(
                                                        <tr key={`project-${project.id}`}>
                                                            <td>{project.id}</td>
                                                            <td>{project.title}</td>
                                                            <td>{project.slug}</td>
                                                            <td>
                                                                {
                                                                    (project.status == 1) ? 'Active' : 'Block'
                                                                }

                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/projects/edit/${project.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                                                <Link onClick={() => deleteProject(project.id)} to="#" className='btn btn-secondary btn-sm ms-2'>Delete</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Show