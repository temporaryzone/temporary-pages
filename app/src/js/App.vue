

<template>
	<div id="grid">
		<header>
			<div class="full">
				<svg id="tmp_zone_img" class="block" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
					<title>Temporary <br> Pages</title>
					<rect class="cls-1" width="80" height="80" />
					<rect class="cls-2" x="13.19" y="32" width="76" height="16" transform="translate(94.89 -8.07) rotate(94.27)" />
					<rect class="cls-2" x="32" y="32" width="76" height="16" transform="translate(110 -30) rotate(90)" />
					<rect class="cls-2" x="-6.06" y="32" width="76" height="16" transform="translate(76.45 14.74) rotate(99.03)" />
					<rect class="cls-2" x="-28" y="32" width="76" height="16" transform="translate(50 30) rotate(90)" />
				</svg>
			</div>
			<div class="col1">
				<h1>TEMPORARY<br>PAGES</h1>
			</div>
			<!-- <div class="col2">
				<h2 id="claim">Nezávislá komunitní knihovna zaměřující se na teorii designu, <span style="font-size: 0.6em; display:inline-block;">🎨</span> a digitálních médií.</h2>
			</div> -->
		</header>
		<div id="infomark" v-on:click="showInfo = true">
			?
		</div>
		<transition name="blur">
			<div id="info" v-on:click="showInfo = false" v-if="showInfo">
				<div class="half">
					<p>Temporary Pages je nezávislá komunitní knihovna zaměřující se primárně na teorii designu, umění, média a politiku.</p>
					<p>Z ročního členského poplatku 300Kč se výhradně dokupují knihy. O výběru knih hlasují členové.</p>
					<p>Knihy uloženy k zapujčení v Brně na Kraví hoře.</p>
					<p>Pro informace o členství, informování o chybách a další dotazy pište na <br><a href="mailto:mail@temporary.zone">mail@temporary.zone</a></p>
				</div>
				<div class="half">
					<p>For english info feel free to email us <a href="mailto:mail@temporary.zone">mail@temporary.zone</a></p>
				</div>
				<div class="bottom">Verze 0.12 / <a href="https://github.com/temporaryzone/temporary-pages">Source-code</a> / <a href="https://github.com/temporaryzone/temporary-pages/blob/master/TODO.md">Roadmap + issues</a></div>
			</div>
		</transition>
		<nav>
			
		</nav>
		<transition-group name="blur" tag="div" class="books" appear>
			<BookBox v-for="book in result"  v-bind:key="book.id" :book="book" :options="options.voice"></BookBox>
		</transition-group>
		<transition name="blur">
		<div id="bookPane" :class="{ shown: showBookPane }" v-if="showBookPane" v-on:click="showBookPane = false">
			
			<div class="img" >
			<img v-lazy="paneBook.thumbnail_big"  alt="">
			</div>
			
			<div class="info" v-if="paneBook">
				<div class="infowrap">
					<h2>{{ paneBook.title }}</h2>
					<p v-if="paneBook.authors">Autor: <span v-for="author in JSON.parse(paneBook.authors)">{{author}} /</span></p>
					<p>Identifikátor: {{ paneBook._id }}</p>
					<p v-if="paneBook.owner">Původ: {{ paneBook.owner }}</p>
					<p v-if="paneBook.language">Jazyk: {{ paneBook.language }}</p>
					<p v-if="paneBook.isbn">Isbn: {{ paneBook.isbn }}</p>
					<p v-if="paneBook.pages">Počet stran: {{ paneBook.pages }}</p>
					<p v-if="paneBook.description">Description: {{ paneBook.description }}</p>
				</div>
			</div>
		
		</div>
		</transition>
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
	  showBookPane: false,
	  showInfo: false,
	  paneBook: null, 
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
    		this.result = this.booksWithCovers;
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
	showMe(book) {
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
		// this.$bus.on('doSearch', this.changePhrase);

	this.$bus.on('showme', this.showMe);

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
