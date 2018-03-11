
<template>
	<aside id="sidebar">
		<div class="sticker">

			<div id="voicemenu">
				<!-- {{ options.voice }} -->
				<input type="checkbox" id="checkbox" v-model="options.voice.mute">
				<label for="checkbox">Mute {{ options.voice.mute }}</label>
				<!-- <select v-model="options.voice.voice">
					  <option v-for="option in options.voice.voicesList" v-bind:value="option">
						{{ option }}
					</option>
				</select> -->
			</div>
			<div id="searchbox">
				<!-- https://jsfiddle.net/chrisvfritz/1oqjojjx/?utm_source=website&utm_medium=embed&utm_campaign=1oqjojjx + https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events -->
				<input type="text" name="search" id="search" ref="searchInput" v-bind:value="value" v-on:input="updateValue($event.target.value)" placeholder="SEARCH">
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
		updateValue(value) {
			this.$emit('input', value);
		}
	},

};
</script>
