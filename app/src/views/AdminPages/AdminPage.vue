<template>
<!-- Check if the user isAdmin -->
    <v-container v-if="CS.isAdmin" class="pa-0">
        <v-card
            class="pa-5 ma-0"
            elevation="2"                
        >
<!---------- Dashboard for admin controll  ---------------->
            <v-form class="col-12 pa-0"> 
                <h1>{{ meta.title }}</h1>
                <v-divider class="pb-3 mt-3"></v-divider>
                
                <v-btn class="buttons" depressed text mr-2 to="/profile">
                    <v-icon left>mdi-account</v-icon>
                    Profile
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2 to="/products">
                    <v-icon left>mdi-cart-check</v-icon>
                    Products-overview
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2 to="/item_management">
                    <v-icon left>mdi-cart-check</v-icon>
                    Item-management
                    </v-btn>

                    <v-btn class="buttons" depressed text mr-2 to="/customer_management">
                    <v-icon left>mdi-account</v-icon>
                    Custormer-management
                    </v-btn>

                        <v-btn class="buttons" depressed text mr-2 to="/*">
                    <v-icon left>mdi-face-agent</v-icon>
                    support
                    </v-btn>
            </v-form>
        </v-card>
    </v-container>
<!-- If the user is not admin and or gets demoted he will get denied -->
    <div v-else>
        <PermissionDenied />
    </div>

</template>
<script>

import { CurrentSession } from '@/Services/GlobalVariables';
import PermissionDenied from '@/views/ErrorPages/403.vue';

export default {
    components: {
        PermissionDenied
    },

	data() {
        return {
            loading: false,
            error: null,
            meta: this.$route.meta,
            CS: CurrentSession
        }
    }
}
</script>
