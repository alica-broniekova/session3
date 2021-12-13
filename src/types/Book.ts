export type Book = {
    _id: Number,
    Title: String,
    Autor: string,
    Genre: [string],
    Year_of_publication: Number,
    Publishers: String,
    Publishing_country: String,
    Number_of_pages: Number
}

export type BookInfo = {
    _id: Number,
    Title: String,
    Autor: string,
    Genre: string[],
}