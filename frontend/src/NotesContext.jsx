import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'


export const blogContext = createContext()

function BlogsContext({ children }) {
    const [blogs, setBlogs] = useState([])
    const [userId, setUserId] = useState('')
    const [alertMsg, setAlertMsg] = useState({
        snackbarOpen: false,
        alertSeverity: 'success',
        alertMessage: ''
    })

    const token = localStorage.getItem('access_token')

    const handleSnackbarClose = () => {
        setAlertMsg(pre => ({ ...pre, snackbarOpen: false }))
    };

    const originUrl = 'http://localhost:8080/blogs'
    const userUrl = 'http://localhost:8080/users'


    const handleSignUp = async (data) => {
        const url = `${userUrl}/sign-up`
        try {
            const res = await axios.post(url, data)
            const resData = await res.data
            console.log(resData)
            if (resData <= 1) {
                setAlertMsg({
                    snackbarOpen: true,
                    alertSeverity: 'error',
                    alertMessage: `${res.status} ${data.message}`
                })
            }

            setUserId(resData?.userId)
            console.log(userId)
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'success',
                alertMessage: `${res.status} ${resData.message}`
            })

        } catch (error) {
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'error',
                alertMessage: `something went wrong`
            })
            throw error
        }
    }

    const submitFormHandle = async (data) => {
        const url = `${userUrl}/login`
        try {
            const res = await axios.post(url, data)
            if (res.data <= 1 || !res.data) {
                setAlertMsg({
                    snackbarOpen: true,
                    alertSeverity: 'error',
                    alertMessage: `Error while sign-in user:, ${res.status}`
                })
            }
            console.log(res.data.token)
            const { token } = res.data;
            localStorage.setItem(`access_token`, token);
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'success',
                alertMessage: `login successful`
            })

        } catch (error) {
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'error',
                alertMessage: `enter valid email/password`
            })
            throw error
        }
    }



    const fetchBlogs = async () => {
        const url = `${originUrl}/all-blogs`
        if (!token) {
            console.log('token is not available')
        }
        try {
            const res = await axios.get(url, {
                headers: {
                    access_token: `Bearer ${token}`
                }
            })
            const data = res.data
            console.log(data, "hlo")
            setBlogs(data?.blogs)

        } catch (error) {
            console.log(error)
        }

    }

    const deleteBlog = async (id) => {
        try {
            if (!token) {
                throw 'token is not available'
            }
            const url = `${originUrl}/delete/${id}`
            const res = await axios.delete(url, {
                headers: {
                    access_token: `Bearer ${token}`
                }
            })
            const data = res.data
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'success',
                alertMessage: `blog has been deleted`
            })
            await fetchBlogs()
        } catch (error) {
            console.log(error)
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'error',
                alertMessage: `something went wrong`
            })
        }
    }
    useEffect(() => {
        ((fetchBlogs)())
    }, [])

    const createBlog = async (e) => {
        e.preventDefault();
        if (!token) {
            throw 'token is not available'
        }
        try {

            let formData = new FormData(e.target);
            const title = formData.get('title')
            const shortDesc = formData.get('desc')
            const description = formData.get('content')

            const url = `${originUrl}/create-blog`
            const response = await axios.post(url, {
                title,
                shortDesc,
                description
            }, {
                headers: {
                    access_token: ` Bearer ${token}`
                }
            })
            const data = await response.data
            console.log(data)
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'success',
                alertMessage: `new blog has been create`
            })
            await fetchBlogs()
        } catch (error) {
            setAlertMsg({
                snackbarOpen: true,
                alertSeverity: 'error',
                alertMessage: `${error.message}`
            })
        }
        finally {
            e.target.reset();
        }
    }


    return (
        <blogContext.Provider value={{ blogs, createBlog, deleteBlog, submitFormHandle, alertMsg, handleSnackbarClose, handleSignUp }}>
            {children}
        </blogContext.Provider>
    )
}

export default BlogsContext

export const useBlogsContext = () => useContext(blogContext)