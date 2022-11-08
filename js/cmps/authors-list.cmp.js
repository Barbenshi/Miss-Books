import authorPreview from './author-preview.cmp.js'

export default {
    props:['authors'],
    template:`
    <h3>Authors:</h3>
    <ul>
        <li v-for="author in authors">
            <author-preview :author="author"/>
        </li>
    </ul>
    `,
    components:{
        authorPreview
    }
}