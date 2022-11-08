import categoryPreview from './category-preview.cmp.js'

export default {
    props:['categories'],
    template:`
    <h3>Categories:</h3>
    <ul>
        <li v-for="category in categories">
            <category-preview :category="category"/>
        </li>
    </ul>
    `,
    components:{
        categoryPreview,
    }
}