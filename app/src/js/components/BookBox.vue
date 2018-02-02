
<template>
  <div class="bookbox">

	<h3 class="title">
		book
	<!-- {{ book.thumbnail_big }} -   -->
	<!-- {{ book.title }} -->
	</h3>
	<!-- <img :src="'/static/images/scans/' +  book._id + '.jpeg'" alt=""> -->

	<img v-lazy="book.thumbnail_big" alt="">
	  <!-- <img src="" alt=""> -->
  </div>
</template>

<script>
export default {
	name: "bookbox",
	props: ["book"]
};
</script>
