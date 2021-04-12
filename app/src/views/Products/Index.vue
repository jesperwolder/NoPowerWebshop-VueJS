<template>
    <div>
        <v-card
            class="pa-5 ma-0"
            elevation="2"
        >
            <h1>{{ meta.title }}</h1>

            <v-divider class="pb-3 mt-3"></v-divider>

            <v-row>
                <v-col
                    v-for="n in 20"
                    :key="n"
                    cols="auto"
                    xs="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="2"
                    class="px-2 my-0 productCols"
                >
                    <v-card
                        height="100%"
                        class="pb-0 mb-0 productCard"
                        outlined
                    >
                        <div style="position:relative;">
                            <v-btn
                                elevation="2"
                                fab
                                absolute
                                right
                                small
                                bottom
                            >
                                <v-icon>mdi-heart-outline</v-icon>
                            </v-btn>
                            <v-img
                                height="20rem"
                                :src="`http://placeimg.com/${ getRandomInt(250, 600) }/${ getRandomInt(250, 600) }/tech`"
                                contain
                                class="productImage"
                            ></v-img>
                        </div>

                        <v-card-title
                            class="productTitle text-truncate"
                        >
                            {{ n }}: Produkt
                        </v-card-title>
                        <v-card-subtitle class="pb-0 text-caption text-truncate truncate-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quam laudantium consectetur aliquid maxime! Dignissimos dolor minima officiis possimus deleniti consectetur aut sed sequi deserunt perspiciatis, commodi necessitatibus ipsum in.
                        </v-card-subtitle>
                        <v-card-subtitle class="pt-2">
                            Kun <b>200</b>,- 
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-btn
                                color="#F7941D"
                                class="mb-0"
                                text
                            >
                                Til produkt
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>

export default {
    
    methods: {
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
    },
    data() {
        return {
            meta: this.$route.meta,
        }
    }
}
</script>

<style scoped>
    .productImage {
        background-color: #212121;
    }

    .productCols {
        flex-basis: 32em;
        flex-grow: .2;
    }

    .productCard {
        border-bottom: 3px solid rgba(0,0,0,.2)
    }

    .productTitle {
        display: block;
    }

    .truncate-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: unset !important;
        display: -webkit-box;
    }
</style>