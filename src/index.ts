import express from "express"
import cors from "cors"
import bodyParser, { json, urlencoded } from "body-parser"
import http from "http"
import fs from "fs"
import { Book, BookInfo } from "./types/Book";
import { title } from "process"

const myFile = fs.readFileSync("myFile.json")
const myJSON: BookInfo[] = JSON.parse(myFile.toString())

let app;
let map = new Map()

myJSON.forEach((book: BookInfo) => map.set(book._id,<BookInfo> book))


function createServer() {
    app = express()
    app.use(cors())
    app.use(json())
    app.use(urlencoded({ extended: false}))

    http.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000")
    })

    app.get("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"]
        let book = map.get(parseInt(id))
        
        if  (map.has(parseInt(id))) {
            let books: BookInfo = {
                _id: book._id,
                Title: book.Title,
                Autor: book.Autor,
                Genre: book.Genre

            }
            res.json(books)
    }   else {
             res.json({Response: "The book with this ID has not been found"})
         } 
        })

    app.post("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"]
        let book = map.get(parseInt(id))
        
        if  (map.has(parseInt(id))) {
            res.json(book)
    }   else {
             res.json({Response: "The book with this ID has not been found"})
         } 
        })
}

createServer() 



