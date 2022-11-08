import { bookService } from "../services/book-service.js";
import { utilService } from "../services/util-service.js";
import { eventBus } from "../services/event-bus.service.js";

export default {
    emits:['review-added'],
    props:['book'],
    template:`
    <div className="review">
        <form @submit.prevent="formSubmitted" class="flex flex-column">
                <div className="name">
                    <label htmlFor="name">Full Name: </label>
                    <input v-model.lazy.trim="review.name" ref="name" type="text" id="name" placeholder="Enter Your Name" />
                </div>

                <!-- <div className="rating">
                    <label htmlFor="first-star"><span class="fa fa-star"></span></label>
                    <input type="checkbox" v-model="review.rating" value="1" id="first-star"/>
                    <input type="checkbox"/> <span class="fa fa-star checked"></span>
                    <input type="checkbox"/> <span class="fa fa-star checked"></span>
                    <input type="checkbox"/> <span class="fa fa-star checked"></span>
                    <input type="checkbox"/> <span class="fa fa-star checked"></span>
                </div> -->

                <div className="rating" >
                    <label htmlFor="rating">Rating: </label>
                    <select v-model.lazy.number="review.rating" id="rating">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>

                <div className="read-date">
                    <label htmlFor="date">Read Date: </label>
                    <input type="date" v-model.lazy="review.readAt" id="date" />
                </div>
                <div className="text-review">
                    <textarea v-model.lazy.trim="review.txt" cols="30" rows="10"></textarea>
                </div>
                <button>Save Review</button>
        </form>
    </div>
    `,
    data(){
        return {
            review:{
                id: utilService.makeId(),
                name:'Book Reader',
                rating:5,
                readAt: new Date().toLocaleDateString('fr-CA'),
                txt:''
            }
        }
    },
    mounted(){
        this.$refs.name.focus()
    },
    methods: {
        formSubmitted(){
            console.log(this.book.id);
            bookService.addReview(this.book.id, this.review)
            .then(updatedBook =>{
                this.$emit(`review-added`,updatedBook)
                const msg = {
                    txt: `Review added ${this.review.id}`,
                    type: 'success',
                    timeout: 3000,
                }
                eventBus.emit('user-msg', msg)
            }
             ) 
        },
    },
    computed: {
        formattedDate(){
           return new Date().toLocaleDateString('fr-CA')
        }
    }
}