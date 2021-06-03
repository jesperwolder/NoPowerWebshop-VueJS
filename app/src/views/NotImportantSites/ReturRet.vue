<template>

		<div>
				<ReturnPage
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import ReturnPage from '@/components/HomePages/ReturnPage.vue'


export default {
	components: {
		ReturnPage
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>