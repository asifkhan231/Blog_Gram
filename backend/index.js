import "dotenv/config";
import express from 'express'
import blogRouters from './src/routers/blogRoutes.js'
import userRouters from "./src/routers/userRouter.js";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from 'helmet'
import cors from 'cors'
import auth from "./src/middleware/auth.js";

const app = express()
const PORT = process.env.PORT 
// app.use('/', (req, res) => {
//     res.send("hello from express")
// })
app.use(bodyParser.urlencoded({ extended: false }));

// Helmet for securing HTTP headers
app.use(helmet());

app.use(cors())

// Gzip compression for request/response optimization
app.use(compression());
app.use(express.json())
app.use('/blogs', auth, blogRouters)
app.use('/users', userRouters)

app.listen(PORT, () => {
    console.log('server running on port 8080')
})