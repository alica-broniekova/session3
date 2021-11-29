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
    app.put("/api/library/book/:id/add", (req, res) => {
        const id = req.params["id"];
        let ID = parseInt(id);
        let data = map.get(ID);
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
            console.log(myJson);
            res.json({ message: "The following book was added", id: myJson[myJson.length - 1] });
        }
    });
    app.delete("/api/library/book/:id/delete", (req, res) => {
        const id = req.params["id"];
        let ID = parseInt(id);
        let data = map.get(ID);
        if (map.has(ID)) {
            let myJson2 = myJson.filter((book) => book._id !== ID);
            fs_1.default.writeFileSync("myFile.json", (JSON.stringify(myJson2, null, 2)));
            res.json({ message: "The following book was deleted", id: myJson.filter((book) => book._id === ID) });
        }
        else {
            res.json({ message: "The given book with the given ID already exists" });
        }
    });
}
createServer();
