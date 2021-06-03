<template>

		<div>
				<UserDashBoard
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import UserDashBoard from '@/components/User/UserDashBoard.vue'


export default {
	components: {
		UserDashBoard
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>