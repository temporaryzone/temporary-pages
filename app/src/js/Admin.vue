

<template>
	<div id="admin">	
		<nav>
			<transition name="slide-fade">
				<p class="flash" v-if="flashMessage != ''">{{ flashMessage }}</p>
			</transition>
		</nav>
		<div class="books">
			
			<div class="book" v-for="book in books">
				<div class="_id">{{book._id}}</div>	
				<img :src="book.thumbnail_big" alt="" @click="updateBook(book)">
				<div class="col2">
					<div class="title cell">
						<label for="title">Title</label><br>
						<textarea name="title" v-model="book.title" class="" placeholder="ADD ME"></textarea>
					</div>
					<div class="language cell">
						<label for="title">Language</label><br>
						<input v-model="book.language" class="language" placeholder="Language?">
					</div>
					<div class="authors cell">
						<label for="authors">Authors</label><br>
						<textarea name="authors" v-model="book.authors" class="" placeholder="Authors?"></textarea>
					</div>
					<div class="pagesisbn cell ">
						<div class="half">
							<label for="pages">Pages</label><br>
							<input name="pages" v-model="book.pages" class="" placeholder="Pages?">
						</div>
						<div class="half">
							<label for="isbn">ISBN</label><br>
							<input name="isbn" v-model="book.isbn" class="" placeholder="ISBN?">
						</div>
					</div>
					<div class="owner pagesisbn cell">
						<div class="half">
							<label for="owner">Owner</label><br>
							<input name="owner" v-model="book.owner" class="" placeholder="Owner">
						</div>
						<div class="half">
								
							<input type="checkbox" id="checkbox" v-model="book.show"><label for="checkbox">Shown</label>	
						</div>
					</div>
				</div>
				<div class="col3">
					<div class="publisher cell">
						<label for="publisher">Publisher</label><br>
						<input v-model="book.publisher" class="" placeholder="ADD ME">
					</div>
					<div class="thumbnail cell">
						<label for="thumbnail">Thumbnail path</label><br>
						<input v-model="book.thumbnail_big" class="" placeholder="thumbnail_big?">
					</div>
				</div>
				<div class="col4">
					<div class="desc cell">
					<!-- <p>{{book.description}}</p> -->
						<textarea class="" v-model="book.description"></textarea>
					</div>
				</div>
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
