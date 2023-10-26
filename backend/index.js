import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose, { Mongoose } from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.send('Hello World')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
}) 
.catch((err) => {console.log(err)});