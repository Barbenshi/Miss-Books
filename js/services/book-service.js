import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'

import gBooks from '../../data/books.json' assert {type: 'json'}
import googleBooks from '../../data/google-books.json' assert {type: 'json'}

const BOOKS_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    remove,
    get,
    addReview,
    removeReview,
    add,
    getGoogleBooks,
    update,
    getPrevNextBookId,
}

function getGoogleBooks(bookName) {
    const URL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(URL)
        .then(({ data }) => data.items)
}

function query() {
    return storageService.query(BOOKS_KEY)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function add(book) {
    return storageService.post(BOOKS_KEY, book)
}

function update(book) {
    return storageService.put(BOOKS_KEY, book)
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        if (!book.reviews) book.reviews = []
        book.reviews.push(review)
        return update(book)
    }
    )
}

function getPrevNextBookId(bookId) {
    return query().then(books => {
        var idx = books.findIndex(book => book.id === bookId)
        if (idx === books.length - 1) idx = books.length-2
        if(idx === 0) idx = 1
        return {next: books[idx + 1].id, prev: books[idx-1].id}
    })
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(reviewIdx, 1)
            return update(book)
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = gBooks
        utilService.saveToStorage(BOOKS_KEY, books)
    }
    return books
}