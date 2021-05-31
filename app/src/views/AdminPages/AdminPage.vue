<template>

		<div>
				<Admin
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import Admin from '@/components/Admin/Admin.vue'


export default {
	components: {
		Admin
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>