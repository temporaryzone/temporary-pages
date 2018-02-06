
<template>
	<aside id="sidebar">
		<div class="sticker">
			<svg id="tmp_zone_img" class="block" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
				<title>Temporary Pages</title>
				<rect class="cls-1" width="80" height="80" />
				<rect class="cls-2" x="13.19" y="32" width="76" height="16" transform="translate(94.89 -8.07) rotate(94.27)" />
				<rect class="cls-2" x="32" y="32" width="76" height="16" transform="translate(110 -30) rotate(90)" />
				<rect class="cls-2" x="-6.06" y="32" width="76" height="16" transform="translate(76.45 14.74) rotate(99.03)" />
				<rect class="cls-2" x="-28" y="32" width="76" height="16" transform="translate(50 30) rotate(90)" />
			</svg>
			<div id="voicemenu">
				<!-- {{ options.voice }} -->
				<input type="checkbox" id="checkbox" v-model="options.voice.mute">
				<label for="checkbox">Mute {{ options.voice.mute }}</label>
				<select v-model="options.voice.voice">
					  <option v-for="option in options.voice.voicesList" v-bind:value="option">
						{{ option }}
					</option>
				</select>
			</div>
			<div id="searchbox">
				<input type="text" name="search" id="search" ref="searchInput" v-bind:value="value" placeholder="SEARCH">
			</div>
		</div>
	</aside> 
</template>

<script>
import VoiceMenu from './VoiceMenu.vue';

export default {
	props: ['value', 'options'],
	name: "sidebar",
	components: {
		'VoiceMenu': VoiceMenu
	},
	methods: {
		doSearch(lol) {
			this.$bus.emit('doSearch', lol);
			// this.$emit('zearch', lol);
		}
	},
	created() {
		this.$bus.on('doSearch', function(lol){
			// console.log('malejsearch');
			// this.$refs.searchInput.value = lol;
		});
	}

};
</script>
