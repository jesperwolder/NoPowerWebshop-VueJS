<template>
	<v-app>
		<NavBar />
		<div id="mainWrapper">
			<v-sheet
				color="white"
				elevation=1
				class="mainContainer"
			>
				<Breadcrumb />
				<!-- <AppDrawer /> -->

				<router-view />
			</v-sheet>
		</div>
		<Footer />
	</v-app>
</template>

<style scoped>
	#mainWrapper {
		padding: 0 20px;

		box-sizing: border-box;
	}
</style>

<script>
import NavBar from '@/components/NavigationBar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import AppDrawer from '@/components/AppDrawer';

export default {
	name: 'App',

	components: {
		NavBar,
		Breadcrumb,
		Footer,
		AppDrawer,
	},

	data: () => ({
		
	}),
};
</script>
