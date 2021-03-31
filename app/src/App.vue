<template>
	<v-app>
		<NavBar />
		<div id="mainWrapper">
			<v-sheet
				color="white"
				elevation=1
				class="mainContainer"
			>
				<router-view />
			</v-sheet>
		</div>
	</v-app>
</template>

<style scoped>
	#mainWrapper {
		padding: 0 20px;

		box-sizing: border-box;
	}
</style>

<script>
import navbar from '@/components/navbar.vue';


import NavBar from '@/components/NavBar';

export default {
	name: 'App',

	components: {
		NavBar
	},

	data: () => ({

	}),
};
</script>
