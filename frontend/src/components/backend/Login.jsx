import React from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { loginSuccess } from "../../store/slices/authSlice"
import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        const res = await fetch("http://127.0.0.1:8000/api/authenticate", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        const result = await res.json()

        if (!result.status) {
            toast.error(result.message)
            return
        }

        const userInfo = {
            id: result.id,
            token: result.token,
        }

        dispatch(loginSuccess(userInfo))
        navigate('/admin/dashboard')
    }

    return (
        <>
            <main>
                <div className='container my-5 d-flex justify-content-center'>
                    <div className='login-form my-5'>
                        <div className='card shadow border-0'>
                            <div className='card-body p-4'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h4 className='mb-3'>Login Here!</h4>
                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Email</label>
                                        <input
                                            {
                                                ...register('email', {
                                                    required: "Email is Required.",
                                                    pattern:{
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address."
                                                    }
                                                })
                                            }
                                            type='text' placeholder='Email' className={`form-control ${errors.email && 'is-invalid'}`}/>
                                        {
                                            errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                        }
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='' className='form-label'>Password</label>
                                        <input
                                            {
                                                ...register('password', {
                                                    required: "Password is Required."
                                                })
                                            }
                                            type='password' placeholder='Password' className={`form-control ${errors.password && 'is-invalid'}`}/>
                                        {
                                            errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                        }
                                    </div>
                                    <button type='submit' className='btn btn-primary'>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login