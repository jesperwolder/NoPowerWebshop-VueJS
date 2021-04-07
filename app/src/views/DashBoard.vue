<template>
    <v-container>
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                class="pa-5"
                elevation="3"
            >
                <v-form class="col-12 pa-0"> 
                    <h2 class="text-center">DashBoard </h2>
                    
                   
                  <v-btn class="buttons" depressed text mr-2 to="/profile">
                    <v-icon left>mdi-account</v-icon>
                    Profile
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2 to="/OrderHistory">
                    <v-icon left>mdi-account</v-icon>
                    Købshistorik
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2 to="/Support">
                    <v-icon left>mdi-account</v-icon>
                    support
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2 to="/Support">
                    <v-icon left>mdi-account</v-icon>
                    placeholder
                    </v-btn>
                </v-form>
            </v-card>
        </div>
        
    </v-container>
</template>
<script>


export default {
	data() {
        return {
            loading: false,
            error: null,
          
        }
    },
}
</script>
