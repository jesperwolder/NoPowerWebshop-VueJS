<template>
    <!----------------- Dashboard for the user checks if the user is logged in ------------------> 
            <v-card
                class="pa-5 ma-0"
                elevation="2"
                v-if="CS.isLoggedIn"
            >
                <v-form class="col-12 pa-0"> 
                    <h1 class="font-weight-regular">{{ meta.title }}</h1>
                    <v-divider class="pb-3 mt-3"></v-divider>
                   
                    <v-btn class="buttons" depressed text mr-2 to="/profile">
                        <v-icon left>mdi-account</v-icon>
                        Profil
                        </v-btn>

                        <v-btn class="buttons" depressed text mr-2 to="/order/history">
                        <v-icon left>mdi-cart-check</v-icon>
                        Købshistorik
                        </v-btn>

                        <v-btn class="buttons" depressed text mr-2 to="/ContactUs">
                        <v-icon left>mdi-face-agent</v-icon>
                        Få support
                        </v-btn>

                    
                </v-form>
            </v-card>
        
        
    
</template>
<script>

import { CurrentSession } from '@/Services/GlobalVariables';
//<!----------------- Checks the session (isloggedin)------------------> 
export default {
	data() {
        return {
            loading: false,
            error: null,
            meta: this.$route.meta,
            CS: CurrentSession
        }
    },
    
}
</script>
