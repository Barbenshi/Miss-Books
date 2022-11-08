export default {
    props:['review'],
    template:`
    <div className="review-preview flex flex-column">
        <p>By: {{review.name}}</p>
        <p>Read Date: {{review.readAt}}</p>
        <p>Rated: {{review.rating}}</p>
        <p>Review: {{review.txt}}</p>
    </div>
    `
}