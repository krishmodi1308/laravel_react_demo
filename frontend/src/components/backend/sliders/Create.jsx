import React, { useState, useRef, useMemo } from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../common/axios.js";

const Create = ({ placeholder }) => {
    const editor = useRef(null);
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || "Content",
        }),
        [placeholder]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const payload = { ...data, imageId };

            const res = await api.post("sliders", payload);

            if (res.data.status) {
                toast.success(res.data.message);
                navigate("/admin/sliders");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleFile = async (e) => {
        if (!e.target.files.length) return;

        try {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            setIsDisable(true);

            const res = await api.post("temp-images", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (!res.data.status) {
                toast.error(res.data.errors.image[0]);
            } else {
                setImageId(res.data.data.id);
            }
        } catch (error) {
            toast.error("Image upload failed");
        } finally {
            setIsDisable(false);
        }
    };

    return (
        <>
            <Header />
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
                                        <h4 className="h5">Create Slider</h4>
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
                                                placeholder="Title"
                                                {...register("title", { required: "Title is required" })}
                                            />
                                            {errors.title && (
                                                <div className="invalid-feedback">
                                                    {errors.title.message}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Slider Content</label>
                                            <textarea
                                                rows="4"
                                                className="form-control"
                                                placeholder="Content"
                                                {...register("description")}
                                            ></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input type="file" className="form-control" onChange={handleFile}/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select className="form-control"
                                                {...register("status", { required: true })}
                                            >
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                        </div>

                                        <button type="submit" className="btn btn-primary" disabled={isDisable}>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Create;
