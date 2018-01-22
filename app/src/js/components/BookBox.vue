
<template>
  <div class="bookbox">
	<div class="colorboxes">
		<template v-if="book.colors[0] && book.colors">
			<div class="colorbox" v-if="book.colors[0]" :style="'background-color:'+ book.colors[0].color +';'"></div>
			<div class="colorbox" v-if="book.colors[1]" :style="'background-color:'+ book.colors[1].color +';'"></div>
			<div class="colorbox" v-if="book.colors[2]" :style="'background-color:'+ book.colors[2].color +';'"></div>
		</template>
		<template v-else>
			<div class="colorbox" style="background-color: white;"></div>
		</template>
	</div>
	<!-- <img :src="'/static/images/covers/' +  book._id + '.jpg'" alt="" style=" width: 30%; "> -->
	 <h3 class="title">
	  {{ book._id }} - 
	  {{ book.title }}
	  </h3>
  </div>
</template>

<script>
export default {
	name: "bookbox",
	props: ["book"]
};
</script>
