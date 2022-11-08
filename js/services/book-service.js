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
    getGoogleBooks,
}

function getGoogleBooks(){
    return googleBooks
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

function update(book){
    return storageService.put(BOOKS_KEY, book)
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        if(!book.reviews) book.reviews = []
        book.reviews.push(review)
        return update(book)
    }
    )
}

function removeReview(bookId ,reviewId){
    return get(bookId)
    .then(book=>{
        const reviewIdx = book.reviews.findIndex(review=>review.id === reviewId)
        book.reviews.splice(reviewIdx,1)
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