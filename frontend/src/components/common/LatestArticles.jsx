import React, {useEffect, useState} from "react";
import {apiUrl, fileUrl} from "../common/http.jsx";
import {Link} from "react-router-dom";

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
            <section className="section-6 py-5">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <span className="section-tag">Blog & News</span>
                        <h2>Articles & Insights</h2>
                        <p>
                            Practical knowledge, project updates, and construction insights
                            from real-world experience.
                        </p>
                    </div>

                    <div className="row g-4">
                        {articles && articles.map(article => (
                            <div className="col-md-4" key={article.id}>
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
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default LatestArticles