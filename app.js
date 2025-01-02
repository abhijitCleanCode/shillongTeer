import express from "express";
import cors from 'cors'
import morgan from 'morgan'
const app = express();
import connect from "./connect.js";
import { router } from "./router.js";

//middleware
app.use(express.json())
app.use(cors(
    {
        origin: "*",
        methods: ["POST", "GET"],
        credential: true
    }
))
app.use(morgan('tiny'))
app.disable('x-powered-by')

app.use('/api', router)

const port = process.env.PORT || 8000;

connect().then(() => {
    app.get('/', (req, res) => {
        res.status(200).json("Server started at port " + port);
    })
    app.listen(port, (req, res) => {
        console.log("Server started at port " + port)
    })
}).catch(e => console.log(e));
