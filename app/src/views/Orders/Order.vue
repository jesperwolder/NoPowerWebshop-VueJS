<template>
    <v-card
        flat
        class="mx-auto mw"
    >
        <v-card-title>Ordre #{{ $route.params.id }}</v-card-title>

        <v-card-text>
            <v-row no-gutters>
                <v-col
                    cols="6"
                    md="3"
                >
                    Billing
                </v-col>

                <v-col
                    cols="6"
                    md="3"
                >
                    Random content
                </v-col>
            </v-row>

            <v-divider class="pb-3 mt-4"></v-divider>

            <h2 class="font-weight-regular">Produkter</h2>

            <v-col cols="6">
                <v-card v-for="(product, index) in 6" :key="index" flat :class="`pb-0`+ ( index + 1 < 6 ? '' : ' mb-0')">
                    <v-row
                        no-gutters
                        class="py-5 pb-0"
                    >

                        <v-col 
                            cols="2"
                            sm="2"
                            md="2"
                            lg="2"
                            class=""
                        >
                            <v-img contain avatar :aspect-ratio="1/1" src=""></v-img>
                        </v-col>

                        <v-col
                            class="px-5"
                            cols="10"
                            sm="10"
                            md="7"
                            lg="7"
                        >
                            <div class="text-h5 text--primary text-truncate">
                                Produkt navn {{ index }}
                            </div>
                            <div class="text-h6 text--secondary text-truncate">
                                Sub header
                            </div>
                        </v-col>

                        <v-col
                            cols="6"
                            order="2"
                            order-md="1"
                            sm="6"
                            md="1"
                            lg="1"
                            class="pt-10 pt-md-0"
                        >
                            2
                        </v-col>

                        <v-col
                            cols="6"
                            order="1"
                            order-md="2"
                            sm="6"
                            md="2"
                            lg="2"
                            class="text-left text-md-right pt-10 pt-md-0"
                        >
                            <h5>Pris pr. stk</h5>
                            450 kr <br><br>

                            <h5>Totalt</h5>
                            900 kr
                        </v-col>
                    </v-row>

                    <v-divider v-if="index + 1 < 6"></v-divider>
                </v-card>
            </v-col>
        </v-card-text>
    </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>