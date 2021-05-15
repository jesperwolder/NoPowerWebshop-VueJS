<template>
    <v-footer
        padless
        tile
        app
        absolute
        inset
        class="mt-0 pt-0"
    >
        <v-card
            flat
            tile
            class="text-center"
            width="100%"
            color="transparent"
        >
            <v-card-text>
                <v-btn
                    v-for="(link, index) in links"
                    :key="index"
                    text
                    class="my-2"
                    :to="link.to"
                >
                    {{ link.name }}
                </v-btn>
            </v-card-text>

            <v-divider></v-divider>

            <v-switch
                style="display:flex;justify-content:center;"
                v-model="$vuetify.theme.dark"
                v-on:click="setTheme()"
                label="Mørk tema"
            >
            </v-switch>

            <v-divider></v-divider>
            <v-card-text>
                © {{ new Date().getFullYear() }} — <strong>NoPower</strong>
            </v-card-text>
        </v-card>
        

    </v-footer>
</template>

<script>


export default {
        
    data: () => ({
        links: [
            {name: 'Om Os', to:'/AboutUs'},
            {name: 'Kontakt Os', to:'/ContactUs'},
            {name: 'Returret', to:'/ReturRet'}
        ],
    }),
    methods: {
        setTheme() {
            /*
             ?  Updates theme, and cookie, when the switch button, has been pressed.  
             */

            this.$cookies.set('themeDark', this.$vuetify.theme.dark, 2592000);
            
            console.log("DarkMode: " + (this.$vuetify.theme.dark ? 'On' : 'Off'));

        }
    }
}
</script>