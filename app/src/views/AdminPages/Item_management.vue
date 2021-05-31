<template>

		<div>
				<ItemManagementAdmin
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import ItemManagementAdmin from '@/components/Admin/ItemManagementAdmin.vue'


export default {
	components: {
		ItemManagementAdmin
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>