import userService from "../service/userService.js"


const login = async (req, res) => {
    const data = req.body
    if (!data.email || !data.password) {
        res.status(500).json({ message: "insert valid data" })
    }

    return userService.login(req.body, res)
}

const signup = async (req, res) => {
    return userService.signUp(req.body, res)
}

const getUsers = async (req, res) => {
    return userService.getUsers(req, res)
}

const getUserById = async (req, res) => {
    return userService.getUserById(req, res)
}
export default { login, signup, getUsers,getUserById }