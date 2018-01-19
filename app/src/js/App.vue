

<template>
  <div id="app">
    <img src="http://vuejs.org/images/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2 @click="getBooks()">Load books</h2>
    <div class="books" v-for="book in books">
      <p>{{ book }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello library',
      books: {},
    }
  },
  methods: {
    getBooks: function() {
      var that = this;
        axios.get('/api/books')
        .then(function (response) {
         that.books = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      
    }
  },
  computed: {
    // books: function () {
    //   axios.get('/api/books')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //   return ['A', 'B'];
      
    // }
  }
}
</script>

<style lang="scss">

</style>
