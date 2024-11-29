import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function Header() {
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem("access_token")
        navigate('/login')
    }
    return (
        <header className='header'>
            <div className='nav_bar'>
                <h2>Blog_gram</h2>
                <div className='nav_items'>
                    <Link to='/'>Home</Link>
                    <Link to='/create'>Create</Link>
                    <Link to='/my-blogs'>My blogs</Link>
                    <Link to='watchlist'>WatchList</Link>
                </div>
                {!token ?
                    <Button variant='contained' onClick={() => navigate('/login')}>Login</Button> :
                    <Button variant='contained' onClick={handleLogOut}>Logout</Button>
                }
            </div>

        </header>
    )
}

export default Header
