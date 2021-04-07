<template>
    <div>
        <v-card
            block
            class="pa-5 mb-0"
        >
            <v-card-title class="px-0 pt-0">
                Testing
            </v-card-title>

            <v-row no-gutters>
                <v-col
                    v-for="n in 20"
                    :key="n"
                    cols="12"
                    sm="3"
                    class="px-2"
                >
                    <v-card
                        color="primary"
                    >
                        <v-img
                            height="200"
                            src="http://placekitten.com/300"
                        ></v-img>
                        <v-card-title>
                            title
                        </v-card-title>
                        <v-card-subtitle>
                            subtitle
                        </v-card-subtitle>
                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non cupiditate nihil ipsam distinctio sint aspernatur iure nisi vel, odio, adipisci, voluptas voluptatibus atque molestias minima repellat nam nobis fuga magnam!
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>