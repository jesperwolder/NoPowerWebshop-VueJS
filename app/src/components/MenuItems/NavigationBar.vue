<template>
    <v-card class="overflow-hidden">
        <v-app-bar
            fixed
            app
            clipped-left
        >

            <RouterLink to="/" class="logo">
                <v-img
                    src="@/assets/images/NoPowerLogo.svg"
                    max-height="40"
                    max-width="100"
                    contain
                ></v-img>
            </RouterLink>
            
            <v-toolbar-title>
               
            </v-toolbar-title>

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

            <div v-if="this.isLoggedIn">
                <v-btn
                    class="buttons"
                    depressed
                    text
                >
                    <v-icon left>mdi-account</v-icon>
                    dashboard
                </v-btn>
            </div>
            
            <div v-if="this.isLoggedIn">
                <v-btn
                    depressed
                    text
                    v-on:click.prevent="logout()"
                >
                    <v-icon left>mdi-logout</v-icon>
                    Logout
                </v-btn>
            
            </div>

            <div v-else>
                <v-btn 
                    class="buttons"
                    depressed
                    text
                    mr-2
                    to="/login"
                >
                    <v-icon left>mdi-account</v-icon>
                    Log Ind
                </v-btn>
                <v-btn 
                    class="buttons"
                    depressed
                    text
                    mr-2
                    to="/register"
                >
                    <v-icon left>mdi-account</v-icon>
                    Register
                </v-btn>
            </div>

            <v-btn
                class="buttons"
                depressed
                text
                pl-12
                to="/cart"
            >
                <v-icon left>mdi-cart</v-icon>
                Kurv
            </v-btn>
        </v-app-bar>
    </v-card>

</template>

<script>
export default {
    data: () => ({
		isLoggedIn: true,
		search: ""
	}),
    mounted: function() {
        if(!this.$cookies.get('jwt')){
            this.isLoggedIn = false;
        }
    },
    methods: {
        //virker ikke helt endnu
            logout: function() {
                isLoggedIn.logout();
                this.router.push('/');
            }
        }
}
</script>

<style scoped>
	.v-app-bar {
		border-radius: 0 !important;
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
</style>