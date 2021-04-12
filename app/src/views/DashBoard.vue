<template>
    
        
            <v-card
                class="pa-5 ma-0"
                elevation="2"
            >
                <v-form class="col-12 pa-0"> 
                    <h1>{{ meta.title }}</h1>
                    <v-divider class="pb-3 mt-3"></v-divider>
                   
                    <v-btn class="buttons" depressed text mr-2 to="/profile">
                        <v-icon left>mdi-account</v-icon>
                        Profile
                        </v-btn>

                        <v-btn class="buttons" depressed text mr-2 to="/OrderHistory">
                        <v-icon left>mdi-cart-check</v-icon>
                        Købshistorik
                        </v-btn>

                        <v-btn class="buttons" depressed text mr-2 to="/Support">
                        <v-icon left>mdi-face-agent</v-icon>
                        support
                        </v-btn>

                        <v-btn class="buttons" depressed text mr-2 to="/Support">
                        <v-icon left>mdi-account</v-icon>
                        placeholder
                        </v-btn>
                </v-form>
            </v-card>
        
        
    
</template>
<script>


export default {
	data() {
        return {
            loading: false,
            error: null,
            meta: this.$route.meta,
        }
    },
}
</script>
