import React, { useEffect, useState } from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../common/axios";
import { fileUrl } from "../../common/http.jsx";

const Edit = ({ placeholder }) => {
    const [slider, setSlider] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchSlider = async () => {
            try {
                const res = await api.get(`sliders/${id}`);

                if (!res.data.status) {
                    toast.error(res.data.message || "Slider not found");
                    navigate("/admin/sliders");
                    return;
                }

                setSlider(res.data.data);

                reset({
                    title: res.data.data.title,
                    slug: res.data.data.slug,
                    author: res.data.data.author,
                    description: res.data.data.description,
                    status: res.data.data.status,
                });
            } catch (error) {
                toast.error("Failed to load slider");
            }
        };

        fetchSlider();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        try {
            setIsDisable(true);

            const payload = {
                ...data,
                imageId,
            };

            const res = await api.put(`sliders/${id}`, payload);

            if (res.data.status) {
                toast.success(res.data.message);
                navigate("/admin/sliders");
            } else {
                toast.error(res.data.message || "Update failed");
            }
        } catch (error) {
            toast.error("Update failed");
        } finally {
            setIsDisable(false);
        }
    };

    const handleFile = async (e) => {
        if (!e.target.files.length) return;

        try {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            setIsDisable(true);

            const res = await api.post("temp-images", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (!res.data.status) {
                toast.error(res.data.errors?.image?.[0] || "Image upload failed");
            } else {
                setImageId(res.data.data.id);
                setSlider(prev => ({ ...prev, image: res.data.data.filename })); // optional preview
            }
        } catch (err) {
            toast.error("Image upload failed");
        } finally {
            setIsDisable(false);
        }
    };

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
                                        <h4 className="h5">Edit Slider</h4>
                                        <Link to="/admin/sliders" className="btn btn-primary">
                                            Back
                                        </Link>
                                    </div>

                                    <hr />

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                                {...register("title", { required: "Title is required" })}
                                            />
                                            {errors.title && (
                                                <div className="invalid-feedback">{errors.title.message}</div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Slider Content</label>
                                            <textarea
                                                rows="4"
                                                className="form-control"
                                                {...register("description")}
                                            ></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input type="file" className="form-control" onChange={handleFile} />
                                        </div>

                                        {slider?.image && (
                                            <div className="pb-3">
                                                <img
                                                    src={`${fileUrl}uploads/sliders/${slider.image}`}
                                                    alt="Slider"
                                                    className="img-fluid"
                                                />
                                            </div>
                                        )}

                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select className="form-control" {...register("status", { required: true })}>
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                        </div>

                                        <button className="btn btn-primary" disabled={isDisable}>
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Edit;
