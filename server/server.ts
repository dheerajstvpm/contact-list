import express from "express";
import logger from "morgan";
import cors from "cors";
import api from "./api";

const app = express();
app.use(logger('dev'));
app.use(cors());
app.listen(3000, (error: Error | undefined) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port: 3000");
})
app.get('/', (req, res) => {
    res.status(200).send('Success');
})
app.use('/api', api)
app.use((req, res) => {
    res.status(404).send("Page not found");
})
