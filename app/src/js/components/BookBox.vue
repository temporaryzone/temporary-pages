
<template>
  <div class="bookbox" v-on:mouseover="tellme(book.title)" @click="showme(book)">
	<img v-if="book.thumbnail_big !== false" v-bind:src="book.thumbnail_big " alt="">
	<div v-else class="empty">{{ book.title }}</div> 
  </div>
</template>

<script>
export default {
	name: "bookbox",
	props: ["book", "options"],
	methods: {
		tellme: function (title) {
			if(!this.options.mute) {
			window.pages.synth.cancel();
			var text = new SpeechSynthesisUtterance(title);
			var hlas = this.options.voice;
			text.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == hlas; })[0];;
			window.pages.synth.speak(text);
			}
		},
		showme: function(book) {
			this.$bus.emit('showme', book);
		}
	}
};
</script>
