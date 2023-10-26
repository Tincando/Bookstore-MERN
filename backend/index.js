import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose, { Mongoose } from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.send('Hello World')
});

app.post('/books',async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send('All fields are required')
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

// Route for getting all books

app.get('/books', async (req, res) => {
    try{
        const books = await Book.find()
        return res.status(200).json({
            count: books.length,
            data : books
        })
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

// Route for Get Single Book
app.get('/books/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const books = await Book.findById(id)

        return res.status(200).json(books)
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
})

// Route for updating a book
app.put('/books/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).json({message:'All fields are required'})
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message:'Book not found'})
        }

        return res.status(200).send({message: 'Book updated'})

    }catch (err){
        console.log(err.message );
        return res.status(500).send(err.message);
    }
});

//Delete a book
app.delete('/books/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:'Book not found'})
        }

        return res.status(200).send({message: 'Book deleted'})
} catch(err){
    console.log(err);
    return res.status(500).send(err);
}}
);


mongoose
    .connect(mongoDBURL)
    .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
}) 
.catch((err) => {console.log(err)});