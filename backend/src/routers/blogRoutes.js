import { Router } from "express";
import blogController from "../controllers/blogController.js";

const blogRouters = Router()

blogRouters.post('/create-blog' , blogController.newBlogController)
blogRouters.get('/all-blogs' , blogController.getAllBlogs)
blogRouters.get('/get-blog/:id' , blogController.getBlog)
blogRouters.delete('/delete/:id' , blogController.deleteBlog)

export default blogRouters