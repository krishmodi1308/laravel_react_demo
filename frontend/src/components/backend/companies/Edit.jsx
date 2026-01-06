import React, { useEffect, useState } from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../common/axios";
import { fileUrl } from "../../common/http.jsx";

const COMPANY_ID = 1;

const Settings = () => {
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [company, setCompany] = useState(null);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await api.get(`companies/${COMPANY_ID}`);

                if (!res.data.status) {
                    toast.error(res.data.message);
                    return;
                }

                const data = res.data.data;
                setCompany(data);

                reset({
                    name: data.name ?? "",
                    phone: data.phone ?? "",
                    alternative_phone: data.alternative_phone ?? "",
                    email: data.email ?? "",
                    address: data.address ?? "",
                    website: data.website ?? "",
                    facebook: data.facebook ?? "",
                    twitter: data.twitter ?? "",
                    linkedin: data.linkedin ?? "",
                    instagram: data.instagram ?? "",
                    description: data.description ?? "",
                });
            } catch {
                toast.error("Failed to load company settings");
            }
        };

        fetchCompany();
    }, [reset]);

    const onSubmit = async (data) => {
        try {
            setIsDisable(true);

            const payload = { ...data };
            if (imageId) payload.imageId = imageId;

            const res = await api.put(`companies/${COMPANY_ID}`, payload);

            if (res.data.status) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch {
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
                toast.error(res.data.errors?.image?.[0] || "Upload failed");
            } else {
                setImageId(res.data.data.id);
                toast.success("Logo uploaded");
            }
        } catch {
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
                                    <h4 className="h5 mb-4">Company Settings</h4>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input
                                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                                {...register("name", { required: "Name is required" })}
                                            />
                                            <div className="invalid-feedback">{errors.name?.message}</div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <input
                                                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                                {...register("phone", { required: "Phone is required" })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Alternative Phone</label>
                                            <input
                                                className={`form-control ${errors.alternative_phone ? "is-invalid" : ""}`}
                                                {...register("alternative_phone")}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                {...register("email", { required: "Email is required" })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" rows="3" {...register("description")} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <textarea className="form-control" rows="3" {...register("address")} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Logo</label>
                                            <input type="file" className="form-control" onChange={handleFile} />
                                        </div>

                                        {company?.image && (
                                            <div className="mb-3">
                                                <img src={`${fileUrl}uploads/companies/${company.image}`} alt="Logo" style={{ maxHeight: 80 }}/>
                                            </div>
                                        )}

                                        {["website", "facebook", "twitter", "linkedin", "instagram"].map(
                                            (field) => (
                                                <div className="mb-3" key={field}>
                                                    <label className="form-label">
                                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        {...register(field)}
                                                    />
                                                </div>
                                            )
                                        )}

                                        <button className="btn btn-primary" disabled={isDisable}>
                                            Update Settings
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

export default Settings;
