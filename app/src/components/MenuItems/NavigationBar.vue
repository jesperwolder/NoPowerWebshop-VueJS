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
			class="toTopBtn off"
			v-scroll="onScroll"
		>
			<v-icon>mdi-chevron-up</v-icon>
		</v-btn>
		<!-- --------------------------- Logo--------------------------------- -->
		<v-app-bar fixed dark app clipped-left>
			
				<v-app-bar-nav-icon
					v-on:click="ToggleAppDrawer()"
				>
				</v-app-bar-nav-icon>

				<RouterLink to="/" class="logo">
					<v-img
						src="@/assets/images/NoPowerLogo.png"
						max-height="40"
						max-width="100"
						contain
					></v-img>
				</RouterLink>

				<v-spacer></v-spacer>
	<!-- --------------------------- Checks if user is logged in and admin then it shows a new buttom in navigation bar--------------------------------- -->
				<div v-if="CS.isLoggedIn">
					<div v-if="CS.isAdmin">
						<v-btn class="buttons" depressed text mr-2 to="/adminpage">
							<v-icon left>mdi-account-lock</v-icon>
							Administrator
						</v-btn>
					</div>
				</div>
	<!-- --------------------------- Checks if user is logged in, shows dashboard--------------------------------- -->
				<div v-if="CS.isLoggedIn">
					<v-btn class="buttons" depressed text mr-2 to="/dashboard">
						<v-icon left>mdi-account</v-icon>
						Min side
					</v-btn>
				</div>
	<!-- --------------------------- Checks if user is logged in, then logs out user by logout method and deletes the jwt--------------------------------- -->
				<div v-if="CS.isLoggedIn">
					<v-btn depressed text v-on:click.prevent="logout()">
						<v-icon left>mdi-logout</v-icon>
						Log ud
					</v-btn>
				</div>
	<!-- --------------------------- Hvis ingen er logged in giver den muligheden for det--------------------------------- -->
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

				<v-menu 
					v-if="$globalData.CartCount > 0"
					offset-y 
					class="pa-0"
					:close-on-content-click="false"
					transition="slide-y-transition"
				>
	<!-- --------------------------- Vores kurv--------------------------------- -->
					<template v-slot:activator="{ on, attrs }">
						<v-badge :content="$globalData.CartCount" color="#F7941D" overlap bordered offset-x="2em">
							<v-btn 
								class="buttons" 
								depressed 
								text 
								v-bind="attrs"
								v-on="on"
							>
								<v-icon left>mdi-cart</v-icon>
								Kurv
							</v-btn>
						</v-badge>
					</template>
					<v-card
						class="ma-0"
						style="min-width: 300px;max-width: 600px;"
					>
						<v-card-title class="font-weight-regular">Indkøbskurv</v-card-title>
						<v-card-text>
							<div v-if="$globalData.CartCount < 0" class="pt-5 text-center">
								<div class="text-h3">ಠ▃ಠ</div><br>
								<h3 class="font-weight-light">Ingen produkter i kurven</h3>
							</div>

							<div
								v-for="( item, index ) in $globalData.Cart"
								:key="index"
							>
								<v-row no-gutters>
									<v-col cols="3">
										<v-img contain avatar :aspect-ratio="1/1" :src="item.Thumbnail"></v-img>
									</v-col>
									<v-col cols="9" class="px-3">
										<h3 class="text-body-1">{{ item.Name }}</h3>
										<div class="text-caption">{{ item.Quantity }} stk</div>
										<div class="text-button">{{ item.Price * item.Quantity }} kr</div>
									</v-col>
								</v-row>

								<v-divider class="mb-5"></v-divider>
							</div>

							<div>
								Samlet beløb <span class="font-weight-bold">{{ $globalData.CartTotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> kr
							</div>
						</v-card-text>
						<v-card-actions>
							<v-btn
								block
								color="#F7941D"
								to="/cart"
								class="cartButton"
							>
								Til indkøbskurven
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu>
			
		</v-app-bar>
	</v-card>
</template>

<script>
//-- --------------------------- Uses Authbody to check jwt for user in navigationbar in current-session--------------------------------- -->
import { AuthBody } from '@/Services/AuthApi';
import { CurrentSession } from '@/Services/GlobalVariables';

export default {
	data: () => ({
		search: "",
		offsetTop: 0,
		CS: CurrentSession,
	}),
	//-- ------ We use mounted function to checks the current session for the jwt for user islogged in and isAdmin if not admin it deninies the user the admin page------------- 
	mounted: function() {
		if(this.$cookies.isKey('jwt')) {
			AuthBody( this.$cookies.get('jwt') )
			.then(res => {
				CurrentSession.isLoggedIn = res.Authorized;
				CurrentSession.isAdmin = res.isAdmin;

				if( CurrentSession.RequireAdmin ) {
					if( !CurrentSession.isAdmin ) {
						CurrentSession.PermissionDenied = true;
					}
				}
			}).catch(err => {
				CurrentSession.isLoggedIn = false;
				CurrentSession.RequireAdmin = false;
			});
		}
	},
	methods: {
		ToggleAppDrawer: function() {
			console.log(this.$globalData.AppDrawer)
			this.$globalData.AppDrawer = !this.$globalData.AppDrawer;
		},
		//-- ------ Logout function removes the jwt and pushes you to the home page and sets everything to false------------- 
		logout: function() {
			CurrentSession.isLoggedIn = false;
			CurrentSession.isAdmin = false;
			this.$cookies.remove("jwt");
			this.$router.push("/");
		},
		//-- ------ Our scroll function ------------- 
		scrollToTop() {
			window.scrollTo(0, 0);
		},
		onScroll() {
			let scrollTop =
				window.pageYOffset ||
				(document.documentElement || document.body.parentNode || document.body).scrollTop;

			this.offsetTop = scrollTop;

			if (scrollTop < 100) {
				document.querySelector(".toTopBtn").classList.add("off");
			} else {
				document.querySelector(".toTopBtn").classList.remove("off");
			}
		},
	},
	watch: {
		$route() {
			CurrentSession.PageFound = true;
		}
	},
};
</script>


<style scoped>
/* Style components for navbar for buttom placement and scroll */
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

.cartButton.v-btn--active:before {
	background-color: #F7941D !important;
}
</style>
