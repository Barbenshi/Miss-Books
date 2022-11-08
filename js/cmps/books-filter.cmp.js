export default {
    emits: ['filter'],
    template: `
    <h1>Customize search</h1>
    <input  v-model="filterBy.title" 
    @input="this.$emit('filter', this.filterBy)" 
    type="text"
    placeholder="Search"/>

    <input  :title="formatTitle"
    @input="this.$emit('filter',this.filterBy)"
     v-model="filterBy.fromPrice"
      min="0" 
      max="300" 
      type="range"
      >
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    computed:{
        formatTitle(){
            return '€' + this.filterBy.fromPrice 
        }
    }
}