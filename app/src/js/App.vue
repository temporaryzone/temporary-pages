

<template>
	<div id="grid">
		<header>
			<h1>TEMPORARY PAGES</h1>
			<p id="claim">Nezávislá komunitní knihovna zaměřující se na teorii designu, umění 
a digitální média.</p>
			<p>{{ searchPhrase }}</p>
			<!-- <p>{{ result }}</p> -->
		</header>
		<Sidebar :options="options" :value="searchPhrase"></Sidebar>
		<nav>

		</nav>
		<div class="books">
			<BookBox v-for="book in result" :book="book" :options="options.voice"></BookBox>
		</div>
		<div id="bookPane" v-bind:class="{ shown: showBookPane}">
			<div class="img" v-if="paneBook !== null">
				<img v-lazy="paneBook.thumbnail_big" alt="">
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import Fuse from 'fuse.js';
import BookBox from './components/BookBox.vue';
import Sidebar from './components/Sidebar.vue';


export default {
  name: 'app',
  data () {
    return {
	  books: [],
	  booksWithCovers: [],
	  shownBooks: [],
	  result:[],
	  searchPhrase: "",
	  paneBook: null,
	  showBookPane: false,
	  options: {
		  voice: {
			  mute: false,
			  voicesList: [],
			  voice: "Zuzana"
		  },
		  fuse: {
				  shouldSort: true,
				  threshold: 0.6,
				  location: 0,
				  distance: 100,
				  maxPatternLength: 32,
				  minMatchCharLength: 1,
				  keys: [
					"title", 
					"author_details"
				]
				},
	  }
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
			this.fuse = new window.pages.Fuse(this.booksWithCovers, this.options.fuse);
    		this.result = this.booksWithCovers
        	// console.log(response);
        })
        .catch(error => {
        	console.log(error);
        });
	},
	changePhrase(search) {
		this.searchPhrase = search;
		console.log(this.searchPhrase);
		console.log('search this:'+ search);
	},
	populateVoices() {
		var p = window.pages;
		p.voices = p.synth.getVoices();
		p.voicesList = [];
		p.voices.forEach(voice => {
			p.voicesList.push(voice.name);
		});
		this.$set(this.options.voice, "voicesList", p.voicesList);
		this.$set(this.options.voice, "voice", p.voicesList[Math.floor(Math.random()*p.voicesList.length)]);
	},
	showPane(book) {
		console.log('showing book');
		this.paneBook = book;
		this.showBookPane = true;
	}
  },
  computed: {
  },
	watch: {
    searchPhrase() {
		if (this.searchPhrase.trim() === '')
			this.result = this.booksWithCovers
		else
			this.result = this.fuse.search(this.searchPhrase.trim())
			
		}
  },
  created() {
		this.$bus.on('showme', this.showPane);

  },
  mounted() {
	this.loadBooks();
	window.pages.synth = window.speechSynthesis;
	this.populateVoices(); 
	if (speechSynthesis.onvoiceschanged !== undefined) {
	speechSynthesis.onvoiceschanged = this.populateVoices;
	}
	
	window.pages.Fuse = Fuse;
	
  }
}
</script>
