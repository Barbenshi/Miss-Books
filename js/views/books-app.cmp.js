import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus.service.js'

import booksFilter from '../cmps/books-filter.cmp.js'
import booksList from '../cmps/books-list.cmp.js'

export default {
    template: `
    <main>
    <img src="imgs/logo.png" alt="" class="logo"/>
        <books-filter 
        @filter="filter"/>

        <books-list
            v-if="books" 
            @removed="removeBook" 
            :books="booksForDisplay"/>
        <p v-else>Loading...</p>
    </main>
    `,
    data() {
        return {
            books: null,
            filterBy: {
                title: '',
                fromPrice: 0,
            }
        }
    },
    created() {
        bookService.query().then(books => this.books = books)
    },
    methods: {
        filter(filterBy) {
            this.filterBy = filterBy
        },
        convertToEuro(book) {
            const price = book.listPrice.amount
            const currency = book.listPrice.currencyCode
            if (currency === 'ILS') return price * 0.3
            return price
        },
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    const msg = {
                        txt: `Book ${this.books[idx].title} removed`,
                        type: 'success',
                        timeout: 4000,
                    }
                    this.books.splice(idx, 1)
                    eventBus.emit('user-msg', msg)
                })
        }
    },
    computed: {
        booksForDisplay() {
            const regex = new RegExp(this.filterBy.title, 'i')
            const filteredBooks = this.books.filter(book => regex.test(book.title))
            return filteredBooks.filter(book => {
                const bookPrice = this.convertToEuro(book)
                return (bookPrice > this.filterBy.fromPrice)
            })
        }
    },
    components: {
        booksFilter,
        booksList,
    }
}