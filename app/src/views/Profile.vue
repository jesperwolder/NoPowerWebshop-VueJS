<template>

		<div>
				<UserProfile
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import UserProfile from '@/components/User/UserProfile.vue'


export default {
	components: {
		UserProfile
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>