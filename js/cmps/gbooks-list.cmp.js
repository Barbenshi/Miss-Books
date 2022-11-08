export default {
    props: ['books'],
    template: `
    <ul>
        <li v-for="book in books">
           <span>{{ book.volumeInfo.title }} </span>
            <button @click="addBook(book.volumeInfo)">+</button>
        </li>
    </ul>
    `,
    methods: {
        addBook(book) {
            book.publishedDate = book.publishedDate.length > 4 ? +book.publishedDate.substring(0, 4) :
                +book.publishedDate
            if (!book.imageLinks) book.thumbnail = "imgs/logo.png"    
            if (!book.description) book.description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam iure est aperiam, labore quaerat minima asperiores reiciendis magnam voluptates!'
            this.$emit('add-book', book)
        },
    },
}