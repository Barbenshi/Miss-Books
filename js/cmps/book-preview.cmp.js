export default {
    props: ['book'],
    template: `
    <div className="book-preview">
        <h2>{{book.title}}</h2>
        <h5>{{formattedPrice}}</h5>
    </div>
    `,
    computed: {
        formattedPrice() {
            if (!this.book.listPrice) return 'Not for sale'
            return new Intl.NumberFormat('en',
                {
                    style: 'currency',
                    currency: this.book.listPrice.currencyCode
                })
                .format(this.book.listPrice.amount)
        }
    }
}