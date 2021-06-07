<template>
    <v-container class="d-flex text-center" fill-height fluid>
        <v-card flat color="transparent" class="mx-auto align-center">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
            <h2 class="font-weight-regular">
                Logger ud...
            </h2>
        </v-card>
        
    </v-container>
</template>

<script>
import { CurrentSession } from '@/Services/GlobalVariables';

export default {
    mounted: function() {
        CurrentSession.isLoggedIn = false;
        CurrentSession.isAdmin = false;
        this.$cookies.remove("jwt");
        this.$router.push("/");

    }
}
</script>

<style>

</style>