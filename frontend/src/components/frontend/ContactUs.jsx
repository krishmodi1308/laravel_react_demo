import React, {useState} from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {useForm} from "react-hook-form";
import {apiUrl} from "../common/http.jsx";
import {toast} from "react-toastify";
import { useCompany } from "../../context/CompanyContext.jsx";

const ContactUs = () => {
    const company = useCompany();
    if (!company) return null;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const [isDisable, setisDisable] = useState(false);

    const onSubmit = async (data) => {
        setisDisable(true);
        const res = await fetch(apiUrl+'contact-now',{
            method : 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        console.log(result);

        if (result.status == true) {
            setisDisable(false);
            toast.success(result.message);
            reset();
        } else {
            setisDisable(false);
            toast.error(result.message);
        }
    }

    return (
        <>
            <Header/>
            <main>
                <Hero preHeading='Quality. Integrity. Value.' heading='Contact Us'
                      text='We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise.'/>

                <section className='section-9 py-5'>
                    <div className='container'>
                        <div className='section-header text-center'>
                            <span></span>
                            <h2>Contact Us</h2>
                            <p>Our dedicated experts are here to help you with any of your questions, contact us by
                                <br/>filling out the form below and we will be in touch shortly.</p>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-md-3'>
                                <div className='card shadow border-0 mb-3'>
                                    <div className='card-body p-4'>
                                        <h3>Call Us</h3>
                                        <div><a href={`tel:${company.phone}`}>{company.phone}</a></div>
                                        <div><a href={`tel:${company.alternative_phone}`}>{company.alternative_phone}</a></div>

                                        <h3 className='mt-4'>You can write us</h3>
                                        <div><a href={`tel:${company.email}`}>{company.email}</a></div>

                                        <h3 className='mt-4'>Address</h3>
                                        <div>{company.address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <div className='card shadow border-0'>
                                    <div className='card-body p-5'>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className='row'>
                                                <div className='col-md-6 mb-4'>
                                                    <label htmlFor='' className='form-label'>Name</label>
                                                    <input type='text'
                                                           {
                                                               ...register('name',{
                                                                   required: "Name is required"
                                                               })
                                                           }
                                                           className={`form-control form-control-lg ${errors.name && 'is-invalid'}`} placeholder='Enter Name'/>
                                                    {
                                                        errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                                    }
                                                </div>
                                                <div className='col-md-6 mb-4'>
                                                    <label htmlFor='' className='form-label'>Email</label>
                                                    <input type='email'
                                                           {
                                                               ...register('email',{
                                                                   required: "Email is required"
                                                               })
                                                           }
                                                           className={`form-control form-control-lg ${errors.email && 'is-invalid'}`} placeholder='Enter Email'/>
                                                    {
                                                        errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6 mb-4'>
                                                    <label htmlFor='' className='form-label'>Phone</label>
                                                    <input type='number'
                                                           {
                                                               ...register('phone')
                                                           }
                                                           className='form-control form-control-lg' placeholder='Enter Phone No.'/>
                                                </div>
                                                <div className='col-md-6 mb-4'>
                                                    <label htmlFor='' className='form-label'>Subject</label>
                                                    <input type='text'
                                                           {
                                                               ...register('subject',{
                                                                   required: "Subject is required"
                                                               })
                                                           }
                                                           className={`form-control form-control-lg ${errors.subject && 'is-invalid'}`} placeholder='Enter Subject'/>
                                                    {
                                                        errors.subject && <p className='invalid-feedback'>{errors.subject?.message}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-12 mb-3'>
                                                    <label htmlFor='' className='form-label'>Message</label>
                                                    <textarea
                                                        {
                                                            ...register('message',{
                                                                required: "Message is required"
                                                            })
                                                        }
                                                        className={`form-control form-control-lg ${errors.message && 'is-invalid'}`}></textarea>
                                                    {
                                                        errors.message && <p className='invalid-feedback'>{errors.message?.message}</p>
                                                    }
                                                </div>
                                            </div>

                                            <button disabled={isDisable} className='btn btn-primary large'>Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default ContactUs