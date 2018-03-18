

<template>
	<div id="admin">	
		<nav>
			<transition name="slide-fade">
				<p class="flash" v-if="flashMessage != ''">{{ flashMessage }}</p>
			</transition>
		</nav>
		<div class="books">
			<button @click="postTest()">Test button</button>
			<div class="book" v-for="book in books">
				<div class="_id">{{book._id}}</div>	
				<img :src="book.thumbnail_big" alt="" @click="updateBook(book)">
				<div class="title cell">
					<label for="title">Title</label><br>
					<textarea name="title" v-model="book.title" class="" placeholder="ADD ME"></textarea>
				</div>
				<div class="publisher cell">
					<label for="publisher">Publisher</label><br>
					<input v-model="book.publisher" class="" placeholder="ADD ME">
				</div>
				<input v-model="book.language" class="language" placeholder="Language?">
				<textarea v-model="book.authors" class="authors" placeholder="Authors?"></textarea>
				<input v-model="book.publisher" class="publisher" placeholder="Publisher?">
				<input v-model="book.thumbnail_big" class="publisher" placeholder="thumbnail_big?">
				<!-- <p>{{book.description}}</p> -->
				<textarea class="desc" v-model="book.description"></textarea>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';


export default {
  name: 'app',
  data () {
    return {
	  books: [],
	  flashMessage: ""
    }
  },
  components: {
  },
  methods: {
    loadBooks() {
        axios.get('/api/books')
        .then(response => {
			this.books = response.data;
			// console.log(this.books);
        })
        .catch(error => {
        	console.log(error);
        });
	},
	postTest() {
		console.log('sending stuuuf');
		console.log( this.books[0]);
		axios.post('/api/post', this.books)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	updateBook(book) {
		axios.post('/api/book/'+ book._id, book)
		.then((response) => {
			console.log(response.data);
			this.flash(response.data.message);
			// this.flashMessage = response.data.message;
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	flash(message) {
		this.flashMessage = message;
		setTimeout(() => {
			this.flashMessage = "";
		}, 3000);
	}
  },
  computed: {
  },
	watch: {
  
  },
  created() {

  },
  mounted() {
	  this.loadBooks();
  }
}
</script>
