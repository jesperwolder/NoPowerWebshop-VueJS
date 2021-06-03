<template>

		<div>
				<ContactUsPage
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import ContactUsPage from '@/components/HomePages/ContactUsPage.vue'


export default {
	components: {
		ContactUsPage
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>