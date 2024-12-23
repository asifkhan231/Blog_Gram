import { Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import '../login/login_signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useBlogsContext } from '../../NotesContext'
import Google_auth from '../../components/Google_auth'

function Sign_up() {
    const { handleSignUp } = useBlogsContext()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()

    const submitHandle = async (data) => {
        try {
            await handleSignUp(data)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='lg_si_container'>
            <div className='login'>
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit(submitHandle)} className='text_fields'>
                    <div>
                        <TextField
                            variant='outlined'
                            label="Username"
                            required
                            {...register("username", {
                                required: "username is required",
                            })} />
                        {errors.email && (
                            <p className='error'>{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <TextField
                            variant='outlined'
                            label="Email"
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
                            type='password'
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
                <p>Already have account <Link to='/login'>login..</Link></p>
                <h4>OR</h4>
                <Google_auth type='Sign-up'/>
            </div >
        </div>
    )
}

export default Sign_up
