import React, {useMemo, useRef, useState} from "react";
import Header from "../../common/Header.jsx";
import Sidebar from "../../common/Sidebar.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import Footer from "../../common/Footer.jsx";
import {useForm} from "react-hook-form";
import {apiUrl, token, fileUrl} from "../../common/http.jsx";
import {toast} from "react-toastify";

const Edit = ({placeholder}) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [member, setTestimonial] = useState('');
    const [isDisable, setisDisable] = useState(false);
    const [imageId, setimageId] = useState(null);
    const params = useParams();

    const config = useMemo(() => ({
            readonly: false,
            placeholder: placeholder || ''
        }),
        [placeholder]
    );


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl+'members/'+params.id,{
                'method' : 'GET',
                'headers' : {
                    'Content-type' : 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${token()}`
                }
            });
            const result = await res.json();
            setContent(result.data.content);
            setTestimonial(result.data);
            return{
                name: result.data.name,
                job_title: result.data.job_title,
                linked_in: result.data.linked_in,
                status: result.data.status,
            }
        }
    })

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // "content": content,
        const newData = {...data, "imageId": imageId}
        const res = await fetch(apiUrl+'members/'+params.id,{
            'method' : 'PUT',
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
            toast.error(result.errors.image[0]);
        } else {
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
                                       <h4 className='h5'>Edit Testimonial</h4>
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

                                       <div className='pb-3'>
                                           {
                                               member.image && <img src={fileUrl+'uploads/members/'+member.image} />
                                           }
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

                                       <button disabled={isDisable} className='btn btn-primary'>Update</button>
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

export default Edit