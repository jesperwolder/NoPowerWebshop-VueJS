<template>
<!-- //-- ------ Our 403 page that denies acces this is a redirceret site  -------------  --> 
    <div>
        <v-card class="text-center mx-auto mw">
            <div class="pt-10 text-h2 text-center">
                ༼ つ ಥ_ಥ ༽つ
            </div>
            <v-card-subtitle class="text-subtitle-1">
                Hov, du skulle vidst ikke have fundet denne side, eftersom du ikke har rettigheder til at besøge den side.<br>
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
                Fejlkode: 403 - Permission Denied
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