

<template>
  <div id="app">
    <h2>Knihy {{ books.length }}</h2>
    <div class="books">
      <BookBox v-for="book in books" :book="book"></BookBox>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BookBox from './components/BookBox.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello librarfsy',
      books: {},
    }
  },
  components: {
    BookBox
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
      
    },
    loadBooks() {
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

  },
  created() {
    this.loadBooks();
  }
}
</script>
