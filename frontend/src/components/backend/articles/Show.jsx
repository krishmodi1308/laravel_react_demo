import React, { useEffect, useState } from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../common/axios";

const Show = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const res = await api.get("articles");

            if (res.data.status) {
                setArticles(res.data.data);
            } else {
                toast.error(res.data.message || "Failed to fetch articles");
            }
        } catch (error) {
            toast.error("Something went wrong while fetching articles");
        }
    };

    const deleteArticle = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            const res = await api.delete(`articles/${id}`);

            if (res.data.status) {
                setArticles((prev) => prev.filter((article) => article.id !== id));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message || "Failed to delete article");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting");
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <>
            <main>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className="h5">Articles</h4>
                                        <Link
                                            to="/admin/articles/create"
                                            className="btn btn-primary"
                                        >
                                            Create
                                        </Link>
                                    </div>
                                    <hr />
                                    <table className="table table-striped">
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
                                        {articles.length > 0 ? (
                                            articles.map((article) => (
                                                <tr key={`article-${article.id}`}>
                                                    <td>{article.id}</td>
                                                    <td>{article.title}</td>
                                                    <td>{article.slug}</td>
                                                    <td>{article.status === 1 ? "Active" : "Block"}</td>
                                                    <td>
                                                        <Link
                                                            to={`/admin/articles/edit/${article.id}`}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteArticle(article.id)}
                                                            className="btn btn-secondary btn-sm ms-2"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    No articles found
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Show;
