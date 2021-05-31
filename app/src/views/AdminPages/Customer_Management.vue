<template>

		<div>
				<CustomerManagementAdmin
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import CustomerManagementAdmin from '@/components/Admin/CustomerManagementAdmin.vue'


export default {
	components: {
		CustomerManagementAdmin
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>