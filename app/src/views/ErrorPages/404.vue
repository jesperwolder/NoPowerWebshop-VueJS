<template>
<!-- //-- ------ Our 404 page that redirceret the site if it does not exist  -------------  --> 
    <div>
        <v-card class="text-center mx-auto mw">
            <div class="pt-5 text-h2 text-center">
                ¯\_(ツ)_/¯
            </div>
            <v-card-subtitle class="text-subtitle-1">
                Det ser ud til du har fundet en side, som endnu ikke findes hos NoPower. <br>
                <v-btn 
                    to="/"
                    color="primary"
                    outlined
                    class="mt-6"
                >
                    Start forfra
                </v-btn>
            </v-card-subtitle>
            <v-card-subtitle class="text-subtitle-2">
                Fejlkode: 404 - Not Found
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>