<template>
    <div>
        <!-- <v-card
            block
            class="pa-5 mb-0"
        > -->
            <h1>{{ meta.title }}</h1>

            <v-row no-gutters>
                <v-col
                    v-for="n in 20"
                    :key="n"
                    cols="auto"
                    xs="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="2"
                    class="px-2 mb-5 mt-5 productCols"
                >
                    <v-card
                        height="100%"
                    >
                        <!-- <v-img
                            height="200"
                            src="http://placekitten.com/300"
                            style="filter:blur(3px);position:absolute;"
                        ></v-img> -->
                        <v-img
                            min-height="200"
                            max-height="300"
                            :src="`http://placekitten.com/${ getRandomInt(250, 600) }`"
                            contain
                            class="productImage"
                        ></v-img>
                        <v-card-title
                            class="productTitle"
                        >
                            {{ n }}: Produkt
                        </v-card-title>
                        <v-card-subtitle>
                            subtitle
                        </v-card-subtitle>
                        <v-card-text three-line>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non cupiditate nihil ipsam distinctio sint aspernatur iure nisi vel, odio, adipisci, voluptas voluptatibus atque molestias minima repellat nam nobis fuga magnam!
                            <div v-if="n == 2">
                                {{ (n == 2) }}: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum autem fuga repudiandae voluptatibus consequatur. Mollitia, quam tempora quisquam assumenda cupiditate nam officiis voluptate dolore placeat et unde sint rem maiores!
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                block
                                text
                                tile                                
                                color="primary"
                            >
                                Til produkt
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        <!-- </v-card> -->
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
        background-color: #212112;
    }

    .productCols {
        flex-basis: 32em;
        flex-grow: .2;
    }

    .productTitle {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>