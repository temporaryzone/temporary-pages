

<template>
  <div id="app">
    <img src="http://vuejs.org/images/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2 @click="getBooks()">Load books</h2>
    <div class="books" v-for="book in books">
      <p>{{ book.title }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello librarfsy',
      books: {},
    }
  },
  methods: {
    getBooks() {
      // var that = this;
        axios.get('/api/books')
        .then(response => {
         this.books = response.data;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">

</style>
