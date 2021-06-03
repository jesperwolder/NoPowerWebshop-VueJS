<template>

		<div>
				<AboutUsPage
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import AboutUsPage from '@/components/HomePages/AboutUsPage.vue'


export default {
	components: {
		AboutUsPage
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>