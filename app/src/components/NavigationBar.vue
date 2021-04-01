<template>
    <v-card class="overflow-hidden">
        <v-app-bar
            fixed
            dark
            color="rgba(39,39,39,.95)"
            app
            extensionHeight="48px"
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
                    depressed
                    icon
                >
                    <v-icon>mdi-account-circle</v-icon>
                    Profil
                </v-btn>
            </div>

            <div v-else>
                <v-btn 
                    depressed
                    text
                    mr-2
                    to="/login"
                >
                    <v-icon>mdi-account</v-icon>
                    Log Ind
                </v-btn>
                    <v-btn 
                    depressed
                    text
                    mr-2
                    to="/register"
                >
                    <v-icon>mdi-account</v-icon>
                    Register
                </v-btn>
            </div>

            <v-btn
                depressed
                icon
                mr-2
                to="/cart"
            >
                <v-icon>mdi-cart</v-icon>
            </v-btn>
            
            <!-- Synes ærligt denne del skulle fjernes :/
            <template v-slot:extension>
                <v-btn
                    depressed
                    text
                >
                    Knap 1
                </v-btn>
                
                <v-btn
                    depressed
                    text
                >
                    Knap 1
                </v-btn>
                
                <v-btn
                    depressed
                    text
                >
                    Knap 1
                </v-btn>
            </template> 
            -->
        </v-app-bar>
    </v-card>

</template>

<script>
export default {
    data: () => ({
		isLoggedIn: false,
		search: ""
	}),
    mounted: function() {
        if(!this.$cookies.get('jwt')){
            this.isLoggedIn = false;
        }
    }
}
</script>

<style scoped>
	.v-app-bar {
		border-radius: 0 !important;
	}

	.logo {
		margin-right: 20px;
	}

	.searchBar {
		max-width: 600px;
	}

    /deep/ div.v-toolbar__extension {
        background-color: rgba(255,255,255,.05);
    }
</style>