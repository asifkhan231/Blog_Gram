import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography, CardActions } from '@mui/material'
import { useBlogsContext } from '../../NotesContext'
import { Link } from 'react-router-dom'
import './AllBlogs.css'

function AllBlogs() {
    const { blogs, deleteBlog } = useBlogsContext()

    const sortedBlogs = [...blogs]?.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateA - dateB;
    });
    return (
        <>
            <div className='notes__preview'>
                <h2>All Blogs ({blogs?.length})</h2>
                {blogs && blogs.length > 0 ? sortedBlogs.map(blog => (
                    <Card key={blog.id}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {blog.title}
                            </Typography>

                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}> {blog.shortDesc}</Typography>


                            <Typography variant="body2" sx={{ fontSize: 15 }}>
                                {blog.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color='error' size="small" onClick={() => deleteBlog(blog?.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                )) : <p>currently, there are 0 Blogs</p>}
            </div>
        </>
    )
}

export default AllBlogs
