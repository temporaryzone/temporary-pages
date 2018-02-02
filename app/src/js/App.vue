

<template>
	<div id="grid">
		<Sidebar></Sidebar>
		<header>
			<h1>TEMPORARY PAGES</h1>
			<p id="claim">Nezávislá komunitní knihovna zaměřující se na teorii designu, umění 
a digitální média.</p>
		</header>


		<div class="catalog">
			<h2>Katalog</h2>
		</div>
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
import Vue from 'vue';
import BookBox from './components/BookBox.vue';
import Sidebar from './components/Sidebar.vue';

Vue.use(VueLazyload);

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
