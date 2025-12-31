import React, {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";

const Blogs = () => {
    const [articles, setArticles] = useState([]);
    const fetchAllArticle = async () => {
        const res = await fetch(apiUrl+'get-articles',{
            'method' : 'GET',
        });
        const result = await res.json();
        setArticles(result.data);
    }

    useEffect(() => {
        fetchAllArticle()
    }, []);
    return (
        <>
            <Header/>
            <main>
                <Hero preHeading='Quality. Integrity. Value.' heading='Blogs'
                      text='We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise.'/>

                <section className='section-6 bg-light py-5'>
                    <div className='container'>
                        <div className='section-header text-center'>
                            <span>Blog & News</span>
                            <h2>Articles & blog posts</h2>
                            <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                        </div>
                        <div className='row pt-3'>
                            {
                                articles && articles.map(article => {
                                    return (
                                        <div className='col-md-4' key={article.id}>
                                            <div className='card shadow border-0'>
                                                <div className='card-img-top'>
                                                    <img src={`${fileUrl}uploads/articles/small/${article.image}`} alt="" className='w-100'/>
                                                </div>
                                                <div className='card-body p-4'>
                                                    <div className='mb-3'>
                                                        <a href='#' className='title'>{article.title}</a>
                                                    </div>
                                                    <a href='#' className='btn btn-primary small'>read more</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}
export default Blogs