<template>
    <v-footer
        padless
        app
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
                    v-for="link in links"
                    :key="link"
                    text
                    class="my-2"
                >
                    {{ link }}
                </v-btn>
            </v-card-text>

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
            'Om Os',
            'Kontakt Os',
            'Returret'
        ]
    })
}
</script>

<style>

</style>