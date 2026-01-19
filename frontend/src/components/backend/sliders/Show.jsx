import React, { useEffect, useState } from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../common/axios";

const Show = () => {
    const [sliders, setSliders] = useState([]);

    const fetchSliders = async () => {
        try {
            const res = await api.get("sliders");

            if (res.data.status) {
                setSliders(res.data.data);
            } else {
                toast.error(res.data.message || "Failed to fetch sliders");
            }
        } catch (error) {
            toast.error("Something went wrong while fetching sliders");
        }
    };

    const deleteSlider = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            const res = await api.delete(`sliders/${id}`);

            if (res.data.status) {
                setSliders((prev) => prev.filter((slider) => slider.id !== id));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message || "Failed to delete slider");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting");
        }
    };

    useEffect(() => {
        fetchSliders();
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
                                        <h4 className="h5">Sliders</h4>
                                        <Link
                                            to="/admin/sliders/create"
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
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sliders.length > 0 ? (
                                            sliders.map((slider) => (
                                                <tr key={`slider-${slider.id}`}>
                                                    <td>{slider.id}</td>
                                                    <td>{slider.title}</td>
                                                    <td>{slider.status === 1 ? "Active" : "Block"}</td>
                                                    <td>
                                                        <Link to={`/admin/sliders/edit/${slider.id}`} className="btn btn-primary btn-sm">
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => deleteSlider(slider.id)} className="btn btn-secondary btn-sm ms-2">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    No sliders found
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
