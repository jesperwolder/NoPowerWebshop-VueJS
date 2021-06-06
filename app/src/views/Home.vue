<template>
	<div>
		<HomePage
			class="mx-auto mw"
		/>
	</div>
</template>

<script>
import HomePage from '@/components/HomePages/HomePage.vue'


export default {
	components: {
		HomePage
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>