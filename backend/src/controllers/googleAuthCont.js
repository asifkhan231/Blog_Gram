import authService from "../service/authService.js"
import oauth2Client from "../utiles/authConfig.js"
import axios from 'axios'
const gAuth = async (req, res) => {
    try {
        const { code } = req.query
        const googleRes = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(googleRes.tokens)

        const userData = await axios.get(`
            https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}
            `)

        const user = userData.data
        return authService.gAuth(user, res)
    } catch (error) {
        res.status(500).json({ message: "something went wrong", 'error': error })
    }
}

export default { gAuth }