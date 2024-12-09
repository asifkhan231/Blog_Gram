import newConnection from "../config/dbConnection.js"
import jwt from 'jsonwebtoken'

const con = await newConnection()
const gAuth = async (data, res) => {
    try {
        const { email, name, picture } = data
        const query = `SELECT * FROM authUsers WHERE email = ?`
        const [user] = await con.execute(query, [email]);
        if (user.length !== 0) {
            const payload = {
                user_id: user.id,
                email: email
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRE_IN })

            return res.status(202).json({
                message: 'successful login',
                user_id: user.id,
                access_token: token
            })
        }

        const createQue = `INSERT INTO authUsers (email,username,image) VALUES(?,?,?)`
        const [result] = await con.execute(createQue, [email, name, picture])

        const payload = {
            user_id: result.id,
            email: email
        }

        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRE_IN })

        res.status(202).json({
            message: 'successful login',
            user_id: result.id,
            access_token: token
        })
    } catch (error) {
        console.log(error, 'service')
        res.status(404).json({
            message: 'something went wrong',
            error: error
        })
    }

}

const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const query = `SELECT * FROM authUsers WHERE id=?`
        const [user] = await con.execute(query, [id])
        if (user.length === 0) {
            return res.status(404).json({ message: "user not exist" })
        }

        const foundUser = user[0]
        return res.status(200).json({ message: 'user found successful', data: foundUser })
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", error: error })
    }
}
export default { gAuth }

