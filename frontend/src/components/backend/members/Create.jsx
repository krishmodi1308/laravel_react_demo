import React, { useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import Footer from "../../common/Footer.jsx";
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form"
import {apiUrl, token} from "../../common/http.jsx";
import {toast} from "react-toastify";

const Create = ({placeholder}) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isDisable, setisDisable] = useState(false);
    const [imageId, setimageId] = useState(null);

    const config = useMemo(() => ({
            readonly: false,
            placeholder: placeholder || 'Content'
        }),
        [placeholder]
    );


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // "content": content,
        const newData = {...data, "imageId": imageId}
        const res = await fetch(apiUrl+'members',{
            'method' : 'POST',
            'headers' : {
                'Content-type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token()}`
            },
            body: JSON.stringify(newData)
        });
        const result = await res.json();
        if(result.status == true){
            toast.success(result.message);
            navigate('/admin/members');
        } else {
            toast.error(result.message);
        }
    }

    const handleFile = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        setisDisable(true);

        const res = await fetch(apiUrl + 'temp-images', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: formData
        });

        const result = await res.json();

        if (result.status === false) {
            setisDisable(false);
            toast.error(result.errors.image[0]);
        } else {
            setisDisable(false);
            setimageId(result.data.id);
        }
    };

    return (
        <>
            <main>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            {/*Sidebar*/}
                            <Sidebar/>
                        </div>
                        <div className='col-md-9'>
                            {/*Dashboard*/}
                            <div className='card shadow border-0'>
                                <div className='card-body p-4'>
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='h5'>Create Member</h4>
                                        <Link to='/admin/members' className='btn btn-primary'>Back</Link>
                                    </div>
                                    <hr />

                                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <label htmlFor="" className="form-label">Name</label>
                                            <input type='text' placeholder='Name'
                                                  {
                                                      ...register('name',{
                                                          required: "Name is required"
                                                      })
                                                  }
                                                  className='form-control'></input>
                                            {
                                                errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="" className="form-label">Designation</label>
                                            <input placeholder='Designation'
                                                {
                                                    ...register('job_title',{
                                                        required: "Designation is required"
                                                    })
                                                }
                                                type="text" className={`form-control ${errors.job_title && 'is-invalid'}`}/>
                                            {
                                                errors.job_title && <p className='invalid-feedback'>{errors.job_title?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="" className="form-label">Linked in Url</label>
                                            <input placeholder='Linked in Url'
                                                   {
                                                       ...register('linked_in')
                                                   }
                                                   type="text" min={1} max={5} className={`form-control ${errors.linked_in && 'is-invalid'}`}/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="" className="form-label">Image</label>
                                            <br />
                                            <input onChange={handleFile} type='file' />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="" className="form-label">Status</label>
                                            <select name="" id="" className="form-control"
                                                    {
                                                        ...register('status')
                                                    }
                                            >
                                                <option value='1'>Active</option>
                                                <option value='0'>Block</option>
                                            </select>
                                        </div>

                                        <button disabled={isDisable} className='btn btn-primary'>Submit</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Create