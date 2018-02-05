

<template>
	<div id="grid">
		<header>
			<h1>TEMPORARY PAGES</h1>
			<p id="claim">Nezávislá komunitní knihovna zaměřující se na teorii designu, umění 
a digitální média.</p>
		</header>
		<Sidebar></Sidebar>
		<nav>

		</nav>

		<div class="books">
			<BookBox v-for="book in booksWithCovers" :book="book"></BookBox>
		</div>
		<div class="nocover">
			
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import VueLazyload from 'vue-lazyload';
import BookBox from './components/BookBox.vue';
import Sidebar from './components/Sidebar.vue';




export default {
  name: 'app',
  data () {
    return {
	  msg: 'Hello librarfsy',
      books: {},
      booksWithCovers: {},
    }
  },
  components: {
	BookBox,
	Sidebar
  },
  methods: {
    loadBooks() {
        axios.get('/api/books')
        .then(response => {
			this.books = response.data;
			this.booksWithCovers = _.filter(response.data, function (item){
				return item.thumbnail_big;
			});
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
