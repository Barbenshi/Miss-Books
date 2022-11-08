import { bookService } from "../services/book-service.js"

import gbooksList from "../cmps/gbooks-list.cmp.js"

export default {
    template: `
    <section className="new-book">
        <h1>Search your desired books here</h1>
        <div class="search-box flex justify-center align-center">
            <input ref="input" v-model="bookName" type="text" />
            <button @click="getBooks">Search</button>
        </div>
        <gbooks-list v-if="books" @add-book="addBook" :books="booksForDisplay"/>
    </section>
    `,
    data() {
        return {
            books: null,
            bookName: null
        }
    },
    mounted(){
        this.$refs.input.focus()
    },
    computed: {
        booksForDisplay() {
            return this.books
        }
    },
    methods: {
        addBook(book) {
            bookService.add(book).then(() => this.$router.push('/book'))
        },
        getBooks() {
            bookService.getGoogleBooks(this.bookName)
                .then(books => this.books = books)
        }
    },
    components: {
        gbooksList,
    }
}