import express from "express"
import cors from "cors"
import bodyParser, { json, urlencoded } from "body-parser"
import http from "http"
import fs from "fs"
import { Book, BookInfo } from "./types/Book";
import nums from "./nums";
import {AuthorLookup, NameLookup} from "./filter" 


let number: nums = {
  MAX_SAFE_INTEGER: 100000,
  caseinArray: false }


let array: any = []

/**
 * generates random numbers
 * @param max the highest value of numbers acceptable
 * @returns random numbers from 0 to highest value of numbers acceptable  
 */
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

for (let index = 0; index < 1; index++) {
    array.push(getRandomInt(number.MAX_SAFE_INTEGER))
}

console.log(array)


const myFile = fs.readFileSync("myFile.json")
const myJson: Book[] = JSON.parse(myFile.toString())

let app;
let map = new Map()


/**
 * Creates server
 */
function createServer() {
    myJson.forEach((book: BookInfo) => map.set(book._id,<BookInfo> book))
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
        
        /** returns BookInfo if the ID is found */
        if  (map.has(id)) {
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
        
        /** returns Book if the ID is found */
        if  (map.has(id)) {
            res.json(book)
    }   else {
             res.json({Response: "The book with this ID has not been found"})
         } 
        })


    app.post("/api/library/book/find/author", (req, res) =>{
        const author = req.body["author"]
        
        /** Filters books from myJson file according to author  */
        let filteredBooksbyAuthor: Book[] = myJson.filter(book => AuthorLookup(author, book))       
        res.json(filteredBooksbyAuthor)
        
    })


    app.post("/api/library/book/find/name", (req, res) => {
        const title = req.body["name"]
        
        /** Filters books from myJson file according to title  */
        let filteredBooksbyName: Book[] = myJson.filter(book => AuthorLookup(title, book))       
        res.json(filteredBooksbyName)
    })
    

    app.put("/api/library/book/add", (req, res) => {
        let ID = parseInt(array)
        map.get(ID)
        
        /** adds book with random ID */
        if (map.has(ID)) {
            res.json({message:"The given book with the given ID already exists"})
        } 
        else {
            myJson.push({
                _id: ID,
                Title: req.body["Title"],
                Autor: req.body["Autor"],
                Genre: req.body["Genre"],
                Year_of_publication: req.body["Year of publication"],
                Publishers: req.body["Publishers"],
                Publishing_country: req.body["Publishing country"],
                Number_of_pages: req.body["Number of pages"]
            }
            )
            fs.writeFileSync("myFile.json", (JSON.stringify(myJson, null, 2)));
            res.json({ message: "The following book was added", book: myJson[myJson.length - 1]})
            
            
        }
    })
    app.delete("/api/library/book/:id/delete", (req, res) => {
        const id = req.params["id"]
        let ID = parseInt(id)
        map.get(ID)

        /** deletes book with given ID */
        if(map.has(ID)) {
            let myJson2 = myJson.filter((book: Book) => book._id !== ID);
            fs.writeFileSync("myFile.json", (JSON.stringify(myJson2, null, 2)));
            res.json({ message: "The following book was deleted", id: myJson.filter((book: Book) => book._id === ID)})
            map.get(myJson2)
        }
        else{
            res.json({ message: "The given book with the given ID does not exists"})
        }
    })   
    
    
}



createServer() 





