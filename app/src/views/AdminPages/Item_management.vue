<template>
    
       	<div
           v-if="CS.isLoggedIn" 
           >
            <v-card
                class="pa-5 ma-0"
                elevation="3"
                 v-if="CS.isAdmin" 
                 
            >
                <v-form class="col-12 pa-0"> 
                    <h1>{{ meta.title }}</h1>
                    <v-divider class="pb-3 mt-3"></v-divider>
                   
                    <v-btn class="buttons" depressed text mr-2 to="/profile">
                        <v-icon left>mdi-account</v-icon>
                        Profile
                        </v-btn>
                        <h1>item stuff</h1>
                   
                </v-form>
            </v-card>
        </div>



</template>
<script>

import { CurrentSession } from '@/Services/GlobalVariables';
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