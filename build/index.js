"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const filter_1 = require("./filter");
let number = {
    MAX_SAFE_INTEGER: 100000,
    caseinArray: false
};
let array = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
for (let index = 0; index < 1; index++) {
    array.push(getRandomInt(number.MAX_SAFE_INTEGER));
}
console.log(array);
const myFile = fs_1.default.readFileSync("myFile.json");
const myJson = JSON.parse(myFile.toString());
let app;
let map = new Map();
function createServer() {
    myJson.forEach((book) => map.set(book._id, book));
    app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000");
    });
    app.get("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"];
        let book = map.get(parseInt(id));
        if (map.has(id)) {
            let books = {
                _id: book._id,
                Title: book.Title,
                Autor: book.Autor,
                Genre: book.Genre
            };
            res.json(books);
        }
        else {
            res.json({ Response: "The book with this ID has not been found" });
        }
    });
    app.post("/api/library/book/:id/info", (req, res) => {
        const id = req.params["id"];
        let book = map.get(parseInt(id));
        if (map.has(id)) {
            res.json(book);
        }
        else {
            res.json({ Response: "The book with this ID has not been found" });
        }
    });
    app.post("/api/library/book/find/author", (req, res) => {
        const author = req.body["author"];
        const resAuthor = myJson.filter(book => (0, filter_1.AuthorLookup)(author, book));
        res.json(resAuthor);
    });
    app.put("/api/library/book/add", (req, res) => {
        let ID = parseInt(array);
        map.get(ID);
        if (map.has(ID)) {
            res.json({ message: "The given book with the given ID already exists" });
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
            });
            fs_1.default.writeFileSync("myFile.json", (JSON.stringify(myJson, null, 2)));
            res.json({ message: "The following book was added", book: myJson[myJson.length - 1] });
        }
    });
    app.delete("/api/library/book/:id/delete", (req, res) => {
        const id = req.params["id"];
        let ID = parseInt(id);
        map.get(ID);
        if (map.has(ID)) {
            let myJson2 = myJson.filter((book) => book._id !== ID);
            fs_1.default.writeFileSync("myFile.json", (JSON.stringify(myJson2, null, 2)));
            res.json({ message: "The following book was deleted", id: myJson.filter((book) => book._id === ID) });
            map.get(myJson2);
        }
        else {
            res.json({ message: "The given book with the given ID does not exists" });
        }
    });
}
createServer();
