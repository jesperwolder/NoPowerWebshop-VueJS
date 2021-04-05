<template>
	<v-app>
		<AppDrawer v-if="!this.hideDrawer" />
		<NavBar />
		<v-main class="pt-5">
			<v-container
				color="transparent"
				class="mainContainer"
				fluid
			>
				<Breadcrumb v-if="!this.hideBreadcrumb" />
				<router-view />
			</v-container>
		</v-main>
		<Footer />
	</v-app>
</template>

<style scoped>
	#mainWrapper {
		box-sizing: border-box;
	}
</style>

<script>
import NavBar from '@/components/MenuItems/NavigationBar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/MenuItems/Footer';
import AppDrawer from '@/components/MenuItems/AppDrawer';

export default {
	name: 'App',

	components: {
		NavBar,
		Breadcrumb,
		Footer,
		AppDrawer,
	},

	data: () => ({
		hideDrawer: false,
		hideBreadcrumb: false,
	}),

	mounted() {
		document.title = this.$route.name + " - NoPower";
	},

	watch: {
		$route (to, from) {
			document.title = to.name + " - NoPower" || 'NoPower'
		}
	}
};
</script>
