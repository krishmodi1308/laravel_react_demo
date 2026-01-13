import React, {useEffect, useState} from "react";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import AvatarImg from "../../assets/images/author-2.jpg";

const LatestTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const fetchLatestTestimonial = async () => {
        const res = await fetch(apiUrl+'get-testimonials',{
            'method' : 'GET',
        });
        const result = await res.json();
        setTestimonials(result.data);
    }

    useEffect(() => {
        fetchLatestTestimonial()
    }, []);
    return (
        <>
            <section className='section-5 py-5'>
                <div className='container py-5'>
                    <div className='section-header text-center'>
                        <span>Testimonials</span>
                        <h2>What people are saying about us</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {
                            testimonials && testimonials.map(testimonial =>{
                                return (
                        <SwiperSlide key={testimonial.id}>
                            <div className="testimonial-card futuristic card shadow border-0">
                                <div className="card-body p-5 d-flex flex-column">
                                    <div className="rating">
                                        {[...Array(5)].map((_, index) => (
                                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" className="bi bi-star-fill" fill={index < testimonial.stars ? "currentColor" : "#ccc"}>
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className='content pt-3 pb-2'>
                                        <p>
                                            {testimonial.testimonial}
                                        </p>
                                    </div>
                                    <div className="testimonial-footer mt-auto pt-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={`${fileUrl}uploads/testimonials/${testimonial.image}`}
                                                alt=""
                                                className="author-img"
                                            />
                                            <div className="author-info">
                                                <div className="author-name">{testimonial.citation}</div>
                                                <div className="author-role">CEO</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default LatestTestimonials