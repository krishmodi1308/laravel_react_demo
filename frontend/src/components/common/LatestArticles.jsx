import React, {useEffect, useState} from "react";
import {apiUrl, fileUrl} from "../common/http.jsx";

const LatestArticles = () => {
    const [articles, setArticles] = useState([]);
    const fetchLatestArticle = async () => {
        const res = await fetch(apiUrl+'get-latest-articles?limit=4',{
            'method' : 'GET',
        });
        const result = await res.json();
        setArticles(result.data);
    }

    useEffect(() => {
        fetchLatestArticle()
    }, []);
    return (
        <>
            <section className='section-6 bg-light py-5'>
                <div className='container'>
                    <div className='section-header text-center'>
                        <span>Blog & News</span>
                        <h2>Articles & blog posts</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className='row pt-3'>
                        {
                            articles && articles.map(article =>{
                                return (
                                    <div className='col-md-4'>
                                        <div className='card shadow border-0'>
                                            <div className='card-img-top'>
                                                <img src={`${fileUrl}uploads/articles/small/${article.image}`} alt="" className='w-100'/>
                                            </div>
                                            <div className='card-body p-4'>
                                                <div className='mb-3'>
                                                    <h3>{article.title}</h3>
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
        </>
    )
}

export default LatestArticles