
<template>
  <div class="bookbox" v-if="book.thumbnail_big !== false" v-on:mouseover="tellme(book.title)" @click="showme(book)">
	<img src="{{ book.thumbnail_big }}" alt="">
  </div>
</template>

<script>
export default {
	name: "bookbox",
	props: ["book", "options"],
	methods: {
		tellme: function (title) {
			if(window.pages.vm.opt)
			window.pages.synth.cancel();
			var text = new SpeechSynthesisUtterance(title);
			var hlas = this.options.voice;
			text.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == hlas; })[0];;
			window.pages.synth.speak(text);
		},
		showme: function(book) {
			this.$bus.emit('showme', book);
		}
	}
};
</script>
