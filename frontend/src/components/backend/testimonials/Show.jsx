import React, {useEffect, useState} from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import {apiUrl, token} from "../../common/http.jsx";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Show = () => {

    const [testimonials, setTestimonials] = useState([]);
    const fetchTestimonials = async () => {
        const res = await fetch(apiUrl+'testimonials',{
            'method' : 'GET',
            'headers' : {
                'Content-type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setTestimonials(result.data);
    }

    const deleteTestimonial = async (id) => {
        if(confirm("Are you sure you want to delete?")){
            const res = await fetch(apiUrl+'testimonials/'+id,{
                'method' : 'DELETE',
                'headers' : {
                    'Content-type' : 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token()}`
                }
            });
            const result = await res.json();

            if(result.status == true) {
                const newTestimonials = testimonials.filter(testimonial => testimonial.id != id)
                setTestimonials(newTestimonials);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        }
        // setTestimonials(result.data);
    }

    useEffect(() => {
        fetchTestimonials();
    }, []);

    return(
        <>
            <main className='testimonial-table'>
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
                                        <h4 className='h5'>Testimonials</h4>
                                        <Link to="/admin/testimonials/create" className='btn btn-primary'>Create</Link>
                                    </div>
                                    <hr />
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Citation</th>
                                                <th>Ratings</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                testimonials && testimonials.map(testimonial => {
                                                    return(
                                                        <tr key={`testimonial-${testimonial.id}`}>
                                                            <td>{testimonial.id}</td>
                                                            <td>{testimonial.citation}</td>
                                                            <td className='testimonials-star'>
                                                                <div className='d-flex'>
                                                                    {testimonial.stars}
                                                                    <div className='ms-1' style={{ color: '#f59e0b' }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                                                                 fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                                            <path
                                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    (testimonial.status == 1) ? 'Active' : 'Block'
                                                                }

                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/testimonials/edit/${testimonial.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                                                <Link onClick={() => deleteTestimonial(testimonial.id)} to="#" className='btn btn-secondary btn-sm ms-2'>Delete</Link>
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