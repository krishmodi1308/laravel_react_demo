import React, {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import Hero from "../common/Hero.jsx";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Link} from "react-router-dom";
import {useCompany} from "../../context/CompanyContext.jsx";

const Blogs = () => {
    const company = useCompany();
    if (!company) return null;

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
                      text='We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise.' bgImage={company.other_page_image}/>

                <section className='section-6 bg-light py-5'>
                    <div className='container'>
                        <div className='section-header text-center'>
                            <span className="section-tag">Blog & News</span>
                            <h2>Articles & blog posts</h2>
                            <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                        </div>
                        <div className='row pt-3'>
                            {
                                articles && articles.map(article => {
                                    return (
                                        <div className='col-md-4' key={article.id}>
                                            <div className="blog-card">
                                                <div className="blog-image">
                                                    <img
                                                        src={`${fileUrl}uploads/articles/small/${article.image}`}
                                                        alt={article.title}
                                                    />
                                                </div>

                                                <div className="blog-content">
                                                    <h3>{article.title}</h3>

                                                    <Link
                                                        to={`/article/${article.slug}`}
                                                        className="read-more"
                                                    >
                                                        Read Article →
                                                    </Link>
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