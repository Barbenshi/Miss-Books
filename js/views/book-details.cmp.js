import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/event-bus.service.js"

import authorsList from "../cmps/authors-list.cmp.js"
import categoriesList from "../cmps/categories-list.cmp.js"
import reviewAdd from "../cmps/reviewAdd.cmp.js"
import reviewPreview from "../cmps/review-preview.cmp.js"

export default {
    template: `
    <main>
    <div v-if="book" className="book-details">
        <div className="img-container">
            <img :src="book.thumbnail" alt="" />
            <img v-if="book.listPrice.isOnSale"
             src="imgs/sale.png"
              alt="sale-img" class="sale-img" />

        </div>
        <h1>{{book.title}}</h1>
        <h2>{{book.subtitle}}</h2>
        <div className="authors" class="flex align-center">
            <authors-list :authors="book.authors"/>
        </div>
        <h4>{{age}}</h4>
        <h5>{{difficulty}}</h5>
        <h6>Language: {{book.language}}</h6>
        <div className="categories" class="flex align-center">
            <categories-list :categories="book.categories"/>
        </div>
        <h6 :class="stylePrice">Price: {{formattedPrice}}</h6>
        <router-link to="/book" class="btn close">X</router-link>
        <!-- <button @click="close">X</button> another option with router -->
        <div className="book-desc">
            <p v-if="isShort">{{book.description}}</p>
            <p v-else>{{shortDesc}} <span @click ="isShort = !isShort">...</span></p>
        </div>
        <h2>Book Reviews:</h2>
        <ul v-if="book.reviews" class="book-reviews">
            <li v-for="review in book.reviews" :key="review.id">
                <review-preview :review="review"/>
                <button @click="removeReview(review.id)" class="danger">Remove Review</button>
            </li>
        </ul>
        <review-add :book="book" :key="book.id" @review-added="addReview"/>
    </div>
    
    </main>

    `,
    data() {
        return {
            isShort: null,
            book: null,
        }
    },
    created() {
        const bookId = this.$route.params.id
        bookService.get(bookId)
            .then(book => {
                this.book = book
                this.isShort = this.book.description.length <= 100
            })

    },
    methods: {
        close() {
            this.$router.push('/book')
        },
        convertToEuro() {
            const price = this.book.listPrice.amount
            const currency = this.book.listPrice.currencyCode
            if (currency === 'ILS') return price * 0.3
            return price
        },
        removeReview(reviewId){
            bookService.removeReview(this.book.id ,reviewId)
            .then(updatedBook =>{
                this.book = updatedBook
                const msg = {
                    txt: `Review removed ${reviewId}`,
                    type: 'success',
                    timeout: 3000,
                }
                eventBus.emit('user-msg', msg)
            }
                 )
        },
        addReview(updatedBook){
            this.book = updatedBook
        }
    },
    computed: {
        difficulty() {
            if (this.book.pageCount > 500) return 'Long reading'
            else if (this.book.pageCount > 200) return 'Decent Reading'
            return 'Light Reading'
        },
        age() {
            const yearDiff = new Date().getFullYear() - this.book.publishedDate
            if (yearDiff > 10) return 'Veteran Book'
            else if (yearDiff < 1) return 'New on shelf!'
            return 'Popular book'
        },
        formattedPrice() {
            return new Intl.NumberFormat('en',
                {
                    style: 'currency',
                    currency: this.book.listPrice.currencyCode
                })
                .format(this.book.listPrice.amount)
        },
        stylePrice() {
            const convertedPrice = this.convertToEuro()
            if (convertedPrice > 150) return 'expensive'
            else if (convertedPrice < 20) return 'cheap'
        },
        shortDesc() {
            return this.book.description.substring(0, 100)
        }
    },
    components: {
        authorsList,
        categoriesList,
        reviewAdd,
        reviewPreview,
    }
}