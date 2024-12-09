import { Router } from "express";
import googleAuthCont from "../controllers/googleAuthCont.js";

const gAuthRouter = Router()

gAuthRouter.get('/googleCode', (req, res) => {
    return googleAuthCont.gAuth(req, res)
})

export default gAuthRouter