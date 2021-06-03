<template>

		<div>
				<UserLogin
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import UserLogin from '@/components/User/UserLogin.vue'


export default {
	components: {
		UserLogin
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>