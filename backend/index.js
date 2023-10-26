import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose, { Mongoose } from "mongoose";

const app = express()

app.get('/', (req, res) => {
    console.log(req)
    return res.send('Hello World')
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
}) 
.catch((err) => {console.log(err)});