
<template>
	<div id="voicemenu">
		<button @click="once()">Loled</button>
		<select >
			<option value="volvo">Volvo</option>
			<option value="saab">Saab</option>
			<option value="mercedes">Mercedes</option>
			<option value="audi">Audi</option>
		</select>
	</div>
</template>

<script>
export default {
	name: "VoiceMenu",
	methods: {
		once() {
		console.log('emmiting once');
		this.$bus.emit('once');
		this.$bus.emit('doSearch', 'Emmited search');
		
		}
	}
};
</script>
