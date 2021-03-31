<template>
    <v-card class="overflow-hidden">
        <v-app-bar
            fixed
            dark
            color="rgba(39,39,39,.95)"
            app
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
                Dynamisk Titel
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
                </v-btn>
            </div>

            <v-btn v-else
                depressed
                text
                mr-2
            >
                Log Ind
            </v-btn>

            <v-btn
                depressed
                icon
                mr-2
            >
                <v-icon>mdi-cart</v-icon>
            </v-btn>

            <template v-slot:extension>
                <v-tabs>
                    <v-tab>Tab 1</v-tab>
                    <v-tab>Tab 2</v-tab>
                    <v-tab>Tab 3</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
    </v-card>

</template>

<script>
export default {
    data: () => ({
		isLoggedIn: false,
		search: ""
	}),
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
</style>