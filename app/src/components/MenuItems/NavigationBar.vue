<template>
	<v-card class="overflow-hidden">
		<v-btn
			fab
			app
			fixed
			right
			bottom
			color="#F7941D"
			v-on:click="scrollToTop()"
			class="toTopBtn"
			v-scroll="onScroll"
		>
			<v-icon>mdi-chevron-up</v-icon>
		</v-btn>

		<v-app-bar fixed dark app clipped-left>
			<RouterLink to="/" class="logo">
				<v-img
					src="@/assets/images/NoPowerLogo.svg"
					max-height="40"
					max-width="100"
					contain
				></v-img>
			</RouterLink>

			<v-toolbar-title> </v-toolbar-title>

			<v-spacer></v-spacer>

			<!-- <v-container class="searchBar"
								fill-height fluid
								align="center"
								justify="center"
						>
								<v-text-field
										
										
										dense
										v-model="search"
										solo
										label="Søg ..."
										type="search"
								></v-text-field>
						</v-container>

						<v-spacer></v-spacer> -->
			<div v-if="CS.isLoggedIn">
				<div v-if="CS.isAdmin">
					<v-btn class="buttons" depressed text mr-2 to="/adminpage">
						<v-icon left>mdi-account</v-icon>
						Admin page
					</v-btn>
				</div>
			</div>
			<div v-if="CS.isLoggedIn">
				<v-btn class="buttons" depressed text mr-2 to="/dashboard">
					<v-icon left>mdi-account</v-icon>
					dashboard
				</v-btn>
			</div>

			<div v-if="CS.isLoggedIn">
				<v-btn depressed text v-on:click.prevent="logout()">
					<v-icon left>mdi-logout</v-icon>
					Logout
				</v-btn>
			</div>

			<div v-else>
				<v-btn class="buttons" depressed text mr-2 to="/login">
					<v-icon left>mdi-account</v-icon>
					Log Ind
				</v-btn>
				<v-btn class="buttons" depressed text mr-2 to="/register">
					<v-icon left>mdi-account</v-icon>
					Register
				</v-btn>
			</div>

			<v-badge content="5" color="#F7941D" overlap>
				<v-btn class="buttons" depressed text pl-12 to="/cart">
					<v-icon left>mdi-cart</v-icon>
					Kurv
				</v-btn>
			</v-badge>
		</v-app-bar>
	</v-card>
</template>

<script>
import { AuthBody } from '@/Services/AuthApi';
import { CurrentSession } from '@/Services/GlobalVariables';

export default {
	data: () => ({
		search: "",
		offsetTop: 0,
		CS: CurrentSession
	}),
	mounted: function() {
		if(this.$cookies.isKey('jwt')) {
			AuthBody( this.$cookies.get('jwt') )
				.then(res => {
					if(res.message === 'success') { console.log('du lort'); }

					if(res.authorized) CurrentSession.isLoggedIn = true;

					if(res.isAdmin) CurrentSession.isAdmin = true;
				}).catch(err => {
					console.log(err);
				});
		}
	},
	methods: {
		logout: function() {
			CurrentSession.isLoggedIn = false;
			CurrentSession.isAdmin = false;
			this.$cookies.remove("jwt");
			this.$router.push("/");
		},
		scrollToTop() {
			window.scrollTo(0, 0);
		},
		onScroll() {
			let scrollTop =
				window.pageYOffset ||
				(document.documentElement || document.body.parentNode || document.body)
					.scrollTop;
			this.offsetTop = scrollTop;

			if (scrollTop < 100) {
				document.querySelector(".toTopBtn").classList.add("off");
			} else {
				document.querySelector(".toTopBtn").classList.remove("off");
			}
		},
	}
};
</script>

<style scoped>
.v-app-bar {
	border-radius: 0 !important;
	z-index: 9999999;
}

.buttons {
	margin-right: 4px;
}

.button:last-child {
	margin-right: 0;
}

.logo {
	margin-right: 20px;
}

.searchBar {
	max-width: 600px;
}

.toTopBtn {
	z-index: 9999 !important;
}

.toTopBtn.off {
	opacity: 0;
	pointer-events: none;
}
</style>
