import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();




router.post('/',async (req, res) => {
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

router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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


export default router;