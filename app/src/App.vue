<template>
	<v-app>
		<AppDrawer v-if="!this.hideDrawer" />
		<NavBar />
		<v-main class="pt-5 mb-0">
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
		document.title = this.$route.name + " - NoPower"; // ? Updates the page title, on mouting.


		/*  
		 ? Checks if cookie exists with theme preference, on mounting.
		 ? Sets perfered theme.
		 */
		if(this.$cookies.get('themeDark') != null) {
			this.$vuetify.theme.dark = (this.$cookies.get('themeDark') === 'true' ? true : false);
		} else {
			this.$vuetify.theme.dark = false;
		}
	},

	watch: {
		$route (to, from) {
			document.title = to.name + " - NoPower" || 'NoPower'; // ? Updates the page title, on rerouting.

			/*
			 ?  Checks if 'themeDark' has been changed, bewteen rerouting of pages.
			 ? 	Sets the theme to dark/light mode, by reading the cookie. 
			 */
			if(this.$cookies.get('themeDark') != null) {
				this.$vuetify.theme.dark = (this.$cookies.get('themeDark') === 'true' ? true : false);
			} else {
				this.$vuetify.theme.dark = false;
			}
		}
	}
};
</script>
