import fs from "fs"
import { Book, BookInfo } from "./types/Book";

const myFile = fs.readFileSync("myFile.json")
const myJson: Book[] = JSON.parse(myFile.toString())

/**
 * This function searches author and then returns books with this author
 * @param author author of the book
 * @param book object with data
 */
export function AuthorLookup(author : string, book : Book) {
    myJson.forEach(book => {
        if(book.Autor.toLowerCase().includes(author.toLowerCase()))
            return book
        
    })
} 

/**
 * This function searches title and then returns books with this author
 * @param title title of the book
 * @param book object with data
 */
export function NameLookup(title : string, book : Book) {
    myJson.forEach(book => {
        if(book.Title.toLowerCase().includes(title.toLowerCase()))
            return book
        
    })
} 