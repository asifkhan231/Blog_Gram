import blogServices from '../service/BlogsService.js'


const validateData = () => {

}
const newBlogController = (req, res, next) => {
    //     const { isValid, message } = validateData(req.body);
    //     if (!isValid) {
    //         return res.status(400).json({ message });
    //     }
    return blogServices.addBlog(req, res, next)
}

const getAllBlogs = async (req, res, next) => {
    return blogServices.getAllBlogs(req, res, next)
}

const deleteBlog = async (req, res, next) => {
    return blogServices.deleteBlog(req, res, next)
}

const getBlog = async (req, res, next) => {
    return blogServices.getBlogById(req, res, next)
}

export default { newBlogController, getAllBlogs, deleteBlog, getBlog }