<template>

		<div>
				<UserRegister
                class="mx-auto mw"
                />
		</div>
	
</template>

<script>
import UserRegister from '@/components/User/UserRegister.vue'


export default {
	components: {
		UserRegister
	},
	data() {
		return {
			meta: this.$route.meta,
			TotalPrice: 0,
		}
	},
}
</script>