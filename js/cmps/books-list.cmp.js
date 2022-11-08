import bookPreview from "./book-preview.cmp.js"

export default {
    props: ['books'],
    template: `
    <section className="book-list">
        <ul>
                <li v-for="book in books" :key="book.id">
                    <book-preview :book="book"/>
                    <section class="actions">
                        <router-link :to="'/book/' + book.id">Details</router-link>
                        <button @click="remove(book.id)">X</button>
                    </section>
                </li>
        </ul>
    </section>
    `,
    methods:{
        remove(bookId){
            this.$emit('removed',bookId)
        }
    },
    components: {
        bookPreview
    }
}