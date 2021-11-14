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
const myJSON = JSON.parse(myFile.toString());
let app;
let map = new Map();
myJSON.forEach((book) => map.set(book._id, book));
function createServer() {
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
        if (map.has(parseInt(id))) {
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
        if (map.has(parseInt(id))) {
            res.json(book);
        }
        else {
            res.json({ Response: "The book with this ID has not been found" });
        }
    });
}
createServer();
