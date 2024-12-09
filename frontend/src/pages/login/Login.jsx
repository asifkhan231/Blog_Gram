import { Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import './login_signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useBlogsContext } from '../../NotesContext'
import Google_auth from '../../components/Google_auth'

function Login() {
    const { submitFormHandle } = useBlogsContext()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitHandle = async (data) => {
        try {
            await submitFormHandle(data)
            navigate('/')
        } catch (error) {
            console.log("enter valid email/password")
        }
    }

    return (
        <div className='lg_si_container'>
            <div className='login'>
                <h3>Login</h3>

                <form onSubmit={handleSubmit(submitHandle)} className='text_fields'>
                    <div>

                        <TextField
                            variant='outlined'
                            label="Email"
                            type='email'
                            required
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })} />
                        {errors.email && (
                            <p className='error'>{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <TextField
                            variant='outlined'
                            label='Password'
                            type="password"
                            required
                            {...register("password", {
                                required: "password is required",
                            })} />
                        {errors.password && (
                            <p className='error'>{errors.password.message}</p>
                        )}
                    </div>
                    <Button variant='contained'
                        type='submit' >Submit</Button>
                </form>
                <p>Don't have account <Link to='/sign-up'>Sign up</Link></p>
            <h4>OR</h4>
            <Google_auth type='login' />
            </div >

        </div>
    )
}

export default Login
