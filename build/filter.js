"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorLookup = void 0;
const fs_1 = __importDefault(require("fs"));
const myFile = fs_1.default.readFileSync("myFile.json");
const myJson = JSON.parse(myFile.toString());
function AuthorLookup(author, book) {
    for (let i = 0; i < book.Autor.length; i++) {
        if (book.Autor[i].toLowerCase().includes(author.toLowerCase())) {
            return book;
        }
    }
}
exports.AuthorLookup = AuthorLookup;
