import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useBlogsContext } from '../NotesContext';
import { useNavigate } from 'react-router-dom';


function Google_auth({type}) {
    const { setAlertMsg } = useBlogsContext()
    const navigate = useNavigate()
    const authUrl = 'http://localhost:8080/auth'
    const onAction = async (res) => {
        try {
            const code = res.code
            if (code) {
                const response = await axios.get(`${authUrl}/googleCode?code=${code}`)
                const { access_token } = response.data

                localStorage.setItem('access_token', access_token)
                setAlertMsg({
                    snackbarOpen: true,
                    alertSeverity: 'success',
                    alertMessage: `welcome to Blog_Gram`
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            navigate('/')
        }
    }

    const googleAuth = useGoogleLogin({
        onSuccess: onAction,
        onError: onAction,
        flow: 'auth-code'
    })
    return (
        <>
            <Button onClick={googleAuth} variant='outlined'><GoogleIcon color='primary' /> {type} with Google </Button>
        </>
    )
}

export default Google_auth
