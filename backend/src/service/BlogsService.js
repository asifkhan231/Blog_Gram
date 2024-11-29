import newConnection from "../config/dbConnection.js";

const con = await newConnection()
const addBlog = async (req, res) => {
    console.log(req.body)
    try {
        const { title, shortDesc, description } = req.body
        const insertQuery = `INSERT INTO blogs (title, shortDesc, description) VALUES (?, ?, ?)`;
        const [result] = await con.execute(insertQuery, [title, shortDesc, description])
        res.status(201).json({ message: "blog added successfully", blogID: result.insertId })
    } catch (error) {
        res.status(500).json({ message: 'Error adding blog', error: error.message });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const id = req.params
        const deleteQuery = `DELETE FROM blogs WHERE id = ?`
        const [result] = await con.execute(deleteQuery, id)
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "blog not found" })
        }

        res.status(200).json({ message: "blog has delete successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Error adding blog', error: error.message });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const getQuery = `SELECT * FROM blogs`
        const [result] = await con.execute(getQuery)
        res.status(200).json({ blogs: result })
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding blog', error: error.message });
    }
}

const getBlogById = async (req, res) => {
    try {
        const id = req.params
        const getQuery = `SELECT * FROM blogs WHERE id = ?`
        const [result] = await con.execute(getQuery, id)
        res.status(200).json({ blogs: result })
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding blog', error: error.message });
    }
}


export default { addBlog, deleteBlog, getAllBlogs, getBlogById }